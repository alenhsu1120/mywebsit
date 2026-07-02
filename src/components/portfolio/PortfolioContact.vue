<template>
  <section id="contact" ref="el" class="contact" :class="{ 'is-visible': visible }">
    <div class="contact-inner">
      <p class="label">Get in Touch</p>
      <h2 class="heading">Let's Connect</h2>
      <p class="desc">
        Open to conversations about backend engineering, trading systems, or
        anything at the intersection of the two. Reach out — I read everything.
      </p>

      <div class="actions">
        <a v-for="c in contacts" :key="c.label" :href="c.href" class="action" target="_blank" rel="noopener">
          <span class="icon" v-html="c.icon" />
          <span class="text">
            <span class="a-label">{{ c.label }}</span>
            <span class="a-value">{{ c.value }}</span>
          </span>
          <span class="arrow">↗</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useReveal } from '@/composables/useReveal'
const { el, visible } = useReveal()

const contacts = [
  {
    label: 'Email',
    value: 'you@example.com',
    href: 'mailto:you@example.com',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="14" rx="2" stroke="#5F7F64" stroke-width="1.3"/><path d="M4 7l8 6 8-6" stroke="#5F7F64" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
  },
  {
    label: 'GitHub',
    value: 'github.com/yourusername',
    href: 'https://github.com/yourusername',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 3a9 9 0 0 0-2.84 17.54c.45.08.61-.2.61-.43v-1.68c-2.5.55-3.03-1.2-3.03-1.2-.41-1.04-1-1.32-1-1.32-.82-.56.06-.55.06-.55.9.06 1.38.93 1.38.93.8 1.37 2.1.98 2.6.75.08-.58.31-.98.57-1.2-2-.22-4.1-1-4.1-4.45 0-.98.35-1.79.93-2.42-.09-.22-.4-1.14.09-2.38 0 0 .76-.24 2.5.93a8.6 8.6 0 0 1 4.55 0c1.73-1.17 2.5-.93 2.5-.93.48 1.24.17 2.16.08 2.38.58.63.93 1.44.93 2.42 0 3.46-2.1 4.23-4.1 4.45.33.28.61.83.61 1.68v2.48c0 .24.16.51.62.43A9 9 0 0 0 12 3Z" stroke="#5F7F64" stroke-width="1.1"/></svg>`,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/yourusername',
    href: 'https://linkedin.com/in/yourusername',
    icon: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="3" width="18" height="18" rx="2.5" stroke="#5F7F64" stroke-width="1.3"/><circle cx="8" cy="8.2" r="1" fill="#5F7F64"/><path d="M8 11v6M12 17v-3.6c0-1.3.9-2.4 2.2-2.4 1.3 0 1.8 1 1.8 2.4V17" stroke="#5F7F64" stroke-width="1.3" stroke-linecap="round"/></svg>`,
  },
]
</script>

<style scoped>
.contact {
  background: var(--mg-bg-section);
  padding: 8rem 2.5rem 9rem;
  scroll-margin-top: 78px;
  opacity: 0;
  transform: translateY(28px);
  transition: opacity .9s cubic-bezier(.16,1,.3,1), transform .9s cubic-bezier(.16,1,.3,1);
}
.contact.is-visible { opacity: 1; transform: none; }

.contact-inner {
  max-width: 640px;
  margin: 0 auto;
  text-align: center;
}

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
  font-size: clamp(2.2rem, 3.6vw, 3rem);
  color: var(--mg-green-deep);
  margin-bottom: 1.2rem;
}
.desc {
  font-family: var(--mg-font-body);
  font-size: .98rem;
  line-height: 1.85;
  color: var(--mg-text-body);
  margin-bottom: 3rem;
}

.actions { display: flex; flex-direction: column; gap: .9rem; }

.action {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: left;
  background: var(--mg-bg-card);
  border: 1px solid var(--mg-border-soft);
  border-radius: 20px;
  padding: 1.1rem 1.5rem;
  text-decoration: none;
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.action:hover {
  transform: translateY(-3px);
  border-color: var(--mg-border-hover);
  box-shadow: 0 14px 32px rgba(36,49,38,0.08);
}
.icon { width: 22px; height: 22px; flex-shrink: 0; }
.icon :deep(svg) { width: 100%; height: 100%; }
.text { display: flex; flex-direction: column; flex: 1; gap: .1rem; }
.a-label {
  font-family: var(--mg-font-body);
  font-size: .7rem;
  letter-spacing: .1em;
  color: var(--mg-text-label);
}
.a-value {
  font-family: var(--mg-font-heading);
  font-size: 1.1rem;
  color: var(--mg-green-deep);
}
.arrow { color: var(--mg-green-main); font-size: 1.1rem; transition: transform .3s; }
.action:hover .arrow { transform: translate(3px,-3px); }

@media (max-width: 600px) {
  .contact { padding: 5.5rem 1.4rem 6rem; }
}
</style>
