<template>
  <div class="profile-page linear-bg">
    <div class="linear-blob linear-blob--primary"></div>
    <div class="linear-blob linear-blob--secondary"></div>
    <div class="linear-blob linear-blob--tertiary"></div>

    <div class="profile-container linear-content container">
      <div class="page-header linear-section">
        <h1 class="linear-h1">个人中心</h1>
        <p class="linear-body-large">管理您的个人信息</p>
      </div>

      <div class="profile-content grid grid-cols-1 md:grid-cols-3 gap-6">
        <!-- 左侧：头像卡片 -->
        <div class="md:col-span-1">
          <div class="linear-card avatar-card">
            <div class="linear-card-content text-center">
              <div class="avatar-wrapper mb-4">
                <el-avatar :size="120" :src="userStore.avatar">
                  {{ userStore.username.charAt(0).toUpperCase() }}
                </el-avatar>
              </div>
              <h3 class="linear-h3 mb-1">{{ userStore.nickname || userStore.username }}</h3>
              <p class="linear-body text-muted">{{ userStore.email || '未设置邮箱' }}</p>
              <el-divider />
              <p class="text-sm text-muted">
                角色：{{ userStore.role === 'admin' ? '管理员' : '普通用户' }}
              </p>
            </div>
          </div>
        </div>

        <!-- 右侧：信息编辑 -->
        <div class="md:col-span-2">
          <!-- 基本信息 -->
          <div class="linear-card mb-6">
            <div class="linear-card-content">
              <h2 class="linear-h2 mb-6">基本信息</h2>
              <el-form ref="formRef" :model="formData" label-width="100px">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="formData.username" disabled />
                </el-form-item>
                <el-form-item label="昵称" prop="nickname">
                  <el-input v-model="formData.nickname" placeholder="请输入昵称" />
                </el-form-item>
                <el-form-item label="个性签名" prop="bio">
                  <el-input
                    v-model="formData.bio"
                    type="textarea"
                    :rows="3"
                    placeholder="介绍一下自己吧..."
                  />
                </el-form-item>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="formData.email" placeholder="请输入邮箱" />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="手机号" prop="phone">
                      <el-input v-model="formData.phone" placeholder="请输入手机号" />
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-form-item>
                  <div class="actions">
                    <button class="linear-btn linear-btn--primary" :loading="loading" @click="handleSave">
                      保存修改
                    </button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>

          <!-- 修改密码 -->
          <div class="linear-card">
            <div class="linear-card-content">
              <h2 class="linear-h2 mb-6">修改密码</h2>
              <el-form ref="passwordFormRef" :model="passwordForm" label-width="100px">
                <el-form-item label="旧密码" prop="oldPassword" :rules="[{ required: true, message: '请输入旧密码' }]">
                  <el-input v-model="passwordForm.oldPassword" type="password" placeholder="请输入旧密码" />
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword" :rules="validatePassword">
                  <el-input v-model="passwordForm.newPassword" type="password" placeholder="请输入新密码" />
                </el-form-item>
                <el-form-item label="确认密码" prop="confirmPassword" :rules="validateConfirmPassword">
                  <el-input v-model="passwordForm.confirmPassword" type="password" placeholder="请再次输入新密码" />
                </el-form-item>
                <el-form-item>
                  <div class="actions">
                    <button class="linear-btn linear-btn--primary" :loading="passwordLoading" @click="handleChangePassword">
                      修改密码
                    </button>
                  </div>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useUserStore } from '@/store'
import { updateUser } from '@/services/api'

const userStore = useUserStore()
const loading = ref(false)
const passwordLoading = ref(false)
const formRef = ref<FormInstance>()
const passwordFormRef = ref<FormInstance>()

const formData = reactive({
  username: '',
  nickname: '',
  bio: '',
  email: '',
  phone: ''
})

const passwordForm = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: ''
})

// 密码验证
const validatePassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入新密码'))
  } else if (value.length < 6) {
    callback(new Error('密码长度不能少于6位'))
  } else {
    callback()
  }
}

const validateConfirmPassword = (rule: any, value: any, callback: any) => {
  if (value !== passwordForm.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  } else {
    callback()
  }
}

onMounted(() => {
  const user = userStore.userInfo
  if (user) {
    formData.username = user.username || ''
    formData.nickname = user.nickname || ''
    formData.bio = (user as any).bio || ''
    formData.email = user.email || ''
    formData.phone = user.phone || ''
  }
})

const handleSave = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (!valid) return

    loading.value = true
    try {
      if (userStore.userInfo?.id) {
        await updateUser(userStore.userInfo.id, formData)
        userStore.updateProfile(formData)
        ElMessage.success('保存成功')
      }
    } catch (error: any) {
      ElMessage.error(error.message || '保存失败')
    } finally {
      loading.value = false
    }
  })
}

const handleChangePassword = async () => {
  if (!passwordFormRef.value) return
  await passwordFormRef.value.validate(async (valid) => {
    if (!valid) return

    passwordLoading.value = true
    try {
      // API 接口预留，后端实现后解开注释
      // await changePassword({
      //   oldPassword: passwordForm.oldPassword,
      //   newPassword: passwordForm.newPassword
      // })
      ElMessage.success('密码修改成功，请重新登录')
      userStore.logout()
      window.location.reload()
    } catch (error: any) {
      ElMessage.error(error.message || '修改密码失败')
    } finally {
      passwordLoading.value = false
    }
  })
}
</script>

<style scoped lang="scss">
.profile-page {
  width: 100%;
  min-height: 100vh;
  padding: 60px 20px;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  margin-bottom: 48px;

  h1 {
    margin: 0 0 12px 0;
  }

  p {
    margin: 0;
    color: var(--foreground-muted);
  }
}

.profile-content {
  .avatar-card {
    .avatar-wrapper {
      text-align: center;
    }
  }
}

.mb-6 {
  margin-bottom: 24px;
}

.mb-4 {
  margin-bottom: 16px;
}

.mb-1 {
  margin-bottom: 4px;
}

.text-center {
  text-align: center;
}

.text-right {
  text-align: right;
}

.text-sm {
  font-size: 13px;
}

.text-muted {
  color: var(--foreground-muted);
}

.grid {
  display: grid;
  gap: 24px;
}

.grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
}

.actions {
  display: flex;
  justify-content: flex-end;
}

@media (min-width: 768px) {
  .md\:grid-cols-1 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
  .md\:grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
  .md\:col-span-1 {
    grid-column: span 1 / span 1;
  }
  .md\:col-span-2 {
    grid-column: span 2 / span 2;
  }
}

.login-form {
  :deep(.el-input__wrapper) {
    background-color: var(--background-elevated);
    box-shadow: none;
  }

  :deep(.el-input__inner) {
    color: var(--foreground);
  }

  :deep(.el-input__placeholder) {
    color: var(--foreground-muted);
  }
}
</style>
