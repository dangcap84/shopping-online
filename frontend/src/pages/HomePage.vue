<template>
  <div class="home-page">
    <!-- Banner Slider -->
    <div class="banner-slider">
      <div class="banner-slides" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
        <div v-for="banner in banners" :key="banner.id" class="banner-slide">
          <img :src="banner.image" :alt="banner.title">
          <div class="banner-content">
            <h2>{{ banner.title }}</h2>
            <p>{{ banner.description }}</p>
          </div>
        </div>
      </div>
      <button class="slide-control prev" @click="prevSlide">❮</button>
      <button class="slide-control next" @click="nextSlide">❯</button>
      <div class="slide-dots">
        <button 
          v-for="(banner, index) in banners" 
          :key="banner.id"
          :class="{ active: currentSlide === index }"
          @click="goToSlide(index)"
        ></button>
      </div>
    </div>

    <!-- Featured Products -->
    <section class="featured-products">
      <h2>Sản phẩm nổi bật</h2>
      <div class="products-grid">
        <div v-for="product in products" :key="product.id" class="product-card">
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
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { banners, products } from '@/data/products'

const currentSlide = ref(0)
const slideInterval = ref<number>()

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % banners.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + banners.length) % banners.length
}

const goToSlide = (index: number) => {
  currentSlide.value = index
}

const startSlideShow = () => {
  slideInterval.value = window.setInterval(() => {
    nextSlide()
  }, 5000)
}

const formatPrice = (price: number) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
}

onMounted(() => {
  startSlideShow()
})

onUnmounted(() => {
  if (slideInterval.value) {
    clearInterval(slideInterval.value)
  }
})
</script>

<style scoped lang="scss">
.home-page {
  padding-bottom: 2rem;
}

.banner-slider {
  position: relative;
  height: 500px;
  overflow: hidden;
  margin-bottom: 2rem;

  .banner-slides {
    display: flex;
    height: 100%;
    transition: transform 0.5s ease-in-out;
  }

  .banner-slide {
    min-width: 100%;
    position: relative;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .banner-content {
      position: absolute;
      bottom: 50px;
      left: 50px;
      color: white;
      text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);

      h2 {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      p {
        font-size: 1.2rem;
      }
    }
  }

  .slide-control {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    padding: 1rem;
    cursor: pointer;
    font-size: 1.5rem;
    transition: background-color 0.3s;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }

    &.prev {
      left: 20px;
    }

    &.next {
      right: 20px;
    }
  }

  .slide-dots {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 0.5rem;

    button {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      border: none;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      padding: 0;

      &.active {
        background: white;
      }
    }
  }
}

.featured-products {
  h2 {
    text-align: center;
    margin-bottom: 2rem;
  }
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 2rem;
  padding: 0 1rem;
}

.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-5px);
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  .product-info {
    padding: 1rem;

    h3 {
      margin: 0 0 0.5rem;
      font-size: 1.1rem;
    }

    .price {
      color: #4CAF50;
      font-weight: 600;
      margin: 0;
    }
  }
}

@media (max-width: 768px) {
  .banner-slider {
    height: 300px;

    .banner-content {
      left: 20px;
      bottom: 20px;

      h2 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }
}
</style>
