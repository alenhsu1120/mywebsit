<template>
  <div class="page-container">
    <WelcomeItem>
      <template #icon>
        <DocumentationIcon class="icon-large" />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener" class="bold-black">
          Life Journal
        </a>
      </template>
      <p class="welcome-text">
        To be filled.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <ToolingIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener" class="bold-black">
          Game Log
        </a>
      </template>
      <p class="welcome-text">
        To be filled.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <EcosystemIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener" class="bold-black">
          Programming
        </a>
      </template>
      <p class="welcome-text">
        To be filled.
      </p>
    </WelcomeItem>

    <WelcomeItem>
      <template #icon>
        <SupportIcon />
      </template>
      <template #heading>
        <a href="about:blank" rel="noopener" class="bold-black">
          Psychology Articles
        </a>
      </template>
      <p class="welcome-text">
        To be filled.
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
    linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.6)), /* 半透明白覆蓋 */
    url('@/assets/back.png');
  background-repeat: no-repeat;
  background-position: right 50px top 250px;
  background-size: 320px auto;
}

.welcome-text {
  font-size: 0.8rem; /* 文字變大 */
  line-height: 1.1;  /* 可選：增加行距 */
}

.bold-black {
  font-weight: bold;
  color: #666; /* 改成灰色 */
}
</style>