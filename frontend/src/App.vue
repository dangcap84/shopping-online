<template>
  <div class="app">
    <header class="header" :class="{ 'is-scrolled': isScrolled }">
      <div class="header-content">
        <router-link to="/" class="logo">
          H24Store
        </router-link>

        <nav class="main-nav">
          <router-link to="/new">New & Featured</router-link>
          <router-link to="/women">Women</router-link>
          <router-link to="/men">Men</router-link>
          <router-link to="/kids">Kids</router-link>
          <router-link to="/sale">Sale</router-link>
        </nav>

        <div class="header-actions">
          <div class="search-bar">
            <input 
              type="text" 
              placeholder="Search"
              v-model="searchQuery"
              @focus="isSearchActive = true"
              @blur="handleSearchBlur"
            >
            <i class="fas fa-search"></i>
          </div>

          <div class="account-menu" v-if="isLoggedIn">
            <button class="icon-button" @click="isAccountMenuOpen = !isAccountMenuOpen">
              <i class="fas fa-user"></i>
            </button>
            <div class="dropdown-menu" v-show="isAccountMenuOpen">
              <router-link to="/account/profile">Thông tin tài khoản</router-link>
              <router-link to="/account/orders">Đơn hàng của tôi</router-link>
              <router-link to="/account/address">Địa chỉ giao hàng</router-link>
              <button @click="logout">Đăng xuất</button>
            </div>
          </div>
          <div v-else>
            <router-link to="/auth/login" class="icon-button">
              <i class="fas fa-user"></i>
            </router-link>
          </div>

          <router-link to="/cart" class="icon-button cart-button">
            <i class="fas fa-shopping-bag"></i>
            <span class="cart-count" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
          </router-link>
        </div>
      </div>
    </header>

    <main class="main">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Về H24Store</h3>
          <a href="#">Giới thiệu</a>
          <a href="#">Tuyển dụng</a>
          <a href="#">Cửa hàng</a>
        </div>
        <div class="footer-section">
          <h3>Hỗ trợ</h3>
          <a href="#">Đặt hàng</a>
          <a href="#">Giao hàng</a>
          <a href="#">Đổi trả</a>
        </div>
        <div class="footer-section">
          <h3>Chính sách</h3>
          <a href="#">Điều khoản sử dụng</a>
          <a href="#">Bảo mật</a>
          <a href="#">Cookie</a>
        </div>
        <div class="footer-section">
          <h3>Kết nối</h3>
          <div class="social-links">
            <a href="#"><i class="fab fa-facebook"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)
const isSearchActive = ref(false)
const searchQuery = ref('')
const isLoggedIn = ref(false)
const isAccountMenuOpen = ref(false)
const cartItemCount = ref(0)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const handleSearchBlur = () => {
  if (!searchQuery.value) {
    isSearchActive.value = false
  }
}

const logout = () => {
  isLoggedIn.value = false
  isAccountMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss">
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: #111;
  background: #fff;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: all 0.3s ease;

  &.is-scrolled {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}

.header-content {
  max-width: 1800px;
  margin: 0 auto;
  padding: 0 48px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  color: #111;
}

.main-nav {
  display: flex;
  gap: 24px;

  a {
    text-decoration: none;
    color: #111;
    font-weight: 500;
    padding: 8px 0;
    position: relative;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 2px;
      background: #111;
      transform: scaleX(0);
      transition: transform 0.3s ease;
    }

    &:hover::after,
    &.router-link-active::after {
      transform: scaleX(1);
    }
  }
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 16px;
}

.search-bar {
  position: relative;

  input {
    width: 180px;
    padding: 8px 32px 8px 12px;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-size: 14px;
    transition: all 0.3s ease;

    &:focus {
      width: 240px;
      outline: none;
      border-color: #111;
    }
  }

  i {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #666;
  }
}

.icon-button {
  background: none;
  border: none;
  padding: 8px;
  cursor: pointer;
  position: relative;
  color: #111;
  font-size: 18px;

  &:hover {
    color: #757575;
  }
}

.cart-button {
  text-decoration: none;

  .cart-count {
    position: absolute;
    top: 0;
    right: 0;
    background: #111;
    color: #fff;
    font-size: 12px;
    padding: 2px 6px;
    border-radius: 10px;
  }
}

.account-menu {
  position: relative;

  .dropdown-menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    min-width: 200px;
    padding: 8px 0;
    margin-top: 8px;

    a, button {
      display: block;
      width: 100%;
      padding: 8px 16px;
      text-align: left;
      border: none;
      background: none;
      color: #111;
      text-decoration: none;
      font-size: 14px;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }

    button {
      color: #e32b2b;
    }
  }
}

.main {
  margin-top: 60px;
  flex: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.footer {
  background: #111;
  color: #fff;
  padding: 48px 0;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 32px;
}

.footer-section {
  h3 {
    font-size: 16px;
    margin-bottom: 16px;
  }

  a {
    display: block;
    color: #999;
    text-decoration: none;
    margin-bottom: 8px;
    font-size: 14px;

    &:hover {
      color: #fff;
    }
  }
}

.social-links {
  display: flex;
  gap: 16px;

  a {
    font-size: 20px;
    color: #fff;
  }
}

@media (max-width: 1024px) {
  .header-content {
    padding: 0 24px;
  }

  .main-nav {
    display: none;
  }
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .header-content {
    padding: 0 16px;
  }

  .search-bar input {
    width: 140px;

    &:focus {
      width: 180px;
    }
  }

  .footer-content {
    grid-template-columns: 1fr;
  }
}
</style>
