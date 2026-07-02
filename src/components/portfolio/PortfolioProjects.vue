<template>
  <section id="projects" ref="el" class="projects" :class="{ 'is-visible': visible }">
    <div class="projects-inner">
      <p class="label">Selected Work</p>
      <h2 class="heading">Selected Projects</h2>

      <div class="list">
        <article v-for="(p, i) in projects" :key="p.title" class="project" :style="{ transitionDelay: (i*0.1)+'s' }">
          <span class="num">{{ p.num }}</span>
          <div class="body">
            <h3>{{ p.title }}</h3>
            <p>{{ p.desc }}</p>
            <div class="tags">
              <span v-for="t in p.tags" :key="t" class="tag">{{ t }}</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
const { el, visible } = useReveal()

const projects = [
  {
    num: '01',
    title: 'Trading Order Management System',
    desc: 'Built backend logic for smart order processing, order state handling, and ticket lifecycle management in a trading environment.',
    tags: ['C++', 'Redis', 'MariaDB', 'Trading Systems'],
  },
  {
    num: '02',
    title: 'Strategy Processing / Matcher Logic',
    desc: 'Implemented condition matching, trailing stop logic, and strategy-related backend processing for automated trading workflows.',
    tags: ['C++', 'Quant', 'Matching Logic', 'Multithreading'],
  },
  {
    num: '03',
    title: 'Data Import / Internal Tooling',
    desc: 'Developed internal tools and data processing workflows for structured financial data import, validation, and backend integration.',
    tags: ['Python', 'SQL', 'Data Pipeline', 'Linux'],
  },
]
</script>

<style scoped>
.projects {
  padding: 8rem 2.5rem;
  max-width: 1180px;
  margin: 0 auto;
  scroll-margin-top: 78px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.projects.is-visible { opacity: 1; transform: none; }

.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
}
.heading {
  font-family: var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(2.1rem, 3.2vw, 2.8rem);
  color: var(--mg-green-deep);
  margin-bottom: 3.4rem;
}

.list { display: flex; flex-direction: column; gap: 1.6rem; }

.project {
  display: grid;
  grid-template-columns: 90px 1fr;
  gap: 1.4rem;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  padding: 2.4rem 2.6rem;
  box-shadow: 0 8px 26px rgba(36,49,38,0.05);
  transition: transform .4s cubic-bezier(.16,1,.3,1), border-color .4s, box-shadow .4s;
  opacity: 0;
  transform: translateY(18px);
}
.projects.is-visible .project { opacity: 1; transform: translateY(0); }
.project:hover {
  transform: translateY(-6px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 20px 44px rgba(36,49,38,0.1);
}

.num {
  font-family: var(--mg-font-heading);
  font-style: italic;
  font-weight: 500;
  font-size: 2.4rem;
  color: var(--mg-brown);
  line-height: 1;
}

.body h3 {
  font-family: var(--mg-font-heading);
  font-size: 1.55rem;
  font-weight: 600;
  color: var(--mg-green-deep);
  margin-bottom: .7rem;
}
.body p {
  font-family: var(--mg-font-body);
  font-size: .95rem;
  line-height: 1.8;
  color: var(--mg-text-body);
  max-width: 620px;
  margin-bottom: 1.2rem;
}

.tags { display: flex; flex-wrap: wrap; gap: .55rem; }
.tag {
  font-family: var(--mg-font-body);
  font-size: .76rem;
  letter-spacing: .03em;
  color: var(--mg-text-label);
  border: 1px solid var(--mg-divider);
  border-radius: 999px;
  padding: .32rem .85rem;
}

@media (max-width: 700px) {
  .projects { padding: 5.5rem 1.6rem; }
  .project { grid-template-columns: 1fr; padding: 1.8rem 1.6rem; gap: .6rem; }
  .num { font-size: 1.8rem; }
}
</style>
