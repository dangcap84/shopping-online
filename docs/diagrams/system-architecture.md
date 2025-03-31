# H24Store System Architecture

## Tổng quan hệ thống

```mermaid
graph TD
    Client[Client Browser] -->|HTTP/HTTPS| F[Frontend Server - Next.js]
    F -->|API Calls| B[Backend Server - Express.js]
    B -->|Query/Write| DB[(MongoDB)]
    B -->|File Upload| CS[Cloudinary Storage]
    B -->|Email| ES[Email Service]
```

## Chi tiết kiến trúc Frontend

```mermaid
graph TD
    subgraph Frontend
        Pages[Pages] --> Components[Components]
        Pages --> Services[API Services]
        Components --> Hooks[Custom Hooks]
        Components --> Context[Global State]
        Services --> Utils[Utility Functions]
        Context --> Services
    end
```

## Chi tiết kiến trúc Backend

```mermaid
graph TD
    subgraph Backend
        Routes[API Routes] --> Controllers[Controllers]
        Controllers --> Models[Database Models]
        Controllers --> Services[Business Services]
        Routes --> Middleware[Middlewares]
        Middleware --> Auth[Authentication]
        Models --> DB[(MongoDB)]
    end
```

## Luồng xử lý đơn hàng

```mermaid
sequenceDiagram
    Client->>Frontend: 1. Thêm sản phẩm vào giỏ
    Frontend->>Backend: 2. Tạo đơn hàng
    Backend->>DB: 3. Lưu đơn hàng
    Backend->>Email Service: 4. Gửi email xác nhận
    Backend->>Frontend: 5. Trả về thông tin đơn hàng
    Frontend->>Client: 6. Hiển thị xác nhận
```

## Authentication Flow

```mermaid
sequenceDiagram
    Client->>Frontend: 1. Login Request
    Frontend->>Backend: 2. Authenticate
    Backend->>DB: 3. Verify Credentials
    Backend->>Frontend: 4. Return JWT
    Frontend->>Client: 5. Store Token
```

## Deployment Architecture

```mermaid
graph TD
    subgraph Production
        C[Client] -->|HTTPS| CDN[CDN]
        CDN --> VM1[Frontend Server]
        VM1 --> VM2[Backend API Server]
        VM2 --> DB[(MongoDB Atlas)]
        VM2 --> CS[Cloudinary CDN]
    end
