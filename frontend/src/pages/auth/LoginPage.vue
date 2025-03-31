<template>
  <div class="login-page">
    <h1>Đăng nhập</h1>
    <form @submit.prevent class="login-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          v-model="email"
          required
          placeholder="Nhập địa chỉ email"
        >
      </div>
      <div class="form-group">
        <label for="password">Mật khẩu</label>
        <input
          type="password"
          id="password"
          v-model="password"
          required
          placeholder="Nhập mật khẩu"
        >
      </div>
      <button type="submit" class="submit-btn">Đăng nhập</button>
      <div class="register-link">
        Chưa có tài khoản? 
        <router-link to="/auth/register">Đăng ký</router-link>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
</script>

<style scoped lang="scss">
.login-page {
  text-align: center;
}

.login-form {
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

.register-link {
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
