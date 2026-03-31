<template>
  <div class="user-home linear-bg">
    <!-- Animated gradient blobs for Linear design -->
    <div class="linear-blob linear-blob--primary"></div>
    <div class="linear-blob linear-blob--secondary"></div>
    <div class="linear-blob linear-blob--tertiary"></div>
    <div class="linear-blob linear-blob--bottom"></div>

    <div class="linear-content container">
      <!-- Hero Section with Parallax -->
      <section class="linear-section">
        <div class="hero-wrapper" :style="parallaxStyle">
          <span class="linear-badge mb-6">CRUD Frontend Template</span>
          <h1 class="linear-display mb-6">
            Build <span class="linear-gradient-text">modern</span><br>
            web applications
          </h1>
          <p class="linear-body-large mb-8 max-w-2xl">
            通用前端CRUD标准模板，基于 Vue 3 + TypeScript + Vite 构建，支持双端架构，开箱即用。
          </p>
          <div class="flex gap-4">
            <button class="linear-btn linear-btn--primary" @click="goToAdmin">
              进入管理后台
            </button>
            <button class="linear-btn linear-btn--secondary" @click="scrollToFeatures">
              了解特性
            </button>
          </div>
        </div>
      </section>

      <!-- Features Bento Grid -->
      <section id="features" class="linear-section">
        <div class="mb-12">
          <h2 class="linear-h2 mb-4">核心特性</h2>
          <p class="linear-body-large text-foreground-muted">精心设计的开发体验，让CRUD变得简单优雅。</p>
        </div>
        <div class="linear-bento">
          <!-- Large hero card -->
          <div class="linear-bento-span-4 linear-bento-row-2" @mousemove="(e) => updateSpotlight(spotlight1, e)">
            <div class="linear-card linear-card--spotlight h-full">
              <div class="linear-card__spotlight"
                :style="{ left: `${spotlight1.x}px`, top: `${spotlight1.y}px` }">
              </div>
              <div class="linear-card-content flex flex-col h-full justify-end">
                <h3 class="linear-h3 mb-3">Vue 3 驱动</h3>
                <p class="linear-body">
                  使用最新的 Composition API + &lt;script setup&gt; 语法，类型安全，开发高效。
                </p>
              </div>
            </div>
          </div>

          <!-- Small cards -->
          <div class="linear-bento-span-2 linear-bento-row-1" @mousemove="(e) => updateSpotlight(spotlight2, e)">
            <div class="linear-card linear-card--spotlight">
              <div class="linear-card__spotlight"
                :style="{ left: `${spotlight2.x}px`, top: `${spotlight2.y}px` }">
              </div>
              <div class="linear-card-content">
                <h3 class="linear-h3 mb-2">TypeScript</h3>
                <p class="linear-body">全程类型推导，更好的IDE支持。</p>
              </div>
            </div>
          </div>

          <div class="linear-bento-span-2 linear-bento-row-1" @mousemove="(e) => updateSpotlight(spotlight3, e)">
            <div class="linear-card linear-card--spotlight">
              <div class="linear-card__spotlight"
                :style="{ left: `${spotlight3.x}px`, top: `${spotlight3.y}px` }">
              </div>
              <div class="linear-card-content">
                <h3 class="linear-h3 mb-2">双端架构</h3>
                <p class="linear-body">用户端+管理员端分离。</p>
              </div>
            </div>
          </div>

          <div class="linear-bento-span-2 linear-bento-row-1" @mousemove="(e) => updateSpotlight(spotlight4, e)">
            <div class="linear-card linear-card--spotlight">
              <div class="linear-card__spotlight"
                :style="{ left: `${spotlight4.x}px`, top: `${spotlight4.y}px` }">
              </div>
              <div class="linear-card-content">
                <h3 class="linear-h3 mb-2">Element Plus</h3>
                <p class="linear-body">成熟的企业级组件库。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Tech Stack Section -->
      <section class="linear-section">
        <div class="mb-12">
          <h2 class="linear-h2 mb-4">技术栈</h2>
          <p class="linear-body-large text-foreground-muted">现代化前端工程化开发体验。</p>
        </div>
        <div class="tech-stack-grid">
          <div v-for="tech in techStack" :key="tech.name" class="tech-card">
            <div class="tech-icon">
              <el-icon :size="32" :color="tech.color">
                <component :is="tech.icon" />
              </el-icon>
            </div>
            <div class="tech-info">
              <h3 class="tech-name">{{ tech.name }}</h3>
              <p class="tech-desc">{{ tech.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Quick Start Section -->
      <section class="linear-section">
        <div class="quick-start-card linear-card">
          <div class="quick-start-content">
            <div>
              <h2 class="linear-h2 mb-4">快速开始</h2>
              <p class="linear-body mb-6 text-foreground-muted">
                两步即可开始你的项目，基于模板快速开发。
              </p>
              <div class="code-block">
                <pre><code>git clone https://github.com/2263648274/crud-frontend-template.git
npm install && npm run dev</code></pre>
              </div>
            </div>
            <div class="quick-start-stats">
              <div class="stat-item" v-for="stat in stats" :key="stat.label">
                <div class="stat-number">{{ stat.value }}</div>
                <div class="stat-label">{{ stat.label }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA Section -->
      <section class="linear-section mb-12">
        <div class="cta-card">
          <h2 class="linear-h1 mb-4">开始构建你的项目吧</h2>
          <p class="linear-body-large mb-8">基于现代化的 CRUD 模板，快速开发你的下一个项目</p>
          <div class="flex gap-4">
            <a href="https://github.com" target="_blank" rel="noopener" class="linear-btn linear-btn--primary">
              获取源码
            </a>
            <router-link to="/profile" class="linear-btn linear-btn--outline">
              进入个人中心
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useParallax } from '@/composables/useParallax'
import {
  House,
  Document,
  Lightning,
  Grid,
  DataLine,
  Connection
} from '@element-plus/icons-vue'

const router = useRouter()

// Parallax for hero
const heroRef = ref<HTMLElement>()
const { y, opacity, scale } = useParallax(heroRef.value || null, {
  speed: 100,
  startOpacity: 1,
  endOpacity: 0.3,
  startScale: 1,
  endScale: 0.95
})

const parallaxStyle = computed(() => ({
  transform: `translateY(${y.value}px) scale(${scale.value})`,
  opacity: opacity.value
}))

// Spotlight effect for cards
interface SpotlightPosition {
  x: number
  y: number
}

const spotlight1 = ref<SpotlightPosition>({ x: 0, y: 0 })
const spotlight2 = ref<SpotlightPosition>({ x: 0, y: 0 })
const spotlight3 = ref<SpotlightPosition>({ x: 0, y: 0 })
const spotlight4 = ref<SpotlightPosition>({ x: 0, y: 0 })

const updateSpotlight = (spotlight: any, event: MouseEvent) => {
  const rect = (event.currentTarget as HTMLElement).getBoundingClientRect()
  spotlight.value = {
    x: event.clientX - rect.left,
    y: event.clientY - rect.top
  }
}

// Tech Stack data
const techStack = [
  {
    name: 'Vue 3',
    desc: '渐进式JavaScript框架',
    icon: House,
    color: '#4FC08D'
  },
  {
    name: 'TypeScript',
    desc: 'JavaScript的超集',
    icon: Document,
    color: '#3178C6'
  },
  {
    name: 'Vite',
    desc: '下一代前端构建工具',
    icon: Lightning,
    color: '#646CFF'
  },
  {
    name: 'Element Plus',
    desc: '企业级组件库',
    icon: Grid,
    color: '#409EFF'
  },
  {
    name: 'Pinia',
    desc: 'Vue状态管理',
    icon: DataLine,
    color: '#FCD34D'
  },
  {
    name: 'Vue Router',
    desc: '官方路由管理器',
    icon: Connection,
    color: '#4FC08D'
  }
]

// Stats data
const stats = [
  { value: '0', label: '项目已创建' },
  { value: '30s', label: '环境启动' },
  { value: '6', label: '核心技术' },
]

const goToAdmin = () => {
  router.push('/admin/dashboard')
}

const scrollToFeatures = () => {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped lang="scss">
.user-home {
  width: 100%;
  min-height: 100vh;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .flex {
    display: flex;
  }

  .gap-4 {
    gap: 16px;
  }

  .mb-3 {
    margin-bottom: 12px;
  }

  .mb-4 {
    margin-bottom: 16px;
  }

  .mb-6 {
    margin-bottom: 24px;
  }

  .mb-8 {
    margin-bottom: 32px;
  }

  .mb-12 {
    margin-bottom: 48px;
  }

  .max-w-2xl {
    max-width: 640px;
  }

  .h-full {
    height: 100%;
  }

  .flex-col {
    flex-direction: column;
  }

  .justify-end {
    justify-content: flex-end;
  }

  .text-foreground-muted {
    color: var(--foreground-muted);
  }

  .hero-wrapper {
    padding: 64px 0;
  }

  // Tech Stack Grid
  .tech-stack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;

    .tech-card {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 24px;
      background: var(--background-elevated);
      border: 1px solid var(--border-default);
      border-radius: 12px;
      transition: all 0.3s ease;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
        border-color: var(--primary-color);
      }

      .tech-icon {
        flex-shrink: 0;
      }

      .tech-info {
        .tech-name {
          margin: 0 0 4px 0;
          font-size: 18px;
          font-weight: 600;
          color: var(--foreground);
        }

        .tech-desc {
          margin: 0;
          font-size: 14px;
          color: var(--foreground-muted);
        }
      }
    }
  }

  // Quick Start
  .quick-start-card {
    overflow: hidden;

    .quick-start-content {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 40px;
      align-items: center;

      .code-block {
        background: var(--surface);
        border-radius: 8px;
        padding: 20px;
        overflow-x: auto;

        pre {
          margin: 0;

          code {
            color: var(--foreground);
            font-size: 14px;
            font-family: 'Fira Code', monospace;
            line-height: 1.8;
          }
        }
      }

      .quick-start-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 20px;

        .stat-item {
          text-align: center;

          .stat-number {
            font-size: 32px;
            font-weight: bold;
            background: linear-gradient(135deg, var(--primary-color) 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 4px;
          }

          .stat-label {
            font-size: 14px;
            color: var(--foreground-muted);
          }
        }
      }
    }
  }

  // CTA Card
  .cta-card {
    text-align: center;
    padding: 64px 20px;
    background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
    border-radius: 16px;
    border: 1px solid var(--border-default);
  }

  // Mobile responsive
  @media (max-width: 768px) {
    .hero-wrapper {
      padding: 32px 0;
    }

    .tech-stack-grid {
      grid-template-columns: 1fr;
    }

    .quick-start-content {
      grid-template-columns: 1fr !important;
      gap: 24px !important;

      .quick-start-stats {
        grid-template-columns: repeat(3, 1fr);
      }
    }

    .cta-card {
      padding: 40px 16px;
    }

    .flex {
      flex-direction: column;
      align-items: flex-start;
    }
  }
}
</style>
