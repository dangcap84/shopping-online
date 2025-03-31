<template>
  <div class="profile-page">
    <h1>Thông tin tài khoản</h1>
    <form @submit.prevent class="profile-form">
      <div class="form-group">
        <label for="name">Họ tên</label>
        <input
          type="text"
          id="name"
          v-model="form.name"
          required
          placeholder="Nhập họ tên"
        >
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="form.email"
          required
          placeholder="Nhập địa chỉ email"
          disabled
        >
      </div>
      <div class="form-group">
        <label for="phone">Số điện thoại</label>
        <input
          type="tel"
          id="phone"
          v-model="form.phone"
          placeholder="Nhập số điện thoại"
        >
      </div>
      <div class="form-group">
        <label for="address">Địa chỉ</label>
        <textarea
          id="address"
          v-model="form.address"
          rows="3"
          placeholder="Nhập địa chỉ"
        ></textarea>
      </div>
      <button type="submit" class="submit-btn">Cập nhật</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  address: ''
})
</script>

<style scoped lang="scss">
.profile-page {
  h1 {
    margin-bottom: 2rem;
  }
}

.profile-form {
  max-width: 600px;
}

.form-group {
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  
  input, textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    
    &:disabled {
      background-color: #f5f5f5;
    }
  }
}

.submit-btn {
  padding: 0.75rem 2rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  
  &:hover {
    background: #45a049;
  }
}
</style>
