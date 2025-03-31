<template>
  <div class="products-page">
    <div class="hero-banner">
      <img :src="heroImage" alt="Collection banner">
      <div class="hero-content">
        <h1>Women's Collection</h1>
        <p>Discover our latest styles</p>
      </div>
    </div>

    <div class="products-container">
      <aside class="filters">
        <div class="filter-group">
          <h3>Size</h3>
          <div class="size-options">
            <label v-for="size in sizes" :key="size" class="size-option">
              <input
                type="checkbox"
                v-model="selectedSizes"
                :value="size"
              >
              <span>{{ size }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Color</h3>
          <div class="color-options">
            <label v-for="color in colors" :key="color.value" class="color-option">
              <input
                type="checkbox"
                v-model="selectedColors"
                :value="color.value"
              >
              <span class="color-swatch" :style="{ background: color.hex }"></span>
              <span class="color-name">{{ color.name }}</span>
            </label>
          </div>
        </div>

        <div class="filter-group">
          <h3>Price</h3>
          <div class="price-range">
            <input
              type="range"
              v-model="priceRange"
              min="0"
              max="5000000"
              step="100000"
            >
            <div class="price-inputs">
              <span>{{ formatPrice(0) }}₫</span>
              <span>{{ formatPrice(priceRange) }}₫</span>
            </div>
          </div>
        </div>
      </aside>

      <main class="products-main">
        <div class="products-header">
          <div class="results-count">
            {{ filteredProducts.length }} sản phẩm
          </div>
          <div class="sort-options">
            <select v-model="sortOption">
              <option value="newest">Mới nhất</option>
              <option value="price-asc">Giá thấp - cao</option>
              <option value="price-desc">Giá cao - thấp</option>
            </select>
          </div>
        </div>

        <div class="products-grid">
          <div 
            v-for="product in sortedProducts" 
            :key="product.id" 
            class="product-card"
            @mouseenter="hoveredProduct = product.id"
            @mouseleave="hoveredProduct = null"
          >
            <router-link :to="'/products/' + product.id">
              <div class="product-image">
                <img 
                  :src="hoveredProduct === product.id && product.images[1] ? product.images[1] : product.images[0]" 
                  :alt="product.name"
                >
              </div>
              <div class="product-info">
                <h3>{{ product.name }}</h3>
                <p class="product-category">{{ product.category }}</p>
                <p class="product-colors">{{ product.images.length }} colors</p>
                <p class="product-price">{{ formatPrice(product.price) }} ₫</p>
              </div>
            </router-link>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { products } from '@/data/products'

// Sample data
const heroImage = 'https://images.pexels.com/photos/5325599/pexels-photo-5325599.jpeg'
const sizes = ['XS', 'S', 'M', 'L', 'XL']
const colors = [
  { name: 'Black', value: 'black', hex: '#000000' },
  { name: 'White', value: 'white', hex: '#FFFFFF' },
  { name: 'Red', value: 'red', hex: '#FF0000' },
  { name: 'Blue', value: 'blue', hex: '#0000FF' },
]

// State
const selectedSizes = ref<string[]>([])
const selectedColors = ref<string[]>([])
const priceRange = ref(5000000)
const sortOption = ref('newest')
const hoveredProduct = ref<string | null>(null)

// Computed
const filteredProducts = computed(() => {
  return products.filter(product => {
    // Price filter
    if (product.price > priceRange.value) {
      return false
    }
    // Add more filters as needed
    return true
  })
})

const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]
  switch (sortOption.value) {
    case 'price-asc':
      return products.sort((a, b) => a.price - b.price)
    case 'price-desc':
      return products.sort((a, b) => b.price - a.price)
    case 'newest':
    default:
      return products
  }
})

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}
</script>

<style scoped lang="scss">
.products-page {
  padding-bottom: 48px;
}

.hero-banner {
  position: relative;
  height: 400px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .hero-content {
    position: absolute;
    bottom: 48px;
    left: 48px;
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

    h1 {
      font-size: 48px;
      margin-bottom: 8px;
    }

    p {
      font-size: 20px;
    }
  }
}

.products-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 32px 48px;
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: 32px;
}

.filters {
  .filter-group {
    margin-bottom: 32px;

    h3 {
      font-size: 16px;
      margin-bottom: 16px;
    }
  }
}

.size-options {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;

  .size-option {
    input {
      display: none;
    }

    span {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 40px;
      border: 1px solid #ddd;
      cursor: pointer;
      font-size: 14px;
      transition: all 0.2s;
    }

    input:checked + span {
      background: #111;
      color: white;
      border-color: #111;
    }
  }
}

.color-options {
  display: flex;
  flex-direction: column;
  gap: 12px;

  .color-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;

    input {
      display: none;
    }

    .color-swatch {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      border: 1px solid #ddd;
    }

    .color-name {
      font-size: 14px;
    }

    input:checked ~ .color-name {
      font-weight: 500;
    }
  }
}

.price-range {
  input[type="range"] {
    width: 100%;
    margin-bottom: 8px;
  }

  .price-inputs {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    color: #666;
  }
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 32px;

  .results-count {
    font-size: 14px;
    color: #666;
  }

  select {
    padding: 8px 24px 8px 12px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    appearance: none;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24'%3E%3Cpath d='M7 10l5 5 5-5z'/%3E%3C/svg%3E") no-repeat right 8px center;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.product-card {
  a {
    text-decoration: none;
    color: inherit;
  }

  .product-image {
    position: relative;
    aspect-ratio: 3/4;
    overflow: hidden;
    margin-bottom: 16px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s ease;
    }
  }

  .product-info {
    h3 {
      font-size: 16px;
      font-weight: 400;
      margin-bottom: 4px;
    }

    .product-category,
    .product-colors {
      font-size: 14px;
      color: #666;
      margin-bottom: 4px;
    }

    .product-price {
      font-size: 16px;
    }
  }

  &:hover {
    .product-image img {
      transform: scale(1.05);
    }
  }
}

@media (max-width: 1024px) {
  .products-container {
    grid-template-columns: 1fr;
  }

  .filters {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-banner {
    height: 300px;

    .hero-content {
      left: 24px;
      bottom: 24px;

      h1 {
        font-size: 32px;
      }

      p {
        font-size: 16px;
      }
    }
  }

  .products-container {
    padding: 24px;
  }
}
</style>
