CREATE TABLE IF NOT EXISTS app_users (
  id BIGSERIAL PRIMARY KEY,
  google_sub TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS assessments (
  id BIGSERIAL PRIMARY KEY,
  user_id BIGINT NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  pathway TEXT NOT NULL CHECK (pathway IN ('creator','freelancer')),
  status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress','completed')),
  current_question INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS assessment_answers (
  id BIGSERIAL PRIMARY KEY,
  assessment_id BIGINT NOT NULL REFERENCES assessments(id) ON DELETE CASCADE,
  question_id TEXT NOT NULL,
  answer_id TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (assessment_id, question_id)
);
CREATE TABLE IF NOT EXISTS assessment_results (
  id BIGSERIAL PRIMARY KEY,
  assessment_id BIGINT NOT NULL UNIQUE REFERENCES assessments(id) ON DELETE CASCADE,
  result_json JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS idx_assessments_user ON assessments(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_answers_assessment ON assessment_answers(assessment_id);
