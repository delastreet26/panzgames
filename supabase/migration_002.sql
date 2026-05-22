-- Migration 002: Daily riddles table
-- Run this in the Supabase SQL Editor

CREATE TABLE IF NOT EXISTS daily_riddles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE UNIQUE NOT NULL,
  riddle TEXT NOT NULL,
  answer TEXT NOT NULL,
  hint TEXT,
  difficulty TEXT DEFAULT 'medium',
  category TEXT DEFAULT 'general',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE daily_riddles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read riddles" ON daily_riddles FOR SELECT USING (true);
CREATE POLICY "Service role can insert riddles" ON daily_riddles FOR INSERT WITH CHECK (true);
