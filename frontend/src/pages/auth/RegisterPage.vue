<template>
  <div class="register-page">
    <h1>Đăng ký</h1>
    <form @submit.prevent class="register-form">
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
        >
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="form.password"
          required
          placeholder="Nhập mật khẩu"
        >
      </div>
      <div class="form-group">
        <label for="confirmPassword">Xác nhận mật khẩu</label>
        <input
          type="password"
          id="confirmPassword"
          v-model="form.confirmPassword"
          required
          placeholder="Nhập lại mật khẩu"
        >
      </div>
      <button type="submit" class="submit-btn">Đăng ký</button>
      <div class="login-link">
        Đã có tài khoản? 
        <router-link to="/auth/login">Đăng nhập</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})
</script>

<style scoped lang="scss">
.register-page {
  text-align: center;
}

.register-form {
  margin-top: 2rem;
}

.form-group {
  margin-bottom: 1rem;
  text-align: left;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
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

.login-link {
  margin-top: 1rem;
  
  a {
    color: #4CAF50;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
