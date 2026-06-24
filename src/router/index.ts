import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView        from '@/views/HomeView.vue'
import AboutView       from '@/views/AboutView.vue'
import ProgrammingView from '@/views/ProgrammingView.vue'
import ResearchView    from '@/views/ResearchView.vue'
import JournalView     from '@/views/JournalView.vue'
import TravelView      from '@/views/TravelView.vue'
import MoodView        from '@/views/MoodView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/',                       component: HomeView        },
    { path: '/about',                  component: AboutView       },
    { path: '/journal',                component: JournalView     },
    { path: '/travel',                 component: TravelView      },
    { path: '/mood',                   component: MoodView        },
    { path: '/programming',            component: ProgrammingView },
    { path: '/programming/research',   component: ResearchView    },
  ],
  scrollBehavior: () => ({ top: 0 }),
})

export default router
