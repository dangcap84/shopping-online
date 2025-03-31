export interface Product {
  id: string
  name: string
  price: number
  description: string
  images: string[]
  category: string
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Đầm Dự Tiệc Thiết Kế Cao Cấp',
    price: 2490000,
    description: 'Đầm dự tiệc thiết kế cao cấp, chất liệu vải cao cấp, form dáng sang trọng, thanh lịch.',
    images: [
      'https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg',
      'https://images.pexels.com/photos/7679863/pexels-photo-7679863.jpeg'
    ],
    category: 'dresses'
  },
  {
    id: '2',
    name: 'Áo Blazer Dáng Suông',
    price: 1890000,
    description: 'Áo blazer dáng suông thanh lịch, chất liệu vải tuyết mưa cao cấp, form dáng hiện đại.',
    images: [
      'https://images.pexels.com/photos/6766277/pexels-photo-6766277.jpeg',
      'https://images.pexels.com/photos/6766331/pexels-photo-6766331.jpeg'
    ],
    category: 'jackets'
  },
  {
    id: '3',
    name: 'Quần Âu Ống Suông',
    price: 890000,
    description: 'Quần âu ống suông thanh lịch, chất liệu vải tuyết mưa cao cấp, form dáng tôn dáng.',
    images: [
      'https://images.pexels.com/photos/6765185/pexels-photo-6765185.jpeg',
      'https://images.pexels.com/photos/6765184/pexels-photo-6765184.jpeg'
    ],
    category: 'pants'
  },
  {
    id: '4',
    name: 'Áo Sơ Mi Lụa',
    price: 990000,
    description: 'Áo sơ mi lụa cao cấp, chất liệu mềm mại, thoáng mát, form dáng thanh lịch.',
    images: [
      'https://images.pexels.com/photos/6765824/pexels-photo-6765824.jpeg',
      'https://images.pexels.com/photos/6765831/pexels-photo-6765831.jpeg'
    ],
    category: 'tops'
  }
]

export const categories = [
  {
    id: 'dresses',
    name: 'Đầm',
    image: 'https://images.pexels.com/photos/6766071/pexels-photo-6766071.jpeg'
  },
  {
    id: 'jackets',
    name: 'Áo khoác',
    image: 'https://images.pexels.com/photos/6766274/pexels-photo-6766274.jpeg'
  },
  {
    id: 'pants',
    name: 'Quần',
    image: 'https://images.pexels.com/photos/6765183/pexels-photo-6765183.jpeg'
  },
  {
    id: 'tops',
    name: 'Áo',
    image: 'https://images.pexels.com/photos/6765829/pexels-photo-6765829.jpeg'
  }
]

export const banners = [
  {
    id: '1',
    title: 'Bộ sưu tập mới',
    description: 'Khám phá những thiết kế mới nhất của chúng tôi',
    image: 'https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg'
  },
  {
    id: '2',
    title: 'Xu hướng mùa hè',
    description: 'Những items không thể thiếu trong mùa hè này',
    image: 'https://images.pexels.com/photos/5384425/pexels-photo-5384425.jpeg'
  }
]
