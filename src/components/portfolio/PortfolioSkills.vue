<template>
  <section id="skills" ref="el" class="skills" :class="{ 'is-visible': visible }">
    <div class="skills-inner">
      <p class="label">Skills</p>
      <h2 class="heading">Tech Stack</h2>

      <div class="groups">
        <div v-for="(group, i) in groups" :key="group.name" class="group" :style="{ transitionDelay: (i*0.07)+'s' }">
          <p class="group-name">{{ group.name }}</p>
          <div class="chips">
            <span v-for="tag in group.tags" :key="tag" class="chip">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
const { el, visible } = useReveal()

const groups = [
  { name: 'Languages',        tags: ['C++', 'Python', 'C#'] },
  { name: 'Backend / Systems', tags: ['FIX Protocol', 'Socket Programming', 'REST API', 'Multithreading'] },
  { name: 'Database / Infra', tags: ['MariaDB', 'SQL Server', 'Redis', 'Linux', 'Git'] },
  { name: 'Trading / Quant',  tags: ['Trading Systems', 'Order Matching', 'Strategy Processing', 'Data Pipeline'] },
]
</script>

<style scoped>
.skills {
  background: var(--mg-bg-green-soft);
  padding: 8rem 2.5rem;
  scroll-margin-top: 78px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.skills.is-visible { opacity: 1; transform: none; }

.skills-inner { max-width: 1180px; margin: 0 auto; }

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
  margin-bottom: 3rem;
}

.groups {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.4rem 3rem;
}

.group {
  opacity: 0;
  transform: translateY(14px);
  transition: opacity .6s cubic-bezier(.16,1,.3,1), transform .6s cubic-bezier(.16,1,.3,1);
}
.skills.is-visible .group { opacity: 1; transform: none; }

.group-name {
  font-family: var(--mg-font-body);
  font-size: .78rem;
  font-weight: 600;
  letter-spacing: .08em;
  color: var(--mg-text-label);
  margin-bottom: 1rem;
}

.chips { display: flex; flex-wrap: wrap; gap: .6rem; }
.chip {
  font-family: var(--mg-font-body);
  font-size: .84rem;
  color: var(--mg-green-dark);
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 999px;
  padding: .5rem 1.15rem;
  transition: transform .25s, border-color .25s, background .25s, box-shadow .25s;
  cursor: default;
}
.chip:hover {
  transform: translateY(-2px);
  border-color: var(--mg-border-hover);
  background: var(--mg-green-pale);
  box-shadow: 0 8px 18px rgba(36,49,38,0.08);
}

@media (max-width: 760px) {
  .skills { padding: 5.5rem 1.6rem; }
  .groups { grid-template-columns: 1fr; gap: 2rem; }
}
</style>
