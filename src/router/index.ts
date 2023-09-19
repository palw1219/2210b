import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    children: [
      {
        path: '/users',
        name: 'users',
        component: () => import('../views/users.vue'),
        meta: {
          title: ['用户管理', '用户列表']
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('token')
  if (!token && to.path == '/about') {
    next('/')
  } else {
    next()
  }
})

export default router
