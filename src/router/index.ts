import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView          from '@/views/HomeView.vue'
import AboutView         from '@/views/AboutView.vue'
import ProgrammingView   from '@/views/ProgrammingView.vue'
import ResearchView      from '@/views/ResearchView.vue'
import JournalView       from '@/views/JournalView.vue'
import JournalDiaryView  from '@/views/JournalDiaryView.vue'
import MoodDiaryView     from '@/views/MoodDiaryView.vue'
import EyesView          from '@/views/EyesView.vue'
import TravelView        from '@/views/TravelView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                       component: HomeView,        meta: { bare: true } },
    { path: '/about',                  component: AboutView       },
    { path: '/journal',                component: JournalView     },
    { path: '/journal/entries',        component: JournalDiaryView },
    { path: '/journal/mood',           component: MoodDiaryView   },
    { path: '/journal/eyes',           component: EyesView        },
    { path: '/travel',                 component: TravelView      },
    { path: '/programming',            component: ProgrammingView },
    { path: '/programming/research',   component: ResearchView    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
