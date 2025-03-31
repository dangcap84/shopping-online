<template>
  <div class="cart-page">
    <div class="cart-container">
      <h1>Giỏ hàng</h1>

      <div v-if="!cartItems.length" class="empty-cart">
        <p>Giỏ hàng của bạn đang trống</p>
        <router-link to="/products" class="continue-shopping">
          Tiếp tục mua sắm
        </router-link>
      </div>

      <div v-else class="cart-content">
        <div class="cart-items">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <img :src="item.product.images[0]" :alt="item.product.name">
            <div class="item-info">
              <h3>{{ item.product.name }}</h3>
              <p class="price">{{ formatPrice(item.product.price) }} ₫</p>
            </div>
            <div class="item-quantity">
              <button @click="decreaseQuantity(item)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="increaseQuantity(item)">+</button>
            </div>
            <p class="item-subtotal">
              {{ formatPrice(item.product.price * item.quantity) }} ₫
            </p>
            <button class="remove-item" @click="removeItem(item)">×</button>
          </div>
        </div>

        <div class="cart-summary">
          <h2>Tổng giỏ hàng</h2>
          <div class="summary-row">
            <span>Tạm tính:</span>
            <span>{{ formatPrice(subtotal) }} ₫</span>
          </div>
          <div class="summary-row">
            <span>Phí vận chuyển:</span>
            <span>{{ formatPrice(shippingFee) }} ₫</span>
          </div>
          <div class="summary-row total">
            <span>Tổng cộng:</span>
            <span>{{ formatPrice(total) }} ₫</span>
          </div>
          <router-link to="/checkout" class="checkout-btn">
            Thanh toán
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Product } from '@/data/products'

interface CartItem {
  id: string
  product: Product
  quantity: number
}

// Giả lập dữ liệu giỏ hàng
const cartItems = ref<CartItem[]>([])

const subtotal = computed(() => 
  cartItems.value.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  )
)

const shippingFee = computed(() => 
  subtotal.value > 0 ? 30000 : 0
)

const total = computed(() => 
  subtotal.value + shippingFee.value
)

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const increaseQuantity = (item: CartItem) => {
  item.quantity++
}

const decreaseQuantity = (item: CartItem) => {
  if (item.quantity > 1) {
    item.quantity--
  }
}

const removeItem = (item: CartItem) => {
  const index = cartItems.value.indexOf(item)
  if (index > -1) {
    cartItems.value.splice(index, 1)
  }
}
</script>

<style scoped lang="scss">
.cart-page {
  padding: 2rem;
}

.cart-container {
  max-width: 1200px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  padding: 4rem;
  background: #f9f9f9;
  border-radius: 8px;

  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    color: #666;
  }
}

.continue-shopping {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: #4CAF50;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 1rem;

  &:hover {
    background: #45a049;
  }
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 2rem;
}

.cart-items {
  background: white;
  border-radius: 8px;
  overflow: hidden;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto 30px;
  gap: 1rem;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid #eee;

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 4px;
  }

  .item-info {
    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    .price {
      color: #4CAF50;
      font-weight: 600;
    }
  }

  .item-quantity {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    button {
      padding: 0.25rem 0.5rem;
      background: none;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;

      &:hover {
        background: #f5f5f5;
      }
    }
  }

  .remove-item {
    padding: 0;
    background: none;
    border: none;
    font-size: 1.5rem;
    color: #999;
    cursor: pointer;

    &:hover {
      color: #ff4444;
    }
  }
}

.cart-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;

  h2 {
    margin-bottom: 1.5rem;
  }

  .summary-row {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    color: #666;

    &.total {
      font-size: 1.2rem;
      font-weight: 600;
      color: #000;
      border-top: 1px solid #eee;
      padding-top: 1rem;
      margin-top: 1rem;
    }
  }
}

.checkout-btn {
  display: block;
  width: 100%;
  padding: 0.75rem;
  background: #4CAF50;
  color: white;
  text-align: center;
  text-decoration: none;
  border-radius: 4px;
  margin-top: 1.5rem;
  font-size: 1rem;

  &:hover {
    background: #45a049;
  }
}

@media (max-width: 768px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto;
    gap: 0.5rem;

    .item-quantity,
    .item-subtotal {
      grid-column: 2;
    }

    .remove-item {
      grid-column: 1;
      grid-row: 1;
      justify-self: start;
      padding: 0.5rem;
    }
  }
}
</style>
