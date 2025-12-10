import { createRouter, createWebHistory } from 'vue-router'
import {
  Main, PostPage, LoginPage,
  ForgotPasswordPage, RegistrationPage,
  AnalyticsPage, DashboardPage, PostCreatePage
} from '@/pages'
import { DashboardLayout, PostLayout } from '@/layouts'
import { DashboardIcon, AnalyticsIcon, PostsIcon } from "@/components/UI/icons.js";
// import AuthStore from '@/stores/auth.js'

const routes = [
  { name: 'Забыли пароль', path: '/forgot-password', component: ForgotPasswordPage, meta: { requiresAuth: false } },
  { name: 'Авторизация', path: '/login', component: LoginPage, meta: { requiresAuth: false } },
  { name: 'Добро пожаловать', path: '/', component: Main },
  { name: 'Регистрация', path: '/registration', component: RegistrationPage, meta: { requiresAuth: false } },
  {
    path: '/dashboard',
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        name: 'Dashboard',
        path: '', // Относительный путь
        component: DashboardPage,
        meta: {
          breadcrumb: 'Главный экран',
          icon: DashboardIcon,
          requiresAuth: true
        }
      },
      {
        path: 'posts', // Относительный путь
        component: PostLayout,
        meta: {
          requiresAuth: true,
          icon: PostsIcon
        },
        children: [
          {
            name: 'PostList',
            path: '', // Относительный путь - будет /dashboard/posts
            component: PostPage,
            meta: {
              breadcrumb: 'Список постов',
              requiresAuth: true
            }
          },
          {
            name: 'CreatePost',
            path: 'create', // Относительный путь - будет /dashboard/posts/create
            component: PostCreatePage,
            meta: {
              breadcrumb: 'Создание поста',
              requiresAuth: true
            }
          },
        ]
      },
      {
        name: 'Analytics',
        path: 'analytics', // Относительный путь
        component: AnalyticsPage,
        meta: {
          breadcrumb: 'Аналитика',
          icon: AnalyticsIcon,
          requiresAuth: true
        }
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Навигационные guard'ы
// router.beforeEach((to, from, next) => {
//   const isAuthenticated = AuthStore.getters.isAuthenticated
//
//   // Если маршрут требует авторизации и пользователь не авторизован
//   if (to.meta.requiresAuth && !isAuthenticated) {
//     return {
//       path: '/login',
//       // save the location we were at to come back later
//       query: { redirect: to.fullPath },
//     }
//   }
// })

export default router
