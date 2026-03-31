import request from './request'
import {
  mockLogin,
  mockGetUserList,
  mockGetRoleList,
  mockGetHeroCards,
  mockGetContentCards
} from './mock'
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

const isMockEnabled = import.meta.env.VITE_APP_MOCK_ENABLED === 'true'

// ========== 用户相关API ==========

export const login = (data: LoginRequest): Promise<LoginResponse> => {
  if (isMockEnabled) {
    return Promise.resolve(mockLogin(data))
  }
  return request<LoginResponse>({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const getUserInfo = (): Promise<UserInfo> => {
  if (isMockEnabled) {
    return Promise.resolve({
      id: 1,
      username: 'admin',
      nickname: '超级管理员',
      email: 'admin@example.com',
      role: 'admin',
      status: 1
    })
  }
  return request<UserInfo>({
    url: '/user/info',
    method: 'get'
  })
}

export const getUserList = (params: UserListParams): Promise<PageResult<UserInfo>> => {
  if (isMockEnabled) {
    return Promise.resolve(mockGetUserList(params))
  }
  return request<PageResult<UserInfo>>({
    url: '/user/list',
    method: 'get',
    params
  })
}

export const createUser = (data: Partial<UserInfo>): Promise<{ id: number }> => {
  return request<{ id: number }>({
    url: '/user/create',
    method: 'post',
    data
  })
}

export const updateUser = (id: number, data: Partial<UserInfo>): Promise<boolean> => {
  return request<boolean>({
    url: `/user/update/${id}`,
    method: 'put',
    data
  })
}

export const deleteUser = (id: number): Promise<boolean> => {
  return request<boolean>({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}

// ========== 角色相关API ==========

export const getRoleList = (params: RoleListParams): Promise<PageResult<RoleInfo>> => {
  if (isMockEnabled) {
    return Promise.resolve(mockGetRoleList(params))
  }
  return request<PageResult<RoleInfo>>({
    url: '/role/list',
    method: 'get',
    params
  })
}

export const createRole = (data: Partial<RoleInfo>): Promise<{ id: number }> => {
  return request<{ id: number }>({
    url: '/role/create',
    method: 'post',
    data
  })
}

export const updateRole = (id: number, data: Partial<RoleInfo>): Promise<boolean> => {
  return request<boolean>({
    url: `/role/update/${id}`,
    method: 'put',
    data
  })
}

export const deleteRole = (id: number): Promise<boolean> => {
  return request<boolean>({
    url: `/role/delete/${id}`,
    method: 'delete'
  })
}

// ========== 用户端内容API ==========

export const getHeroCards = (): Promise<HeroCard[]> => {
  if (isMockEnabled) {
    return Promise.resolve(mockGetHeroCards())
  }
  return request<HeroCard[]>({
    url: '/content/hero',
    method: 'get'
  })
}

export const getContentCards = (): Promise<ContentCard[]> => {
  if (isMockEnabled) {
    return Promise.resolve(mockGetContentCards())
  }
  return request<ContentCard[]>({
    url: '/content/cards',
    method: 'get'
  })
}
