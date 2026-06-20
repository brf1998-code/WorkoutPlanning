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

// ======================= STRAVA INTEGRATION =======================
const STRAVA_CLIENT_ID = process.env.STRAVA_CLIENT_ID;
const STRAVA_CLIENT_SECRET = process.env.STRAVA_CLIENT_SECRET;
const PUBLIC_URL = process.env.PUBLIC_URL || 'https://workoutplanning-production.up.railway.app';
const stravaTok = {}; // profile -> { access, exp }

async function kvRead(key){ if(pool){ const r=await pool.query('SELECT data FROM workout_state WHERE week_id=$1',[key]); return r.rows[0]?r.rows[0].data:null; } return mem[key]||null; }
async function kvWrite(key,data){ if(pool){ await pool.query('INSERT INTO workout_state (week_id,data) VALUES ($1,$2) ON CONFLICT (week_id) DO UPDATE SET data=$2, updated_at=NOW()',[key,JSON.stringify(data)]); } else { mem[key]=data; } }

// Step 1: start OAuth — open this link in a browser to connect Strava
app.get('/api/strava/connect/:profile', (req,res)=>{
  if(!STRAVA_CLIENT_ID) return res.status(500).send('Strava not configured (set STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET).');
  const profile=(req.params.profile||'brendan').replace(/[^a-z0-9_-]/gi,'');
  const redirect=encodeURIComponent(PUBLIC_URL+'/api/strava/callback');
  const url=`https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&response_type=code&redirect_uri=${redirect}&approval_prompt=auto&scope=activity:read_all&state=${profile}`;
  res.redirect(url);
});

// Step 2: Strava redirects here; exchange code for a refresh token and store it
app.get('/api/strava/callback', async (req,res)=>{
  try{
    const { code, state, error } = req.query;
    if(error) return res.status(400).send('Strava error: '+error);
    if(!code) return res.status(400).send('No authorization code.');
    const profile=(state||'brendan').replace(/[^a-z0-9_-]/gi,'');
    const r=await fetch('https://www.strava.com/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_id:STRAVA_CLIENT_ID,client_secret:STRAVA_CLIENT_SECRET,code,grant_type:'authorization_code'})});
    const tok=await r.json();
    if(!tok.refresh_token) return res.status(500).send('Auth failed: '+JSON.stringify(tok));
    const meta=(await kvRead('strava-'+profile))||{};
    meta.refresh_token=tok.refresh_token; meta.athlete_id=tok.athlete&&tok.athlete.id; meta.connected_at=Date.now();
    await kvWrite('strava-'+profile, meta);
    res.send('<html><body style="font-family:-apple-system;text-align:center;padding:40px"><h2>✅ Strava connected for '+profile+'</h2><p>You can close this tab and go back to the app.</p></body></html>');
  }catch(e){ console.error(e); res.status(500).send('callback error'); }
});

async function stravaAccess(profile){
  const now=Date.now();
  if(stravaTok[profile] && stravaTok[profile].exp>now+60000) return stravaTok[profile].access;
  const meta=await kvRead('strava-'+profile);
  if(!meta||!meta.refresh_token) throw new Error('Strava not connected for '+profile);
  const r=await fetch('https://www.strava.com/oauth/token',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({client_id:STRAVA_CLIENT_ID,client_secret:STRAVA_CLIENT_SECRET,grant_type:'refresh_token',refresh_token:meta.refresh_token})});
  const tok=await r.json();
  if(!tok.access_token) throw new Error('token refresh failed');
  if(tok.refresh_token && tok.refresh_token!==meta.refresh_token){ meta.refresh_token=tok.refresh_token; await kvWrite('strava-'+profile, meta); }
  stravaTok[profile]={ access:tok.access_token, exp:(tok.expires_at?tok.expires_at*1000:now+5*3600*1000) };
  return tok.access_token;
}

function latestRestingHR(health){ let rh=52, best=''; Object.entries((health&&health.days)||{}).forEach(([d,v])=>{ if(v.restingHR && d>best){ best=d; rh=v.restingHR; } }); return rh; }
// Karvonen HR zones (maxHR 190). Returns seconds in each zone.
function computeZones(hr, time){
  const b=[126,157,172,187]; // Strava HR zone lower bounds (Z2/Z3/Z4/Z5); Z1<=125
  const z=[0,0,0,0,0];
  for(let i=1;i<hr.length;i++){ let dt=(time[i]-time[i-1]); if(!(dt>0)||dt>30) dt=1; const v=hr[i]; let k=0; if(v>=b[3])k=4; else if(v>=b[2])k=3; else if(v>=b[1])k=2; else if(v>=b[0])k=1; z[k]+=dt; }
  return { Z1:Math.round(z[0]), Z2:Math.round(z[1]), Z3:Math.round(z[2]), Z4:Math.round(z[3]), Z5:Math.round(z[4]) };
}

// Step 3: pull recent activities (call this on app open or from a scheduled task)
app.get('/api/strava/sync/:profile', async (req,res)=>{
  try{
    const profile=(req.params.profile||'brendan').replace(/[^a-z0-9_-]/gi,'');
    const access=await stravaAccess(profile);
    const health=(await kvRead('health-'+profile))||{days:{}}; health.days=health.days||{};
    const known=new Set(); Object.values(health.days).forEach(d=> (d.workouts||[]).forEach(w=> known.add(w.id)));
    const restingHR=latestRestingHR(health);
    const listR=await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=50',{headers:{Authorization:'Bearer '+access}});
    const list=await listR.json();
    if(!Array.isArray(list)) return res.status(500).json({error:'activity list failed', detail:list});
    let added=0;
    for(const a of list){
      if(known.has(a.id)) continue;
      let calories=null; try{ const dR=await fetch('https://www.strava.com/api/v3/activities/'+a.id,{headers:{Authorization:'Bearer '+access}}); const det=await dR.json(); calories=det.calories; }catch(e){}
      let zones=null; if(a.has_heartrate){ try{ const sR=await fetch('https://www.strava.com/api/v3/activities/'+a.id+'/streams?keys=heartrate,time&key_by_type=true',{headers:{Authorization:'Bearer '+access}}); const st=await sR.json(); if(st&&st.heartrate&&st.time) zones=computeZones(st.heartrate.data, st.time.data); }catch(e){} }
      const date=(a.start_date_local||a.start_date||'').slice(0,10);
      const w={ id:a.id, source:'strava', type:a.sport_type||a.type, name:a.name, start:a.start_date_local,
        durationSec:a.moving_time, distanceMi:a.distance? +(a.distance/1609.34).toFixed(2):null,
        avgHR:a.average_heartrate?Math.round(a.average_heartrate):null, maxHR:a.max_heartrate?Math.round(a.max_heartrate):null,
        calories: calories!=null?Math.round(calories):null,
        elevationFt:a.total_elevation_gain?Math.round(a.total_elevation_gain*3.281):null,
        avgCadence:a.average_cadence||null, zones };
      health.days[date]=health.days[date]||{}; health.days[date].workouts=health.days[date].workouts||[]; health.days[date].workouts.push(w); added++;
    }
    if(added) await kvWrite('health-'+profile, health);
    res.json({ ok:true, added, scanned:list.length });
  }catch(e){ console.error(e); res.status(500).json({ error:String(e.message||e) }); }
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
