<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import HelloWorld from './components/HelloWorld.vue'

const leaves = ref(Array.from({ length: 14 }, (_, i) => ({
  id: i,
  x: 3 + (i * 6.7) % 94,
  y: 5 + (i * 9.3) % 88,
  size: 5 + (i % 4) * 3,
  driftX: `${25 + (i * 11) % 45}px`,
  driftY: `${-55 - (i * 9) % 55}px`,
  duration: `${20 + (i * 4.1) % 18}s`,
  delay: `${(i * 2.8) % 22}s`,
  opacity: 0.12 + (i % 5) * 0.03,
  rotate: (i * 41) % 360,
})))
</script>

<template>
  <div class="world">

    <!-- Soft nature background -->
    <div class="bg-nature" />

    <!-- Floating leaf particles -->
    <div
      v-for="l in leaves"
      :key="l.id"
      class="leaf-particle"
      :style="{
        left: l.x + '%',
        top:  l.y + '%',
        width:  l.size + 'px',
        height: l.size * 1.5 + 'px',
        '--dx': l.driftX,
        '--dy': l.driftY,
        '--op': l.opacity,
        '--r':  l.rotate + 'deg',
        animationDuration: l.duration,
        animationDelay:    l.delay,
      }"
    />

    <!-- Content -->
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

/* ── Nature background ── */
.bg-nature {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse at 10% 90%, rgba(74,138,88,0.07) 0%, transparent 55%),
    radial-gradient(ellipse at 90% 15%, rgba(74,138,88,0.05) 0%, transparent 50%),
    radial-gradient(ellipse at 50% 50%, rgba(184,216,190,0.08) 0%, transparent 70%),
    linear-gradient(165deg, #eef4ec 0%, #edf2e9 40%, #e8f0e5 100%);
  z-index: 0;
}

/* ── Floating leaves ── */
.leaf-particle {
  position: fixed;
  border-radius: 50% 5% 50% 5%;
  background: rgba(74,138,88,0.18);
  animation: leaf-float ease-in-out infinite;
  z-index: 1;
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

/* ── Animations ── */
@keyframes leaf-float {
  0%   { transform: translate(0, 0) rotate(var(--r, 0deg)); opacity: 0; }
  8%   { opacity: var(--op, 0.15); }
  85%  { opacity: var(--op, 0.15); }
  100% { transform: translate(var(--dx, 40px), var(--dy, -80px)) rotate(calc(var(--r, 0deg) + 120deg)); opacity: 0; }
}
@keyframes leaf-sway {
  0%, 100% { filter: drop-shadow(0 2px 8px rgba(45,96,64,.2)); }
  50%      { filter: drop-shadow(0 2px 14px rgba(45,96,64,.4)); transform: rotate(3deg); }
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
}
</style>
