<template>
  <div :class="['about-page', themeStore.isLinear ? 'linear-bg' : '']">
    <template>
      <div class="linear-blob linear-blob--primary"></div>
      <div class="linear-blob linear-blob--secondary"></div>
      <div class="linear-blob linear-blob--tertiary"></div>
    </template>

    <div class="about-container linear-content container">
      <div class="page-header linear-section text-center">
        <span class="linear-badge mb-4">CRUD Template</span>
        <h1 class="linear-h1 mb-4">关于我们</h1>
        <p class="linear-body-large">通用前端 CRUD 模板 v1.1.0</p>
      </div>

      <div class="about-content">
        <div class="linear-card mb-8">
          <div class="linear-card-content">
            <h2 class="linear-h2 mb-4">项目介绍</h2>
            <p class="linear-body leading-relaxed">
              这是一个基于 Vue 3 + TypeScript + Vite + Element Plus 构建的通用前端 CRUD 模板，
              旨在为中小型后台管理系统提供快速开发的基础框架。集成路由、状态管理、权限控制、
              主题切换、响应式布局等常用功能，开箱即用。
            </p>
            <p class="linear-body leading-relaxed mt-4">
              项目采用双端架构设计，同时支持用户端展示和管理员端 CRUD 管理。遵循 Linear 现代设计系统，
              提供精致的视觉体验和流畅的交互感受。
            </p>
          </div>
        </div>

        <div class="linear-card">
          <div class="linear-card-content">
            <h2 class="linear-h2 mb-6">技术栈</h2>
            <div class="tech-list">
              <span class="linear-badge" v-for="tech in techStack" :key="tech">
                {{ tech }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from '@/store'

const themeStore = useThemeStore()

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

  .container {
    max-width: 1200px;
    margin: 0 auto;
  }

  .text-center {
    text-align: center;
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

  .leading-relaxed {
    line-height: 1.8;
  }

  .tech-list {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
}
</style>
