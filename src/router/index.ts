import { createRouter, createWebHistory } from 'vue-router'
import TheWelcome from '@/components/TheWelcome.vue'
import LifeJournal from '@/views/LifeJournal.vue'

const routes = [
  { path: '/', component: TheWelcome },          // 首頁
  { path: '/life-journal', component: LifeJournal } // Life Journal 頁面
]

const router = createRouter({
  // 這裡一定要加上和 Vite 一樣的 base
  history: createWebHistory('/mywebsit/'),
  routes,
})

export default router