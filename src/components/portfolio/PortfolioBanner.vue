<template>
  <div class="banner">
    <img
      src="https://images.unsplash.com/photo-1591382696448-3809bb398c0e?q=80&w=1800&auto=format&fit=crop"
      srcset="https://images.unsplash.com/photo-1591382696448-3809bb398c0e?q=80&w=900&auto=format&fit=crop 900w,
              https://images.unsplash.com/photo-1591382696448-3809bb398c0e?q=80&w=1800&auto=format&fit=crop 1800w,
              https://images.unsplash.com/photo-1591382696448-3809bb398c0e?q=80&w=2600&auto=format&fit=crop 2600w"
      sizes="100vw"
      alt="A calm wood desk with an open laptop, a potted plant, and a stack of notebooks by a sunlit window"
    />
    <div class="banner-fade" />
    <span class="banner-credit">Photo — Mikey Harris / Unsplash</span>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.banner {
  position: relative;
  width: 100%;
  height: clamp(380px, 58vw, 640px);
  overflow: hidden;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}
.banner-fade {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(36,49,38,0.08) 0%, rgba(247,246,241,0) 55%, var(--mg-bg-page) 100%);
}
.banner-credit {
  position: absolute;
  right: 1.4rem;
  bottom: .9rem;
  font-family: var(--mg-font-body);
  font-size: .64rem;
  letter-spacing: .04em;
  color: #fff;
  opacity: .8;
  text-shadow: 0 1px 4px rgba(0,0,0,.35);
}

@media (max-width: 600px) {
  .banner { height: 320px; }
}
</style>
