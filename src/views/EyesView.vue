<template>
  <div class="eyes-wrap">

    <RouterLink to="/journal" class="back-link">‹ 返回</RouterLink>

    <div class="page-title">
      <h2>Eyes</h2>
      <p>即將開放 · Coming Soon</p>
    </div>

    <div class="empty-state">
      <span class="empty-icon">🌿</span>
      <p>這裡還是一片空白，敬請期待。</p>
    </div>

  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.eyes-wrap {
  width: 100%;
  max-width: 720px;
  padding: 0 2rem 3rem;
  animation: card-rise .5s cubic-bezier(.16,1,.3,1) both;
}

.back-link {
  display: inline-block;
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: .75rem;
  letter-spacing: .15em;
  color: #3d5440;
  text-decoration: none;
  padding: .3rem 0;
  margin-bottom: 1.4rem;
  opacity: .75;
  transition: opacity .2s, color .2s;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}
.back-link:hover { opacity: 1; color: #1b3a28; }

.page-title { margin-bottom: 1.8rem; }
.page-title h2 {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-size: clamp(1.4rem, 4vw, 2rem);
  color: #162a1e;
  text-shadow: 0 1px 0 rgba(255,255,255,.9), 0 2px 10px rgba(255,255,255,.5);
  margin-bottom: .35rem;
}
.page-title p {
  font-family: 'Poppins', 'Noto Sans TC', sans-serif;
  font-style: italic;
  font-size: .95rem;
  color: #6a8870;
  text-shadow: 0 1px 3px rgba(255,255,255,.7);
}

.empty-state { text-align: center; padding: 3rem 1rem; opacity: .6; }
.empty-icon { font-size: 2.5rem; margin-bottom: .7rem; display: block; }
.empty-state p { font-family: 'Poppins', 'Noto Sans TC', sans-serif; font-style: italic; color: #6a8870; }
</style>
