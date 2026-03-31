<template>
  <div class="dashboard">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12" :md="6" :lg="6" v-for="(stat, index) in stats" :key="index">
        <el-card class="stat-card" shadow="hover">
          <div class="stat-content">
            <div class="stat-icon" :style="{ background: stat.color }">
              <el-icon :size="32" color="white">
                <component :is="stat.icon" />
              </el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-label">{{ stat.label }}</div>
              <div class="stat-value">{{ stat.value }}</div>
              <div class="stat-trend" :class="stat.trend > 0 ? 'up' : 'down'">
                <el-icon>
                  <component :is="stat.trend > 0 ? TrendCharts : Bottom" />
                </el-icon>
                {{ Math.abs(stat.trend) }}%
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :xs="24" :md="16">
        <el-card>
          <template #header>
            <span>最近访问</span>
          </template>
          <el-table :data="recentAccess" stripe>
            <el-table-column type="index" label="序号" width="60" />
            <el-table-column prop="name" label="名称" />
            <el-table-column prop="time" label="访问时间" width="180" />
            <el-table-column prop="ip" label="IP地址" width="150" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :xs="24" :md="8">
        <el-card>
          <template #header>
            <span>快速操作</span>
          </template>
          <el-space wrap>
            <el-button type="primary" @click="handleGoToUser">
              用户管理
            </el-button>
            <el-button type="success" @click="handleGoToRole">
              角色管理
            </el-button>
            <el-button type="warning" @click="handleGoToStats">
              数据统计
            </el-button>
          </el-space>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { TrendCharts, Bottom, DataLine, User, Document } from '@element-plus/icons-vue'

const router = useRouter()

const stats = ref([
  {
    label: '用户总数',
    value: '1,234',
    trend: 12.5,
    color: '#409eff',
    icon: User
  },
  {
    label: '今日访问',
    value: '5,678',
    trend: 8.2,
    color: '#67c23a',
    icon: Document
  },
  {
    label: '角色数量',
    value: '12',
    trend: 0,
    color: '#e6a23c',
    icon: DataLine
  },
  {
    label: '系统运行',
    value: '99.9%',
    trend: 0.5,
    color: '#f56c6c',
    icon: DataLine
  }
])

const recentAccess = ref([
  { name: '用户管理', time: '2026-03-30 22:00:00', ip: '192.168.1.100' },
  { name: '角色管理', time: '2026-03-30 21:50:00', ip: '192.168.1.100' },
  { name: '仪表盘', time: '2026-03-30 21:45:00', ip: '192.168.1.100' },
  { name: '用户管理', time: '2026-03-30 21:30:00', ip: '192.168.1.101' }
])

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
  .stat-card {
    margin-bottom: 20px;

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
          color: #67c23a;
        }

        &.down {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
