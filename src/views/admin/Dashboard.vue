<template>
  <div class="dashboard">
    <!-- Stats Bento Grid -->
    <div class="stats-bento mb-6">
      <div
        v-for="(stat, index) in stats"
        :key="index"
        class="stat-card linear-card"
        :ref="el => cardRefs[index] = el"
        @mousemove="handleMouseMove"
      >
        <div class="linear-card__spotlight"
          :style="{ left: `${spotlightPositions[index].x}px`, top: `${spotlightPositions[index].y}px` }"
        ></div>
        <div class="stat-content linear-card-content">
          <div class="stat-icon" :style="{ background: stat.color }">
            <el-icon :size="32" color="white">
              <component :is="stat.icon"></component>
            </el-icon>
          </div>
          <div class="stat-info">
            <div class="stat-label">{{ stat.label }}</div>
            <div class="stat-value">{{ stat.value }}</div>
            <div class="stat-trend" :class="[stat.trend > 0 ? 'up' : 'down']">
              <el-icon>
                <component :is="stat.trend > 0 ? TrendCharts : Bottom"></component>
              </el-icon>
              {{ Math.abs(stat.trend) }}%
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="content-grid">
      <!-- Recent Access -->
      <div class="content-card-main linear-card">
        <div class="card-header">
          <span class="text-lg font-semibold text-text-primary">最近访问</span>
        </div>
        <el-table :data="recentAccess" stripe>
          <el-table-column type="index" label="序号" width="60" />
          <el-table-column prop="name" label="名称" />
          <el-table-column prop="time" label="访问时间" width="180" />
          <el-table-column prop="ip" label="IP地址" width="150" />
        </el-table>
      </div>

      <!-- Quick Actions -->
      <div class="content-card-side linear-card">
        <div class="card-header">
          <span class="text-lg font-semibold text-text-primary">快速操作</span>
        </div>
        <el-space wrap direction="vertical" fill :size="12">
          <button class="linear-btn linear-btn--primary linear-btn--full" @click="handleGoToUser">
            用户管理
          </button>
          <button class="linear-btn linear-btn--secondary linear-btn--full" @click="handleGoToRole">
            角色管理
          </button>
          <button class="linear-btn linear-btn--ghost linear-btn--full" @click="handleGoToStats">
            数据统计
          </button>
        </el-space>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { TrendCharts, Bottom, DataLine, User, Document } from '@element-plus/icons-vue'

const router = useRouter()

interface SpotlightPosition {
  x: number
  y: number
}

const stats = ref([
  {
    label: '用户总数',
    value: '1,234',
    trend: 12.5,
    color: 'var(--accent)',
    icon: User
  },
  {
    label: '今日访问',
    value: '5,678',
    trend: 8.2,
    color: 'var(--success-color)',
    icon: Document
  },
  {
    label: '角色数量',
    value: '12',
    trend: 0,
    color: 'var(--warning-color)',
    icon: DataLine
  },
  {
    label: '系统运行',
    value: '99.9%',
    trend: 0.5,
    color: 'var(--danger-color)',
    icon: DataLine
  }
])

const recentAccess = ref([
  { name: '用户管理', time: '2026-03-30 22:00:00', ip: '192.168.1.100' },
  { name: '角色管理', time: '2026-03-30 21:50:00', ip: '192.168.1.100' },
  { name: '仪表盘', time: '2026-03-30 21:45:00', ip: '192.168.1.100' },
  { name: '用户管理', time: '2026-03-30 21:30:00', ip: '192.168.1.101' }
])

// Spotlight effect
const cardRefs = ref<(HTMLElement | null)[]>([])
const spotlightPositions = ref<SpotlightPosition[]>([
  { x: 150, y: 80 },
  { x: 150, y: 80 },
  { x: 150, y: 80 },
  { x: 150, y: 80 }
])

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

const handleGoToUser = () => {
  router.push('/admin/system/user')
}

const handleGoToRole = () => {
  router.push('/admin/system/role')
}

const handleGoToStats = () => {
  ElMessage.info('数据统计功能开发中...')
}
</script>

<style scoped lang="scss">
.dashboard {
  .mb-6 {
    margin-bottom: 24px;
  }

  .text-lg {
    font-size: 18px;
  }

  .font-semibold {
    font-weight: 600;
  }

  .text-text-primary {
    color: var(--text-primary);
  }

  .card-header {
    padding: 16px 20px;
    border-bottom: 1px solid var(--border-default);
  }

  // Stats Bento Grid - 2x2 asymmetric
  .stats-bento {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .stat-card {
    position: relative;
    overflow: hidden;

    .stat-content {
      display: flex;
      align-items: center;
      gap: 16px;
    }

    .stat-icon {
      width: 64px;
      height: 64px;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid var(--border-default);
    }

    .stat-info {
      flex: 1;

      .stat-label {
        font-size: 14px;
        color: var(--text-secondary);
        margin-bottom: 8px;
      }

      .stat-value {
        font-size: 28px;
        font-weight: bold;
        color: var(--text-primary);
        margin-bottom: 8px;
      }

      .stat-trend {
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 4px;

        &.up {
          color: var(--success-color);
        }

        &.down {
          color: var(--danger-color);
        }
      }
    }
  }

  .content-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;

    .content-card-main,
    .content-card-side {
      position: relative;
    }
  }

  @media (max-width: 768px) {
    .stats-bento {
      grid-template-columns: 1fr;
    }

    .content-grid {
      grid-template-columns: 1fr;
    }
  }
}
</style>
