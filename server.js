const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(express.json());

// Postgres (Railway provides DATABASE_URL automatically when you add a Postgres plugin)
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : null;

// In-memory fallback (resets on redeploy — add Postgres plugin on Railway for persistence)
const mem = {};

async function initDb() {
  if (!pool) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS workout_state (
      week_id TEXT PRIMARY KEY,
      data    JSONB NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT NOW()
    )
  `);
}

// GET week state
app.get('/api/:weekId', async (req, res) => {
  try {
    const { weekId } = req.params;
    if (pool) {
      const r = await pool.query('SELECT data FROM workout_state WHERE week_id = $1', [weekId]);
      return res.json(r.rows[0]?.data || { days: {} });
    }
    res.json(mem[weekId] || { days: {} });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

// PUT week state
app.put('/api/:weekId', async (req, res) => {
  try {
    const { weekId } = req.params;
    const data = req.body;
    if (pool) {
      await pool.query(`
        INSERT INTO workout_state (week_id, data)
        VALUES ($1, $2)
        ON CONFLICT (week_id) DO UPDATE SET data = $2, updated_at = NOW()
      `, [weekId, JSON.stringify(data)]);
      return res.json({ ok: true });
    }
    mem[weekId] = data;
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'db error' });
  }
});

// Serve the apps (HTML lives in app/)
const APP_DIR = path.join(__dirname, 'app');
app.get('/weight', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'weight.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'week.html'));
});

initDb().catch(console.error);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
