<template>
  <section id="experience" ref="el" class="experience" :class="{ 'is-visible': visible }">
    <div class="experience-inner">
      <p class="label">Timeline</p>
      <h2 class="heading">Experience</h2>

      <div class="experience-body">
        <div class="timeline">
          <div v-for="(item, i) in items" :key="item.title" class="item" :style="{ transitionDelay: (i*0.1)+'s' }">
            <div class="marker"><span class="dot" /></div>
            <div class="content">
              <span class="period">{{ item.period }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </div>
        </div>

        <figure class="side-photo">
          <svg class="side-blob" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path d="M100 14C146 8 182 46 186 96C190 146 160 196 110 206C60 216 18 186 10 134C2 82 26 36 66 20C77 15 88 15 100 14Z" fill="#DCE7D5"/>
          </svg>
          <img
            src="https://images.unsplash.com/photo-1714507767656-2fb307e1b03d?q=80&w=560&auto=format&fit=crop"
            srcset="https://images.unsplash.com/photo-1714507767656-2fb307e1b03d?q=80&w=400&auto=format&fit=crop 400w,
                    https://images.unsplash.com/photo-1714507767656-2fb307e1b03d?q=80&w=560&auto=format&fit=crop 560w"
            sizes="(max-width: 900px) 60vw, 260px"
            alt="A striped Calathea orbifolia plant in a grey pot against a plain beige wall"
            loading="lazy"
          />
          <figcaption>Photo — Gigi Visacri / Unsplash</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
const { el, visible } = useReveal()

const items = [
  {
    period: 'Present',
    title: 'Backend & Trading Systems Engineer',
    desc: 'Developing order management, matching, and strategy processing logic for live trading infrastructure in C++, with data services in Python and C#.',
  },
  {
    period: 'Earlier',
    title: 'Systems & Infrastructure Development',
    desc: 'Worked across Linux-based backend services, Redis and relational databases, building the internal tooling data pipelines depend on.',
  },
  {
    period: 'Graduate Studies',
    title: 'M.S. in Computer Science',
    desc: 'Focused on systems and algorithmic foundations that continue to shape how I approach backend and quantitative engineering today.',
  },
]
</script>

<style scoped>
.experience {
  padding: 8rem 2.5rem;
  max-width: 1100px;
  margin: 0 auto;
  scroll-margin-top: 78px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.experience.is-visible { opacity: 1; transform: none; }

.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
  text-align: center;
}
.heading {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2.1rem, 3.2vw, 2.8rem);
  color: var(--mg-green-deep);
  margin-bottom: 4rem;
  text-align: center;
}

.experience-body {
  display: grid;
  grid-template-columns: 1fr 260px;
  gap: 3.5rem;
  align-items: start;
}

.side-photo {
  position: relative;
  width: 100%;
  max-width: 260px;
  margin: 0 auto;
}
.side-blob {
  position: absolute;
  width: 145%;
  top: 50%; left: 50%;
  transform: translate(-52%,-48%);
  z-index: 0;
}
.side-photo img {
  position: relative;
  z-index: 1;
  display: block;
  width: 100%;
  aspect-ratio: 2/3;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid rgba(255,255,255,.7);
  box-shadow: 0 20px 44px rgba(36,49,38,0.15), 0 4px 14px rgba(36,49,38,0.07);
}
.side-photo figcaption {
  position: relative;
  z-index: 1;
  margin-top: .6rem;
  text-align: center;
  font-family: var(--mg-font-body);
  font-size: .66rem;
  letter-spacing: .04em;
  color: var(--mg-text-muted);
  opacity: .7;
}

.timeline { position: relative; padding-left: 2.6rem; }
.timeline::before {
  content: '';
  position: absolute;
  left: 6px; top: 6px; bottom: 6px;
  width: 1px;
  background: var(--mg-divider);
}

.item {
  position: relative;
  padding-bottom: 3.2rem;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);
}
.experience.is-visible .item { opacity: 1; transform: none; }
.item:last-child { padding-bottom: 0; }

.marker {
  position: absolute;
  left: -2.6rem;
  top: 4px;
  width: 13px; height: 13px;
  display: flex; align-items: center; justify-content: center;
}
.dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: var(--mg-green-main);
  box-shadow: 0 0 0 4px var(--mg-bg-page);
}

.period {
  display: inline-block;
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .1em;
  color: var(--mg-brown);
  margin-bottom: .5rem;
}
.content h3 {
  font-family: var(--mg-font-heading);
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  margin-bottom: .55rem;
}
.content p {
  font-family: var(--mg-font-body);
  font-size: .92rem;
  line-height: 1.8;
  color: var(--mg-text-body);
  max-width: 560px;
}

@media (max-width: 760px) {
  .experience-body { grid-template-columns: 1fr; gap: 3rem; }
  .side-photo { max-width: 220px; order: -1; }
}

@media (max-width: 640px) {
  .experience { padding: 5.5rem 1.4rem; }
  .timeline { padding-left: 2rem; }
  .marker { left: -2rem; }
}
</style>
