<template>
  <div class="checkout-page">
    <div class="checkout-container">
      <h1>Thanh toán</h1>

      <div class="checkout-content">
        <form class="checkout-form" @submit.prevent="handleSubmit">
          <div class="form-section">
            <h2>Thông tin giao hàng</h2>
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
              <label for="phone">Số điện thoại</label>
              <input
                type="tel"
                id="phone"
                v-model="form.phone"
                required
                placeholder="Nhập số điện thoại"
              >
            </div>
            <div class="form-group">
              <label for="address">Địa chỉ</label>
              <textarea
                id="address"
                v-model="form.address"
                required
                rows="3"
                placeholder="Nhập địa chỉ giao hàng"
              ></textarea>
            </div>
            <div class="form-group">
              <label for="note">Ghi chú (không bắt buộc)</label>
              <textarea
                id="note"
                v-model="form.note"
                rows="2"
                placeholder="Nhập ghi chú cho đơn hàng"
              ></textarea>
            </div>
          </div>

          <div class="form-section">
            <h2>Phương thức thanh toán</h2>
            <div class="payment-methods">
              <label class="payment-method">
                <input
                  type="radio"
                  v-model="form.paymentMethod"
                  value="cod"
                  name="payment"
                  checked
                >
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label class="payment-method">
                <input
                  type="radio"
                  v-model="form.paymentMethod"
                  value="bank"
                  name="payment"
                >
                <span>Chuyển khoản ngân hàng</span>
              </label>
            </div>
          </div>

          <button type="submit" class="submit-btn">
            Đặt hàng ({{ formatPrice(total) }} ₫)
          </button>
        </form>

        <div class="order-summary">
          <h2>Đơn hàng ({{ cartItems.length }} sản phẩm)</h2>
          <div class="order-items">
            <div v-for="item in cartItems" :key="item.id" class="order-item">
              <img :src="item.product.images[0]" :alt="item.product.name">
              <div class="item-info">
                <h3>{{ item.product.name }}</h3>
                <p class="quantity">Số lượng: {{ item.quantity }}</p>
                <p class="price">{{ formatPrice(item.product.price * item.quantity) }} ₫</p>
              </div>
            </div>
          </div>
          
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

interface CheckoutForm {
  name: string
  phone: string
  address: string
  note: string
  paymentMethod: 'cod' | 'bank'
}

// Giả lập dữ liệu giỏ hàng
const cartItems = ref<CartItem[]>([])

const form = ref<CheckoutForm>({
  name: '',
  phone: '',
  address: '',
  note: '',
  paymentMethod: 'cod'
})

const subtotal = computed(() => 
  cartItems.value.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  )
)

const shippingFee = computed(() => 30000)

const total = computed(() => 
  subtotal.value + shippingFee.value
)

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

const handleSubmit = () => {
  // TODO: Implement checkout logic
  console.log('Order submitted:', {
    form: form.value,
    items: cartItems.value,
    total: total.value
  })
}
</script>

<style scoped lang="scss">
.checkout-page {
  padding: 2rem;
}

.checkout-container {
  max-width: 1200px;
  margin: 0 auto;

  h1 {
    margin-bottom: 2rem;
  }
}

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
}

.checkout-form {
  .form-section {
    background: white;
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;

    h2 {
      margin-bottom: 1.5rem;
      font-size: 1.2rem;
    }
  }
}

.form-group {
  margin-bottom: 1.5rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  input,
  textarea {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;

    &:focus {
      border-color: #4CAF50;
      outline: none;
    }
  }
}

.payment-methods {
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .payment-method {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;

    input[type="radio"] {
      margin: 0;
    }
  }
}

.submit-btn {
  display: block;
  width: 100%;
  padding: 1rem;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background: #45a049;
  }
}

.order-summary {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  height: fit-content;

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.2rem;
  }
}

.order-items {
  margin-bottom: 1.5rem;
  max-height: 400px;
  overflow-y: auto;
}

.order-item {
  display: flex;
  gap: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid #eee;

  img {
    width: 80px;
    height: 80px;
    object-fit: cover;
    border-radius: 4px;
  }

  .item-info {
    flex: 1;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1rem;
    }

    .quantity {
      color: #666;
      margin-bottom: 0.25rem;
    }

    .price {
      color: #4CAF50;
      font-weight: 600;
    }
  }
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

@media (max-width: 768px) {
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    order: -1;
  }
}
</style>
