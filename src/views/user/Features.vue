<template>
  <div :class="['features-page', themeStore.isLinear ? 'linear-bg' : '']">
    <div class="linear-blob linear-blob--primary"></div>
    <div class="linear-blob linear-blob--secondary"></div>
    <div class="linear-blob linear-blob--tertiary"></div>

    <div class="features-container linear-content container">
      <div class="page-header text-center linear-section">
        <span class="linear-badge mb-4">Capabilities</span>
        <h1 class="linear-h1 mb-4">功能特性</h1>
        <p class="linear-body-large">探索我们提供的强大功能</p>
      </div>

      <!-- Bento Grid always used now -->
      <div class="linear-bento">
        <div
          v-for="(feature, index) in features"
          :key="feature.title"
          class="linear-bento-span-3 linear-bento-row-1"
          :ref="el => cardRefs[index] = el"
          @mousemove="handleMouseMove"
        >
          <div class="linear-card linear-card--spotlight h-full">
            <div class="linear-card__spotlight"
              :style="{ left: `${spotlightPositions[index].x}px`, top: `${spotlightPositions[index].y}px` }"
            ></div>
            <div class="linear-card-content text-center">
              <el-icon :size="40" :color="feature.color"><component :is="feature.icon"></component></el-icon>
              <h3 class="linear-h3 mt-4 mb-2">{{ feature.title }}</h3>
              <p class="linear-body">{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useThemeStore } from '@/store'
import { Monitor, Lock, MagicStick, Setting, Cpu, Connection } from '@element-plus/icons-vue'

interface SpotlightPosition {
  x: number
  y: number
}

const themeStore = useThemeStore()

const features = [
  {
    title: '现代化架构',
    description: '基于 Vue 3 + TypeScript + Vite 构建，提供极佳的开发体验',
    icon: Monitor,
    color: 'var(--accent)'
  },
  {
    title: '权限管理',
    description: '完善的 RBAC 角色权限控制体系，灵活配置用户权限',
    icon: Lock,
    color: 'var(--success-color)'
  },
  {
    title: '丰富动效',
    description: '集成 GSAP 动画库，页面过渡流畅自然',
    icon: MagicStick,
    color: 'var(--warning-color)'
  },
  {
    title: '主题定制',
    description: '支持亮色/Linear 深色主题切换，满足不同场景需求',
    icon: Setting,
    color: 'var(--danger-color)'
  },
  {
    title: '响应式布局',
    description: '完美适配桌面端与移动端，提供一致的用户体验',
    icon: Cpu,
    color: 'var(--info-color)'
  },
  {
    title: '组件丰富',
    description: '基于 Element Plus 组件库，开箱即用的高质量组件',
    icon: Connection,
    color: 'var(--primary-color)'
  }
]

// Spotlight effect
const cardRefs = ref<(HTMLElement | null)[]>([])
const spotlightPositions = ref<SpotlightPosition[]>(
  features.map(() => ({ x: 150, y: 100 }))
)

const handleMouseMove = (event: MouseEvent) => {
  const index = cardRefs.value.findIndex(ref => ref === event.currentTarget)
  if (index >= 0) {
    const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
    spotlightPositions.value[index] = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }
}
</script>

<style scoped lang="scss">
.features-page {
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .text-center {
    text-align: center;
  }

  .mb-2 {
    margin-bottom: 8px;
  }

  .mb-4 {
    margin-bottom: 16px;
  }

  .mt-4 {
    margin-top: 16px;
  }

  .h-full {
    height: 100%;
  }

  .features-container {
  }

  .page-header {
    margin-bottom: 60px;
  }
}
</style>
