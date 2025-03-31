<template>
  <div class="not-found">
    <el-result
      icon="error"
      title="404"
      sub-title="Xin lỗi, trang bạn đang tìm kiếm không tồn tại."
    >
      <template #extra>
        <el-button type="primary" @click="router.push('/')">Về trang chủ</el-button>
      </template>
    </el-result>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>

<style scoped>
.not-found {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
