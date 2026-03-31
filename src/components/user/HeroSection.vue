<template>
  <section class="hero-section" ref="heroRef">
    <div class="hero-container">
      <div class="hero-cards">
        <div
          v-for="(card, index) in heroCards"
          :key="card.id"
          class="hero-card"
          :class="{ active: activeCard === index }"
          @click="handleCardClick(index)"
          ref="cardRefs"
        >
          <div class="card-image">
            <img :src="card.image" :alt="card.title" />
            <div class="card-overlay"></div>
          </div>
          <div class="card-content">
            <h2>{{ card.title }}</h2>
            <p>{{ card.description }}</p>
            <el-button type="primary" @click.stop="handleLearnMore(card)">
              了解更多
            </el-button>
          </div>
        </div>
      </div>

      <!-- 轮播指示器 -->
      <div class="hero-indicators">
        <button
          v-for="(card, index) in heroCards"
          :key="card.id"
          class="indicator"
          :class="{ active: activeCard === index }"
          @click="switchCard(index)"
        ></button>
      </div>

      <!-- 左右切换按钮 -->
      <button class="nav-button prev" @click="prevCard">
        <el-icon :size="24"><ArrowLeft /></el-icon>
      </button>
      <button class="nav-button next" @click="nextCard">
        <el-icon :size="24"><ArrowRight /></el-icon>
      </button>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue'
import { getHeroCards } from '@/services/api'
import type { HeroCard } from '@/types'
import gsap from 'gsap'

const heroRef = ref<HTMLElement>()
const cardRefs = ref<HTMLElement[]>([])
const heroCards = ref<HeroCard[]>([])
const activeCard = ref(0)
let autoPlayTimer: number | null = null

onMounted(async () => {
  // 加载数据
  heroCards.value = await getHeroCards()

  // GSAP进入动画
  if (heroRef.value) {
    gsap.from(heroRef.value, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: 'power3.out'
    })
  }

  // 启动自动播放
  startAutoPlay()

  // 卡片交错动画
  if (cardRefs.value.length) {
    gsap.from(cardRefs.value, {
      opacity: 0,
      y: 100,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power3.out'
    })
  }
})

onUnmounted(() => {
  stopAutoPlay()
})

const switchCard = (index: number) => {
  if (index === activeCard.value) return

  // 当前卡片淡出
  gsap.to(cardRefs.value[activeCard.value], {
    opacity: 0.5,
    scale: 0.95,
    duration: 0.5,
    ease: 'power2.out'
  })

  // 新卡片淡入
  gsap.fromTo(
    cardRefs.value[index],
    { opacity: 0.5, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 0.5, ease: 'power2.out' }
  )

  activeCard.value = index
}

const prevCard = () => {
  const newIndex = activeCard.value === 0 ? heroCards.value.length - 1 : activeCard.value - 1
  switchCard(newIndex)
}

const nextCard = () => {
  const newIndex = activeCard.value === heroCards.value.length - 1 ? 0 : activeCard.value + 1
  switchCard(newIndex)
}

const startAutoPlay = () => {
  autoPlayTimer = window.setInterval(() => {
    nextCard()
  }, 5000)
}

const stopAutoPlay = () => {
  if (autoPlayTimer) {
    clearInterval(autoPlayTimer)
    autoPlayTimer = null
  }
}

const handleCardClick = (index: number) => {
  switchCard(index)
}

const handleLearnMore = (card: HeroCard) => {
  ElMessage.info(`了解更多：${card.title}`)
}
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  width: 100%;
  min-height: 600px;
  overflow: hidden;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  @media (max-width: 768px) {
    min-height: 400px;
  }
}

.hero-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 60px 20px;
  position: relative;
  height: 100%;
}

.hero-cards {
  position: relative;
  width: 100%;
  height: 480px;

  @media (max-width: 768px) {
    height: 300px;
  }
}

.hero-card {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.5s, transform 0.5s;

  &.active {
    opacity: 1;
    transform: scale(1);
  }

  .card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .card-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%);
    }
  }

  .card-content {
    position: absolute;
    bottom: 60px;
    left: 60px;
    max-width: 600px;
    color: white;
    z-index: 10;

    @media (max-width: 768px) {
      bottom: 30px;
      left: 20px;
      right: 20px;
    }

    h2 {
      font-size: 48px;
      font-weight: bold;
      margin: 0 0 16px 0;
      line-height: 1.2;

      @media (max-width: 768px) {
        font-size: 28px;
      }
    }

    p {
      font-size: 20px;
      margin: 0 0 24px 0;
      opacity: 0.9;

      @media (max-width: 768px) {
        font-size: 16px;
      }
    }
  }
}

.hero-indicators {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  z-index: 10;

  .indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 2px solid white;
    background: transparent;
    cursor: pointer;
    transition: all 0.3s;

    &.active {
      background: white;
      transform: scale(1.2);
    }

    &:hover {
      background: rgba(255, 255, 255, 0.5);
    }
  }
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  z-index: 10;

  &:hover {
    background: white;
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 20px;
  }

  &.next {
    right: 20px;
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
}
</style>
