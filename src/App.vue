<script setup lang="ts">
import { ref } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const particles = ref(Array.from({ length: 10 }, (_, i) => ({
  id: i,
  x: 8 + (i * 9.3) % 82,
  y: 20 + (i * 13.7) % 65,
  size: 4 + (i % 3) * 2,
  duration: `${18 + (i * 5.1) % 20}s`,
  delay: `${(i * 3.2) % 18}s`,
  opacity: 0.08 + (i % 4) * 0.022,
  rotate: (i * 53) % 360,
  dx: `${18 + (i * 8) % 38}px`,
  dy: `${-38 - (i * 7) % 48}px`,
})))
</script>

<template>
  <div class="world">

    <!-- ── Base gradient (warm cream → sage, refs 3/4/5 style) ── -->
    <div class="bg-base" />

    <!-- ── Top-right: dark foliage cluster (refs 1/2 style – lush monstera feel) ── -->
    <svg class="foliage-tr" viewBox="0 0 500 560" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Ambient dark depth blob -->
      <ellipse cx="310" cy="150" rx="295" ry="235" fill="#0d1f14" opacity="0.22"/>
      <ellipse cx="420" cy="60"  rx="180" ry="140" fill="#0d1f14" opacity="0.14"/>

      <!-- Leaf A — large dominant, tilted left -->
      <g transform="translate(248,52) rotate(-26)">
        <path d="M0,0 C70,66 78,192 0,316 C-70,192 -63,66 0,0Z" fill="#19371f" opacity="0.93"/>
        <path d="M0,0 L0,316" stroke="#22452a" stroke-width="3" opacity="0.42"/>
        <path d="M0,68  C37,52  67,55  83,72"  stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,124 C41,108 74,111 91,130" stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,185 C39,169 70,172 86,190" stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,245 C35,230 62,233 76,252" stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,68  C-37,52 -67,55 -83,72"  stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,124 C-41,108 -74,111 -91,130" stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
        <path d="M0,185 C-39,169 -70,172 -86,190" stroke="#2a5432" stroke-width="1.5" fill="none" opacity="0.36"/>
      </g>

      <!-- Leaf B — right side, slight rightward tilt -->
      <g transform="translate(408,18) rotate(10)">
        <path d="M0,0 C56,53 63,156 0,258 C-56,156 -50,53 0,0Z" fill="#1e4028" opacity="0.80"/>
        <path d="M0,0 L0,258" stroke="#22452a" stroke-width="2" opacity="0.32"/>
        <path d="M0,66  C33,52  60,55  74,72"  stroke="#2a5432" stroke-width="1.2" fill="none" opacity="0.30"/>
        <path d="M0,128 C36,113 64,116 79,134" stroke="#2a5432" stroke-width="1.2" fill="none" opacity="0.30"/>
        <path d="M0,66  C-33,52 -60,55 -74,72"  stroke="#2a5432" stroke-width="1.2" fill="none" opacity="0.30"/>
        <path d="M0,128 C-36,113 -64,116 -79,134" stroke="#2a5432" stroke-width="1.2" fill="none" opacity="0.30"/>
      </g>

      <!-- Leaf C — upper, sharply rotated (gives the layered foliage feel) -->
      <g transform="translate(145,-8) rotate(-60)">
        <path d="M0,0 C46,44 52,128 0,210 C-46,128 -41,44 0,0Z" fill="#1c3d24" opacity="0.72"/>
        <path d="M0,0 L0,210" stroke="#22452a" stroke-width="1.5" opacity="0.28"/>
      </g>

      <!-- Leaf D — far-right accent -->
      <g transform="translate(488,-15) rotate(-4)">
        <path d="M0,0 C42,40 47,116 0,192 C-42,116 -37,40 0,0Z" fill="#19371f" opacity="0.62"/>
      </g>

      <!-- Leaf E — gap-filler, behind A -->
      <g transform="translate(305,115) rotate(38)">
        <path d="M0,0 C38,36 43,108 0,178 C-38,108 -34,36 0,0Z" fill="#142c1a" opacity="0.58"/>
      </g>

      <!-- Leaf F — small top accent -->
      <g transform="translate(78,122) rotate(-78)">
        <path d="M0,0 C26,24 30,72 0,120 C-26,72 -23,24 0,0Z" fill="#264e30" opacity="0.52"/>
      </g>

      <!-- Subtle light-catch highlight (sunlight on leaves effect) -->
      <ellipse cx="175" cy="22" rx="76" ry="28" fill="#4a8a58" opacity="0.10" transform="rotate(-28,175,22)"/>
      <ellipse cx="360" cy="65" rx="52" ry="20" fill="#5a9a68" opacity="0.07" transform="rotate(12,360,65)"/>
    </svg>

    <!-- ── Bottom-left: lighter sage foliage (balances composition) ── -->
    <svg class="foliage-bl" viewBox="0 0 400 500" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <ellipse cx="90" cy="370" rx="210" ry="168" fill="#3a7048" opacity="0.07"/>

      <g transform="translate(72,360) rotate(20)">
        <path d="M0,0 C60,57 67,168 0,276 C-60,168 -54,57 0,0Z" fill="#4a8a58" opacity="0.26"/>
        <path d="M0,0 L0,276" stroke="#5a9a68" stroke-width="2" opacity="0.18"/>
        <path d="M0,72  C32,58  58,61  72,78"  stroke="#5a9a68" stroke-width="1.2" fill="none" opacity="0.18"/>
        <path d="M0,138 C34,124 62,127 76,145" stroke="#5a9a68" stroke-width="1.2" fill="none" opacity="0.18"/>
        <path d="M0,72  C-32,58 -58,61 -72,78"  stroke="#5a9a68" stroke-width="1.2" fill="none" opacity="0.18"/>
        <path d="M0,138 C-34,124 -62,127 -76,145" stroke="#5a9a68" stroke-width="1.2" fill="none" opacity="0.18"/>
      </g>
      <g transform="translate(195,405) rotate(-16)">
        <path d="M0,0 C50,48 56,142 0,234 C-50,142 -45,48 0,0Z" fill="#5a9a68" opacity="0.18"/>
      </g>
      <g transform="translate(-15,450) rotate(46)">
        <path d="M0,0 C36,34 40,102 0,168 C-36,102 -32,34 0,0Z" fill="#3d7a50" opacity="0.20"/>
      </g>
    </svg>

    <!-- ── Floating leaf particles ── -->
    <div
      v-for="p in particles"
      :key="p.id"
      class="leaf-particle"
      :style="{
        left: p.x + '%',
        top:  p.y + '%',
        width:  p.size + 'px',
        height: p.size * 1.6 + 'px',
        '--dx': p.dx,
        '--dy': p.dy,
        '--op': p.opacity,
        '--r':  p.rotate + 'deg',
        animationDuration: p.duration,
        animationDelay:    p.delay,
      }"
    />

    <!-- ── Content ── -->
    <div class="content">
      <header class="site-header">
        <RouterLink to="/" class="logo-link">
          <svg class="logo-leaf" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M24 4 C12 4 6 16 8 28 C10 40 24 44 24 44 C24 44 38 40 40 28 C42 16 36 4 24 4 Z"
                  fill="#4a8a58" opacity="0.9"/>
            <path d="M24 4 C24 4 30 14 28 26 C27 34 24 44 24 44"
                  stroke="#2d6040" stroke-width="1.5" fill="none" stroke-linecap="round"/>
            <path d="M24 18 C20 16 14 18 12 22" stroke="#2d6040" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.7"/>
            <path d="M24 26 C28 24 34 26 36 30" stroke="#2d6040" stroke-width="1" fill="none" stroke-linecap="round" opacity="0.7"/>
          </svg>
        </RouterLink>
        <HelloWorld msg="cuteHsu" />
        <p class="site-sub">— 自由探索者的綠色基地 —</p>
      </header>

      <RouterView />
    </div>

  </div>
</template>

<style scoped>
.world {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

/* ── Base gradient ── */
.bg-base {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 100% 0%,   rgba(13,31,20,0.18) 0%, transparent 48%),
    radial-gradient(ellipse at 0%   100%, rgba(74,138,88,0.09) 0%, transparent 45%),
    radial-gradient(ellipse at 55%  50%,  rgba(184,216,190,0.10) 0%, transparent 62%),
    linear-gradient(148deg, #edf3eb 0%, #e9efe5 38%, #e3ece0 72%, #dce7d8 100%);
  z-index: 0;
}

/* ── Foliage corners ── */
.foliage-tr {
  position: fixed;
  top: -55px;
  right: -75px;
  width: clamp(300px, 44vw, 560px);
  height: auto;
  z-index: 1;
  pointer-events: none;
}

.foliage-bl {
  position: fixed;
  bottom: -75px;
  left: -55px;
  width: clamp(220px, 30vw, 420px);
  height: auto;
  z-index: 1;
  pointer-events: none;
}

/* ── Floating particles ── */
.leaf-particle {
  position: fixed;
  border-radius: 50% 5% 50% 5%;
  background: rgba(74,138,88,0.16);
  animation: leaf-float ease-in-out infinite;
  z-index: 2;
  pointer-events: none;
}

/* ── Content ── */
.content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 120px;
}

/* ── Header ── */
.site-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 2.8rem 2rem 1.4rem;
}
.logo-link { display: block; line-height: 0; }
.logo-leaf {
  width: 38px;
  height: 38px;
  filter: drop-shadow(0 2px 8px rgba(45,96,64,0.25));
  animation: leaf-sway 6s ease-in-out infinite;
  transition: transform .3s;
}
.logo-link:hover .logo-leaf { transform: scale(1.1) rotate(5deg); }

.site-sub {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .6rem;
  letter-spacing: .3em;
  color: var(--text-soft);
  opacity: .85;
}

/* ── Keyframes ── */
@keyframes leaf-float {
  0%   { transform: translate(0,0) rotate(var(--r,0deg)); opacity: 0; }
  8%   { opacity: var(--op,0.12); }
  85%  { opacity: var(--op,0.12); }
  100% { transform: translate(var(--dx,30px),var(--dy,-60px)) rotate(calc(var(--r,0deg) + 120deg)); opacity: 0; }
}
@keyframes leaf-sway {
  0%,100% { filter: drop-shadow(0 2px 8px rgba(45,96,64,.2)); }
  50%     { filter: drop-shadow(0 2px 14px rgba(45,96,64,.4)); transform: rotate(3deg); }
}
@keyframes title-reveal {
  from { opacity: 0; transform: translateY(10px); filter: blur(3px); }
  to   { opacity: 1; transform: translateY(0);    filter: blur(0); }
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 600px) {
  .site-header { padding: 2rem 1rem 1rem; }
  .site-sub { display: none; }
  .foliage-tr { width: clamp(180px, 58vw, 300px); top: -35px; right: -45px; }
  .foliage-bl { width: clamp(150px, 42vw, 240px); bottom: -45px; left: -35px; }
}
</style>
