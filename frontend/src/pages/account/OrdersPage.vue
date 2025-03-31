<template>
  <div class="orders-page">
    <h1>Đơn hàng của tôi</h1>
    <div v-if="orders.length === 0" class="empty-orders">
      <p>Bạn chưa có đơn hàng nào</p>
    </div>
    <div v-else class="orders-list">
      <div v-for="order in orders" :key="order.id" class="order-card">
        <!-- Order details will be added here -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Order {
  id: string
  date: string
  status: string
  total: number
}

const orders = ref<Order[]>([])
</script>

<style scoped lang="scss">
.orders-page {
  h1 {
    margin-bottom: 2rem;
  }
}

.empty-orders {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 8px;
}

.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-card {
  padding: 1rem;
  background: #f9f9f9;
  border: 1px solid #eee;
  border-radius: 8px;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
}
</style>
