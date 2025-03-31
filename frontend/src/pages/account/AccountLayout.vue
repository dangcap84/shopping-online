<template>
  <div class="account-layout">
    <div class="account-container">
      <div class="account-sidebar">
        <h2>Tài khoản</h2>
        <nav>
          <router-link to="/account/profile">Thông tin tài khoản</router-link>
          <router-link to="/account/orders">Đơn hàng của tôi</router-link>
        </nav>
      </div>
      <div class="account-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped lang="scss">
.account-layout {
  padding: 2rem 1rem;
}

.account-container {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
}

.account-sidebar {
  h2 {
    margin-bottom: 1rem;
  }

  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    a {
      padding: 0.75rem 1rem;
      color: #333;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.2s;

      &:hover {
        background-color: #f5f5f5;
      }

      &.router-link-active {
        background-color: #4CAF50;
        color: white;
      }
    }
  }
}

.account-content {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .account-container {
    grid-template-columns: 1fr;
  }

  .account-sidebar {
    nav {
      flex-direction: row;
      overflow-x: auto;
      padding-bottom: 1rem;
    }
  }
}
</style>
