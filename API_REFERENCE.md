# KrishakMart API Reference

Base URL: `http://localhost:5000/api`

## Authentication

All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Authentication Endpoints

### Register User
```http
POST /auth/register
```

**Body:**
```json
{
  "name": "John Doe",
  "phone": "9876543210",
  "email": "john@example.com",
  "password": "password123",
  "role": "farmer",
  "shopName": "My Shop",
  "shopAddress": "123 Main St"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": { ... },
    "token": "jwt_token_here"
  }
}
```

### Login
```http
POST /auth/login
```

**Body:**
```json
{
  "phone": "9876543210",
  "password": "password123"
}
```

### Get Current User
```http
GET /auth/me
Headers: Authorization: Bearer <token>
```

### Update Password
```http
PUT /auth/password
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

---

## 📦 Product Endpoints

### Get All Products
```http
GET /products?category=seeds&search=wheat&minPrice=100&maxPrice=1000&sort=price-asc
```

**Query Parameters:**
- `category`: seeds, fertilizers, pesticides, tools, irrigation, feed
- `search`: Search term
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `sort`: price-asc, price-desc, rating, newest

### Get Single Product
```http
GET /products/:id
```

### Create Product (Shop Owner)
```http
POST /products
Headers: Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
name: Product Name
category: seeds
brand: Brand Name
price: 500
stock: 100
description: Product description
usage: Usage instructions
images: [file1, file2, ...]
```

### Update Product (Shop Owner)
```http
PUT /products/:id
Headers: Authorization: Bearer <token>
```

### Delete Product (Shop Owner/Admin)
```http
DELETE /products/:id
Headers: Authorization: Bearer <token>
```

### Get Seller's Products (Shop Owner)
```http
GET /products/seller/my-products
Headers: Authorization: Bearer <token>
```

---

## 🛒 Cart Endpoints

### Get Cart (Farmer)
```http
GET /cart
Headers: Authorization: Bearer <token>
```

### Add to Cart (Farmer)
```http
POST /cart
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item (Farmer)
```http
PUT /cart/:productId
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "quantity": 5
}
```

### Remove from Cart (Farmer)
```http
DELETE /cart/:productId
Headers: Authorization: Bearer <token>
```

### Clear Cart (Farmer)
```http
DELETE /cart
Headers: Authorization: Bearer <token>
```

---

## 📋 Order Endpoints

### Create Order (Farmer)
```http
POST /orders
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "products": [
    {
      "productId": "product_id",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "fullAddress": "Village Rampur, Near Temple",
    "village": "Rampur",
    "district": "Meerut",
    "state": "Uttar Pradesh",
    "pincode": "250001",
    "phone": "9876543210"
  },
  "paymentMethod": "COD"
}
```

### Get Farmer Orders
```http
GET /orders/my-orders
Headers: Authorization: Bearer <token>
```

### Get Seller Orders (Shop Owner)
```http
GET /orders/seller/orders
Headers: Authorization: Bearer <token>
```

### Get Single Order
```http
GET /orders/:id
Headers: Authorization: Bearer <token>
```

### Update Order Status (Shop Owner/Admin)
```http
PUT /orders/:id/status
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "status": "Shipped",
  "note": "Order dispatched via courier"
}
```

**Status Values:**
- Pending
- Accepted
- Packed
- Shipped
- Delivered
- Cancelled
- Rejected

### Cancel Order (Farmer/Seller)
```http
PUT /orders/:id/cancel
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "reason": "Changed my mind"
}
```

### Reorder (Farmer)
```http
POST /orders/:id/reorder
Headers: Authorization: Bearer <token>
```

---

## ❤️ Wishlist Endpoints

### Get Wishlist (Farmer)
```http
GET /wishlist
Headers: Authorization: Bearer <token>
```

### Add to Wishlist (Farmer)
```http
POST /wishlist/:productId
Headers: Authorization: Bearer <token>
```

### Remove from Wishlist (Farmer)
```http
DELETE /wishlist/:productId
Headers: Authorization: Bearer <token>
```

### Move to Cart (Farmer)
```http
POST /wishlist/:productId/move-to-cart
Headers: Authorization: Bearer <token>
```

---

## ⭐ Review Endpoints

### Get Product Reviews
```http
GET /reviews/:productId
```

### Add Review (Farmer)
```http
POST /reviews/:productId
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product!"
}
```

---

## 👤 User Endpoints

### Update Profile
```http
PUT /users/profile
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "shopName": "New Shop Name",
  "shopAddress": "New Address",
  "shopDescription": "Description",
  "gstNumber": "GST123456"
}
```

### Add Address (Farmer)
```http
POST /users/addresses
Headers: Authorization: Bearer <token>
```

**Body:**
```json
{
  "label": "Home",
  "fullAddress": "Complete address",
  "village": "Village name",
  "district": "District",
  "state": "State",
  "pincode": "123456",
  "phone": "9876543210",
  "isDefault": true
}
```

### Update Address (Farmer)
```http
PUT /users/addresses/:addressId
Headers: Authorization: Bearer <token>
```

### Delete Address (Farmer)
```http
DELETE /users/addresses/:addressId
Headers: Authorization: Bearer <token>
```

---

## 🔔 Notification Endpoints

### Get Notifications
```http
GET /notifications
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "count": 10,
  "unreadCount": 3,
  "data": [...]
}
```

### Mark as Read
```http
PUT /notifications/:id/read
Headers: Authorization: Bearer <token>
```

### Mark All as Read
```http
PUT /notifications/read-all
Headers: Authorization: Bearer <token>
```

### Delete Notification
```http
DELETE /notifications/:id
Headers: Authorization: Bearer <token>
```

---

## 👨‍💼 Admin Endpoints

### Get All Users (Admin)
```http
GET /admin/users?role=farmer
Headers: Authorization: Bearer <token>
```

**Query Parameters:**
- `role`: farmer, shopOwner, admin

### Block/Unblock User (Admin)
```http
PUT /admin/users/:id/block
Headers: Authorization: Bearer <token>
```

### Get All Orders (Admin)
```http
GET /admin/orders
Headers: Authorization: Bearer <token>
```

### Get All Products (Admin)
```http
GET /admin/products
Headers: Authorization: Bearer <token>
```

### Get Dashboard Stats (Admin)
```http
GET /admin/stats
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "overview": {
      "totalFarmers": 100,
      "totalSellers": 20,
      "totalProducts": 500,
      "totalOrders": 1000,
      "totalRevenue": 500000
    },
    "ordersByStatus": [...],
    "productsByCategory": [...],
    "monthlySales": [...]
  }
}
```

### Get Seller Earnings (Shop Owner/Admin)
```http
GET /admin/seller/earnings
GET /admin/seller/:id/earnings
Headers: Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "totalEarnings": 50000,
    "totalOrders": 100,
    "monthlyEarnings": [...]
  }
}
```

---

## 🏥 Health Check

### API Health
```http
GET /health
```

**Response:**
```json
{
  "status": "OK",
  "message": "KrishakMart API is running"
}
```

---

## 📝 Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message here"
}
```

---

## 🔒 Authorization Roles

- **Public**: No authentication required
- **Farmer**: Authenticated farmer users
- **Shop Owner**: Authenticated shop owner users
- **Admin**: Authenticated admin users

---

## 📊 Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 🧪 Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","phone":"9999999999","password":"test123","role":"farmer"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"phone":"9999999999","password":"test123"}'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

### Get Cart (with token)
```bash
curl http://localhost:5000/api/cart \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

## 📚 Additional Resources

- **Postman Collection**: Import all endpoints for easy testing
- **Swagger/OpenAPI**: (Future enhancement)
- **GraphQL**: (Future enhancement)

---

**Last Updated:** February 9, 2026
