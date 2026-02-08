# KrishakMart Backend API

Complete REST API for KrishakMart Agriculture E-Commerce Platform

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Update `.env` with your configuration:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/krishakmart
JWT_SECRET=your_secret_key_here
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

Server will run on `http://localhost:5000`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 🔐 Auth Routes

### Register User
```http
POST /api/auth/register
```
**Body:**
```json
{
  "name": "Ramesh Kumar",
  "phone": "9876543210",
  "email": "ramesh@example.com",
  "password": "password123",
  "role": "farmer",
  "shopName": "Green Valley Store",
  "shopAddress": "Main Market, Delhi"
}
```

### Login
```http
POST /api/auth/login
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
GET /api/auth/me
```
**Headers:** `Authorization: Bearer <token>`

### Update Password
```http
PUT /api/auth/password
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "currentPassword": "oldpass",
  "newPassword": "newpass"
}
```

---

## 📦 Product Routes

### Get All Products
```http
GET /api/products?category=seeds&search=wheat&minPrice=100&maxPrice=1000&sort=price-asc
```

### Get Single Product
```http
GET /api/products/:id
```

### Create Product (Shop Owner)
```http
POST /api/products
```
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "name": "Wheat Seeds Premium",
  "category": "seeds",
  "brand": "AgriGrow",
  "price": 850,
  "stock": 150,
  "description": "Premium quality wheat seeds",
  "usage": "Sow 40-50 kg per acre",
  "images": ["url1", "url2"]
}
```

### Update Product (Shop Owner)
```http
PUT /api/products/:id
```

### Delete Product (Shop Owner/Admin)
```http
DELETE /api/products/:id
```

### Get Seller's Products
```http
GET /api/products/seller/my-products
```

---

## 🛒 Cart Routes (Farmer Only)

### Get Cart
```http
GET /api/cart
```

### Add to Cart
```http
POST /api/cart
```
**Body:**
```json
{
  "productId": "product_id_here",
  "quantity": 2
}
```

### Update Cart Item
```http
PUT /api/cart/:productId
```
**Body:**
```json
{
  "quantity": 3
}
```

### Remove from Cart
```http
DELETE /api/cart/:productId
```

### Clear Cart
```http
DELETE /api/cart
```

---

## 📋 Order Routes

### Create Order (Farmer)
```http
POST /api/orders
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
    "fullAddress": "Village Rampur, District Meerut",
    "village": "Rampur",
    "district": "Meerut",
    "state": "UP",
    "pincode": "250001",
    "phone": "9876543210"
  },
  "paymentMethod": "COD"
}
```

### Get Farmer Orders
```http
GET /api/orders/my-orders
```

### Get Seller Orders
```http
GET /api/orders/seller/orders
```

### Get Single Order
```http
GET /api/orders/:id
```

### Update Order Status (Seller/Admin)
```http
PUT /api/orders/:id/status
```
**Body:**
```json
{
  "status": "Packed",
  "note": "Order packed and ready"
}
```

### Cancel Order
```http
PUT /api/orders/:id/cancel
```
**Body:**
```json
{
  "reason": "Changed my mind"
}
```

### Reorder (Farmer)
```http
POST /api/orders/:id/reorder
```

---

## ❤️ Wishlist Routes (Farmer Only)

### Get Wishlist
```http
GET /api/wishlist
```

### Add to Wishlist
```http
POST /api/wishlist/:productId
```

### Remove from Wishlist
```http
DELETE /api/wishlist/:productId
```

### Move to Cart
```http
POST /api/wishlist/:productId/move-to-cart
```

---

## ⭐ Review Routes

### Get Product Reviews
```http
GET /api/reviews/:productId
```

### Add Review (Farmer)
```http
POST /api/reviews/:productId
```
**Body:**
```json
{
  "rating": 5,
  "comment": "Excellent product!"
}
```

---

## 👤 User Routes

### Update Profile
```http
PUT /api/users/profile
```
**Body:**
```json
{
  "name": "Updated Name",
  "email": "newemail@example.com",
  "shopName": "New Shop Name"
}
```

### Add Address (Farmer)
```http
POST /api/users/addresses
```
**Body:**
```json
{
  "label": "Home",
  "fullAddress": "Village Rampur, District Meerut",
  "village": "Rampur",
  "district": "Meerut",
  "state": "UP",
  "pincode": "250001",
  "phone": "9876543210",
  "isDefault": true
}
```

### Update Address
```http
PUT /api/users/addresses/:addressId
```

### Delete Address
```http
DELETE /api/users/addresses/:addressId
```

---

## 👨‍💼 Admin Routes

### Get All Users
```http
GET /api/admin/users?role=farmer
```

### Block/Unblock User
```http
PUT /api/admin/users/:id/block
```

### Get All Orders
```http
GET /api/admin/orders
```

### Get All Products
```http
GET /api/admin/products
```

### Get Dashboard Stats
```http
GET /api/admin/stats
```

### Get Seller Earnings
```http
GET /api/admin/seller/:id/earnings
GET /api/admin/seller/earnings  (for own earnings)
```

---

## 📊 Database Models

### User
- name, phone, email, password
- role: farmer | shopOwner | admin
- addresses (for farmers)
- shopName, shopAddress (for shop owners)
- isBlocked, isVerified

### Product
- name, category, brand, price, stock
- description, usage, images
- sellerId, shopOwner
- rating, numReviews
- isAvailable

### Cart
- farmerId
- items: [{ productId, quantity }]

### Order
- farmerId, sellerId, customerName
- products: [{ productId, productName, quantity, price, image }]
- totalAmount, deliveryAddress
- paymentMethod, paymentStatus
- orderStatus, statusHistory
- cancelReason

### Wishlist
- farmerId
- products: [productId]

### Review
- productId, farmerId, farmerName
- rating, comment

---

## 🔒 Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT authentication
- ✅ Role-based authorization
- ✅ Protected routes
- ✅ Input validation
- ✅ CORS enabled

---

## 🎯 Features Implemented

### Farmer Features
- ✅ Register/Login/Logout
- ✅ Edit profile & change password
- ✅ Multiple delivery addresses
- ✅ Browse & search products
- ✅ Filter by category, price
- ✅ View product details
- ✅ Cart management
- ✅ Wishlist management
- ✅ Place orders
- ✅ View order history
- ✅ Track order status
- ✅ Cancel orders
- ✅ Reorder
- ✅ Rate & review products

### Shop Owner Features
- ✅ Register/Login/Logout
- ✅ Edit shop profile
- ✅ Add/Edit/Delete products
- ✅ Manage stock
- ✅ View incoming orders
- ✅ Accept/Reject orders
- ✅ Update order status
- ✅ View earnings

### Admin Features
- ✅ View all users
- ✅ Block/Unblock users
- ✅ View all products
- ✅ Delete products
- ✅ View all orders
- ✅ Update order status
- ✅ Dashboard analytics
- ✅ Sales reports

### System Features
- ✅ JWT authentication
- ✅ Role-based access
- ✅ Stock auto-reduction
- ✅ Cart auto-clear after order
- ✅ Order status tracking
- ✅ Product rating system

---

## 🧪 Testing

Test the API using:
- Postman
- Thunder Client (VS Code)
- cURL

### Health Check
```bash
curl http://localhost:5000/api/health
```

---

## 📝 Environment Variables

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/krishakmart
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Deployment

### Deploy to Render/Heroku

1. Set environment variables
2. Connect MongoDB Atlas
3. Deploy from GitHub

### MongoDB Atlas Setup

1. Create cluster at mongodb.com
2. Get connection string
3. Update MONGODB_URI in .env

---

## 📦 Dependencies

- express - Web framework
- mongoose - MongoDB ODM
- bcryptjs - Password hashing
- jsonwebtoken - JWT auth
- cors - CORS middleware
- dotenv - Environment variables
- multer - File uploads
- express-validator - Input validation

---

## 🎯 API Response Format

### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message"
}
```

---

## 📞 Support

For issues or questions, contact: support@krishakmart.com

---

**Built with ❤️ for Farmers**
