<template>
  <div class="user-layout">
    <!-- 顶部导航栏 -->
    <UserNavbar />

    <!-- 主内容区域 -->
    <main class="main-content">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="site-footer">
      <div class="footer-content container">
        <div class="footer-left">
          <p class="copyright">© {{ currentYear }} {{ appTitle }}. All rights reserved.</p>
        </div>
        <div class="footer-right">
          <span class="footer-badge">Built with Vue 3 + TypeScript</span>
        </div>
      </div>
    </footer>

    <!-- 底部导航栏（移动端） -->
    <UserTabbar />
  </div>
</template>

<script setup lang="ts">
import UserNavbar from '@/components/user/Navbar.vue'
import UserTabbar from '@/components/user/Tabbar.vue'

const currentYear = new Date().getFullYear()
const appTitle = import.meta.env.VITE_APP_TITLE || 'CRUD Template'
</script>

<style scoped lang="scss">
.user-layout {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color);
}

.main-content {
  flex: 1;
  overflow-x: hidden;

  // 移动端给底部导航留出空间
  @media (max-width: 768px) {
    padding-bottom: 70px;
  }
}

.site-footer {
  border-top: 1px solid var(--border-default);
  padding: 24px 0;
  background-color: var(--background-base);

  .footer-content {
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media (max-width: 768px) {
      flex-direction: column;
      gap: 12px;
      text-align: center;
    }
  }

  .copyright {
    margin: 0;
    font-size: 14px;
    color: var(--foreground-muted);
  }

  .footer-badge {
    display: inline-block;
    padding: 4px 12px;
    font-size: 12px;
    color: var(--foreground-muted);
    background-color: var(--surface);
    border: 1px solid var(--border-default);
    border-radius: 9999px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
}
</style>
