import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// ========== 用户端路由端路由 ==========
export const userRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'UserLayout',
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '',
        name: 'UserHome',
        component: () => import('@/views/user/Home.vue'),
        meta: { title: '首页' }
      },
      {
        path: 'features',
        name: 'Features',
        component: () => import('@/views/user/Features.vue'),
        meta: { title: '功能特性' }
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('@/views/user/About.vue'),
        meta: { title: '关于我们' }
      }
    ]
  }
]

// ========== 管理员端路由端路由 ==========
export const adminRoutes: RouteRecordRaw[] = [
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('@/views/admin/Login.vue'),
    meta: { title: '登录', requiresAuth: false }
  },
  {
    path: '/admin',
    name: 'AdminLayout',
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/admin/dashboard',
    meta: { 
      title: '管理后台', 
      requiresAuth: true,
      roles: ['admin'] // 要求管理员角色
    },
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/admin/Dashboard.vue'),
        meta: { title: '仪表盘', icon: 'DataLine', roles: ['admin'] }
      },
      {
        path: 'user',
        name: 'UserManage',
        component: () => import('@/views/admin/UserManage.vue'),
        meta: { title: '用户管理', icon: 'User', roles: ['admin'] }
      },
      {
        path: 'role',
        name: 'RoleManage',
        component: () => import('@/views/admin/RoleManage.vue'),
        meta: { title: '角色管理', icon: 'Lock', roles: ['admin'] }
      }
    ]
  }
]

// ========== 404路由（必须放在最后） ==========
export const errorRoutes: RouteRecordRaw[] = [
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { title: '404' }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404'
  }
]

// 创建路由
const router = createRouter({
  history: createWebHistory(),
  routes: [...userRoutes, ...adminRoutes, ...errorRoutes]
})

// 扩展路由元信息类型
declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    requiresAuth?: boolean
    roles?: string[] // 权限角色列表
    icon?: string
  }
}

// 存储待跳转的路由
let pendingRoute: string | null = null

// 路由守卫
router.beforeEach(async (to, from, next) => {
  const token = localStorage.getItem('token')
  const isLoggedIn = !!token

  // 设置页面标题
  document.title = `${to.meta.title || '页面'} - ${import.meta.env.VITE_APP_TITLE}`

  // 1. 如果路由不需要认证，直接放行
  if (to.meta.requiresAuth === false) {
    // 已登录用户访问登录页，重定向到仪表盘
    if (to.path === '/admin/login' && isLoggedIn) {
      next('/admin/dashboard')
      return
    }
    next()
    return
  }

  // 2. 如果路由需要认证，检查登录状态
  if (to.meta.requiresAuth !== false && !isLoggedIn) {
    // 未登录，保存目标路由，重定向到登录页
    pendingRoute = to.fullPath
    next('/admin/login')
    return
  }

  // 3. 已登录，验证Token有效性并获取用户信息
  try {
    // 动态导入userStore避免循环依赖
    const { useUserStore } = await import('@/store')
    const userStore = useUserStore()

    // 如果没有用户信息，尝试获取
    if (!userStore.userInfo) {
      await userStore.fetchUserInfo()
    }

    // 4. 检查角色权限
    if (to.meta.roles && to.meta.roles.length > 0) {
      const userRole = userStore.role || 'user'
      
      // 检查用户角色是否在允许的角色列表中
      if (!to.meta.roles.includes(userRole)) {
        console.error(`权限不足: 需要 ${to.meta.roles.join(',')}, 当前 ${userRole}`)
        next('/403') // 重定向到403页面
        return
      }
    }

    // 5. 权限验证通过，允许访问
    next()
  } catch (error) {
    // Token验证失败，清除token并重定向到登录页
    console.error('Token验证失败:', error)
    localStorage.removeItem('token')
    const { useUserStore } = await import('@/store')
    const userStore = useUserStore()
    userStore.logout()
    
    pendingRoute = to.fullPath
    next('/admin/login')
  }
})

// 导出获取待跳转路由的方法
export const getPendingRoute = () => pendingRoute
export const clearPendingRoute = () => { pendingRoute = null }

export default router
