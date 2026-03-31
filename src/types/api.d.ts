// ========== 通用类型 ==========

// 通用响应结构
export interface Response<T = any> {
  code: number
  message: string
  data: T
}

// 分页参数
export interface PageParams {
  page?: number
  pageSize?: number
}

// 分页结果
export interface PageResult<T> {
  list: T[]
  total: number
  page: number
  pageSize: number
}

// ========== 用户类型 ==========

// 用户信息
export interface UserInfo {
  id: number
  username: string
  nickname?: string
  email?: string
  phone?: string
  avatar?: string
  role?: string
  status?: number
  createdAt?: string
  updatedAt?: string
}

// 登录请求
export interface LoginRequest {
  username: string
  password: string
}

// 登录响应
export interface LoginResponse {
  token: string
  userInfo: UserInfo
}

// 用户列表参数
export interface UserListParams extends PageParams {
  username?: string
  email?: string
  status?: number
}

// ========== 角色类型 ==========

// 角色信息
export interface RoleInfo {
  id: number
  name: string
  code: string
  description?: string
  status?: number
  createdAt?: string
  updatedAt?: string
}

// 角色列表参数
export interface RoleListParams extends PageParams {
  name?: string
  code?: string
  status?: number
}

// ========== 内容类型（用户端） ==========

// Hero卡片数据
export interface HeroCard {
  id: number
  title: string
  description: string
  image?: string
  link?: string
  order?: number
}

// 内容卡片数据
export interface ContentCard {
  id: number
  title: string
  description?: string
  image?: string
  link?: string
  category?: string
  order?: number
}
