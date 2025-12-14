# ShopOnline - Dự án bán hàng trực tuyến

Dự án bán hàng đơn giản với backend Node.js/Express + MySQL và frontend React, có thể deploy riêng biệt.

## Cấu trúc dự án

```
ShopOnline/
├── backend/          # Backend API (Node.js/Express)
│   ├── config/       # Database configuration
│   ├── routes/       # API routes
│   ├── database/     # Database schema
│   └── server.js     # Entry point
│
└── frontend/         # Frontend (React)
    ├── public/       # Static files
    └── src/          # React source code
        ├── components/
        ├── config/
        └── utils/
```

## Yêu cầu

- Node.js (v14 trở lên)
- MySQL (v5.7 trở lên)
- npm hoặc yarn

## Run with Docker
Requirements: Docker Desktop

```bash
docker compose up -d --build

- Giỏ hàng hiện tại lưu trong memory của server (sẽ mất khi restart server)
- Chưa có tính năng thanh toán

