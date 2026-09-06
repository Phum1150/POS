import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/Homepage.vue'
// import AddPage from '@/pages/AddPage.vue'
// import EditPage from '@/pages/EditPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router