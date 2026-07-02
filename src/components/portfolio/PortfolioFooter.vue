<template>
  <footer class="footer">
    <div class="footer-inner">
      <p class="copyright">© {{ year }} Pei-Hsuan Hsu</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
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
.copyright {
  font-family: var(--mg-font-body);
  font-size: .72rem;
  color: var(--mg-text-muted);
  margin-top: .4rem;
}
</style>
