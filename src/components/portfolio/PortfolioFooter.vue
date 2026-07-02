<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="more-label">More on this site</p>
      <nav class="more-links">
        <RouterLink to="/journal">Life Journal</RouterLink>
        <RouterLink to="/travel">Travel Guide</RouterLink>
        <RouterLink to="/programming">Programming</RouterLink>
      </nav>
      <p class="copyright">© {{ year }} Pei-Hsuan Hsu</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
const year = 2026
</script>

<style scoped>
.footer {
  background: var(--mg-bg-section);
  border-top: 1px solid var(--mg-divider);
  padding: 2.4rem 2.5rem 2.8rem;
}
.footer-inner {
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: .9rem;
}
.more-label {
  font-family: var(--mg-font-body);
  font-size: .68rem;
  letter-spacing: .18em;
  color: var(--mg-text-muted);
}
.more-links { display: flex; gap: 1.6rem; }
.more-links a {
  font-family: var(--mg-font-body);
  font-size: .82rem;
  color: var(--mg-text-label);
  text-decoration: none;
  transition: color .25s;
}
.more-links a:hover { color: var(--mg-green-dark); }
.copyright {
  font-family: var(--mg-font-body);
  font-size: .72rem;
  color: var(--mg-text-muted);
  margin-top: .4rem;
}
</style>
