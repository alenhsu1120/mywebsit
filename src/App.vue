<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

// ═══════════════════════════════════════════════════════
//  Pixel Art Background Generator
//  Fixed BLOCK_PX ensures every block is always square
//  regardless of screen aspect ratio / device.
// ═══════════════════════════════════════════════════════

const BLOCK_PX = 48   // CSS pixels per block — desktop ≈ 40 cols, mobile auto-adjusts

function generatePixelBg(W: number, H: number): string {

  const rand = (x: number, y: number): number => {
    const s = Math.sin(x * 127.1 + y * 311.7 + 42) * 43758.5453
    return Math.abs(s - Math.floor(s))
  }

  // BotW-inspired pixel palette
  const C = {
    skyA:    ['#5ea8de', '#66aee4', '#6eb4e8'],
    skyB:    ['#86c4f4', '#90caf8', '#98d0fa'],
    skyC:    ['#aed8f8', '#b6defa', '#bce4fc'],
    skyD:    ['#cceafa', '#d4f0fc', '#caeaf8'],
    horiz:   ['#daf0e8', '#e2f4ec', '#d6eeea'],
    cloud:   ['#e8f6fc', '#f0faff', '#f6fcff', '#e4f4fa'],
    sun:     ['#fff8a0', '#fff090', '#ffe870'],
    sunGlo:  ['#ffd840', '#ffd030', '#ffc820'],
    seaD:    ['#46909a', '#4898a2', '#448e96'],
    seaM:    ['#5aaab0', '#62b2b8', '#58a8ae'],
    seaL:    ['#70bcbe', '#78c4c6', '#6cb8ba'],
    seaGlint:['#96d8da', '#a0dede', '#8cd4d6'],
    grassT:  ['#56ba1c', '#5ec224', '#66ca2a', '#50b018'],
    grassM:  ['#46a812', '#4eb018', '#44a410'],
    groundT: ['#368a0e', '#3e9212', '#348608'],
    groundD: ['#2a6e08', '#32760e', '#286a06'],
  }

  const pick = (arr: string[], x: number, y: number): string =>
    arr[Math.floor(rand(x, y) * arr.length)]!

  // ── Proportional landmark rows (all relative to H) ──
  const terrainBase = Math.round(H * 0.77)
  const farHillBase = Math.round(H * 0.635)
  const oceanStart  = Math.round(H * 0.59)
  const sk1 = Math.round(H * 0.136)   // deep→mid sky boundary
  const sk2 = Math.round(H * 0.273)   // mid→light sky
  const sk3 = Math.round(H * 0.409)   // light→horizon sky
  const sk4 = Math.round(H * 0.545)   // horizon→warm

  // Frequency scaling: original tuned for W=40; scale to keep same visual wavelength
  const fx = 40 / W

  const terrainY = (x: number): number => {
    const a1 = Math.max(1, Math.round(H * 0.077))
    const a2 = Math.max(1, Math.round(H * 0.050))
    const a3 = Math.max(1, Math.round(H * 0.027))
    const n = Math.sin(x * 0.22 * fx) * a1
            + Math.sin(x * 0.14 * fx) * a2
            + Math.sin(x * 0.38 * fx) * a3
    return Math.round(terrainBase + n)
  }

  const farHillY = (x: number): number => {
    const n = Math.sin(x * 0.18 * fx) * Math.max(1, Math.round(H * 0.045))
            + Math.sin(x * 0.32 * fx) * Math.max(1, Math.round(H * 0.023))
    return Math.round(farHillBase + n)
  }

  // Sun — proportional to W, H
  const SX = Math.round(W * 0.825)
  const SY = Math.max(1, Math.round(H * 0.09))

  const isSunCore = (x: number, y: number) =>
    Math.abs(x - SX) <= 1 && Math.abs(y - SY) <= 1
  const isSunGlow = (x: number, y: number) =>
    Math.abs(x - SX) <= 2 && Math.abs(y - SY) <= 2
    && !(Math.abs(x - SX) === 2 && Math.abs(y - SY) === 2)
  const isSunRay  = (x: number, y: number) =>
    (x === SX && (y === SY - 2 || y === SY + 3)) ||
    (y === SY && (x === SX - Math.round(W * 0.1) || x === SX + Math.round(W * 0.1)))

  // Clouds — proportional to W, H
  const cld = (fx1: number, fy1: number, fx2: number, fy2: number, d: number):
    [number, number, number, number, number] =>
    [Math.round(W*fx1), Math.round(H*fy1), Math.round(W*fx2), Math.round(H*fy2), d]

  const clouds: [number, number, number, number, number][] = [
    cld(0.05, 0.05, 0.23, 0.14, 0.78),
    cld(0.35, 0.09, 0.53, 0.18, 0.70),
    cld(0.68, 0.05, 0.85, 0.14, 0.75),
    cld(0.13, 0.14, 0.25, 0.23, 0.48),
    cld(0.78, 0.14, 0.90, 0.23, 0.45),
  ]
  const cloudDensity = (x: number, y: number): number => {
    for (const [x1, y1, x2, y2, d] of clouds)
      if (x >= x1 && x <= x2 && y >= y1 && y <= y2) return d
    return 0
  }

  // Ocean glint — proportional
  const glintX1 = Math.round(W * 0.65)
  const glintX2 = Math.round(W * 0.93)
  const isGlint  = (x: number, y: number, th: number) =>
    y === oceanStart && x >= glintX1 && x <= glintX2 && y < th

  // ── Render ──
  let rects = ''
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const r  = rand(x, y)
      const th = terrainY(x)
      const fh = farHillY(x)
      let color: string = ''

      if      (isSunCore(x, y))                           color = pick(C.sun,      x, y)
      else if (isSunGlow(x, y))                           color = pick(C.sunGlo,   x, y)
      else if (isSunRay(x, y))                            color = pick(C.sunGlo,   x, y)
      else if (cloudDensity(x,y) > 0 && r < cloudDensity(x,y)) color = pick(C.cloud, x, y)
      else if (y >= th) {
        const gm = Math.max(1, Math.round(H * 0.14))
        const gt = Math.max(1, Math.round(H * 0.27))
        if      (y === th)       color = pick(C.grassT,  x, y)
        else if (y <= th + gm)   color = pick(C.grassM,  x, y)
        else if (y <= th + gt)   color = pick(C.groundT, x, y)
        else                     color = pick(C.groundD, x, y)
      }
      else if (y >= fh && y < oceanStart) {
        color = pick(y === fh ? C.grassT : C.grassM, x, y)
      }
      else if (y >= oceanStart && y < th) {
        if      (isGlint(x, y, th))  color = pick(C.seaGlint, x, y)
        else if (y <= oceanStart)    color = pick(C.seaD,     x, y)
        else if (y <= oceanStart+1)  color = pick(C.seaM,     x, y)
        else                         color = pick(C.seaL,     x, y)
      }
      else {
        if      (y < sk1) color = pick(C.skyA,  x, y)
        else if (y < sk2) color = pick(C.skyB,  x, y)
        else if (y < sk3) color = pick(C.skyC,  x, y)
        else if (y < sk4) color = pick(C.skyD,  x, y)
        else              color = pick(C.horiz, x, y)
      }

      rects += `<rect x="${x}" y="${y}" width="1.02" height="1.02" fill="${color || '#87ceeb'}"/>`
    }
  }

  const svg = [
    `<svg xmlns="http://www.w3.org/2000/svg"`,
    ` viewBox="0 0 ${W} ${H}"`,
    ` shape-rendering="crispEdges"`,
    ` preserveAspectRatio="none">`,   // ← none: we control exact size via CSS
    rects,
    `</svg>`,
  ].join('')

  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`
}

// ── Reactive bg — rebuilds on resize / orientation change ──
const pixelBg  = ref('')
const bgWidth  = ref(0)
const bgHeight = ref(0)

function rebuild() {
  const W = Math.ceil(window.innerWidth  / BLOCK_PX) + 1
  const H = Math.ceil(window.innerHeight / BLOCK_PX) + 1
  pixelBg.value  = generatePixelBg(W, H)
  bgWidth.value  = W * BLOCK_PX
  bgHeight.value = H * BLOCK_PX
}

onMounted(() => {
  rebuild()
  window.addEventListener('resize', rebuild)
})
onUnmounted(() => {
  window.removeEventListener('resize', rebuild)
})

// ── Wind seeds ──
const seeds = Array.from({ length: 8 }, (_, i) => ({
  id: i,
  x: 10 + Math.random() * 75,
  y: 18 + Math.random() * 45,
  size: 2 + Math.random() * 2.5,
  driftX: `${55 + Math.random() * 75}px`,
  driftY: `${-45 - Math.random() * 65}px`,
  duration: `${16 + Math.random() * 18}s`,
  delay: `${Math.random() * 22}s`,
  opacity: 0.55 + Math.random() * 0.35,
}))
</script>

<template>
  <div class="world">

    <!-- ══ Pixel art background — exact square blocks ══ -->
    <div
      class="bg-pixel"
      :style="{
        backgroundImage: pixelBg,
        backgroundSize: `${bgWidth}px ${bgHeight}px`,
      }"
    />

    <!-- Block grid overlay — fixed BLOCK_PX size = always square lines -->
    <div class="bg-grid" :style="{ '--bp': BLOCK_PX + 'px' }" />

    <!-- Wind seeds -->
    <div v-for="s in seeds" :key="s.id" class="seed" :style="{
      left: s.x + '%', top: s.y + '%',
      width: s.size + 'px', height: s.size + 'px',
      '--dx': s.driftX, '--dy': s.driftY, '--op': s.opacity,
      animationDuration: s.duration, animationDelay: s.delay,
    }" />

    <!-- ══ Content ══ -->
    <div class="content">
      <header class="site-header">
        <RouterLink to="/" class="logo-link">
          <svg class="triforce" viewBox="0 0 60 52" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,2 46,30 14,30"  fill="#c9a227"/>
            <polygon points="2,50  18,22 34,50" fill="#c9a227"/>
            <polygon points="26,50 42,22 58,50" fill="#c9a227"/>
          </svg>
        </RouterLink>
        <HelloWorld msg="cuteHsu" />
        <p class="site-sub">— 自由冒險者的據點 —</p>
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

/* ── Pixel art BG — exact size, no stretching ── */
.bg-pixel {
  position: fixed;
  inset: 0;
  background-repeat: no-repeat;
  background-position: top left;
  image-rendering: pixelated;
  image-rendering: crisp-edges;
  z-index: 0;
}

/* ── Grid lines — use same BLOCK_PX → always square ── */
.bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    repeating-linear-gradient(
      0deg,
      rgba(0,0,0,0.055) 0,
      rgba(0,0,0,0.055) 1px,
      transparent 1px,
      transparent var(--bp)
    ),
    repeating-linear-gradient(
      90deg,
      rgba(0,0,0,0.055) 0,
      rgba(0,0,0,0.055) 1px,
      transparent 1px,
      transparent var(--bp)
    );
  z-index: 1;
  pointer-events: none;
}

/* ── Seeds ── */
.seed {
  position: fixed;
  border-radius: 50%;
  background: rgba(255,255,255,.9);
  box-shadow: 0 0 4px rgba(255,255,255,.7);
  animation: seed-float ease-in-out infinite;
  z-index: 6;
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
.triforce {
  width: 36px; height: 31px;
  filter: drop-shadow(0 2px 6px rgba(180,140,30,.5));
  animation: triforce-shimmer 6s ease-in-out infinite;
  transition: transform .3s;
}
.logo-link:hover .triforce { transform: scale(1.12); }

.site-sub {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .6rem;
  letter-spacing: .3em;
  color: #4a3810;
  opacity: .8;
  text-shadow: 0 1px 4px rgba(255,255,255,.85);
}

/* ── Animations ── */
@keyframes seed-float {
  0%   { transform: translate(0,0); opacity: 0; }
  8%   { opacity: var(--op,.6); }
  85%  { opacity: var(--op,.6); }
  100% { transform: translate(var(--dx,60px),var(--dy,-80px)); opacity: 0; }
}
@keyframes triforce-shimmer {
  0%,100% { filter: drop-shadow(0 2px 6px rgba(180,140,30,.4)); }
  50%     { filter: drop-shadow(0 2px 16px rgba(201,162,39,.7)); }
}
@keyframes title-reveal {
  from { opacity:0; transform:translateY(10px); filter:blur(3px); }
  to   { opacity:1; transform:translateY(0);    filter:blur(0); }
}
@keyframes card-rise {
  from { opacity:0; transform:translateY(16px); }
  to   { opacity:1; transform:translateY(0); }
}
@keyframes rustle {
  0%,100% { transform:rotate(-1deg); } 50% { transform:rotate(1.5deg); }
}

@media (max-width:600px) {
  .site-header { padding: 2rem 1rem 1rem; }
  .site-sub { display: none; }
}
</style>
