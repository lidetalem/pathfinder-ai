import React, { useEffect, useMemo, useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { API_URL, PROFILE_LINKS } from './config.js';

const getToken = () => localStorage.getItem('pathfinder_token');
const request = async (path, options = {}) => {
  const token = getToken();
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type':'application/json', ...(token ? {Authorization:`Bearer ${token}`} : {}), ...(options.headers || {}) }
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Request failed');
  return data;
};

export default function App() {
  const [user,setUser] = useState(null);
  const [screen,setScreen] = useState('welcome');
  const [pathway,setPathway] = useState(null);
  const [assessment,setAssessment] = useState(null);
  const [questions,setQuestions] = useState([]);
  const [answers,setAnswers] = useState({});
  const [index,setIndex] = useState(0);
  const [result,setResult] = useState(null);
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('pathfinder_theme');
    if (stored === 'light' || stored === 'dark') return stored;
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('pathfinder_theme', theme);
  }, [theme]);

  useEffect(() => {
    if (!getToken()) return;
    request('/api/me').then(d => {setUser(d.user); setScreen('intro');}).catch(() => localStorage.removeItem('pathfinder_token'));
  }, []);

  const current = questions[index];
  const answeredCount = Object.keys(answers).length;
  const progress = questions.length ? Math.round((answeredCount / questions.length) * 100) : 0;

  async function onGoogleSuccess(response) {
    setBusy(true); setError('');
    try {
      const data = await request('/api/auth/google', {method:'POST', body:JSON.stringify({credential:response.credential})});
      localStorage.setItem('pathfinder_token',data.token);
      setUser(data.user); setScreen('intro');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  function signOut() {
    googleLogout(); localStorage.removeItem('pathfinder_token');
    setUser(null); setAssessment(null); setQuestions([]); setAnswers({}); setResult(null); setScreen('welcome');
  }

  async function begin(which) {
    setBusy(true); setError('');
    try {
      const {assessment:a} = await request('/api/assessments',{method:'POST',body:JSON.stringify({pathway:which})});
      const data = await request(`/api/assessments/${a.id}`);
      setPathway(which); setAssessment(a); setQuestions(data.questions); setAnswers(data.assessment.answers || {}); setIndex(0); setResult(null); setScreen('quiz');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function choose(optionId) {
    if (!current || !assessment) return;
    setError('');
    const nextAnswers = {...answers,[current.id]:optionId};
    setAnswers(nextAnswers);
    try {
      await request(`/api/assessments/${assessment.id}/answer`, {
        method:'PUT', body:JSON.stringify({questionId:current.id,answerId:optionId,currentQuestion:index})
      });
    } catch(e) { setError(`Your answer may not have saved. ${e.message}`); }
  }

  async function next() {
    if (!current || !answers[current.id]) return;
    if (index < questions.length - 1) { setIndex(index + 1); return; }
    setBusy(true); setError('');
    try {
      const data = await request(`/api/assessments/${assessment.id}/finish`,{method:'POST',body:'{}'});
      setResult(data.result); setScreen('result');
    } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  async function restart() {
    if (!assessment) {setScreen('intro'); return;}
    setBusy(true);
    try { await begin(pathway); } catch(e) { setError(e.message); }
    finally { setBusy(false); }
  }

  const firstName = user?.name?.trim().split(/\s+/)[0] || 'there';

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={() => setScreen(user ? 'intro' : 'welcome')} aria-label="Pathfinder home">
        <span className="brand-mark">P</span><span>pathfinder<span className="brand-dot">.</span></span>
      </button>
      <div className="top-actions">
        <button
          type="button"
          className={`theme-toggle ${theme === 'dark' ? 'is-dark' : 'is-light'}`}
          onClick={() => setTheme((current) => current === 'dark' ? 'light' : 'dark')}
          aria-label="Toggle light and dark mode"
          title="Toggle theme"
        >
          <span className="theme-toggle-track">
            <span className="theme-toggle-thumb">
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 3.5a.9.9 0 0 1 .9.9v1.1a.9.9 0 1 1-1.8 0V4.4a.9.9 0 0 1 .9-.9Zm0 13.6a.9.9 0 0 1 .9.9v1.1a.9.9 0 1 1-1.8 0v-1.1a.9.9 0 0 1 .9-.9Zm7.1-4.5a.9.9 0 0 1 .9.9.9.9 0 0 1-.9.9h-1.1a.9.9 0 1 1 0-1.8h1.1Zm-13.6 0a.9.9 0 0 1 .9.9.9.9 0 0 1-.9.9H4.4a.9.9 0 1 1 0-1.8h1.1ZM17.3 6.7l.8-.8a.9.9 0 1 1 1.2 1.2l-.8.8a.9.9 0 0 1-1.2-1.2Zm-10.6 10.6l-.8.8a.9.9 0 1 1-1.2-1.2l.8-.8a.9.9 0 0 1 1.2 1.2Zm10.6 0a.9.9 0 0 1 1.2 0l.8.8a.9.9 0 0 1-1.2 1.2l-.8-.8a.9.9 0 0 1 0-1.2Zm-10.6-10.6a.9.9 0 0 1 1.2 0l.8.8a.9.9 0 1 1-1.2 1.2l-.8-.8a.9.9 0 0 1 0-1.2ZM12 7.9a4.1 4.1 0 1 1 0 8.2 4.1 4.1 0 0 1 0-8.2Z" fill="currentColor"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20 15.5A7.5 7.5 0 0 1 8.5 4a8.5 8.5 0 1 0 11.5 11.5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </span>
          </span>
        </button>
        {user && <><span className="user-label">{user.name}</span><button className="text-button" onClick={signOut}>Sign out</button></>}
        <span className="status-dot"/><span className="small-muted">Your next chapter starts here</span>
      </div>
    </header>

    {error && <div className="error-banner" role="alert">{error}<button onClick={()=>setError('')} aria-label="Dismiss error">×</button></div>}

    <main>
      {screen === 'welcome' && <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line"/> A clearer way forward</div>
          <h1>Too many paths.<br/><span className="gradient-text">One that fits you.</span></h1>
          <p className="hero-description">Your interests are a starting point. Your strengths are clues. Let’s turn the noise into a direction you can actually explore.</p>
          <div className="hero-points"><span>✦ Thoughtful questions</span><span>✦ Personal recommendations</span><span>✦ Practical next steps</span></div>
          <div className="auth-card">
            <div><strong>Start with the person you are.</strong><p>Sign in to save your progress and revisit your results.</p></div>
            <div className="google-wrap">
              {busy ? <span className="muted">Signing you in…</span> : <GoogleLogin onSuccess={onGoogleSuccess} onError={()=>setError('Google sign-in failed. Please try again.')} text="continue_with" shape="pill" theme="filled_black" width="290"/>}
            </div>
            <p className="privacy-note">By continuing, you agree to use your results as guidance—not a guarantee.</p>
          </div>
        </div>
        <div className="hero-art" aria-label="Abstract illustration of different paths converging">
          <div className="orb orb-one"/><div className="orb orb-two"/><div className="orb orb-three"/>
          <div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/>
          <div className="center-core"><span>✦</span><small>YOUR<br/>DIRECTION</small></div>
          <div className="float-card float-top"><span className="mini-icon violet">✳</span><div><b>Discover</b><small>What draws you in</small></div></div>
          <div className="float-card float-bottom"><span className="mini-icon mint">↗</span><div><b>Move forward</b><small>One step at a time</small></div></div>
        </div>
      </section>}

      {screen === 'intro' && <section className="welcome-screen">
        <div className="welcome-symbol">✦</div>
        <div className="eyebrow centered">A fresh start, made for you</div>
        <h1 className="welcome-title">Hello, <span className="gradient-text">{firstName}.</span></h1>
        <p className="welcome-subtitle">You don’t need to have it all figured out.<br/>You only need to find your next good question.</p>
        <div className="intro-card">
          <p>Digital work is full of possibilities—and that can feel overwhelming. Pathfinder helps you explore a direction based on your interests, current strengths, resources, and the kind of work you want to do.</p>
          <div className="three-mini"><div><span>01</span><b>Tell us about you</b><small>Simple, thoughtful questions</small></div><div><span>02</span><b>Explore your fit</b><small>Clear reasons, not guesses</small></div><div><span>03</span><b>Take a first step</b><small>A practical experiment</small></div></div>
        </div>
        <button className="primary-button" onClick={()=>setScreen('choose')}>Let’s begin <span>→</span></button>
        <p className="microcopy">About 5–8 minutes · You can go back and change answers</p>
      </section>}

      {screen === 'choose' && <section className="choice-screen">
        <div className="eyebrow centered">Choose your starting point</div>
        <h1>Which path are you exploring?</h1>
        <p className="section-subtitle">There’s no wrong answer. Choose what best describes what you want to build right now.</p>
        <div className="choice-grid">
          <button className="choice-card" onClick={()=>begin('creator')} disabled={busy}>
            <span className="choice-icon purple">◉</span><span className="choice-number">PATH 01</span><h2>Content creator</h2><p>Find a niche where your curiosity, creative style, and audience needs can meet.</p><span className="choice-bottom">Explore content niches <b>↗</b></span>
          </button>
          <button className="choice-card" onClick={()=>begin('freelancer')} disabled={busy}>
            <span className="choice-icon green">⌘</span><span className="choice-number">PATH 02</span><h2>Freelancer</h2><p>Explore a digital service that fits your skills, work style, resources, and goals.</p><span className="choice-bottom">Explore freelance skills <b>↗</b></span>
          </button>
        </div>
        <button className="back-link" onClick={()=>setScreen('intro')}>← Back to welcome</button>
      </section>}

      {screen === 'quiz' && current && <section className="quiz-screen">
        <div className="quiz-topline"><button className="back-link" onClick={()=>setScreen('choose')}>← Exit assessment</button><span>{pathway === 'creator' ? 'CONTENT CREATOR PATH' : 'FREELANCER PATH'}</span></div>
        <div className="progress-meta"><span>Question {index+1} <i>of {questions.length}</i></span><span>{Math.round(((index+1)/questions.length)*100)}% explored</span></div>
        <div className="progress-track"><div style={{width:`${((index+1)/questions.length)*100}%`}}/></div>
        <div className="question-layout">
          <div className="question-aside"><div className="question-number">Q{String(index+1).padStart(2,'0')}</div><p>There’s no perfect answer. Choose what feels most true for you today.</p><div className="aside-rule"/></div>
          <div className="question-main">
            <h1>{current.text}</h1>{current.hint && <p className="question-hint">{current.hint}</p>}
            <div className="option-list">
              {current.options.map((o,i)=><button key={o.id} className={`option ${answers[current.id]===o.id?'selected':''}`} onClick={()=>choose(o.id)}>
                <span className="option-letter">{String.fromCharCode(65+i)}</span><span>{o.label}</span><span className="option-check">{answers[current.id]===o.id?'✓':'→'}</span>
              </button>)}
            </div>
            <div className="quiz-controls"><button className="secondary-button" onClick={()=>setIndex(Math.max(0,index-1))} disabled={index===0}>← Previous</button><button className="primary-button" onClick={next} disabled={!answers[current.id]||busy}>{busy?'Saving…':index===questions.length-1?'See my direction':'Continue'} <span>→</span></button></div>
            <p className="save-note">Your answers are saved to your account as you go.</p>
          </div>
        </div>
      </section>}

      {screen === 'result' && result && <section className="result-screen">
        <div className="result-spark">✦</div><div className="eyebrow centered">Your first direction</div>
        <h1>Thank you, {firstName}.</h1><p className="section-subtitle">You’ve taken a real step toward clarity. Here’s a direction worth testing—not a box you have to stay in.</p>
        <div className="result-card"><span className="result-label">YOUR TOP MATCH</span><h2>{result.recommendation.label}</h2><p>{result.recommendation.reasons?.length ? `Your answers pointed toward this area through ${result.recommendation.reasons.slice(0,3).join('; ').toLowerCase()}.` : 'Your current answers provide an initial signal. A few more questions or a small experiment can help clarify your direction.'}</p><div className="result-stats"><div><small>Answers considered</small><b>{result.completedAnswers}</b></div><div><small>Signal strength</small><b>{result.confidence==='directional'?'Directional':result.confidence==='exploratory'?'Exploratory':'Early signal'}</b></div></div></div>
        <div className="next-steps"><h3>Your next 7 days</h3>{result.nextSteps?.map((s,i)=><div className="step-row" key={i}><span>{String(i+1).padStart(2,'0')}</span><p>{s}</p></div>)}</div>
        <div className="alternatives"><h3>Also worth exploring</h3>{result.alternatives?.map(a=><div className="alternative" key={a.id}><span>{a.label}</span><span>Explore ↗</span></div>)}</div>
        <p className="result-note">{result.note}</p>
        <div className="result-actions"><button className="secondary-button" onClick={()=>{setIndex(0);setScreen('quiz')}}>Review my answers</button><button className="primary-button" onClick={restart} disabled={busy}>Start again <span>↻</span></button></div>
        <p className="closing-note">Thanks for exploring with Pathfinder. We’ll keep working to make your next step clearer—with more useful tools and features in the future.</p>
      </section>}
    </main>

    <footer className="footer"><span>© {new Date().getFullYear()} Pathfinder</span><span>Built to make digital choices feel clearer.</span><div><a href={PROFILE_LINKS.github} target="_blank" rel="noreferrer">GitHub ↗</a>{PROFILE_LINKS.linkedin && <a href={PROFILE_LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>}</div></footer>
  </div>;
}
