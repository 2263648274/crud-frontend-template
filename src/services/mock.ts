import type {
  LoginRequest,
  LoginResponse,
  UserListParams,
  PageResult,
  UserInfo,
  RoleListParams,
  RoleInfo,
  HeroCard,
  ContentCard
} from '@/types'

// ========== Mock用户数据 ==========

const mockUsers: UserInfo[] = [
  {
    id: 1,
    username: 'admin',
    nickname: '超级管理员',
    email: 'admin@example.com',
    phone: '13800138000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'admin',
    status: 1,
    createdAt: '2026-01-01 00:00:00',
    updatedAt: '2026-03-30 12:00:00'
  },
  {
    id: 2,
    username: 'user001',
    nickname: '张三',
    email: 'zhangsan@example.com',
    phone: '13900139000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user001',
    role: 'user',
    status: 1,
    createdAt: '2026-02-01 12:00:00',
    updatedAt: '2026-03-30 12:00:00'
  },
  {
    id: 3,
    username: 'user002',
    nickname: '李四',
    email: 'lisi@example.com',
    phone: '13700137000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=user002',
    role: 'user',
    status: 0,
    createdAt: '2026-02-15 12:00:00',
    updatedAt: '2026-03-30 12:00:00'
  },
  {
    id: 4,
    username: 'manager',
    nickname: '王五',
    email: 'wangwu@example.com',
    phone: '13600136000',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=manager',
    role: 'manager',
    status: 1,
    createdAt: '2026-03-01 12:00:00',
    updatedAt: '2026-03-30 12:00:00'
  }
]

// ========== Mock角色数据 ==========

const mockRoles: RoleInfo[] = [
  {
    id: 1,
    name: '超级管理员',
    code: 'admin',
    description: '拥有系统所有权限',
    status: 1,
    createdAt: '2026-01-01 00:00:00'
  },
  {
    id: 2,
    name: '管理员',
    code: 'manager',
    description: '拥有部分管理权限',
    status: 1,
    createdAt: '2026-01-01 00:00:00'
  },
  {
    id: 3,
    name: '普通用户',
    code: 'user',
    description: '普通用户权限',
    status: 1,
    createdAt: '2026-01-01 00:00:00'
  }
]

// ========== Mock Hero卡片数据 ==========

const mockHeroCards: HeroCard[] = [
  {
    id: 1,
    title: '欢迎使用通用前端CRUD模板',
    description: '基于 Vue3 + TypeScript + GSAP 的现代化前端解决方案',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    link: '#',
    order: 1
  },
  {
    id: 2,
    title: '极速开发体验',
    description: 'Vite 构建工具提供极致的开发体验',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    link: '#',
    order: 2
  },
  {
    id: 3,
    title: '类型安全保障',
    description: 'TypeScript 提供完整的类型安全',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800',
    link: '#',
    order: 3
  }
]

// ========== Mock内容卡片数据 ==========

const mockContentCards: ContentCard[] = [
  {
    id: 1,
    title: 'Vue3 Composition API',
    description: '组合式API让代码更简洁、更灵活',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400',
    link: '#',
    category: '前端技术',
    order: 1
  },
  {
    id: 2,
    title: 'TypeScript',
    description: '强类型系统提升代码质量',
    image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400',
    link: '#',
    category: '前端技术',
    order: 2
  },
  {
    id: 3,
    title: 'Pinia状态管理',
    description: 'Vue3官方推荐的新一代状态管理方案',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    link: '#',
    category: '前端技术',
    order: 3
  },
  {
    id: 4,
    title: 'GSAP动画',
    description: '专业级动画库，60fps流畅体验',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400',
    link: '#',
    category: '动画技术',
    order: 4
  },
  {
    id: 5,
    title: 'Element Plus',
    description: '成熟的UI组件库，提升开发效率',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    link: '#',
    category: 'UI组件',
    order: 5
  },
  {
    id: 6,
    title: 'Vite构建工具',
    description: '极速的热更新和打包构建',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400',
    link: '#',
    category: '工程化',
    order: 6
  }
]

// ========== Mock API函数 ==========

export const mockLogin = (data: LoginRequest): LoginResponse => {
  const user = mockUsers.find(u => u.username === data.username)
  if (!user) {
    throw new Error('用户不存在')
  }
  return {
    token: `mock-token-${Date.now()}`,
    userInfo: user
  }
}

export const mockGetUserList = (params: UserListParams): PageResult<UserInfo> => {
  let filtered = [...mockUsers]

  if (params.username) {
    filtered = filtered.filter(u => u.username.includes(params.username!))
  }
  if (params.email) {
    filtered = filtered.filter(u => u.email?.includes(params.email!))
  }
  if (params.status !== undefined) {
    filtered = filtered.filter(u => u.status === params.status)
  }

  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize
  }
}

export const mockGetRoleList = (params: RoleListParams): PageResult<RoleInfo> => {
  let filtered = [...mockRoles]

  if (params.name) {
    filtered = filtered.filter(r => r.name.includes(params.name!))
  }
  if (params.code) {
    filtered = filtered.filter(r => r.code.includes(params.code!))
  }
  if (params.status !== undefined) {
    filtered = filtered.filter(r => r.status === params.status)
  }

  const page = params.page || 1
  const pageSize = params.pageSize || 10
  const start = (page - 1) * pageSize
  const end = start + pageSize

  return {
    list: filtered.slice(start, end),
    total: filtered.length,
    page,
    pageSize
  }
}

export const mockGetHeroCards = (): HeroCard[] => {
  return [...mockHeroCards]
}

export const mockGetContentCards = (): ContentCard[] => {
  return [...mockContentCards]
}
