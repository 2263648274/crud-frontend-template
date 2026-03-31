<template>
  <section class="content-section" ref="sectionRef">
    <div class="section-header" v-if="title">
      <h2>{{ title }}</h2>
      <p v-if="description">{{ description }}</p>
    </div>

    <div class="cards-grid" :class="`cols-${columns}`">
      <div
        v-for="(card, index) in cards"
        :key="card.id"
        class="content-card"
        @click="handleCardClick(card)"
        ref="cardRefs"
      >
        <div class="card-image" v-if="card.image">
          <img :src="card.image" :alt="card.title" loading="lazy" />
          <div class="card-category" v-if="card.category">{{ card.category }}</div>
        </div>
        <div class="card-body">
          <h3>{{ card.title }}</h3>
          <p v-if="card.description">{{ card.description }}</p>
          <div class="card-footer">
            <el-button type="primary" link>
              查看详情
              <el-icon class="el-icon--right"><ArrowRight /></el-icon>
            </el-button>
          </div>
        </div>
      </div>
    </div>

    <div class="section-footer" v-if="showMore">
      <el-button size="large" @click="handleLoadMore">
        加载更多
      </el-button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
import type { ContentCard } from '@/types'
import gsap from 'gsap'

interface Props {
  title?: string
  description?: string
  cards: ContentCard[]
  columns?: 2 | 3 | 4
  showMore?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  columns: 3,
  showMore: false
})

const emit = defineEmits<{
  cardClick: [card: ContentCard]
  loadMore: []
}>()

const sectionRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])

onMounted(() => {
  // 区域进入动画
  if (sectionRef.value) {
    gsap.from(sectionRef.value, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    })
  }

  // 卡片交错动画
  if (cardRefs.value.length) {
    gsap.from(cardRefs.value, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power3.out'
    })
  }
})

const handleCardClick = (card: ContentCard) => {
  emit('cardClick', card)
}

const handleLoadMore = () => {
  emit('loadMore')
}
</script>

<style scoped lang="scss">
.content-section {
  padding: 60px 20px;
  max-width: 1400px;
  margin: 0 auto;

  @media (max-width: 76868px) {
    padding: 40px 16px;
  }
}

.section-header {
  text-align: center;
  margin-bottom: 48px;

  h2 {
    font-size: 36px;
    font-weight: bold;
    margin: 0 0 16px 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    @media (max-width: 768px) {
      font-size: 28px;
    }
  }

  p {
    font-size: 18px;
    color: var(--text-secondary);
    margin: 0;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
}

.cards-grid {
  display: grid;
  gap: 30px;

  &.cols-2 {
    grid-template-columns: repeat(2, 1fr);

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &.cols-3 {
    grid-template-columns: repeat(3, 1fr);

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }

  &.cols-4 {
    grid-template-columns: repeat(4, 1fr);

    @media (max-width: 1200px) {
      grid-template-columns: repeat(3, 1fr);
    }

    @media (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 480px) {
      grid-template-columns: 1fr;
    }
  }
}

.content-card {
  background: var(--card-bg);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  .card-image {
    position: relative;
    height: 200px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s;
    }

    &:hover img {
      transform: scale(1.1);
    }

    .card-category {
      position: absolute;
      top: 12px;
      right: 12px;
      padding: 4px 12px;
      background: rgba(102, 126, 234, 0.9);
      color: white;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 500;
    }
  }

  .card-body {
    padding: 20px;
    flex: 1;
    display: flex;
    flex-direction: column;

    h3 {
      font-size: 18px;
      font-weight: 600;
      margin: 0 0 12px 0;
      color: var(--text-primary);
    }

    p {
      font-size: 14px;
      color: var(--text-secondary);
      margin: 0 0 16px 0;
      line-height: 1.6;
      flex: 1;
    }

    .card-footer {
      margin-top: auto;
    }
  }
}

.section-footer {
  text-align: center;
  margin-top: 48px;
}
</style>
