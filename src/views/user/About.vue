<template>
  <div class="about-page">
    <div class="about-container">
      <div class="page-header">
        <h1>关于我们</h1>
        <p>通用前端 CRUD 模板 v1.0.0</p>
      </div>

      <div class="about-content">
        <el-card shadow="hover">
          <template #header>
            <span>项目介绍</span>
          </template>
          <p>
            这是一个基于 Vue 3 + TypeScript + Vite + Element Plus 构建的通用前端 CRUD 模板，
            旨在为中小型后台管理系统提供快速开发的基础框架。集成路由、状态管理、权限控制、
            主题切换、响应式布局等常用功能，开箱即用。
          </p>
        </el-card>

        <div class="tech-stack">
          <h2>技术栈</h2>
          <div class="tech-list">
            <el-tag v-for="tech in techStack" :key="tech" size="large" type="info" effect="plain">
              {{ tech }}
            </el-tag>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const techStack = [
  'Vue 3',
  'TypeScript',
  'Vite',
  'Vue Router',
  'Pinia',
  'Element Plus',
  'Axios',
  'GSAP',
  'SCSS'
]
</script>

<style scoped lang="scss">
.about-page {
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
}

.about-container {
  max-width: 800px;
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

.about-content {
  .el-card {
    margin-bottom: 32px;

    p {
      font-size: 16px;
      color: var(--text-regular);
      line-height: 1.8;
    }
  }
}

.tech-stack {
  h2 {
    font-size: 24px;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 20px 0;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
