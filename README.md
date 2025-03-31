# H24Store - Website Thời Trang Nữ

## Cấu trúc dự án
```
H24Store/
├── frontend/           # Next.js frontend application
│   ├── public/        # Static files
│   └── src/           # Source code
│       ├── assets/    # Media files, icons
│       ├── components/# Reusable components
│       ├── pages/     # Application pages
│       ├── services/  # API services
│       ├── utils/     # Helper functions
│       ├── hooks/     # Custom React hooks
│       └── context/   # State management
│
├── backend/           # Node.js API server
│   └── src/
│       ├── controllers/  # Business logic
│       ├── models/       # Database models
│       ├── routes/       # API routes
│       ├── middlewares/  # Custom middlewares
│       ├── utils/        # Helper functions
│       └── config/       # Configuration files
│
└── docs/             # Documentation
    ├── api-docs/     # API documentation
    └── diagrams/     # System diagrams
```

## Yêu cầu hệ thống
- Node.js 18+
- npm hoặc yarn
- MongoDB

## Cài đặt và chạy dự án

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
npm run dev
