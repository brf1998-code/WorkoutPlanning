# Training Cycle — Macro Plan (Brendan)

*The standing multi-block roadmap. The Sunday coach (and anyone building a weekly plan) reads this first. Weekly plans live in `app/plans/brendan.json`; this file says what block we're in and what rotates next.*

Last updated: **2026-09-20** (Block 3 closed. The deload week Sep 14–20 was cut short by illness: Monday's lift went past the script to 225 squats, Tuesday's 5K TT ran **21:44** (3.14 mi, 184 avg) with the illness arriving the same day, Wednesday's bench went to 195 doubles ('very controlled'), Thursday was 1.7 easy miles, then Friday through Sunday were lost. 36 of 69 planned sets, 9.5 of 20 miles. **Week of Sep 21–27 is a bridge / return-from-illness week**, built off the return-to-sport research: day one is a test session at 60–70% of normal intensity, loads for the week at 70–85% of recent tops with every set 4+ RIR, 17 easy miles, no quality touch, no failure sets, 69 planned sets. **Block 4 slides to Sep 28 and every later block shifts +1 week.** Block 4 running is re-cut to 22 → 25 → 27, deload ~19, so acute:chronic stays under 1.4 coming off a 9.5 mile week. Bench 225 track shifts one week, attempt now Wed Oct 14.)

Previous update **2026-09-14** (Block 3 build wk 4 closed: Squat 215×5 (3+2), RDL 235×8, Bench 195×3 + 3×5@170, DL **300×4** 'felt manageable', paused bench 165×5, OHP 115 strict (125 became push press), pull-up max **19** on a fresh day; 25 mi planned / 20.1 logged through Fri, easy runs 147–154. **Deload week Sep 14–20, research-shaped per Brendan's ask: 20 mi (−20%), loads held at 90–95% of tops (squat 205×3, RDL 215×5, DL 285×2, OHP 115×3, row 140), reps and sets cut (69 planned sets, weighted 63 → 45, tonnage ~−45%), bench 185 doubles + paused 3×3@150 per the track, 5K TT Tuesday Sep 15.** Block 4 starts Sep 21.)

Previous update **2026-09-06** (Brendan's call: Block 3 gets a **4th build week (Sep 7–13)** instead of deloading, since the retest week left him fresh and every main lift moved. **Deload slides to Sep 14–20, all later blocks shift +1 week.** Running steps to 25 mi that week per his call, a one-off exception to the hold-flat rule. A **bench 225 track** is added below, and the body-comp phases are reset to a 400 deficit, see Phase 3.)

Previous update 2026-08-12 (road trip Aug 8–11 extended the Block-2 deload; **Block 3 delayed one week → starts Aug 17**, all later blocks shift +1 week. Week of Aug 10–16 is a bridge/re-regulation week: ~13 easy miles, moderate re-entry lifts, short Sat/Sun at the Maine cabin).

## Structure

- **Blocks are 4 weeks: 3 build weeks + 1 deload.** Deload rule rewritten 2026-09-14 from the tapering research (Pritchard; Travis et al. 2020 powerlifting tapering review; Bell et al. 2022 coach interviews): **keep the bar heavy, cut the work.** Loads stay at ~90–95% of the block's tops, reps per set drop so every set is 4+ RIR (triples/doubles on mains, fives on RDL), weighted sets down ~30–40%, accessory padding out, supersets at 2 rounds, core floor unchanged. App tonnage reads ~−45% (that is the research's 30–50% 'volume' cut); sessions 30–40 min. Reduced-intensity deloads (same sets, −15% load) are the version the research rates lowest, don't build those. Mileage −20–30%.
- **Return from illness (added 2026-09-20).** Any illness costing 3 or more days gets a **bridge week**, not a jump back into the block. Day one is a test session at **60–70% of normal intensity** with a symptom check during it, right after, and 24 hours later (IOC consensus on acute respiratory illness, Schwellnus 2022). The week's loads sit at **70–85% of recent tops**, every set 4+ RIR, no failure sets; mileage runs **60–75% of the pre-illness norm, all easy, no quality touch**; the block calendar **slides a week** rather than compressing. Hard gates: no session with a fever or a fever in the last 24 h, or with below-the-neck symptoms (chest cough, body aches, real fatigue); stop the session for chest pain or tightness, palpitations, breathlessness out of proportion to effort, dizziness, or very dark urine. Context so nobody overreacts to the lost week: trained lifters hold maximal strength through two weeks off (Hwang 2017), VO2max only drops ~7% after 10 days (Coyle 1984), and the high easy-run HR in the first week back is plasma volume (−5% in two weeks), which refills within about a week of normal training.
- **Lift rotation:** alternate **Big-4 blocks** (Back Squat / Bench / Deadlift / OHP) with **Variation blocks** (same movement patterns, different lifts). Every return to a Big-4 block starts with a light re-calibration week, then pushes past the previous block's bests.
- **Week 1 of any new-lift block = calibration**: ramp to a top set at ~2 RIR, log it, progress from there in weeks 2–3.
- **Weekly frame is fixed:** Mon lower · Tue quality run · Wed upper · Thu easy run · Fri full body · **Sat calisthenics** · **Sun yoga + light jog** (+ short finishing jogs after lifts). One scheduled change ahead, below.
  - **From Block 4 (Sep 21): Saturday = long run first, calisthenics condensed behind it.** Decided 2026-07-28. Same movements, shorter — cut to the anchors, drop the accessory padding. Sunday is unchanged.
- **Block focus rotation — the anti-burnout mechanism.** Only ONE quality is pushed per block; the other holds. This maps onto the lift rotation already in place:
  - **Big-4 blocks = STRENGTH-led** → mileage holds flat, lifts push for PRs.
  - **Variation blocks = ENDURANCE-led** → mileage builds 10–15%, lifts are technique/variation work at submaximal loads (which is what a variation block already is).
  - Net effect: running volume only rises every *other* block, so the real build rate is ~half of what a within-block ramp implies. That is deliberate. Never push mileage and lift PRs in the same block.
- **Standing design rules still apply** (runs are always run modules; per-set ramp targets; unspotted bench → 1–2 RIR, never grind; max one to-failure day, Fri pull-ups stay submax; post-lift jog HR runs hot — cue effort, not number).
- **Lift-day density floor (Brendan, 2026-08-22).** Every lift day carries: **at least 4 distinct exercises** (main lift + accessories; a benchmark set and its back-off sets count as one), **one superset of 2–3 exercises** (`superset:[...]` item, e.g. Lateral Raise + Face Pull, Pushdown + Curl), and **at least 6 core sets across 2–3 different core movements**, written as a `station:true` circuit under `coreStart`. Three exercises plus one core movement is too little. **Rotate the core movements** through the pool below week to week within a block (don't repeat the same 2–3 every day); keep it spine-friendly on deadlift days (side plank, hollow hold, dead bug over loaded flexion).

## Block calendar

| Block | Dates | Focus | Main lifts | Running | Status |
|---|---|---|---|---|---|
| **1 — Big 4** | Jun 15 – Jul 12 | Strength | Back Squat, Bench, Deadlift, OHP | 10 → 14 mi, deload ~11.5 | ✅ Done. Bests: Squat 200×5, Bench 190, DL 275, OHP ~115 strict, RDL 205 |
| **2 — Variation A** | Jul 13 – Aug 9 | Endurance | Front Squat, Incline Barbell Bench, Paused Deadlift, Push Press | 14 → 17 → 20 mi, deload ~14 | ✅ Done. Bests: Front Squat 145, Incline 155, Push Press 145, Paused DL 225, pull-up benchmark 18, first 20+ mi week |
| *Bridge 1* | *Aug 10 – 16* | *Re-regulation* | *Road trip Aug 8–11 (unlogged), then moderate re-entry lifts Wed/Fri* | *~13 easy mi; short Sat/Sun (Maine cabin)* | ✅ Done |
| **3 — Big 4 retest** | **Aug 17 – Sep 20** (4 build + deload) | **Strength** | Back Squat, Bench, Deadlift, OHP — beat Block-1 bests | **~20 flat, 25 in wk 4, deload 20** | ✅ Done. Block bests: Squat 215×5 (3+2) and 225×3 in the deload, RDL 235×8, Bench 195×3, OHP 125×5 strict (wk 3), DL 300×4, pull-ups 19 fresh. Every Block-1 best beaten. **5K TT Sep 15: 21:44** (3.14 mi, 184 avg; illness onset that day, sub-21:00 gate not met, retest in the Block 4 deload week Oct 19–25). Deload week cut short by illness Thu–Sun. |
| *Bridge 2* | *Sep 21 – 27* | *Return from illness* | *Big 4 held, 70–85% of tops, 4+ RIR, no failure sets* | *17 easy mi, no quality touch* | ▶ Current |
| **4 — Variation B** | **Sep 28 – Oct 25** | **Endurance** | Box or Pause Squat, **flat Bench stays (225 track)**, Trap-Bar or Deficit Deadlift, Seated DB OHP | **22 → 25 → 27, deload ~19. Sat long run debuts** | Planned |
| **5 — Big 4** | Oct 26 – Nov 22 | Strength | Back Squat, Bench, Deadlift, OHP — beat Block-3 bests | Hold ~27, deload ~19 | Planned |
| **6 — Variation C** | Nov 23 – Dec 20 | Endurance | TBD from the pools | 28 → 30 → 31, deload ~22 | Planned |
| **7 — Big 4** | Dec 21 – Jan 17 | Strength | Big 4 retest | Hold ~31, deload ~22 | Planned |
| **8 — Variation D** | Jan 18 – Feb 14 | Endurance | TBD | 31 → 33 → 35, deload ~25 | Planned |
| 9+ | Feb 15, 2027 → | Alternating | Keep alternating Big-4 / Variation; retest each Big-4 block | **Hold 30–35 indefinitely** (see Endurance goal) | — |

## Accessory rotation pools (pick per block, don't repeat two blocks running)

- **Hinge/glute:** RDL · Hip Thrust · Back Extension · Good Morning (light)
- **Single-leg:** Walking Lunge · Bulgarian Split Squat · Reverse Lunge · Step-up
- **Horizontal pull:** Barbell Row · Chest-Supported/T-Bar Row · Seated Cable Row
- **Vertical pull:** Lat Pulldown (wide/neutral) · Pull-up variations
- **Press accessory:** Incline DB · Flat DB · Dips (weighted later)
- **Shoulders/arms:** Lateral Raise + Face Pull · Pushdown + Curl supersets
- **Core (2–3 new per block; ≥6 sets per lift day across 2–3 movements, rotated within the week):** Plank · Side Plank · Ab Wheel · Hollow Hold · Hanging Leg Raise · Bird Dog · Dead Bug · Pallof · Woodchopper · Suitcase Carry

## Running rules

- **Build only in endurance-led (Variation) blocks** — ~10–15%/wk within the block, deload week −30%. **Strength-led (Big-4) blocks hold mileage flat.** See Block focus rotation.
- **One quality run per week (Tue)** — intervals/threshold, Z4 on efforts. Everything else strict Z2 (≤150), including the long-ish Thu run as it grows. **From Block 4 (Sep), Tue skews threshold** — see Endurance goal.
- **Intensity distribution is counted over aerobic minutes only (runs + rides) — lifting is in neither bucket** (Brendan, 2026-08-24). HR drifting through Z2 between sets is not continuous aerobic work; it neither builds base nor counts as intensity, so keep it out of the 80/20 ledger entirely. **While weekly running is below ~20 mi, run ~70/30 with TWO quality touches** — the Tue quality run plus one low-interference second touch (tempo blocks inside a ride, or a steady Z3 progression finish on an easy run; never a second Z4 run day). Strides (6×20s) on the Sunday jog are free and don't count as a touch. Converge back to 80/20 as volume rebuilds in the endurance blocks. Context: Aug 2026 the hard share had collapsed to ~7% of aerobic minutes and aerobic fitness slid noticeably — the failure mode at low volume is too little intensity, not too little Z2.
- If acute:chronic > ~1.4 or a joint/back issue flares, hold mileage flat a week rather than deloading lifts early.
- Block 1 context: rebuilt from a ~30 mi/wk burnout (mid-Jun). The ramp is deliberately faster than beginner rules because the aerobic base is recent — but the deloads are non-negotiable.

## Endurance goal — standing sub-90 half capability (set 2026-07-28)

**The goal is a capability, not a race.** Be in shape to run a sub-90 half *on any given weekend, untapered*. No race on the calendar, no peak, no taper, no race-weight sharpening. This is the version of the goal that coexists with the physique — a 12-week race build would force lifting down to maintenance; a standing capability never does.

- **Sub-90 = 6:52/mi for 13.1.** Untapered, that means carrying fitness worth roughly an **87–88 min** half (≈6:40–6:44/mi) so there's a buffer with no peak.
- **Equivalent benchmarks:** ~**19:30 5K** / ~**40:45 10K**. The 5K is the working test — cheap, repeatable, no travel.
- **Standing state to hold:** **30–35 mi/wk**, one weekly **10–12 mi long run**, one threshold day, everything else strict Z2. Below ~28 mi/wk the capability decays.
- **Realistic timeline: reaching the 30–35 mi/wk standing state ~early Feb 2027; sub-90 capability likely mid-to-late 2027.** Deliberately unhurried — see below. There is no race and no deadline, so **sustainability outranks the timeline every time.**

### Ramp — build only in endurance-led blocks

Mileage rises in Variation blocks and **holds flat in Big-4 blocks**. That halves the effective build rate versus a continuous ramp, which is the point.

| Block | Window | Mileage | Notes |
|---|---|---|---|
| 3 (strength) | Aug 17 – Sep 20 | **~20 flat, 25 in wk 4** | Held 20–22 for three weeks; wk 4 (Sep 7) steps to 25 per Brendan's call. **5K TT in the deload week (w/o Sep 14), deload ~17 mi.** |
| *Bridge 2* | *Sep 21 – 27* | *17, all easy* | *Return from illness, no quality touch, long run rehearsal at 4 mi* |
| 4 (endurance) | Sep 28 – Oct 25 | 22 → 25 → 27, deload ~19 | **Sat long run debuts (~6–8 mi).** Re-cut from 25 → 26 → 28 on 2026-09-20 to keep acute:chronic under 1.4 off the illness week |
| 5 (strength) | Oct 26 – Nov 22 | Hold ~27 | Lift PRs |
| 6 (endurance) | Nov 23 – Dec 20 | 27 → 30 → 31 | Long run ~9–10 mi |
| 7 (strength) | Dec 21 – Jan 17 | Hold ~31 | Lift PRs |
| 8 (endurance) | Jan 18 – Feb 14 | 31 → 33 → 35 | Long run ~10–12 mi. **Standing state reached** |
| 9+ | Feb 15, 2027 → | Hold 30–35 | Maintain. Re-benchmark quarterly |

- **Long run ≈ 30% of weekly volume.** At 20 mi/wk that's 6 mi, not 10 — it starts modest and grows with the ramp. Don't jump it ahead of the weekly total.
- **5K TT gates:** sub-21:00 → sub-20:15 → sub-19:35. Every ~3 months, same route, same conditions, logged here. **Sep 15, 2026: 21:44** (3.14 mi, 184 avg, Cambridge flat route). Illness started that day, so treat it as a floor; first gate still open, retest in the Block 4 deload week Oct 19–25.
- **Burnout guard — the governing rule.** 30 mi/wk is exactly where he broke in 2024 and again mid-2026. What's different: mileage only rises every other block, deloads every 4th week are non-negotiable, Z2 discipline is enforced (≤150), and he's out of any meaningful deficit before the build starts. **If two consecutive weeks feel like grinding, hold mileage flat for a whole block — don't push through.** Slipping the timeline by a block costs nothing; another crash costs six months. Under-fueled high mileage caused both prior burnouts.

### What this costs

- **Saturday gets tighter.** Long run first, calisthenics condensed behind it. Keep the anchors — the week's one to-failure max pull-up set, the push-up/dip progression — and cut accessory padding, not the anchors.
- **The Saturday pull-up benchmark will read a rep or two low** once the long run passes ~8 mi. That's fine as long as conditions stay consistent (same order, always post-run) so the trend is still comparable. If the number matters more than that, the alternative is moving the to-failure set to Friday and keeping Saturday fully submax — but don't do both.
- **Lower-body strength progression will slow.** Concurrent-training interference is real and it hits squat/deadlift, not bench/OHP. Expect leg lifts to grind at 30+ mi/wk. **That is the cost of the trade, not a program failure** — don't read a stalled squat as a reason to change the lifting plan.
- Upper-body strength and size are largely unaffected. The physique goal survives this.

## Bench 225 track (Brendan, 2026-09-06)

**Goal: a 225 single, unspotted rules.** Set 2026-09-06 off the Block 3 retest: 185×5 held ('feeling too heavy to step up'), which puts the estimated single around 215. 225 is ~5% away, so the track is 4–5 weeks of bench-specific work, not a casual add. Bench goes to **twice a week** (Wed heavy, Fri paused) and flat bench **stays in Block 4** in place of close-grip.

| Week | Wed (heavy) | Fri (second touch) | Gate |
|---|---|---|---|
| Sep 7 (build wk 4) | ramp → **195×3** at 1–2 RIR, back-off 2×5 @170 | Paused bench 3×5 @160 | 195×3 clean → on track |
| Sep 14 (deload) | **185×2 ×3**, crisp, 5+ RIR. Active deload, not zero | Paused 3×3 @150 | Nothing to prove |
| Sep 21 (bridge, illness) | ramp → **185×3 ×2**, 3 RIR | Paused 3×4 @150 | Nothing to prove, this is re-entry |
| Sep 28 (Block 4 wk1) | ramp → **205×2**, back-off 2×4 @180 | Paused 3×5 @165 | 205×2 at ≤2 RIR → attempt can move up a week |
| Oct 5 (wk2) | ramp → **215×1** (1 RIR) then 2×3 @190 | Paused 3×4 @170 | 215 smooth → 225 is a go |
| **Oct 14 (wk3)** | **225 attempt**, fresh, Wednesday, after a normal Tuesday run | Paused 3×5 @160 | Miss → 220 single, retry Oct 21 |

- **Non-negotiable: no attempt above 200 without safety arms/pins at chest height or a spotter.** Roll-of-shame setup checked before set 1 every heavy day.
- OHP holds at 125×5 during the track, it stops climbing so pressing budget goes to bench.
- Fitness-marker context: 225 is 1.18×BW at 190, past the 1.15× (~210) marker on the list.

## Body comp — long-term plan (set 2026-07-28)

**The model: permanent slow recomp. No bulk, no cut, ever.** The deficit that ran Jun–Aug was a one-time correction off 202.9. From Block 3 on, the scale moves ~1 lb/month or less and *muscle* does the visible work. Lifting stays the priority stimulus in every phase.

**The arbiter is the waist, not the scale.** Target the number the tape gives, and expect the *goal weight to drift upward over the years* as lean mass accumulates. A 31" waist at 192 lb in 2028 is a better outcome than 183 lb today.

### Phases

| Phase | Dates | Deficit | Expected weight | Purpose |
|---|---|---|---|---|
| **1 — Glide in** | Jul 28 – Aug 9 (rest of Block 2 + deload) | **400** (down from 700) | 190.4 → **~189.2** | ✅ Done — deficit phase closed with the block. (The 189.9-by-Aug-14 target is retired with it; road-trip scale noise Aug 8–11 doesn't count against anything.) |
| **2 — Maintenance (as written)** | Aug 10 – Sep 6 | **0** planned, **600** actually set in the app | 189–191 planned; actual 190.3 on Sep 6 after a 193 creatine/travel bump | The app never got switched to 0, and logging was partial through the move and two travel weekends, so the real deficit is unknown. Retired 2026-09-06. |
| **3 — Slight deficit reset (Brendan, 2026-09-06)** | Sep 7 → ~Nov 1 | **400** | 190.3 → **185.0 by Nov 1** (~0.7 lb/wk) | His call: a 400 deficit held consistently, 'I haven't really lost any weight in a couple weeks but consistency will probably bring that back together.' 400 is the ceiling, not a floor. Judge on the 7-day MA and the waist; a fully logged day or nothing. |
| **4 — Steady state** | ~Nov 2 → onward | **100** | ~185 → ~183, then hold | The permanent setting. Slow enough to be invisible, small enough that it never compromises a PR or a long run |

- **Expect +1 to +2 lb in the first week of Phase 2.** That is glycogen and water from eating more at higher mileage — it is the point, not a failure. Do not react to it. Judge Phase 2 on the *waist* and the *bar*.
- Phase 3 is indefinite. There is no end date and no target weight to "arrive" at — reassess the band once a year.

### Steady-state band

- **Operating band: 182–186 lb**, waist 31–32" measured. (Revised down 2 lb from 184–188 once the sub-90 goal was added — see below.) Brendan's gut sense of 180–185 was close; treat **180 as a hard floor**, not a goal.
- **Hard stop:** if the 7-day MA goes below **180**, eat at maintenance until it comes back. Below that at 5'11" with this training load, the cost is lean mass — and lean mass is what runs the half.
- **The endurance goal barely moves the weight, and that's the point.** 190 → 182 is worth ~13 sec/mi, about **2.8 min** over a half. Real, but it's the last 3 minutes, not the first 15 — the other ~90% of sub-90 is aerobic development, not scale weight. **Never diet harder in service of the running goal.** Under-fueling is what caused both prior running burnouts.
- **Watch for unintentional overshoot.** At 30–35 mi/wk the maintenance number climbs several hundred kcal, and the SMART goal can lag a step behind a rising mileage week. **If the 7-day MA drops faster than ~1 lb/month, drop the deficit to 0** — the mileage is already doing the work. Never widen the deficit to speed this up.
- **Standing constraint (Brendan, 2026-07-28): no meaningful deficit while run volume is building.** The 400 reset (2026-09-06) is a deliberate exception he chose while running 25 and building bench. The tripwires that drop it to 0 immediately: easy-run HR drifting up at the same pace, a top set regressing two weeks running, or the 7-day MA falling faster than ~1 lb/2 wk. Never widen it.
- **"Great fitness all around" markers** (the real goal — these define the physique, the weight just follows):
  - Squat 1.5× BW (~275) · Bench 1.15× (~210) · Deadlift 2× (~365) · strict OHP 0.65× (~120) · 8–10 strict pull-ups
  - 30–35 mi/week sustained, easy pace comfortably in Z2, **sub-90 half capability standing** (see Endurance goal)
- **When weight and waist disagree, the waist wins.** Weight up + waist flat/down = muscle. Weight flat + waist down = recomp working exactly as designed; this is the expected steady-state reading, and it means *do nothing*.

### Measurement protocol

- **Waist weekly** — Sunday AM, fasted, tape at the navel, level all the way around, relaxed exhale, no sucking in. **Pant size is not waist size** (usually 1–2" optimistic); the 33" estimate needs a tape to confirm. Log alongside weight.
- **Weight daily**, fasted; only the **7-day MA** counts.
- **One DEXA scan** as an absolute anchor (~$50–150), then repeat every 6–12 months. Everything between anchors is tape + scale + mirror. Skip smart-scale BIA numbers as absolutes — trend only, and only same-time-same-conditions.
- **Photos monthly**, same spot, same light.
- **Lift bests per block** — logged in this file's block calendar.

### Guardrails (any one → 4 weeks at maintenance)

- 7-day MA dropping faster than **1.5 lb/month** for two months running.
- Top sets stalling or regressing two weeks in a row at stable bodyweight.
- Weight dropping while the waist holds — that's lean mass leaving.
- Sleep, mood, or libido tanking; easy-run HR drifting up at the same pace.

### Calibration note

The SMART goal is accurate: at deficit 700, actual loss 7/3 → 7/28 was **1.37 lb/wk** vs 1.40 predicted. Trust the deficit dial. (Jun 15 → Jul 28 averaged 2.0 lb/wk, but the first weeks carried water.)

## Watch items carried into Block 2

- **Lower back:** cracked it 7/6 dropping too fast into a squat; lingered through 7/9. Extra hinge warm-up, controlled eccentrics, paused DL capped at 205 if it talks.
- OHP strict form broke down at 125 (became push press) — that's why Push Press is programmed deliberately this block; strict OHP retests in Block 3.
- HRV/sleep/resting-HR still not feeding from Apple Health.
