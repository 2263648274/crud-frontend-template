<template>
  <div class="user-home">
    <!-- Hero卡片区域 -->
    <HeroSection />

    <!-- 内容板块1 -->
    <ContentSection
      title="核心技术"
      description="基于现代化技术栈，提供卓越的开发体验"
      :cards="techCards"
      :columns="3"
    />

    <!-- 内容板块2 -->
    <ContentSection
      title="应用场景"
      description="适用于各种类型的前端项目"
      :cards="appCards"
      :columns="3"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import HeroSection from '@/components/user/HeroSection.vue'
import ContentSection from '@/components/user/ContentSection.vue'
import { getContentCards } from '@/services/api'
import type { ContentCard } from '@/types'
import gsap from 'gsap'

const techCards = ref<ContentCard[]>([])
const appCards = ref<ContentCard[]>([])

onMounted(async () => {
  const allCards = await getContentCards()
  techCards.value = allCards.filter(c => c.category === '前端技术')
  appCards.value = allCards.filter(c => c.category === '动画技术' || c.category === 'UI组件' || c.category === '工程化')
})
</script>

<style scoped lang="scss">
.user-home {
  width: 100%;
  min-height: 100vh;
}
</style>
