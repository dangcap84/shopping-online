<template>
  <div class="product-detail" v-if="product">
    <div class="product-container">
      <div class="product-gallery">
        <div class="main-image">
          <img :src="product.images[selectedImage]" :alt="product.name">
        </div>
        <div class="thumbnails">
          <button 
            v-for="(image, index) in product.images" 
            :key="index"
            class="thumbnail"
            :class="{ active: selectedImage === index }"
            @click="selectedImage = index"
          >
            <img :src="image" :alt="`${product.name} - view ${index + 1}`">
          </button>
        </div>
      </div>

      <div class="product-info">
        <div class="product-header">
          <h1>{{ product.name }}</h1>
          <p class="category">{{ product.category }}</p>
          <p class="price">{{ formatPrice(product.price) }} ₫</p>
        </div>

        <div class="product-options">
          <div class="size-selector">
            <h3>Select Size</h3>
            <div class="size-options">
              <button 
                v-for="size in sizes" 
                :key="size"
                class="size-option"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="quantity-selector">
            <h3>Quantity</h3>
            <div class="quantity-controls">
              <button @click="decreaseQuantity">-</button>
              <input type="number" v-model="quantity" min="1">
              <button @click="increaseQuantity">+</button>
            </div>
          </div>
        </div>

        <div class="product-actions">
          <button class="add-to-cart" @click="addToCart">
            Add to Cart
          </button>
          <button class="favorite" @click="toggleFavorite">
            <i :class="['fas', isFavorite ? 'fa-heart' : 'fa-heart']"></i>
          </button>
        </div>

        <div class="product-description">
          <h3>Product Details</h3>
          <p>{{ product.description }}</p>
          <ul class="features">
            <li>Premium quality materials</li>
            <li>Comfortable fit</li>
            <li>Easy care instructions</li>
          </ul>
        </div>
      </div>
    </div>

    <section class="related-products" v-if="relatedProducts.length">
      <h2>You May Also Like</h2>
      <div class="products-grid">
        <div 
          v-for="product in relatedProducts" 
          :key="product.id" 
          class="product-card"
        >
          <router-link :to="'/products/' + product.id">
            <img :src="product.images[0]" :alt="product.name">
            <div class="product-info">
              <h3>{{ product.name }}</h3>
              <p class="price">{{ formatPrice(product.price) }} ₫</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
  </div>
  <div v-else class="not-found">
    Product not found
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { products } from '@/data/products'
import type { Product } from '@/data/products'

const route = useRoute()
const product = computed<Product | undefined>(() => 
  products.find(p => p.id === route.params.id)
)

const sizes = ['XS', 'S', 'M', 'L', 'XL']
const selectedSize = ref('')
const selectedImage = ref(0)
const quantity = ref(1)
const isFavorite = ref(false)

const relatedProducts = computed(() => 
  products
    .filter(p => p.id !== product.value?.id && p.category === product.value?.category)
    .slice(0, 4)
)

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const increaseQuantity = () => {
  quantity.value++
}

const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
}

const addToCart = () => {
  if (!selectedSize.value) {
    alert('Please select a size')
    return
  }
  // TODO: Implement add to cart functionality
  console.log('Adding to cart:', {
    product: product.value,
    size: selectedSize.value,
    quantity: quantity.value
  })
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
</script>

<style scoped lang="scss">
.product-detail {
  padding: 48px;
}

.product-container {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 48px;
}

.product-gallery {
  position: sticky;
  top: 100px;

  .main-image {
    width: 100%;
    aspect-ratio: 3/4;
    margin-bottom: 16px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .thumbnails {
    display: flex;
    gap: 8px;

    .thumbnail {
      width: 80px;
      height: 80px;
      padding: 0;
      border: 2px solid transparent;
      border-radius: 4px;
      overflow: hidden;
      cursor: pointer;

      &.active {
        border-color: #111;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
}

.product-header {
  margin-bottom: 32px;

  h1 {
    font-size: 24px;
    margin-bottom: 8px;
  }

  .category {
    color: #666;
    margin-bottom: 16px;
  }

  .price {
    font-size: 20px;
    font-weight: 500;
  }
}

.product-options {
  margin-bottom: 32px;

  h3 {
    font-size: 16px;
    margin-bottom: 16px;
  }
}

.size-options {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  margin-bottom: 24px;

  .size-option {
    height: 48px;
    border: 1px solid #ddd;
    background: none;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #111;
    }

    &.active {
      background: #111;
      color: white;
      border-color: #111;
    }
  }
}

.quantity-controls {
  display: flex;
  align-items: center;
  width: fit-content;
  border: 1px solid #ddd;
  border-radius: 4px;

  button {
    padding: 8px 16px;
    border: none;
    background: none;
    cursor: pointer;
    font-size: 16px;

    &:hover {
      background: #f5f5f5;
    }
  }

  input {
    width: 60px;
    padding: 8px;
    border: none;
    text-align: center;
    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }
}

.product-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 32px;

  .add-to-cart {
    flex: 1;
    padding: 16px;
    background: #111;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background: #000;
    }
  }

  .favorite {
    width: 48px;
    background: none;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
      border-color: #111;
    }

    i {
      font-size: 20px;
      color: #111;
    }
  }
}

.product-description {
  h3 {
    font-size: 16px;
    margin-bottom: 16px;
  }

  p {
    color: #666;
    line-height: 1.6;
    margin-bottom: 16px;
  }

  .features {
    list-style: none;
    color: #666;

    li {
      padding-left: 24px;
      position: relative;
      margin-bottom: 8px;

      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: #111;
      }
    }
  }
}

.related-products {
  margin-top: 64px;
  padding-top: 48px;
  border-top: 1px solid #ddd;

  h2 {
    font-size: 24px;
    margin-bottom: 32px;
    text-align: center;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.product-card {
  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    aspect-ratio: 3/4;
    object-fit: cover;
    margin-bottom: 16px;
  }

  h3 {
    font-size: 16px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  .price {
    font-size: 14px;
    color: #666;
  }
}

.not-found {
  text-align: center;
  padding: 48px;
  color: #666;
}

@media (max-width: 1024px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .product-gallery {
    position: static;
  }

  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .product-detail {
    padding: 24px;
  }

  .size-options {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 480px) {
  .products-grid {
    grid-template-columns: 1fr;
  }
}
</style>
