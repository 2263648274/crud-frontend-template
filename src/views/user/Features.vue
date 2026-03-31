<template>
  <div class="features-page">
    <div class="features-container">
      <div class="page-header">
        <h1>功能特性</h1>
        <p>探索我们提供的强大功能</p>
      </div>

      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-card">
          <el-icon :size="40" :color="feature.color"><component :is="feature.icon" /></el-icon>
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Monitor, Lock, MagicStick, Setting, Cpu, Connection } from '@element-plus/icons-vue'

const features = [
  {
    title: '现代化架构',
    description: '基于 Vue 3 + TypeScript + Vite 构建，提供极佳的开发体验',
    icon: Monitor,
    color: '#409eff'
  },
  {
    title: '权限管理',
    description: '完善的 RBAC 角色权限控制体系，灵活配置用户权限',
    icon: Lock,
    color: '#67c23a'
  },
  {
    title: '丰富动效',
    description: '集成 GSAP 动画库，页面过渡流畅自然',
    icon: MagicStick,
    color: '#e6a23c'
  },
  {
    title: '主题定制',
    description: '支持亮色/暗色主题切换，满足不同场景需求',
    icon: Setting,
    color: '#f56c6c'
  },
  {
    title: '响应式布局',
    description: '完美适配桌面端与移动端，提供一致的用户体验',
    icon: Cpu,
    color: '#909399'
  },
  {
    title: '组件丰富',
    description: '基于 Element Plus 组件库，开箱即用的高质量组件',
    icon: Connection,
    color: '#764ba2'
  }
]
</script>

<style scoped lang="scss">
.features-page {
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
}

.features-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 60px;

  h1 {
    font-size: 36px;
    font-weight: bold;
    color: var(--text-primary);
    margin: 0 0 16px 0;
  }

  p {
    font-size: 18px;
    color: var(--text-secondary);
    margin: 0;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 32px;
  text-align: center;
  transition: var(--transition-base);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 20px 0 12px 0;
  }

  p {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }
}
</style>
