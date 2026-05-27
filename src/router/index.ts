import { createRouter, createWebHistory } from 'vue-router'
import HomeView       from '@/views/HomeView.vue'
import ProgrammingView from '@/views/ProgrammingView.vue'
import ResearchView   from '@/views/ResearchView.vue'

const router = createRouter({
  history: createWebHistory('/mywebsit/'),
  routes: [
    { path: '/',                       component: HomeView        },
    { path: '/programming',            component: ProgrammingView },
    { path: '/programming/research',   component: ResearchView    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
