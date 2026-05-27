<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

// ── Clouds ────────────────────────────────────────────
const clouds = [
  { id: 1, top:  7, scaleX: 1.4, speed: '50s', delay:   '0s', opacity: 0.92 },
  { id: 2, top: 14, scaleX: 0.8, speed: '70s', delay: '-22s',  opacity: 0.75 },
  { id: 3, top:  4, scaleX: 1.8, speed: '90s', delay: '-40s',  opacity: 0.80 },
  { id: 4, top: 20, scaleX: 0.6, speed: '55s', delay: '-12s',  opacity: 0.65 },
  { id: 5, top:  9, scaleX: 1.1, speed: '75s', delay: '-55s',  opacity: 0.85 },
  { id: 6, top: 17, scaleX: 0.9, speed: '65s', delay: '-30s',  opacity: 0.70 },
]

// ── Wind Seeds (dandelion-like particles) ─────────────
const seeds = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  x:        5 + Math.random() * 85,
  y:       15 + Math.random() * 55,
  size:    1.5 + Math.random() * 3,
  driftX:  `${50 + Math.random() * 100}px`,
  driftY:  `${-60 - Math.random() * 100}px`,
  duration:`${10 + Math.random() * 14}s`,
  delay:   `${Math.random() * 18}s`,
  opacity:  0.45 + Math.random() * 0.45,
}))
</script>

<template>
  <div class="hyrule-plains">

    <!-- ══ Sky ══ -->
    <div class="sky" />

    <!-- ══ Sun ══ -->
    <div class="sun-wrap">
      <div class="sun-halo" />
      <div class="sun-core" />
    </div>

    <!-- ══ Clouds ══ -->
    <div
      v-for="c in clouds"
      :key="c.id"
      class="cloud-track"
      :style="{
        top: c.top + '%',
        '--cloud-scale': c.scaleX,
        animationDuration: c.speed,
        animationDelay: c.delay,
        opacity: c.opacity,
      }"
    >
      <!-- Fluffy cloud SVG -->
      <svg class="cloud-svg" viewBox="0 0 280 90" xmlns="http://www.w3.org/2000/svg">
        <path d="M25,72 Q18,50 40,46 Q44,26 68,22 Q80,6 104,14 Q120,2 144,12 Q162,4 184,20 Q206,12 222,32 Q248,28 258,50 Q272,56 268,70 Z"
              fill="white"/>
      </svg>
    </div>

    <!-- ══ Wind Seeds ══ -->
    <div
      v-for="s in seeds"
      :key="s.id"
      class="wind-seed"
      :style="{
        left: s.x + '%',
        top:  s.y + '%',
        width:  s.size + 'px',
        height: s.size + 'px',
        '--drift-x': s.driftX,
        '--drift-y': s.driftY,
        '--seed-opacity': s.opacity,
        animationDuration: s.duration,
        animationDelay: s.delay,
      }"
    />

    <!-- ══ Distant Hill Layer ══ -->
    <div class="hills hills-far">
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,220 L0,145
                 Q90,85  180,115
                 Q270,60  360,95
                 Q450,45  540,80
                 Q630,35  720,70
                 Q810,40  900,75
                 Q990,50  1080,85
                 Q1170,55  1260,88
                 Q1350,65  1440,95
                 L1440,220 Z"
              fill="#5da038" opacity="0.55"/>
      </svg>
    </div>

    <!-- ══ Mid Hill Layer ══ -->
    <div class="hills hills-mid">
      <svg viewBox="0 0 1440 200" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,200 L0,155
                 Q72,108  144,132
                 Q216,95  288,120
                 Q360,90  432,112
                 Q504,85  576,110
                 Q648,88  720,115
                 Q792,92  864,118
                 Q936,95  1008,120
                 Q1080,98  1152,125
                 Q1296,100  1440,128
                 L1440,200 Z"
              fill="#4d8832" opacity="0.75"/>
      </svg>
    </div>

    <!-- ══ Near Hill Layer ══ -->
    <div class="hills hills-near">
      <svg viewBox="0 0 1440 180" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,180 L0,158
                 Q60,135  120,148
                 Q180,130  240,144
                 Q300,128  360,140
                 Q420,128  480,140
                 Q540,130  600,142
                 Q660,132  720,143
                 Q780,134  840,145
                 Q900,135  960,148
                 Q1020,136  1080,148
                 Q1200,135  1320,148
                 Q1380,138  1440,150
                 L1440,180 Z"
              fill="#3d6e2a"/>
    </svg>
    </div>

    <!-- ══ Ground ══ -->
    <div class="ground" />

    <!-- ══ Foreground Grass Blades ══ -->
    <div class="grass-row">
      <svg class="grass-svg" viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Repeating grass blades using groups -->
        <g fill="#2e5620" opacity="0.9">
          <ellipse class="blade b1" cx="30"   cy="75" rx="3" ry="28" transform="rotate(-12 30 75)"/>
          <ellipse class="blade b2" cx="55"   cy="78" rx="2" ry="22" transform="rotate(8 55 78)"/>
          <ellipse class="blade b3" cx="80"   cy="74" rx="3" ry="30" transform="rotate(-6 80 74)"/>
          <ellipse class="blade b1" cx="110"  cy="76" rx="2" ry="24" transform="rotate(10 110 76)"/>
          <ellipse class="blade b2" cx="140"  cy="75" rx="3" ry="26" transform="rotate(-8 140 75)"/>
          <ellipse class="blade b3" cx="168"  cy="77" rx="2" ry="20" transform="rotate(5 168 77)"/>
          <ellipse class="blade b1" cx="200"  cy="74" rx="3" ry="28" transform="rotate(-14 200 74)"/>
          <ellipse class="blade b2" cx="230"  cy="76" rx="2" ry="22" transform="rotate(7 230 76)"/>
          <ellipse class="blade b3" cx="258"  cy="75" rx="3" ry="25" transform="rotate(-5 258 75)"/>
          <ellipse class="blade b1" cx="290"  cy="77" rx="2" ry="21" transform="rotate(11 290 77)"/>
          <ellipse class="blade b2" cx="320"  cy="74" rx="3" ry="29" transform="rotate(-9 320 74)"/>
          <ellipse class="blade b3" cx="350"  cy="76" rx="2" ry="23" transform="rotate(6 350 76)"/>
          <ellipse class="blade b1" cx="380"  cy="75" rx="3" ry="27" transform="rotate(-12 380 75)"/>
          <ellipse class="blade b2" cx="410"  cy="77" rx="2" ry="20" transform="rotate(8 410 77)"/>
          <ellipse class="blade b3" cx="440"  cy="74" rx="3" ry="30" transform="rotate(-7 440 74)"/>
          <ellipse class="blade b1" cx="470"  cy="76" rx="2" ry="24" transform="rotate(10 470 76)"/>
          <ellipse class="blade b2" cx="500"  cy="75" rx="3" ry="26" transform="rotate(-6 500 75)"/>
          <ellipse class="blade b3" cx="530"  cy="77" rx="2" ry="21" transform="rotate(9 530 77)"/>
          <ellipse class="blade b1" cx="560"  cy="74" rx="3" ry="28" transform="rotate(-11 560 74)"/>
          <ellipse class="blade b2" cx="592"  cy="76" rx="2" ry="23" transform="rotate(7 592 76)"/>
          <ellipse class="blade b3" cx="622"  cy="75" rx="3" ry="25" transform="rotate(-5 622 75)"/>
          <ellipse class="blade b1" cx="654"  cy="77" rx="2" ry="22" transform="rotate(12 654 77)"/>
          <ellipse class="blade b2" cx="685"  cy="74" rx="3" ry="29" transform="rotate(-8 685 74)"/>
          <ellipse class="blade b3" cx="716"  cy="76" rx="2" ry="20" transform="rotate(6 716 76)"/>
          <ellipse class="blade b1" cx="748"  cy="75" rx="3" ry="27" transform="rotate(-13 748 75)"/>
          <ellipse class="blade b2" cx="779"  cy="77" rx="2" ry="21" transform="rotate(9 779 77)"/>
          <ellipse class="blade b3" cx="810"  cy="74" rx="3" ry="30" transform="rotate(-7 810 74)"/>
          <ellipse class="blade b1" cx="840"  cy="76" rx="2" ry="24" transform="rotate(11 840 76)"/>
          <ellipse class="blade b2" cx="872"  cy="75" rx="3" ry="26" transform="rotate(-6 872 75)"/>
          <ellipse class="blade b3" cx="904"  cy="77" rx="2" ry="22" transform="rotate(8 904 77)"/>
          <ellipse class="blade b1" cx="935"  cy="74" rx="3" ry="28" transform="rotate(-10 935 74)"/>
          <ellipse class="blade b2" cx="966"  cy="76" rx="2" ry="23" transform="rotate(7 966 76)"/>
          <ellipse class="blade b3" cx="998"  cy="75" rx="3" ry="25" transform="rotate(-5 998 75)"/>
          <ellipse class="blade b1" cx="1028" cy="77" rx="2" ry="21" transform="rotate(12 1028 77)"/>
          <ellipse class="blade b2" cx="1060" cy="74" rx="3" ry="29" transform="rotate(-9 1060 74)"/>
          <ellipse class="blade b3" cx="1091" cy="76" rx="2" ry="20" transform="rotate(6 1091 76)"/>
          <ellipse class="blade b1" cx="1122" cy="75" rx="3" ry="27" transform="rotate(-12 1122 75)"/>
          <ellipse class="blade b2" cx="1154" cy="77" rx="2" ry="22" transform="rotate(9 1154 77)"/>
          <ellipse class="blade b3" cx="1185" cy="74" rx="3" ry="30" transform="rotate(-7 1185 74)"/>
          <ellipse class="blade b1" cx="1216" cy="76" rx="2" ry="24" transform="rotate(11 1216 76)"/>
          <ellipse class="blade b2" cx="1248" cy="75" rx="3" ry="26" transform="rotate(-6 1248 75)"/>
          <ellipse class="blade b3" cx="1279" cy="77" rx="2" ry="21" transform="rotate(8 1279 77)"/>
          <ellipse class="blade b1" cx="1311" cy="74" rx="3" ry="28" transform="rotate(-11 1311 74)"/>
          <ellipse class="blade b2" cx="1342" cy="76" rx="2" ry="23" transform="rotate(7 1342 76)"/>
          <ellipse class="blade b3" cx="1374" cy="75" rx="3" ry="25" transform="rotate(-5 1374 75)"/>
          <ellipse class="blade b1" cx="1410" cy="77" rx="2" ry="22" transform="rotate(10 1410 77)"/>
        </g>
      </svg>
    </div>

    <!-- ══ Main Content ══ -->
    <div class="content-wrap">

      <header class="plains-header">

        <!-- Sun + Triforce emblem -->
        <div class="header-emblem">
          <svg class="emblem-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <!-- Sun rays -->
            <g stroke="#c9a227" stroke-width="2" stroke-linecap="round" opacity="0.7">
              <line x1="50" y1="5"  x2="50" y2="16"/>
              <line x1="50" y1="84" x2="50" y2="95"/>
              <line x1="5"  y1="50" x2="16" y2="50"/>
              <line x1="84" y1="50" x2="95" y2="50"/>
              <line x1="18" y1="18" x2="26" y2="26"/>
              <line x1="74" y1="18" x2="66" y2="26"/>
              <line x1="18" y1="82" x2="26" y2="74"/>
              <line x1="74" y1="82" x2="66" y2="74"/>
            </g>
            <!-- Sun circle -->
            <circle cx="50" cy="50" r="26"
                    fill="rgba(255,240,100,0.15)"
                    stroke="#c9a227" stroke-width="2"/>
            <!-- Triforce inside -->
            <polygon points="50,27  60,44  40,44"  fill="#c9a227"/>
            <polygon points="35,57  45,40  55,57"  fill="#c9a227" opacity="0.5"/>
            <polygon points="45,57  55,40  65,57"  fill="#c9a227"/>
          </svg>
        </div>

        <!-- Site name -->
        <HelloWorld msg="cuteHsu" />

        <!-- Wind-style decorative line -->
        <div class="wind-line">
          <span class="wl-seg" />
          <span class="wl-leaf">❧</span>
          <span class="wl-text">— 自由冒險者的據點 —</span>
          <span class="wl-leaf">❧</span>
          <span class="wl-seg" />
        </div>

      </header>

      <main class="plains-main">
        <TheWelcome />
      </main>

    </div>
  </div>
</template>

<style scoped>
/* ── World ── */
.hyrule-plains {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ── Sky ── */
.sky {
  position: fixed;
  inset: 0;
  background: linear-gradient(
    180deg,
    #1a5fa8  0%,
    #3a8fcc 22%,
    #62b0e0 45%,
    #9ad0ee 65%,
    #c4e6f5 80%,
    #d8eed8 92%,
    #a0c880 100%
  );
  z-index: 0;
}

/* ── Sun ── */
.sun-wrap {
  position: fixed;
  top: 6%;
  right: 12%;
  z-index: 1;
  pointer-events: none;
}
.sun-halo {
  position: absolute;
  inset: -40px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255,230,80,0.35) 0%, transparent 70%);
  animation: sun-breathe 6s ease-in-out infinite;
}
.sun-core {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: radial-gradient(circle at 40% 35%, #fff9c4 0%, #ffe566 55%, #ffc820 100%);
  box-shadow: 0 0 30px rgba(255,210,60,0.7), 0 0 60px rgba(255,200,40,0.3);
  animation: sun-breathe 6s ease-in-out infinite;
}

/* ── Clouds ── */
.cloud-track {
  position: fixed;
  left: 0;
  z-index: 2;
  pointer-events: none;
  animation: cloud-drift linear infinite;
  transform-origin: left center;
}
.cloud-svg {
  width: 280px;
  height: 90px;
  filter: drop-shadow(0 4px 12px rgba(120,180,220,0.25));
}

/* ── Wind Seeds ── */
.wind-seed {
  position: fixed;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 4px rgba(255,255,255,0.8), 0 0 8px rgba(200,240,255,0.5);
  animation: seed-float ease-in-out infinite;
  z-index: 3;
  pointer-events: none;
}

/* ── Hills ── */
.hills {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}
.hills-far  { height: 220px; z-index: 4; }
.hills-mid  { height: 200px; z-index: 5; }
.hills-near { height: 180px; z-index: 6; }
.hills svg  { width: 100%; height: 100%; }

/* ── Ground ── */
.ground {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 75px;
  background: linear-gradient(180deg, #3d6e2a 0%, #2a5020 100%);
  z-index: 7;
}

/* ── Grass Blades ── */
.grass-row {
  position: fixed;
  bottom: 62px;
  left: 0;
  right: 0;
  height: 80px;
  z-index: 8;
  pointer-events: none;
  overflow: hidden;
}
.grass-svg { width: 100%; height: 100%; }

/* Grass sway animations */
.blade.b1 { animation: grass-sway   2.8s ease-in-out infinite; transform-origin: bottom center; }
.blade.b2 { animation: grass-sway-2 3.4s ease-in-out infinite; transform-origin: bottom center; }
.blade.b3 { animation: grass-sway   3.1s ease-in-out infinite 0.5s; transform-origin: bottom center; }

/* ── Content ── */
.content-wrap {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 160px; /* space for ground */
}

/* ── Header ── */
.plains-header {
  width: 100%;
  max-width: 860px;
  padding: 3rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
}

/* ── Emblem ── */
.header-emblem {
  margin-bottom: 0.2rem;
  animation: triforce-shimmer 5s ease-in-out infinite;
}
.emblem-svg {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 10px rgba(201,162,39,0.5));
}

/* ── Wind Decorative Line ── */
.wind-line {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.3rem;
  color: var(--grass-far);
}
.wl-seg {
  display: block;
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--grass-mid));
}
.wl-seg:last-child {
  background: linear-gradient(90deg, var(--grass-mid), transparent);
}
.wl-leaf {
  color: var(--grass-mid);
  font-size: 0.85rem;
  animation: rustle 4s ease-in-out infinite;
}
.wl-text {
  font-family: 'Cinzel', serif;
  font-size: 0.62rem;
  letter-spacing: 0.25em;
  color: var(--ink-soft);
  white-space: nowrap;
}

/* ── Main ── */
.plains-main {
  width: 100%;
  max-width: 860px;
  padding: 0 2rem 2rem;
}

/* ── Responsive ── */
@media (max-width: 600px) {
  .plains-header { padding: 2rem 1rem 1rem; }
  .emblem-svg { width: 60px; height: 60px; }
  .wl-text { display: none; }
  .wl-seg  { width: 20px; }
}
</style>
