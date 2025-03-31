import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/pages/HomePage.vue'),
    meta: { title: 'Trang chủ' }
  },
  {
    path: '/products',
    name: 'products',
    component: () => import('@/pages/ProductsPage.vue'),
    meta: { title: 'Sản phẩm' }
  },
  {
    path: '/products/:id',
    name: 'product-detail',
    component: () => import('@/pages/ProductDetailPage.vue'),
    meta: { title: 'Chi tiết sản phẩm' }
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@/pages/CartPage.vue'),
    meta: { title: 'Giỏ hàng' }
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@/pages/CheckoutPage.vue'),
    meta: { title: 'Thanh toán' }
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@/pages/account/AccountLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/account/ProfilePage.vue'),
        meta: { title: 'Thông tin tài khoản' }
      },
      {
        path: 'orders',
        name: 'orders',
        component: () => import('@/pages/account/OrdersPage.vue'),
        meta: { title: 'Đơn hàng của tôi' }
      }
    ]
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/pages/auth/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
        meta: { title: 'Đăng nhập' }
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/RegisterPage.vue'),
        meta: { title: 'Đăng ký' }
      }
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/pages/NotFoundPage.vue'),
    meta: { title: 'Không tìm thấy trang' }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

// Navigation Guards
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = `${to.meta.title} - H24Store` || 'H24Store'

  // Check auth
  const isAuthenticated = localStorage.getItem('token')
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'login', query: { redirect: to.fullPath } })
  } else {
    next()
  }
})

export default router
