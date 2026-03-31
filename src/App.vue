<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'

onMounted(() => {
  console.log('应用启动 - 通用前端CRUD模板 v1.0.0')
})

onUnmounted(() => {
  console.log('应用卸载')
})
</script>

<style scoped>
#app {
  width: 100%;
  height: 100%;
}
</style>
