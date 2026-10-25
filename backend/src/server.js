import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { pool } from './db.js';
import { requireAuth } from './auth.js';
import { pathways, scoreAssessment } from './questions.js';

const app = express();
app.set('trust proxy', 1);
const port = process.env.PORT || 4000;
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

app.use(helmet());
app.use(cors({
  origin: (process.env.FRONTEND_URL || 'http://localhost:5173').split(',').map(s => s.trim()),
  allowedHeaders: ['Content-Type','Authorization'],
  methods: ['GET','POST','PUT','DELETE','OPTIONS']
}));
app.use(express.json({ limit: '100kb' }));
app.use(rateLimit({ windowMs: 15 * 60 * 1000, limit: 150, standardHeaders: true, legacyHeaders: false }));

app.get('/api/health', async (_req, res) => {
  try { await pool.query('SELECT 1'); res.json({ status: 'ok', database: 'connected' }); }
  catch { res.status(503).json({ status: 'degraded', database: 'unavailable' }); }
});

app.post('/api/auth/google', async (req, res, next) => {
  try {
    const { credential } = req.body || {};
    if (!credential) return res.status(400).json({ error: 'Google credential is required.' });
    const ticket = await googleClient.verifyIdToken({ idToken: credential, audience: process.env.GOOGLE_CLIENT_ID });
    const p = ticket.getPayload();
    if (!p?.sub || !p.email || !p.email_verified) return res.status(401).json({ error: 'Google account could not be verified.' });
    const result = await pool.query(
      `INSERT INTO app_users (google_sub,email,name,avatar_url)
       VALUES ($1,$2,$3,$4)
       ON CONFLICT (google_sub) DO UPDATE SET email=EXCLUDED.email,name=EXCLUDED.name,avatar_url=EXCLUDED.avatar_url,updated_at=NOW()
       RETURNING id,google_sub,email,name,avatar_url`,
      [p.sub, p.email, p.name || p.given_name || 'there', p.picture || null]
    );
    const user = result.rows[0];
    const token = jwt.sign({ id: user.id, sub: user.google_sub, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, email: user.email, name: user.name, avatarUrl: user.avatar_url } });
  } catch (err) { next(err); }
});

app.get('/api/me', requireAuth, async (req, res, next) => {
  try {
    const r = await pool.query('SELECT id,email,name,avatar_url FROM app_users WHERE id=$1', [req.user.id]);
    if (!r.rowCount) return res.status(404).json({ error: 'User not found.' });
    const u = r.rows[0];
    res.json({ user: { id: u.id, email: u.email, name: u.name, avatarUrl: u.avatar_url } });
  } catch (err) { next(err); }
});

app.get('/api/pathways', (_req,res) => {
  res.json(Object.entries(pathways).map(([id,p]) => ({ id, title: p.title, questionCount: p.questions.length })));
});

app.post('/api/assessments', requireAuth, async (req,res,next) => {
  try {
    const { pathway } = req.body || {};
    if (!['creator','freelancer'].includes(pathway)) return res.status(400).json({ error: 'Choose creator or freelancer.' });
    const r = await pool.query('INSERT INTO assessments(user_id,pathway) VALUES($1,$2) RETURNING id,pathway,status,current_question', [req.user.id,pathway]);
    res.status(201).json({ assessment: r.rows[0] });
  } catch (err) { next(err); }
});

app.get('/api/assessments/:id', requireAuth, async (req,res,next) => {
  try {
    const r = await pool.query(
      `SELECT a.id,a.pathway,a.status,a.current_question,
       COALESCE(json_object_agg(ans.question_id,ans.answer_id) FILTER (WHERE ans.question_id IS NOT NULL),'{}'::json) AS answers
       FROM assessments a LEFT JOIN assessment_answers ans ON ans.assessment_id=a.id
       WHERE a.id=$1 AND a.user_id=$2 GROUP BY a.id`, [req.params.id,req.user.id]
    );
    if (!r.rowCount) return res.status(404).json({ error: 'Assessment not found.' });
    const a = r.rows[0];
    res.json({ assessment: a, questions: pathways[a.pathway].questions });
  } catch (err) { next(err); }
});

app.put('/api/assessments/:id/answer', requireAuth, async (req,res,next) => {
  const client = await pool.connect();
  try {
    const { questionId, answerId, currentQuestion } = req.body || {};
    if (!questionId || !answerId) return res.status(400).json({ error: 'A question and answer are required.' });
    await client.query('BEGIN');
    const a = await client.query('SELECT id,pathway FROM assessments WHERE id=$1 AND user_id=$2 FOR UPDATE', [req.params.id,req.user.id]);
    if (!a.rowCount) { await client.query('ROLLBACK'); return res.status(404).json({ error: 'Assessment not found.' }); }
    const q = pathways[a.rows[0].pathway].questions.find(item => item.id === questionId);
    if (!q || !q.options.some(o => o.id === answerId)) { await client.query('ROLLBACK'); return res.status(400).json({ error: 'Invalid question or answer.' }); }
    await client.query(
      `INSERT INTO assessment_answers(assessment_id,question_id,answer_id) VALUES($1,$2,$3)
       ON CONFLICT(assessment_id,question_id) DO UPDATE SET answer_id=EXCLUDED.answer_id,updated_at=NOW()`,
      [req.params.id,questionId,answerId]
    );
    await client.query('UPDATE assessments SET current_question=$1,updated_at=NOW() WHERE id=$2', [Math.max(0,Number(currentQuestion)||0),req.params.id]);
    await client.query('COMMIT');
    res.json({ saved: true });
  } catch (err) { await client.query('ROLLBACK'); next(err); }
  finally { client.release(); }
});

app.post('/api/assessments/:id/finish', requireAuth, async (req,res,next) => {
  try {
    const a = await pool.query('SELECT id,pathway FROM assessments WHERE id=$1 AND user_id=$2', [req.params.id,req.user.id]);
    if (!a.rowCount) return res.status(404).json({ error: 'Assessment not found.' });
    const ar = await pool.query('SELECT question_id,answer_id FROM assessment_answers WHERE assessment_id=$1', [req.params.id]);
    const answers = Object.fromEntries(ar.rows.map(x => [x.question_id,x.answer_id]));
    const result = scoreAssessment(a.rows[0].pathway, answers);
    await pool.query(
      `INSERT INTO assessment_results(assessment_id,result_json) VALUES($1,$2::jsonb)
       ON CONFLICT(assessment_id) DO UPDATE SET result_json=EXCLUDED.result_json,created_at=NOW()`,
      [req.params.id, JSON.stringify(result)]
    );
    await pool.query("UPDATE assessments SET status='completed',updated_at=NOW() WHERE id=$1", [req.params.id]);
    res.json({ result });
  } catch (err) { next(err); }
});

app.post('/api/assessments/:id/restart', requireAuth, async (req,res,next) => {
  try {
    const r = await pool.query('DELETE FROM assessments WHERE id=$1 AND user_id=$2 RETURNING pathway', [req.params.id,req.user.id]);
    if (!r.rowCount) return res.status(404).json({ error: 'Assessment not found.' });
    const fresh = await pool.query('INSERT INTO assessments(user_id,pathway) VALUES($1,$2) RETURNING id,pathway,status,current_question', [req.user.id,r.rows[0].pathway]);
    res.json({ assessment: fresh.rows[0] });
  } catch (err) { next(err); }
});

app.use((err,_req,res,_next) => {
  console.error(err?.message || 'Unexpected server error');
  res.status(500).json({ error: 'Something went wrong. Please try again.' });
});

app.listen(port, () => console.log(`Pathfinder API listening on ${port}`));
