<template>
  <PortfolioPageShell>
    <PortfolioSubNav back-to="/journal" back-label="‹ Life Journal" />

    <div class="quarrel-wrap">
      <div class="page-title">
        <p class="label">Relationship Journal</p>
        <h2>關係成長日記</h2>
        <p class="sub">有些衝突不是為了分出對錯，而是讓我們重新理解彼此，也更了解自己。</p>
      </div>

      <ul class="entry-list">
        <li v-for="e in entries" :key="e.slug">
          <RouterLink :to="`/journal/quarrel/${e.slug}`" class="entry-card">
            <span class="entry-meta">
              <time :datetime="e.date">{{ formatDate(e.date) }}</time>
              <span aria-hidden="true">·</span>
              <span>閱讀約 {{ readingMinutes(e) }} 分鐘</span>
            </span>
            <span class="entry-title">{{ e.title }}</span>
            <span class="entry-sub">{{ e.subtitle }}</span>
            <span class="entry-summary">{{ e.summary }}</span>
            <span class="entry-cats">
              <span v-for="c in e.categories" :key="c" class="entry-cat">{{ c }}</span>
            </span>
            <span class="entry-arrow" aria-hidden="true">›</span>
          </RouterLink>
        </li>
      </ul>
    </div>
  </PortfolioPageShell>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PortfolioPageShell from '@/components/portfolio/PortfolioPageShell.vue'
import PortfolioSubNav from '@/components/portfolio/PortfolioSubNav.vue'
import { entries, formatDate, readingMinutes } from '@/data/relationship'
</script>

<style scoped>
.quarrel-wrap {
  width: 100%;
  max-width: 760px;
  margin: 0 auto;
  padding: 4.5rem 2rem 5rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}
@keyframes card-rise {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

.page-title { margin-bottom: 2.4rem; }
.label {
  font-family: var(--mg-font-body);
  font-size: .74rem;
  font-weight: 600;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: var(--mg-green-main);
  margin-bottom: .8rem;
}
.page-title h2 {
  font-family: 'Noto Serif TC', var(--mg-font-heading);
  font-weight: 500;
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  color: #344B3F;
  margin-bottom: .6rem;
}
.page-title .sub {
  font-family: var(--mg-font-body);
  font-size: .95rem;
  line-height: 1.8;
  color: var(--mg-text-muted);
}

.entry-list { margin: 0; padding: 0; list-style: none; display: grid; gap: 1rem; }

.entry-card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: .35rem;
  padding: 1.6rem 3.4rem 1.6rem 1.8rem;
  border: 1px solid #E5E4DC;
  border-radius: 18px;
  background: #FFFFFF;
  text-decoration: none;
  color: #303630;
  box-shadow: 0 1px 2px rgba(48,54,48,.03);
  transition: transform .3s cubic-bezier(.16,1,.3,1), border-color .3s, box-shadow .3s;
}
.entry-card:hover {
  transform: translateY(-2px);
  border-color: #C9D2C6;
  box-shadow: 0 10px 28px rgba(48,54,48,.06);
}
.entry-card:focus-visible { outline: 2px solid #344B3F; outline-offset: 3px; }

.entry-meta {
  display: flex;
  gap: .5rem;
  font-family: var(--mg-font-body);
  font-size: .8rem;
  letter-spacing: .06em;
  color: #85877F;
}
.entry-title {
  font-family: 'Noto Serif TC', var(--mg-font-heading);
  font-size: 1.35rem;
  font-weight: 500;
  color: #344B3F;
}
.entry-sub {
  font-family: 'Noto Serif TC', var(--mg-font-heading);
  font-size: 1rem;
  color: #667B61;
}
.entry-summary {
  margin-top: .5rem;
  font-family: var(--mg-font-body);
  font-size: .9rem;
  line-height: 1.85;
  color: #5d625b;
}
.entry-cats { display: flex; flex-wrap: wrap; gap: .4rem; margin-top: .6rem; }
.entry-cat {
  padding: .12rem .75rem;
  border-radius: 999px;
  background: #E9EEE7;
  font-family: var(--mg-font-body);
  font-size: .76rem;
  color: #667B61;
}
.entry-arrow {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.4rem;
  color: #899A88;
  transition: transform .3s;
}
.entry-card:hover .entry-arrow { transform: translate(4px, -50%); }

@media (max-width: 600px) {
  .quarrel-wrap { padding: 3rem 1.25rem 4rem; }
  .entry-card { padding: 1.3rem 2.6rem 1.3rem 1.25rem; }
  .entry-arrow { right: 1rem; }
}
</style>
