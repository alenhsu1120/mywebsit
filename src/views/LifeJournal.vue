<template>
  <div>
    
    <h1>Vue</h1>

    <p>這裡整理了 Vue Router 常見問題與解法：</p>

    <h2>1️⃣ 問題總結</h2>
    <ul>
      <li>點擊 Life Journal，打開的是空白頁或頁面沒內容</li>
      <li>原因：原本 &lt;a href="about:blank"&gt; 只是打開空白頁，沒有任何內容，原本沒有 Vue Router 所以無法控制頁面切換。</li>
      <li>加上 &lt;router-view /&gt; 後，頁面內容都不見了：
        <ul>
          <li>App.vue 裡 &lt;TheWelcome /&gt; 被 &lt;router-view /&gt; 取代，如果 router 沒掛載或路由組件錯誤，什麼都不顯示。</li>
          <li>Vue Router history base 和 Vite base 沒對齊，導致路由匹配不到組件。</li>
      </ul></li>
      <li>Vite base 設了 /mywebsit/，但 router 路由沒有設定 base → /mywebsit/life-journal 與 /mywebsit/ 顯示同樣內容。</li>
    </ul>

    <h2>2️⃣ 解決步驟</h2>
    <ol>
      <li><strong>安裝 Vue Router</strong><br/>
        <code>pnpm add vue-router@4</code> 或 <code>npm install vue-router@4</code>
      </li>
      <li><strong>建立 router/index.ts</strong><br/>
<pre>
import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
import LifeJournal from '@/views/LifeJournal.vue'

const routes = [
  { path: '/', component: TheWelcome },
  { path: '/life-journal', component: LifeJournal },
]

const router = createRouter({
  history: createWebHistory('/mywebsit/'), // 與 Vite base 相同
  routes,
})

export default router
</pre>
      </li>
      <li><strong>App.vue</strong><br/>
<pre>
&lt;main&gt;
  &lt;router-view /&gt; &lt;!-- 路由組件渲染位置 --&gt;
&lt;/main&gt;
</pre>
      </li>
      <li><strong>LifeJournal.vue</strong> 這個頁面就是你現在看的頁面</li>
      <li><strong>Vite base 設定</strong>
<pre>
// vite.config.ts
export default defineConfig({
  base: '/mywebsit/',
  plugins: [vue()],
  server: { host: true, port: 5174 }
})
</pre>
      </li>
      <li><strong>使用 router-link</strong>
<pre>
&lt;router-link to="/life-journal"&gt;Life Journal&lt;/router-link&gt;
</pre>
      </li>
    </ol>

    <h2>3️⃣ 測試流程</h2>
    <ul>
      <li>pnpm run dev</li>
      <li>打開瀏覽器 <code>http://localhost:5174/mywebsit/</code> → 首頁 TheWelcome 顯示</li>
      <li>點擊 Life Journal → URL 變成 <code>/mywebsit/life-journal</code> → LifeJournal 頁面顯示文字</li>
    </ul>

    <h2>✅ 關鍵點總結</h2>
    <ul>
      <li>Vite base 與 Vue Router history base 必須一致</li>
      <li>App.vue 需使用 &lt;router-view /&gt;</li>
      <li>路由組件路徑正確</li>
      <li>&lt;router-link&gt; 代替原本 &lt;a&gt;</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
// 無需任何邏輯
</script>

<style scoped>
h1 {
  color: #333;
}
h2 {
  color: #555;
  margin-top: 1.5rem;
}
p, li, pre {
  font-size: 0.9rem;
  line-height: 2.0;
}
pre {
  background: #f4f4f4;
  padding: 0.5rem;
  border-radius: 4px;
  overflow-x: auto;
}
ul, ol {
  margin-left: 1rem;
}
</style>