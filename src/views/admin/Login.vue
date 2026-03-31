<template>
  <div class="login-page">
    <div class="login-container" ref="containerRef">
      <div class="login-form-wrapper">
        <div class="login-header">
          <h1>{{ title }}</h1>
          <p>管理后台登录</p>
        </div>

        <el-form ref="formRef" :model="loginForm" :rules="rules" class="login-form">
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名"
              size="large"
              clearable
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              size="large"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              :loading="loading"
              @click="handleLogin"
              style="width: 100%"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <el-divider />
          <p>测试账号：admin / 123456</p>
        </div>
      </div>

      <div class="login-decoration">
        <div class="decoration-circle circle-1"></div>
        <div class="decoration-circle circle-2"></div>
        <div class="decoration-circle circle-3"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/store'
import { getPendingRoute, clearPendingRoute } from '@/router'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import gsap from 'gsap'

const router = useRouter()
const userStore = useUserStore()

const title = import.meta.env.VITE_APP_TITLE
const loading = ref(false)
const formRef = ref<FormInstance>()
const containerRef = ref<HTMLElement>()

const loginForm = reactive({
  username: '',
  password: ''
})

const rules: FormRules = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// GSAP动画
onMounted(() => {
  if (containerRef.value) {
    const formWrapper = containerRef.value.querySelector('.login-form-wrapper')
    const circles = containerRef.value.querySelectorAll('.decoration-circle')

    gsap.from(formWrapper, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out'
    })

    gsap.from(circles, {
      scale: 0,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'back.out(1.7)'
    })

    gsap.to('.circle-1', {
      y: '-=30',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })

    gsap.to('.circle-2', {
      y: '-=50',
      duration: 4,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 0.5
    })

    gsap.to('.circle-3', {
      y: '-=40',
      duration: 3.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      delay: 1
    })
  }
})

const handleLogin = async () => {
  if (!formRef.value) return

  await formRef.value.validate(async (valid: boolean) => {
    if (!valid) return

    loading.value = true

    try {
      await userStore.login(loginForm)

      ElMessage.success('登录成功')
      
      // 跳转到待跳转的路由或默认到仪表盘
      const pendingRoute = getPendingRoute()
      clearPendingRoute()
      router.push(pendingRoute || '/admin/dashboard')
    } catch (error: any) {
      ElMessage.error(error.message || '登录失败')
    } finally {
      loading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
}

.login-container {
  position: relative;
  width: 100%;
  max-width: 1200px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form-wrapper {
  width: 100%;
  max-width: 420px;
  background: white;
  border-radius: 16px;
  padding: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  position: relative;
  z-index: 10;
}

.login-header {
  text-align: center;
  margin-bottom: 32px;

  h1 {
    margin: 0 0 12px 0;
    font-size: 28px;
    font-weight: bold;
    color: #303133;
  }

  p {
    margin: 0;
    font-size: 14px;
    color: #909399;
  }
}

.login-form {
  .el-form-item {
    margin-bottom: 24px;
  }
}

.login-footer {
  margin-top: 24px;
  text-align: center;

  p {
    margin: 16px 0 0 0;
    font-size: 13px;
    color: #909399;
  }
}

.login-decoration {
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 10%;
  right: 10%;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 20%;
  right: 30%;
}

.circle-3 {
  width: 150px;
  height: 150px;
  bottom: 30%;
  left: 20%;
}

@media (max-width: 768px) {
  .login-form-wrapper {
    padding: 30px 24px;
  }

  .circle-1 {
    width: 150px;
    height: 150px;
  }

  .circle-2 {
    width: 100px;
    height: 100px;
  }

  .circle-3 {
    width: 80px;
    height: 80px;
  }
}
</style>
