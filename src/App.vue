<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'

// Clouds — very soft, barely-there (matching BotW's hazy sky)
const clouds = [
  { id: 1, top:  5, w: 340, speed: '70s',  delay:   '0s', opacity: 0.55 },
  { id: 2, top: 11, w: 240, speed: '95s',  delay: '-30s',  opacity: 0.40 },
  { id: 3, top:  3, w: 420, speed: '120s', delay: '-55s',  opacity: 0.45 },
  { id: 4, top: 18, w: 200, speed: '80s',  delay: '-15s',  opacity: 0.35 },
  { id: 5, top:  8, w: 300, speed: '105s', delay: '-70s',  opacity: 0.50 },
]

// Wind seeds — lighter, more sparse
const seeds = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  x:       10 + Math.random() * 75,
  y:       30 + Math.random() * 45,
  size:    1.5 + Math.random() * 2.5,
  driftX:  `${60 + Math.random() * 90}px`,
  driftY:  `${-50 - Math.random() * 80}px`,
  duration:`${12 + Math.random() * 16}s`,
  delay:   `${Math.random() * 20}s`,
  opacity:  0.5 + Math.random() * 0.4,
}))
</script>

<template>
  <div class="hyrule-coast">

    <!-- ══ Sky — very pale, washed out ══ -->
    <div class="sky" />

    <!-- ══ Sun Haze at horizon ══ -->
    <div class="sun-haze" />
    <div class="sun-orb" />

    <!-- ══ Soft Clouds ══ -->
    <div
      v-for="c in clouds"
      :key="c.id"
      class="cloud-track"
      :style="{
        top: c.top + '%',
        animationDuration: c.speed,
        animationDelay: c.delay,
        opacity: c.opacity,
      }"
    >
      <svg :width="c.w" height="70" viewBox="0 0 340 70" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="blur-cloud">
            <feGaussianBlur stdDeviation="3"/>
          </filter>
        </defs>
        <path d="M20,58 Q16,40 36,38 Q40,22 62,18 Q76,4 98,12 Q114,2 136,10 Q152,2 174,16 Q196,8 214,26 Q238,20 248,40 Q268,36 272,55 Z"
              fill="white" filter="url(#blur-cloud)"/>
      </svg>
    </div>

    <!-- ══ Distant Land (hazy, across the sea) ══ -->
    <div class="distant-land">
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,80 L0,50
                 Q120,28 240,38
                 Q360,20 480,32
                 Q600,16 720,28
                 Q840,14 960,26
                 Q1080,18 1200,30
                 Q1320,22 1440,35
                 L1440,80 Z"
              fill="rgba(90,138,158,0.28)"/>
        <!-- Second, slightly closer ridge -->
        <path d="M0,80 L0,62
                 Q100,48 200,56
                 Q320,42 440,52
                 Q560,40 680,50
                 Q800,42 920,54
                 Q1040,44 1160,55
                 Q1300,46 1440,58
                 L1440,80 Z"
              fill="rgba(80,128,108,0.22)"/>
      </svg>
    </div>

    <!-- ══ Ocean ══ -->
    <div class="ocean-wrap">
      <svg class="ocean-svg" viewBox="0 0 1440 260" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="ocean-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stop-color="#aad8d5" stop-opacity="0.9"/>
            <stop offset="40%"  stop-color="#8ec8c4"/>
            <stop offset="100%" stop-color="#6ab0ac"/>
          </linearGradient>
          <!-- Sun reflection on water -->
          <radialGradient id="sun-reflect" cx="55%" cy="5%" r="50%">
            <stop offset="0%"  stop-color="#fff5c0" stop-opacity="0.6"/>
            <stop offset="60%" stop-color="#aad8d5" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <!-- Ocean body -->
        <rect x="0" y="0" width="1440" height="260" fill="url(#ocean-grad)"/>
        <!-- Sun reflection glitter on water surface -->
        <rect x="0" y="0" width="1440" height="260" fill="url(#sun-reflect)"/>
        <!-- Very subtle wave ripples at top edge -->
        <path class="wave-ripple"
              d="M0,8 Q90,0 180,6 Q270,12 360,5 Q450,-2 540,4 Q630,10 720,3 Q810,-3 900,4 Q990,11 1080,4 Q1170,-2 1260,5 Q1350,12 1440,6"
              fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="1.5"/>
        <path class="wave-ripple"
              d="M0,18 Q120,11 240,17 Q360,23 480,15 Q600,7 720,14 Q840,21 960,14 Q1080,7 1200,15 Q1320,23 1440,17"
              fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="1"/>
      </svg>
    </div>

    <!-- ══ Far Hills (above the ocean) ══ -->
    <div class="hills hills-far">
      <svg viewBox="0 0 1440 160" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,160 L0,110
                 Q100,70  200,92
                 Q300,58  400,80
                 Q500,50  600,72
                 Q700,45  800,68
                 Q900,52  1000,76
                 Q1100,58  1200,82
                 Q1320,65  1440,88
                 L1440,160 Z"
              fill="#5aba1e" opacity="0.6"/>
      </svg>
    </div>

    <!-- ══ Mid Hills ══ -->
    <div class="hills hills-mid">
      <svg viewBox="0 0 1440 150" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,150 L0,118
                 Q70,92  140,108
                 Q210,82  280,100
                 Q350,78  420,96
                 Q490,76  560,94
                 Q630,78  700,96
                 Q770,80  840,100
                 Q910,82  980,100
                 Q1050,80  1120,100
                 Q1190,82  1260,102
                 Q1350,86  1440,106
                 L1440,150 Z"
              fill="#4aa818" opacity="0.82"/>
      </svg>
    </div>

    <!-- ══ Near Hills ══ -->
    <div class="hills hills-near">
      <svg viewBox="0 0 1440 130" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,130 L0,105
                 Q55,88  110,100
                 Q165,82  220,96
                 Q275,82  330,95
                 Q385,80  440,94
                 Q495,82  550,95
                 Q605,82  660,96
                 Q715,83  770,96
                 Q825,83  880,96
                 Q935,83  990,97
                 Q1045,84  1100,98
                 Q1155,84  1210,98
                 Q1320,85  1440,102
                 L1440,130 Z"
              fill="#3a9010"/>
    </svg>
    </div>

    <!-- ══ Ground base ══ -->
    <div class="ground" />

    <!-- ══ Tall Foreground Grass ══ -->
    <div class="grass-foreground">
      <svg class="grass-svg" viewBox="0 0 1440 120" preserveAspectRatio="none"
           xmlns="http://www.w3.org/2000/svg">
        <!-- Bright vivid grass blades — echoing the screenshot's tall foreground grass -->
        <g>
          <!-- Sway group A -->
          <g class="sway-a" fill="#5aba1e">
            <path d="M0,120    C-2,90  2,60   8,30   C10,60  6,90  4,120 Z"/>
            <path d="M18,120   C16,85  22,50  28,15  C30,50 26,85 24,120 Z"/>
            <path d="M36,120   C34,92  38,62  42,28  C44,62 40,92 38,120 Z"/>
            <path d="M58,120   C55,88  62,55  68,20  C70,55 64,88 62,120 Z"/>
            <path d="M80,120   C78,90  82,58  86,22  C88,58 84,90 82,120 Z"/>
            <path d="M105,120  C102,86 108,52 115,18 C117,52 111,86 109,120 Z"/>
            <path d="M130,120  C128,92 132,60 136,26 C138,60 134,92 132,120 Z"/>
            <path d="M158,120  C155,88 162,54 168,20 C170,54 164,88 162,120 Z"/>
            <path d="M185,120  C183,90 187,58 191,24 C193,58 189,90 187,120 Z"/>
            <path d="M215,120  C212,86 218,52 225,18 C227,52 221,86 219,120 Z"/>
            <path d="M245,120  C243,92 247,60 251,26 C253,60 249,92 247,120 Z"/>
            <path d="M278,120  C275,88 282,54 288,20 C290,54 284,88 282,120 Z"/>
            <path d="M310,120  C308,90 312,58 316,24 C318,58 314,90 312,120 Z"/>
            <path d="M345,120  C342,86 348,52 355,18 C357,52 351,86 349,120 Z"/>
            <path d="M380,120  C378,92 382,60 386,26 C388,60 384,92 382,120 Z"/>
            <path d="M418,120  C415,88 422,54 428,20 C430,54 424,88 422,120 Z"/>
            <path d="M455,120  C453,90 457,58 461,24 C463,58 459,90 457,120 Z"/>
            <path d="M495,120  C492,86 498,52 505,18 C507,52 501,86 499,120 Z"/>
            <path d="M535,120  C533,92 537,60 541,26 C543,60 539,92 537,120 Z"/>
            <path d="M578,120  C575,88 582,54 588,20 C590,54 584,88 582,120 Z"/>
            <path d="M620,120  C618,90 622,58 626,24 C628,58 624,90 622,120 Z"/>
            <path d="M665,120  C662,86 668,52 675,18 C677,52 671,86 669,120 Z"/>
            <path d="M710,120  C708,92 712,60 716,26 C718,60 714,92 712,120 Z"/>
            <path d="M758,120  C755,88 762,54 768,20 C770,54 764,88 762,120 Z"/>
            <path d="M805,120  C803,90 807,58 811,24 C813,58 809,90 807,120 Z"/>
            <path d="M855,120  C852,86 858,52 865,18 C867,52 861,86 859,120 Z"/>
            <path d="M905,120  C903,92 907,60 911,26 C913,60 909,92 907,120 Z"/>
            <path d="M958,120  C955,88 962,54 968,20 C970,54 964,88 962,120 Z"/>
            <path d="M1010,120 C1008,90 1012,58 1016,24 C1018,58 1014,90 1012,120 Z"/>
            <path d="M1065,120 C1062,86 1068,52 1075,18 C1077,52 1071,86 1069,120 Z"/>
            <path d="M1120,120 C1118,92 1122,60 1126,26 C1128,60 1124,92 1122,120 Z"/>
            <path d="M1178,120 C1175,88 1182,54 1188,20 C1190,54 1184,88 1182,120 Z"/>
            <path d="M1235,120 C1233,90 1237,58 1241,24 C1243,58 1239,90 1237,120 Z"/>
            <path d="M1295,120 C1292,86 1298,52 1305,18 C1307,52 1301,86 1299,120 Z"/>
            <path d="M1355,120 C1353,92 1357,60 1361,26 C1363,60 1359,92 1357,120 Z"/>
            <path d="M1415,120 C1412,88 1418,54 1424,20 C1426,54 1420,88 1418,120 Z"/>
          </g>
          <!-- Sway group B (offset, darker shade) -->
          <g class="sway-b" fill="#48a010" opacity="0.7">
            <path d="M9,120    C7,88  13,55  18,22  C20,55 16,88 14,120 Z"/>
            <path d="M46,120   C44,90 48,60  52,26  C54,60 50,90 48,120 Z"/>
            <path d="M90,120   C88,86 94,52  100,18 C102,52 96,86 94,120 Z"/>
            <path d="M140,120  C138,92 142,62 146,28 C148,62 144,92 142,120 Z"/>
            <path d="M198,120  C195,88 201,56 207,22 C209,56 203,88 201,120 Z"/>
            <path d="M260,120  C258,90 262,60 266,26 C268,60 264,90 262,120 Z"/>
            <path d="M325,120  C322,86 328,54 334,20 C336,54 330,86 328,120 Z"/>
            <path d="M395,120  C393,92 397,62 401,28 C403,62 399,92 397,120 Z"/>
            <path d="M470,120  C467,88 473,56 479,22 C481,56 475,88 473,120 Z"/>
            <path d="M550,120  C548,90 552,60 556,26 C558,60 554,90 552,120 Z"/>
            <path d="M635,120  C632,86 638,54 644,20 C646,54 640,86 638,120 Z"/>
            <path d="M725,120  C723,92 727,62 731,28 C733,62 729,92 727,120 Z"/>
            <path d="M820,120  C817,88 823,56 829,22 C831,56 825,88 823,120 Z"/>
            <path d="M920,120  C918,90 922,60 926,26 C928,60 924,90 922,120 Z"/>
            <path d="M1025,120 C1022,86 1028,54 1034,20 C1036,54 1030,86 1028,120 Z"/>
            <path d="M1135,120 C1133,92 1137,62 1141,28 C1143,62 1139,92 1137,120 Z"/>
            <path d="M1250,120 C1247,88 1253,56 1259,22 C1261,56 1255,88 1253,120 Z"/>
            <path d="M1370,120 C1368,90 1372,60 1376,26 C1378,60 1374,90 1372,120 Z"/>
          </g>
          <!-- Brightest tips highlight -->
          <g class="sway-a" fill="#88d855" opacity="0.5">
            <path d="M8,30    L10,50  L12,30  Z"/>
            <path d="M28,15   L30,40  L32,15  Z"/>
            <path d="M68,20   L70,42  L72,20  Z"/>
            <path d="M115,18  L117,42 L119,18 Z"/>
            <path d="M168,20  L170,44 L172,20 Z"/>
            <path d="M225,18  L227,42 L229,18 Z"/>
            <path d="M288,20  L290,44 L292,20 Z"/>
            <path d="M355,18  L357,42 L359,18 Z"/>
            <path d="M428,20  L430,44 L432,20 Z"/>
            <path d="M505,18  L507,42 L509,18 Z"/>
            <path d="M588,20  L590,44 L592,20 Z"/>
            <path d="M675,18  L677,42 L679,18 Z"/>
            <path d="M768,20  L770,44 L772,20 Z"/>
            <path d="M865,18  L867,42 L869,18 Z"/>
            <path d="M968,20  L970,44 L972,20 Z"/>
            <path d="M1075,18 L1077,42 L1079,18 Z"/>
            <path d="M1188,20 L1190,44 L1192,20 Z"/>
            <path d="M1305,18 L1307,42 L1309,18 Z"/>
            <path d="M1424,20 L1426,44 L1428,20 Z"/>
          </g>
        </g>
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

    <!-- ══ Content ══ -->
    <div class="content-wrap">

      <header class="coast-header">
        <div class="header-emblem">
          <svg class="emblem-svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <g stroke="#c9a227" stroke-width="1.8" stroke-linecap="round" opacity="0.65">
              <line x1="50" y1="4"  x2="50" y2="16"/>
              <line x1="50" y1="84" x2="50" y2="96"/>
              <line x1="4"  y1="50" x2="16" y2="50"/>
              <line x1="84" y1="50" x2="96" y2="50"/>
              <line x1="16" y1="16" x2="25" y2="25"/>
              <line x1="75" y1="16" x2="66" y2="25"/>
              <line x1="16" y1="84" x2="25" y2="75"/>
              <line x1="75" y1="84" x2="66" y2="75"/>
            </g>
            <circle cx="50" cy="50" r="24"
                    fill="rgba(255,240,120,0.12)"
                    stroke="#c9a227" stroke-width="1.5"/>
            <polygon points="50,28  60,45  40,45"  fill="#c9a227"/>
            <polygon points="36,58  46,41  56,58"  fill="#c9a227" opacity="0.45"/>
            <polygon points="44,58  54,41  64,58"  fill="#c9a227"/>
          </svg>
        </div>

        <HelloWorld msg="cuteHsu" />

        <div class="wind-deco">
          <span class="wd-line" />
          <span class="wd-leaf">❧</span>
          <span class="wd-text">— 自由冒險者的據點 —</span>
          <span class="wd-leaf">❧</span>
          <span class="wd-line right" />
        </div>
      </header>

      <main class="coast-main">
        <TheWelcome />
      </main>
    </div>

  </div>
</template>

<style scoped>
/* ── World ── */
.hyrule-coast {
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
    #a8cce4  0%,
    #c4e0f0 18%,
    #ddf0f8 36%,
    #eef6f4 52%,
    #f5f2e2 65%,
    #fdf8e0 76%,
    #fefae8 84%,
    #f0f8e8 92%,
    #d8eec8 100%
  );
  z-index: 0;
}

/* ── Sun Haze ── */
.sun-haze {
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translateX(-50%);
  width: 70vw;
  height: 30vh;
  background: radial-gradient(ellipse at 60% 60%,
    rgba(255, 248, 180, 0.65) 0%,
    rgba(255, 240, 140, 0.3)  30%,
    transparent 70%);
  animation: horizon-pulse 8s ease-in-out infinite;
  z-index: 1;
  pointer-events: none;
}
.sun-orb {
  position: fixed;
  top: 34%;
  right: 18%;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: radial-gradient(circle at 42% 38%, #fffce0 0%, #ffe880 55%, #ffd040 100%);
  box-shadow:
    0 0 30px rgba(255,220,60,0.6),
    0 0 80px rgba(255,240,100,0.25);
  animation: sun-breathe 8s ease-in-out infinite;
  z-index: 2;
  pointer-events: none;
}

/* ── Clouds ── */
.cloud-track {
  position: fixed;
  left: 0;
  z-index: 3;
  pointer-events: none;
  animation: cloud-drift linear infinite;
}

/* ── Distant Land ── */
.distant-land {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 80px;
  /* sits just above the ocean top edge */
  bottom: calc(30% + 140px);
  z-index: 4;
  pointer-events: none;
}
.distant-land svg { width: 100%; height: 100%; }

/* ── Ocean ── */
.ocean-wrap {
  position: fixed;
  left: 0;
  right: 0;
  /* Sits between hills and sky — 28% from bottom */
  bottom: 28%;
  height: 22%;
  z-index: 5;
  pointer-events: none;
}
.ocean-svg {
  width: 100%;
  height: 100%;
}
.wave-ripple {
  animation: ocean-shimmer 5s ease-in-out infinite;
}

/* ── Hills ── */
.hills {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
}
.hills-far  { height: 160px; bottom: 22%; z-index: 6; }
.hills-mid  { height: 150px; bottom: 12%; z-index: 7; }
.hills-near { height: 130px; bottom: 6%;  z-index: 8; }
.hills svg  { width: 100%; height: 100%; }

/* ── Ground ── */
.ground {
  /* nothing here — grass handles it */
}

/* ── Foreground Grass ── */
.grass-foreground {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 120px;
  z-index: 9;
  pointer-events: none;
  overflow: hidden;
  background: linear-gradient(180deg, transparent 0%, #2e6e0a 35%, #1e5005 100%);
}
.grass-svg { width: 100%; height: 100%; }

/* Sway animations */
.sway-a { animation: grass-sway   2.6s ease-in-out infinite;     transform-origin: bottom center; }
.sway-b { animation: grass-sway-b 3.2s ease-in-out infinite 0.4s; transform-origin: bottom center; }

/* ── Wind Seeds ── */
.wind-seed {
  position: fixed;
  border-radius: 50%;
  background: rgba(255,255,255,0.9);
  box-shadow: 0 0 5px rgba(255,255,255,0.8);
  animation: seed-float ease-in-out infinite;
  z-index: 10;
  pointer-events: none;
}

/* ── Content ── */
.content-wrap {
  position: relative;
  z-index: 20;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 140px;
}

/* ── Header ── */
.coast-header {
  width: 100%;
  max-width: 860px;
  padding: 2.8rem 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.header-emblem { animation: triforce-shimmer 6s ease-in-out infinite; }
.emblem-svg {
  width: 72px;
  height: 72px;
  filter: drop-shadow(0 2px 8px rgba(180, 140, 30, 0.4));
}

/* ── Wind Deco ── */
.wind-deco {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-top: 0.25rem;
}
.wd-line {
  display: block;
  width: 40px;
  height: 1px;
  background: linear-gradient(90deg, transparent, #5a8830);
}
.wd-line.right {
  background: linear-gradient(90deg, #5a8830, transparent);
}
.wd-leaf {
  color: #5a8830;
  font-size: 0.85rem;
  animation: rustle 4s ease-in-out infinite;
}
.wd-text {
  font-family: 'Cinzel', serif;
  font-size: 0.6rem;
  letter-spacing: 0.28em;
  color: var(--ink-soft);
  white-space: nowrap;
  text-shadow: 0 1px 3px rgba(255,255,255,0.8);
}

/* ── Main ── */
.coast-main {
  width: 100%;
  max-width: 860px;
  padding: 0 2rem 2rem;
}

@media (max-width: 600px) {
  .coast-header { padding: 2rem 1rem 1rem; }
  .emblem-svg   { width: 56px; height: 56px; }
  .wd-text      { display: none; }
  .wd-line      { width: 20px; }
  .sun-orb      { width: 36px; height: 36px; }
}
</style>
