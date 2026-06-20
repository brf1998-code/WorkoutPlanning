const express = require('express');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(express.json());

// Find where the HTML lives — supports both a flat repo (files at root)
// and an app/ subfolder layout, so it works regardless of how the repo is structured.
const APP_DIR = [path.join(__dirname, 'app'), __dirname]
  .find(d => fs.existsSync(path.join(d, 'week.html'))) || __dirname;
console.log('Serving app from:', APP_DIR);

// Postgres (Railway provides DATABASE_URL automatically when you add a Postgres plugin)
const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } })
  : null;

// In-memory fallback (resets on redeploy — add Postgres plugin on Railway for persistence)
const mem = {};
console.log('STORAGE MODE:', pool ? 'Postgres (persistent)' : 'IN-MEMORY (NON-PERSISTENT — data is lost on every restart!)');

// Health/status — lets us confirm whether persistence is actually on
app.get('/api/_status', (req, res) => res.json({ persistent: !!pool, mode: pool ? 'postgres' : 'in-memory', ts: Date.now() }));

// Serve data-driven plan files (app/plans/<profile>.json). 404 -> app uses its built-in fallback.
app.get('/api/plan/:profile', (req, res) => {
  const safe = (req.params.profile || '').replace(/[^a-z0-9_-]/gi, '');
  const f = path.join(APP_DIR, 'plans', safe + '.json');
  if (safe && fs.existsSync(f)) return res.sendFile(f);
  res.status(404).json({ error: 'no plan' });
});

// Receive Apple Health data from an iOS Shortcut. POST a day's metrics; they merge into health-<profile>.
// Read it back via GET /api/health-<profile>.
app.post('/api/health/:profile', async (req, res) => {
  try {
    const safe = (req.params.profile || '').replace(/[^a-z0-9_-]/gi, '');
    if (!safe) return res.status(400).json({ error: 'bad profile' });
    const key = 'health-' + safe;
    const body = req.body || {};
    const date = body.date || new Date().toISOString().slice(0, 10);
    let data = { days: {} };
    if (pool) { const r = await pool.query('SELECT data FROM workout_state WHERE week_id = $1', [key]); if (r.rows[0]) data = r.rows[0].data; }
    else { data = mem[key] || { days: {} }; }
    data.days = data.days || {};
    data.days[date] = Object.assign({}, data.days[date] || {}, body);  // merge metrics for that day
    if (pool) { await pool.query('INSERT INTO workout_state (week_id, data) VALUES ($1, $2) ON CONFLICT (week_id) DO UPDATE SET data = $2, updated_at = NOW()', [key, JSON.stringify(data)]); }
    else { mem[key] = data; }
    res.json({ ok: true, date, stored: Object.keys(body) });
  } catch (e) { console.error(e); res.status(500).json({ error: 'health error' }); }
});

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

// Serve the apps
app.get('/weight', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'weight.html'));
});
app.get('*', (req, res) => {
  res.sendFile(path.join(APP_DIR, 'week.html'));
});

initDb().catch(console.error);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
