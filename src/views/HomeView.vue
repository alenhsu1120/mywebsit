<template>
  <div class="portfolio-page">
    <div class="grain" aria-hidden="true" />

    <PortfolioNav />
    <PortfolioHero />
    <PortfolioAbout />
    <PortfolioSkills />
    <PortfolioProjects />
    <PortfolioExperience />
    <PortfolioContact />
    <PortfolioFooter />
  </div>
</template>

<script setup lang="ts">
import PortfolioNav        from '@/components/portfolio/PortfolioNav.vue'
import PortfolioHero       from '@/components/portfolio/PortfolioHero.vue'
import PortfolioAbout      from '@/components/portfolio/PortfolioAbout.vue'
import PortfolioSkills     from '@/components/portfolio/PortfolioSkills.vue'
import PortfolioProjects   from '@/components/portfolio/PortfolioProjects.vue'
import PortfolioExperience from '@/components/portfolio/PortfolioExperience.vue'
import PortfolioContact    from '@/components/portfolio/PortfolioContact.vue'
import PortfolioFooter     from '@/components/portfolio/PortfolioFooter.vue'
</script>

<style scoped>
.portfolio-page {
  /* ── Backgrounds ── */
  --mg-bg-page:         #F7F6F1;
  --mg-bg-section:      #F1EEE6;
  --mg-bg-card:         #FBFAF7;
  --mg-bg-green-soft:   #EEF3EA;
  --mg-bg-beige-soft:   #F4F0E8;

  /* ── Greens ── */
  --mg-green-deep:  #243126;
  --mg-green-dark:  #2F4F3A;
  --mg-green-main:  #5F7F64;
  --mg-green-mid:   #7F9B7A;
  --mg-green-light: #AFC3A2;
  --mg-green-pale:  #DCE7D5;

  /* ── Text ── */
  --mg-text-primary: #243126;
  --mg-text-body:    #4A5A4C;
  --mg-text-muted:   #7A8577;
  --mg-text-label:   #6E7D6F;

  /* ── Accents ── */
  --mg-brown: #B08968;
  --mg-clay:  #C48A6A;
  --mg-sand:  #D8C8B2;

  /* ── Borders ── */
  --mg-border-soft:  #D7DDD2;
  --mg-border-hover: #B8C6B4;
  --mg-divider:      #DADFD5;

  /* ── Type ── */
  --mg-font-heading: 'Cormorant Garamond', 'Noto Serif TC', serif;
  --mg-font-body:    'Inter', 'Noto Sans TC', sans-serif;

  position: relative;
  width: 100%;
  min-height: 100vh;
  background: var(--mg-bg-page);
  color: var(--mg-text-primary);
  overflow-x: hidden;
}

.grain {
  position: fixed;
  inset: 0;
  z-index: 150;
  pointer-events: none;
  opacity: .035;
  mix-blend-mode: multiply;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
</style>
