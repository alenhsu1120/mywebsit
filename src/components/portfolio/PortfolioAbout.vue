<template>
  <section id="about" ref="el" class="about" :class="{ 'is-visible': visible }">
    <div class="about-inner">

      <div class="about-left">
        <p class="label">About</p>
        <h2 class="heading">Engineering with intention.</h2>
        <p class="desc">
          I work across the backend layer of trading systems — the part most people
          never see, but the part everything else depends on. From order handling to
          data pipelines, I care about systems that stay dependable when it matters most,
          built with the same patience quant work demands.
        </p>

        <figure class="side-photo">
          <svg class="side-blob" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M100 12C142 6 182 40 188 88C194 136 166 182 118 190C70 198 22 172 12 124C2 76 24 34 62 20C74 15 88 14 100 12Z" fill="#DCE7D5"/>
          </svg>
          <img
            src="https://images.unsplash.com/photo-1637689113621-73951984fcc1?q=80&w=560&auto=format&fit=crop"
            srcset="https://images.unsplash.com/photo-1637689113621-73951984fcc1?q=80&w=400&auto=format&fit=crop 400w,
                    https://images.unsplash.com/photo-1637689113621-73951984fcc1?q=80&w=560&auto=format&fit=crop 560w"
            sizes="(max-width: 860px) 60vw, 220px"
            alt="A leather notebook, pen, and cup of coffee on a wooden table lit by window blinds"
            loading="lazy"
          />
          <figcaption>Photo — Andres Molina / Unsplash</figcaption>
        </figure>
      </div>

      <div class="about-right">
        <div v-for="(card, i) in cards" :key="card.title" class="card" :style="{ transitionDelay: (i*0.08)+'s' }">
          <div class="card-icon" v-html="card.icon" />
          <h3>{{ card.title }}</h3>
          <p>{{ card.desc }}</p>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
const { el, visible } = useReveal()

const cards = [
  {
    title: 'Backend Development',
    desc: 'Designing dependable services and multithreaded systems that hold steady under real load.',
    icon: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="6" width="20" height="6" rx="1.5" stroke="#5F7F64" stroke-width="1.3"/>
      <rect x="6" y="14" width="20" height="6" rx="1.5" stroke="#5F7F64" stroke-width="1.3"/>
      <rect x="6" y="22" width="20" height="6" rx="1.5" stroke="#5F7F64" stroke-width="1.3"/>
      <circle cx="10" cy="9" r="1" fill="#5F7F64"/>
      <circle cx="10" cy="17" r="1" fill="#5F7F64"/>
      <circle cx="10" cy="25" r="1" fill="#5F7F64"/>
    </svg>`,
  },
  {
    title: 'Trading Systems',
    desc: 'Building order management, matching, and strategy execution logic for live trading environments.',
    icon: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <line x1="7" y1="9" x2="7" y2="15" stroke="#5F7F64" stroke-width="1.3" stroke-linecap="round"/>
      <rect x="5" y="11" width="4" height="6" rx="1" stroke="#5F7F64" stroke-width="1.3"/>
      <line x1="16" y1="5" x2="16" y2="23" stroke="#5F7F64" stroke-width="1.3" stroke-linecap="round"/>
      <rect x="14" y="9" width="4" height="10" rx="1" stroke="#5F7F64" stroke-width="1.3"/>
      <line x1="25" y1="13" x2="25" y2="27" stroke="#5F7F64" stroke-width="1.3" stroke-linecap="round"/>
      <rect x="23" y="16" width="4" height="7" rx="1" stroke="#5F7F64" stroke-width="1.3"/>
    </svg>`,
  },
  {
    title: 'Infra & Data',
    desc: 'Shaping data pipelines, storage, and Linux infrastructure that keep systems fast and consistent.',
    icon: `<svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="16" cy="8" rx="10" ry="3.4" stroke="#5F7F64" stroke-width="1.3"/>
      <path d="M6 8v8c0 1.9 4.5 3.4 10 3.4s10-1.5 10-3.4V8" stroke="#5F7F64" stroke-width="1.3"/>
      <path d="M6 16v8c0 1.9 4.5 3.4 10 3.4s10-1.5 10-3.4v-8" stroke="#5F7F64" stroke-width="1.3"/>
    </svg>`,
  },
]
</script>

<style scoped>
.about {
  padding: 8rem 2.5rem;
  max-width: 1180px;
  margin: 0 auto;
  scroll-margin-top: 78px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.about.is-visible { opacity: 1; transform: none; }

.about-inner {
  display: grid;
  grid-template-columns: 0.85fr 1.15fr;
  gap: 4.5rem;
}

.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: 1rem;
}
.heading {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2.1rem, 3.2vw, 2.8rem);
  line-height: 1.18;
  color: var(--mg-green-deep);
  margin-bottom: 1.4rem;
}
.desc {
  font-family: var(--mg-font-body);
  font-size: .98rem;
  line-height: 1.85;
  color: var(--mg-text-body);
  max-width: 380px;
}

.side-photo {
  position: relative;
  width: 220px;
  margin-top: 3rem;
}
.side-blob {
  position: absolute;
  width: 145%;
  top: 50%; left: 50%;
  transform: translate(-52%,-46%);
  z-index: 0;
}
.side-photo img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  aspect-ratio: 4/5;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.7);
  box-shadow: 0 20px 44px rgba(36,49,38,0.15), 0 4px 14px rgba(36,49,38,0.07);
}
.side-photo figcaption {
  position: relative;
  z-index: 1;
  margin-top: .6rem;
  font-family: var(--mg-font-body);
  font-size: .66rem;
  letter-spacing: .04em;
  color: var(--mg-text-muted);
  opacity: .7;
}

.about-right {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}
.card {
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  padding: 1.7rem 1.9rem;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
  transition: transform .35s cubic-bezier(.16,1,.3,1), border-color .35s, box-shadow .35s;
  opacity: 0;
  transform: translateY(16px);
}
.about.is-visible .card { opacity: 1; transform: translateY(0); }
.card:hover {
  transform: translateY(-4px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 16px 36px rgba(36,49,38,0.09);
}
.card-icon { width: 30px; height: 30px; margin-bottom: 1rem; }
.card-icon :deep(svg) { width: 100%; height: 100%; }
.card h3 {
  font-family: var(--mg-font-heading);
  font-size: 1.28rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  margin-bottom: .5rem;
}
.card p {
  font-family: var(--mg-font-body);
  font-size: .9rem;
  line-height: 1.7;
  color: var(--mg-text-body);
}

@media (max-width: 860px) {
  .about { padding: 5.5rem 1.6rem; }
  .about-inner { grid-template-columns: 1fr; gap: 2.4rem; }
  .desc { max-width: none; }
}
</style>
