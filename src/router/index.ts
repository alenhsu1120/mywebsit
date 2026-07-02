import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView          from '@/views/HomeView.vue'
import AboutView         from '@/views/AboutView.vue'
import ProgrammingView   from '@/views/ProgrammingView.vue'
import ResearchView      from '@/views/ResearchView.vue'
import JournalView       from '@/views/JournalView.vue'
import JournalDiaryView  from '@/views/JournalDiaryView.vue'
import MoodDiaryView     from '@/views/MoodDiaryView.vue'
import EyesView          from '@/views/EyesView.vue'
import PrivateView       from '@/views/PrivateView.vue'
import TravelView        from '@/views/TravelView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                       component: HomeView,        meta: { bare: true } },
    { path: '/private',                component: PrivateView,     meta: { bare: true } },
    { path: '/about',                  component: AboutView       },
    { path: '/journal',                component: JournalView,     meta: { bare: true } },
    { path: '/journal/entries',        component: JournalDiaryView, meta: { bare: true } },
    { path: '/journal/mood',           component: MoodDiaryView,   meta: { bare: true } },
    { path: '/journal/eyes',           component: EyesView,        meta: { bare: true } },
    { path: '/travel',                 component: TravelView,      meta: { bare: true } },
    { path: '/programming',            component: ProgrammingView, meta: { bare: true } },
    { path: '/programming/research',   component: ResearchView,    meta: { bare: true } },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
