<template>
  <div class="user-layout">
    <!-- 顶部导航栏 -->
    <UserNavbar />

    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 底部导航栏（移动端） -->
    <UserTabbar />
  </div>
</template>

<script setup lang="ts">
import UserNavbar from '@/components/user/Navbar.vue'
import UserTabbar from '@/components/user/Tabbar.vue'
import { onMounted } from 'vue'

onMounted(() => {
  console.log('用户端布局加载')
})
</script>

<style scoped lang="scss">
.user-layout {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.main-content {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
