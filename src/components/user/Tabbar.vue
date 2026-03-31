<template>
  <div class="user-tabbar" v-if="isMobile">
    <router-link
      v-for="item in tabbarItems"
      :key="item.path"
      :to="item.path"
      class="tabbar-item"
      active-class="active"
    >
      <el-icon :size="24">
        <component :is="item.icon" />
      </el-icon>
      <span>{{ item.title }}</span>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { House, Document, Setting } from '@element-plus/icons-vue'

const isMobile = ref(false)

const tabbarItems = [
  { path: '/', title: '首页', icon: House },
  { path: '/features', title: '功能', icon: Document },
  { path: '/about', title: '我的', icon: Setting }
]

const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped lang="scss">
.user-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 60px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-top: 1px solid var(--border-color);
  z-index: 1000;
  padding-bottom: env(safe-area-inset-bottom);

  [data-theme='dark'] & {
    background: rgba(45, 45, 45, 0.95);
  }

  .tabbar-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    color: var(--text-secondary);
    text-decoration: none;
    font-size: 12px;
    transition: var(--transition-base);

    &.active {
      color: var(--primary-color);
    }

    &:hover {
      color: var(--primary-color);
    }
  }
}
</style>
