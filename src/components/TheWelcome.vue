<template>
  <div class="page-container">
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon class="icon-large" />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener">Life Journal</a>
      </template>
      <p class="welcome-text">
        Vue’s
        <a href="https://vuejs.org/" target="_blank" rel="noopener">official documentation</a>
        provides you with all information you need to get started.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener">Game Log</a>
      </template>
      <p class="welcome-text">
      This project is served and bundled with
      <a href="https://vite.dev/guide/features.html" target="_blank" rel="noopener">Vite</a>.
        More instructions are available in
        <a href="javascript:void(0)" @click="openReadmeInEditor"><code>README.md</code></a>.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <EcosystemIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener">Programming</a>
      </template>
      <p class="welcome-text">
        Get official tools and libraries for your project:
        <a href="https://pinia.vuejs.org/" target="_blank" rel="noopener">Pinia</a>,
        <a href="https://router.vuejs.org/" target="_blank" rel="noopener">Vue Router</a>, etc.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener">Psychology Articles</a>
      </template>
      <p class="welcome-text">
        Got stuck? Ask your question on
        <a href="https://chat.vuejs.org" target="_blank" rel="noopener">Vue Land</a>.
      </p>
    </WelcomeItem>
  </div>
</template>

<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import DocumentationIcon from './icons/IconDocumentation.vue'
import ToolingIcon from './icons/IconTooling.vue'
import EcosystemIcon from './icons/IconEcosystem.vue'
import SupportIcon from './icons/IconSupport.vue'
import logo from '@/assets/back.png'

const openReadmeInEditor = () => fetch('/__open-in-editor?file=README.md')
</script>

<style scoped>
.page-container {
  position: relative;
  width: 100%;       /* 滿寬 */
  min-height: 100vh; /* 至少滿螢幕高度 */
  padding: 2rem;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), /* 半透明白覆蓋 */
    url('@/assets/back.png');
  background-repeat: no-repeat;
  background-position: right 100px top 160px;
  background-size: 320px auto;
}

.welcome-text {
  font-size: 0.8rem; /* 文字變大 */
  line-height: 1.1;  /* 可選：增加行距 */
}
</style>