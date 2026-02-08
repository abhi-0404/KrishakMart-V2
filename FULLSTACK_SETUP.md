# KrishakMart Full-Stack Setup Guide

Complete setup instructions for the KrishakMart Agriculture E-Commerce Platform

---

## 📋 Prerequisites

Before you begin, ensure you have:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)
- **Code Editor** - VS Code recommended

---

## 🚀 Quick Start (5 Minutes)

### Step 1: Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file with your settings
# Minimum required:
# MONGODB_URI=mongodb://localhost:27017/krishakmart
# JWT_SECRET=your_secret_key_here

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 2: Frontend Setup

```bash
# Open new terminal
# Navigate to frontend folder
cd frontend

# Dependencies already installed
# Start frontend server
npm run dev
```

Frontend will run on: **http://localhost:5173**

### Step 3: Access the Application

Open your browser and go to: **http://localhost:5173**

---

## 📦 Detailed Setup Instructions

### Backend Setup (Detailed)

1. **Install Dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment Variables**
   
   Create `.env` file in `backend/` folder:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/krishakmart
   JWT_SECRET=krishakmart_secret_key_2026
   FRONTEND_URL=http://localhost:5173
   ```

3. **Start MongoDB**
   
   **Option A: Local MongoDB**
   ```bash
   # Windows
   mongod
   
   # Mac/Linux
   sudo systemctl start mongod
   ```

   **Option B: MongoDB Atlas (Cloud)**
   - Create free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
   - Create cluster
   - Get connection string
   - Update `MONGODB_URI` in `.env`

4. **Start Backend Server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   ✅ MongoDB Connected Successfully
   🚀 Server running on port 5000
   📍 API: http://localhost:5000/api
   ```

5. **Test API**
   ```bash
   curl http://localhost:5000/api/health
   ```

   Response:
   ```json
   {
     "status": "OK",
     "message": "KrishakMart API is running"
   }
   ```

### Frontend Setup (Detailed)

1. **Navigate to Frontend**
   ```bash
   cd frontend
   ```

2. **Dependencies Already Installed**
   
   If needed, reinstall:
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```

   You should see:
   ```
   VITE v6.3.5  ready in 740 ms
   ➜  Local:   http://localhost:5173/
   ```

4. **Open in Browser**
   
   Navigate to: **http://localhost:5173**

---

## 🎯 First Time Usage

### Create Test Accounts

#### 1. Create Farmer Account
- Go to http://localhost:5173/signup/farmer
- Fill in details:
  - Name: Ramesh Kumar
  - Phone: 9876543210
  - Password: farmer123
- Click "Sign Up"

#### 2. Create Shop Owner Account
- Go to http://localhost:5173/signup/shop-owner
- Fill in details:
  - Name: Rajesh Sharma
  - Phone: 9876543211
  - Password: seller123
  - Shop Name: Green Valley Agro Store
- Click "Sign Up"

#### 3. Create Admin Account (via API)

Use Postman or cURL:
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "phone": "9876543212",
    "password": "admin123",
    "role": "admin"
  }'
```

### Add Sample Products (Shop Owner)

1. Login as Shop Owner
2. Go to Dashboard → Add Product
3. Fill in product details
4. Click "Add Product"

---

## 🔧 Configuration

### Backend Configuration

**File:** `backend/.env`

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/krishakmart

# Security
JWT_SECRET=your_super_secret_key_change_in_production

# CORS
FRONTEND_URL=http://localhost:5173

# Optional: Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend Configuration

The frontend automatically connects to `http://localhost:5000/api`

To change API URL, update axios base URL in frontend code.

---

## 📱 Testing the Application

### Test Farmer Flow

1. **Register/Login** as Farmer
2. **Browse Products** - Go to Shop page
3. **Add to Cart** - Click "Add to Cart" on products
4. **View Cart** - Click cart icon
5. **Checkout** - Fill delivery address
6. **Place Order** - Select payment method
7. **View Orders** - Go to Dashboard → My Orders

### Test Shop Owner Flow

1. **Register/Login** as Shop Owner
2. **Add Product** - Dashboard → Add Product
3. **View Products** - Dashboard → My Products
4. **Manage Orders** - Dashboard → Orders
5. **Update Status** - Change order status
6. **View Earnings** - Dashboard → Earnings

### Test Admin Flow

1. **Login** as Admin
2. **View Users** - Dashboard → Users
3. **View Products** - Dashboard → Products
4. **View Orders** - Dashboard → Orders
5. **View Analytics** - Dashboard → Reports

---

## 🐛 Troubleshooting

### Backend Issues

**Problem:** MongoDB connection error
```
Solution:
1. Check if MongoDB is running
2. Verify MONGODB_URI in .env
3. Check MongoDB logs
```

**Problem:** Port 5000 already in use
```
Solution:
1. Change PORT in .env to 5001
2. Or kill process using port 5000
```

**Problem:** JWT token error
```
Solution:
1. Check JWT_SECRET in .env
2. Clear browser localStorage
3. Login again
```

### Frontend Issues

**Problem:** API connection error
```
Solution:
1. Check if backend is running
2. Verify backend URL
3. Check CORS settings
```

**Problem:** Port 5173 already in use
```
Solution:
1. Kill process using port 5173
2. Or Vite will suggest alternative port
```

**Problem:** Build errors
```
Solution:
1. Delete node_modules
2. Run: npm install
3. Run: npm run dev
```

---

## 📊 Database Structure

### Collections Created Automatically

- **users** - Farmers, Shop Owners, Admins
- **products** - All products
- **carts** - Shopping carts
- **orders** - All orders
- **wishlists** - Farmer wishlists
- **reviews** - Product reviews

### Sample Data

The application starts with empty database. Add data through:
1. Registration forms
2. Product creation forms
3. API calls

---

## 🚀 Production Deployment

### Backend Deployment (Render/Heroku)

1. **Create Account** on Render.com or Heroku.com

2. **Connect GitHub Repository**

3. **Set Environment Variables**
   ```
   NODE_ENV=production
   MONGODB_URI=<your_mongodb_atlas_uri>
   JWT_SECRET=<strong_secret_key>
   FRONTEND_URL=<your_frontend_url>
   ```

4. **Deploy**

### Frontend Deployment (Vercel/Netlify)

1. **Build Frontend**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy `dist` folder** to Vercel/Netlify

3. **Update API URL** in frontend to point to production backend

### MongoDB Atlas Setup

1. Create account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP (0.0.0.0/0 for all IPs)
5. Get connection string
6. Update MONGODB_URI

---

## 📝 API Documentation

Full API documentation available at: `backend/README.md`

Quick API test:
```bash
# Health check
curl http://localhost:5000/api/health

# Register user
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","phone":"1234567890","password":"test123"}'
```

---

## 🎯 Features Checklist

### ✅ Farmer Features
- [x] Register/Login/Logout
- [x] Edit profile & change password
- [x] Multiple delivery addresses
- [x] Browse & search products
- [x] Filter by category, price
- [x] Add to cart
- [x] Wishlist
- [x] Place orders
- [x] View order history
- [x] Track orders
- [x] Cancel orders
- [x] Reorder
- [x] Rate & review

### ✅ Shop Owner Features
- [x] Register/Login/Logout
- [x] Edit shop profile
- [x] Add/Edit/Delete products
- [x] Manage stock
- [x] View orders
- [x] Update order status
- [x] View earnings

### ✅ Admin Features
- [x] View all users
- [x] Block/Unblock users
- [x] View all products
- [x] Delete products
- [x] View all orders
- [x] Dashboard analytics

---

## 🔐 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire in 30 days
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS enabled
- ⚠️ Change JWT_SECRET in production
- ⚠️ Use HTTPS in production
- ⚠️ Enable rate limiting in production

---

## 📞 Support

**Issues?** Check:
1. Backend logs in terminal
2. Frontend console in browser
3. MongoDB connection
4. Environment variables

**Still stuck?** Contact: support@krishakmart.com

---

## 🎉 You're All Set!

Your KrishakMart platform is now running!

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000
- **API Docs:** backend/README.md

**Next Steps:**
1. Create test accounts
2. Add sample products
3. Test complete flow
4. Customize as needed

---

**Built with ❤️ for Farmers - "Mitti Se Digital Tak"**
