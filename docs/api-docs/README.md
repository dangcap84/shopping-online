# H24Store API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication
API sử dụng JSON Web Tokens (JWT) để xác thực. Token phải được gửi trong header "Authorization":
```
Authorization: Bearer <token>
```

## API Endpoints

### Authentication
```
POST /auth/register - Đăng ký tài khoản mới
POST /auth/login - Đăng nhập
POST /auth/logout - Đăng xuất
GET /auth/me - Lấy thông tin user hiện tại
```

### Products
```
GET /products - Lấy danh sách sản phẩm
GET /products/:id - Lấy chi tiết sản phẩm
POST /products - Tạo sản phẩm mới (Admin)
PUT /products/:id - Cập nhật sản phẩm (Admin)
DELETE /products/:id - Xóa sản phẩm (Admin)
```

### Categories
```
GET /categories - Lấy danh sách danh mục
GET /categories/:id - Lấy chi tiết danh mục
POST /categories - Tạo danh mục mới (Admin)
PUT /categories/:id - Cập nhật danh mục (Admin)
DELETE /categories/:id - Xóa danh mục (Admin)
```

### Orders
```
GET /orders - Lấy danh sách đơn hàng của user
GET /orders/:id - Lấy chi tiết đơn hàng
POST /orders - Tạo đơn hàng mới
PUT /orders/:id - Cập nhật trạng thái đơn hàng (Admin)
```

### Users
```
GET /users - Lấy danh sách users (Admin)
GET /users/:id - Lấy chi tiết user (Admin)
PUT /users/:id - Cập nhật thông tin user
DELETE /users/:id - Xóa user (Admin)
```

## Models

### User
```typescript
{
  id: string
  email: string
  password: string
  fullName: string
  phone: string
  address: string
  role: "user" | "admin"
  createdAt: Date
  updatedAt: Date
}
```

### Product
```typescript
{
  id: string
  name: string
  description: string
  price: number
  images: string[]
  category: string // Category ID
  sizes: string[]
  colors: string[]
  stock: number
  createdAt: Date
  updatedAt: Date
}
```

### Category 
```typescript
{
  id: string
  name: string
  description: string
  image: string
  createdAt: Date
  updatedAt: Date
}
```

### Order
```typescript
{
  id: string
  user: string // User ID
  items: Array<{
    product: string // Product ID
    quantity: number
    size: string
    color: string
    price: number
  }>
  totalAmount: number
  status: "pending" | "confirmed" | "shipping" | "delivered" | "cancelled"
  shippingAddress: string
  paymentMethod: "cod" | "banking"
  createdAt: Date
  updatedAt: Date
}
```

## Error Handling

Tất cả các lỗi sẽ được trả về với format:
```typescript
{
  status: "error",
  message: string,
  code?: string,
  details?: any
}
```

## Status Codes
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 403: Forbidden
- 404: Not Found
- 500: Internal Server Error
