<template>
  <nav class="user-navbar" ref="navbarRef">
    <div class="navbar-container">
      <!-- Logo -->
      <div class="navbar-logo">
        <router-link to="/">
          <h1>{{ title }}</h1>
        </router-link>
      </div>

      <!-- 菜单 -->
      <div class="navbar-menu">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="menu-item"
          :class="{ active: isActive(item.path) }"
        >
          {{ item.title }}
        </router-link>
      </div>

      <!-- 右侧操作区 -->
      <div class="navbar-actions">
        <!-- 主题切换: light ↔ dark (linear) -->
        <el-button
          :icon="getThemeIcon()"
          circle
          @click="themeStore.toggleTheme()"
          :title="getThemeName()"
        />

        <!-- 用户信息 -->
        <el-dropdown @command="handleCommand">
          <div class="user-avatar">
            <el-avatar :src="userStore.avatar" :size="32">
              {{ userStore.username.charAt(0).toUpperCase() }}
            </el-avatar>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="profile">个人中心</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useThemeStore, useUserStore } from '@/store'
import { ElMessage } from 'element-plus'
import { Moon, Sunny } from '@element-plus/icons-vue'
import gsap from 'gsap'

const router = useRouter()
const route = useRoute()
const themeStore = useThemeStore()
const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE
const navbarRef = ref<HTMLElement>()

const menuItems = [
  { path: '/', title: '首页' },
  { path: '/features', title: '功能特性' },
  { path: '/about', title: '关于我们' }
]

// 判断当前路由是否激活
const isActive = (path: string) => {
  if (path === '/') {
    return route.path === '/'
  }
  return route.path === path
}

const getThemeIcon = () => {
  return themeStore.isDark ? Moon : Sunny
}

const getThemeName = () => {
  return themeStore.isDark ? '暗色模式' : '亮色模式'
}

const handleCommand = (command: string) => {
  switch (command) {
    case 'profile':
      router.push('/profile')
      break
    case 'logout':
      userStore.logout()
      router.push('/admin/login')
      ElMessage.success('已退出登录')
      break
  }
}

// GSAP进入动画
onMounted(() => {
  if (navbarRef.value) {
    gsap.from(navbarRef.value, {
      y: -100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })
  }
})
</script>

<style scoped lang="scss">
.user-navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: var(--header-bg);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border-color);
  transition: var(--transition-base);

  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .navbar-logo {
    h1 {
      margin: 0;
      font-size: 24px;
      font-weight: bold;
      font-family: 'Arial', sans-serif;
      background: linear-gradient(135deg, var(--primary-color) 0%, #764ba2 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;

      a {
        text-decoration: none;
        color: inherit;
      }
    }
  }

  .navbar-menu {
    display: flex;
    gap: 30px;

    .menu-item {
      font-size: 16px;
      color: var(--text-regular);
      text-decoration: none;
      position: relative;
      padding: 5px 0;
      transition: var(--transition-base);

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 2px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        transition: width 0.3s;
      }

      &:hover,
      &.active {
        color: var(--primary-color);

        &::after {
          width: 100%;
        }
      }
    }
  }

  .navbar-actions {
    display: flex;
    align-items: center;
    gap: 15px;

    .user-avatar {
      cursor: pointer;
      padding: 5px;
      border-radius: 50%;
      transition: var(--transition-base);

      &:hover {
        background: var(--bg-color);
      }
    }
  }

  @media (max-width: 768px) {
    .navbar-menu {
      display: none;
    }

    .navbar-container {
      padding: 0 12px;
      height: 56px;
    }

    .navbar-logo h1 {
      font-size: 20px;
    }

    .navbar-actions {
      gap: 10px;
    }
  }
}
</style>
