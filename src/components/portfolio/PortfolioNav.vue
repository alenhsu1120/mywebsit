<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="nav-inner">
      <a href="#top" class="nav-mark" @click.prevent="scrollTo('top')">
        <svg viewBox="0 0 32 32" class="mark-leaf" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 4 C9 4 5 11 6 18 C7 25 16 28 16 28 C16 28 25 25 26 18 C27 11 23 4 16 4 Z"
                fill="none" stroke="#5F7F64" stroke-width="1.3"/>
          <path d="M16 6 C16 6 20 13 18 21 C17 25 16 28 16 28" stroke="#5F7F64" stroke-width="1" fill="none" stroke-linecap="round" opacity=".8"/>
        </svg>
        <span class="mark-text">P. Hsu</span>
      </a>

      <nav class="nav-links">
        <a
          v-for="item in links"
          :key="item.href"
          :href="item.href"
          @click.prevent="scrollTo(item.href.slice(1))"
        >{{ item.label }}</a>
      </nav>

      <button class="nav-toggle" :class="{ open: mobileOpen }" @click="mobileOpen = !mobileOpen" aria-label="Toggle menu">
        <span /><span /><span />
      </button>
    </div>

    <transition name="drop">
      <nav v-if="mobileOpen" class="nav-mobile">
        <a
          v-for="item in links"
          :key="item.href"
          :href="item.href"
          @click.prevent="scrollTo(item.href.slice(1)); mobileOpen = false"
        >{{ item.label }}</a>
      </nav>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const links = [
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact',    href: '#contact' },
]

const scrolled    = ref(false)
const mobileOpen   = ref(false)

function onScroll() { scrolled.value = window.scrollY > 24 }
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))

function scrollTo(id: string) {
  if (id === 'top') { window.scrollTo({ top: 0, behavior: 'smooth' }); return }
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 200;
  background: rgba(247,246,241,0.72);
  backdrop-filter: blur(14px) saturate(1.05);
  -webkit-backdrop-filter: blur(14px) saturate(1.05);
  border-bottom: 1px solid transparent;
  transition: border-color .4s, box-shadow .4s, background .4s;
}
.nav.is-scrolled {
  background: rgba(247,246,241,0.92);
  border-bottom-color: var(--mg-divider);
  box-shadow: 0 8px 24px rgba(36,49,38,0.05);
}

.nav-inner {
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 2.5rem;
  height: 78px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-mark {
  display: flex; align-items: center; gap: .55rem;
  text-decoration: none;
}
.mark-leaf { width: 22px; height: 22px; flex-shrink: 0; }
.mark-text {
  font-family: var(--mg-font-heading);
  font-style: italic;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--mg-green-deep);
  letter-spacing: .01em;
}

.nav-links {
  display: flex;
  gap: 2.4rem;
}
.nav-links a {
  position: relative;
  font-family: var(--mg-font-body);
  font-size: .82rem;
  letter-spacing: .04em;
  color: var(--mg-text-body);
  text-decoration: none;
  padding: .3rem 0;
  transition: color .25s;
}
.nav-links a::after {
  content: '';
  position: absolute;
  left: 50%; right: 50%;
  bottom: 0;
  height: 1px;
  background: var(--mg-green-main);
  transition: left .3s ease, right .3s ease;
}
.nav-links a:hover { color: var(--mg-green-deep); }
.nav-links a:hover::after { left: 0; right: 0; }

.nav-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 30px; height: 30px;
  background: none; border: none; cursor: pointer;
  padding: 0;
}
.nav-toggle span {
  display: block; height: 1px; width: 100%;
  background: var(--mg-green-deep);
  transition: transform .3s, opacity .3s;
}
.nav-toggle.open span:nth-child(1) { transform: translateY(6px) rotate(45deg); }
.nav-toggle.open span:nth-child(2) { opacity: 0; }
.nav-toggle.open span:nth-child(3) { transform: translateY(-6px) rotate(-45deg); }

.nav-mobile {
  display: flex;
  flex-direction: column;
  padding: .5rem 2rem 1.4rem;
  background: rgba(247,246,241,0.98);
  border-bottom: 1px solid var(--mg-divider);
}
.nav-mobile a {
  font-family: var(--mg-font-body);
  font-size: .95rem;
  color: var(--mg-text-body);
  text-decoration: none;
  padding: .7rem 0;
  border-bottom: 1px solid var(--mg-divider);
}
.nav-mobile a:last-child { border-bottom: none; }

.drop-enter-active, .drop-leave-active { transition: opacity .25s, transform .25s; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-8px); }

@media (max-width: 760px) {
  .nav-links { display: none; }
  .nav-toggle { display: flex; }
  .nav-inner { padding: 0 1.4rem; height: 68px; }
}
</style>
