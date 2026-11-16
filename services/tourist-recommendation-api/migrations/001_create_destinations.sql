CREATE TABLE IF NOT EXISTS destinations (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  country TEXT NOT NULL,
  region TEXT NOT NULL,
  summary TEXT NOT NULL,
  estimated_cost_usd INTEGER NOT NULL CHECK (estimated_cost_usd > 0),
  interests TEXT[] NOT NULL,
  best_seasons TEXT[] NOT NULL,
  shoulder_seasons TEXT[] NOT NULL DEFAULT '{}',
  ideal_duration_days INTEGER NOT NULL CHECK (ideal_duration_days BETWEEN 1 AND 30),
  highlights TEXT[] NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
