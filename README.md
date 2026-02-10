# 🌾 KrishakMart - Agriculture E-Commerce Platform

A full-stack e-commerce platform connecting farmers with agricultural product suppliers. Built with React, Node.js, Express, and MongoDB.

![Status](https://img.shields.io/badge/status-production--ready-brightgreen)
![Backend](https://img.shields.io/badge/backend-Node.js%20%2B%20Express-green)
![Frontend](https://img.shields.io/badge/frontend-React%20%2B%20TypeScript-blue)
![Database](https://img.shields.io/badge/database-MongoDB-green)

## 🎯 Features

### For Farmers
- 🛒 Browse and search agricultural products
- 🛍️ Add products to cart and wishlist
- 📦 Place and track orders
- 💳 Multiple payment options (COD, UPI, QR)
- 👤 Manage profile and delivery addresses
- 📱 Responsive mobile-friendly interface

### For Shop Owners
- 📦 Add and manage products
- 📊 Track inventory and stock
- 🚚 Manage orders and update status
- 💰 View earnings and analytics
- 🏪 Manage shop profile

### For Admins
- 👥 Manage users (farmers and shop owners)
- 📦 Oversee all products and orders
- 📊 View platform statistics
- 🔒 Block/unblock users
- 💼 Monitor seller earnings

## 🏗️ Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **File Upload:** Multer + Cloudinary (optional)
- **Validation:** Express Validator
- **Security:** bcryptjs for password hashing

### Frontend
- **Framework:** React 18 with TypeScript
- **Routing:** React Router v7
- **State Management:** Context API
- **UI Components:** Radix UI + Tailwind CSS
- **HTTP Client:** Axios
- **Notifications:** Sonner (toast notifications)
- **Icons:** Lucide React

## 📁 Project Structure

```
KrishakMart/
├── backend/
│   ├── controllers/         # Business logic
│   │   ├── auth.controller.js
│   │   ├── product.controller.js
│   │   ├── order.controller.js
│   │   ├── cart.controller.js
│   │   └── ...
│   ├── models/             # Database schemas
│   │   ├── User.model.js
│   │   ├── Product.model.js
│   │   ├── Order.model.js
│   │   └── ...
│   ├── routes/             # API routes
│   │   ├── auth.routes.js
│   │   ├── product.routes.js
│   │   └── ...
│   ├── middleware/         # Custom middleware
│   │   ├── auth.middleware.js
│   │   └── upload.middleware.js
│   ├── scripts/            # Utility scripts
│   │   ├── seed.js
│   │   ├── clearTestUsers.js
│   │   └── testEndpoints.js
│   ├── uploads/            # Uploaded files (auto-created)
│   ├── .env                # Environment variables
│   ├── .env.example        # Environment template
│   ├── server.js           # Entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/    # Reusable components
│   │   │   │   ├── ui/        # UI components
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── ...
│   │   │   ├── pages/         # Page components
│   │   │   │   ├── HomePage.tsx
│   │   │   │   ├── ProductListingPage.tsx
│   │   │   │   ├── CheckoutPage.tsx
│   │   │   │   ├── farmer/    # Farmer pages
│   │   │   │   ├── shop-owner/ # Shop owner pages
│   │   │   │   └── admin/     # Admin pages
│   │   │   ├── context/       # State management
│   │   │   │   └── AppContext.tsx
│   │   │   └── App.tsx
│   │   └── services/          # API services
│   │       ├── api.ts
│   │       ├── authService.ts
│   │       ├── productService.ts
│   │       ├── orderService.ts
│   │       └── ...
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── INTEGRATION_COMPLETE.md  # Integration documentation
├── API_REFERENCE.md          # API documentation
├── DEPLOYMENT_GUIDE.md       # Deployment instructions
└── README.md                 # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd KrishakMart
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file (copy from .env.example)
cp .env.example .env

# Edit .env with your configuration
# Required: MONGODB_URI, JWT_SECRET

# Create necessary directories
npm run setup

# Start the server
npm run dev
```

The backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

## 🔐 Environment Configuration

### Backend (.env)

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/krishakmart
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishakmart

# JWT Secret (REQUIRED - change in production)
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173

# Cloudinary Configuration (Optional - for image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend

The frontend automatically connects to `http://localhost:5000/api`. To change this, edit `src/services/api.ts`.

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "phone": "9876543210",
  "password": "password123",
  "role": "farmer",
  "email": "john@example.com" // optional
}
```

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "phone": "9876543210",
  "password": "password123"
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>
```

### Product Endpoints

#### Get All Products
```http
GET /products?category=seeds&search=organic&minPrice=100&maxPrice=1000&sort=price-asc
```

#### Get Single Product
```http
GET /products/:id
```

#### Create Product (Shop Owner)
```http
POST /products
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "name": "Organic Seeds",
  "category": "seeds",
  "brand": "FarmBrand",
  "price": 500,
  "stock": 100,
  "description": "High quality organic seeds",
  "usage": "Sow in well-drained soil",
  "images": [file1, file2]
}
```

#### Update Stock
```http
PATCH /products/:id/stock
Authorization: Bearer <token>
Content-Type: application/json

{
  "stock": 150
}
```

### Order Endpoints

#### Create Order
```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "products": [
    {
      "productId": "product_id_here",
      "quantity": 2
    }
  ],
  "deliveryAddress": {
    "fullAddress": "123 Farm Road, Village Name",
    "village": "Village Name",
    "district": "District",
    "state": "State",
    "pincode": "123456",
    "phone": "9876543210"
  },
  "paymentMethod": "COD"
}
```

#### Get My Orders
```http
GET /orders/my-orders
Authorization: Bearer <token>
```

For complete API documentation, see [API_REFERENCE.md](./API_REFERENCE.md)

## 🧪 Testing

### Test Backend Endpoints
```bash
cd backend
npm run test
```

This will test all public and protected endpoints.

### Manual Testing

1. **Register a Farmer Account**
   - Go to http://localhost:5173/signup/farmer
   - Fill in the form and register

2. **Browse Products**
   - Go to http://localhost:5173/shop
   - Search and filter products

3. **Place an Order**
   - Add products to cart
   - Go to checkout
   - Fill delivery address
   - Place order

4. **Track Order**
   - Go to "My Orders" in farmer dashboard
   - View order status

## 🛠️ Available Scripts

### Backend
```bash
npm run dev          # Start development server with nodemon
npm start            # Start production server
npm run seed         # Seed database with sample data
npm run test         # Test API endpoints
npm run setup        # Create necessary directories
npm run clear-users  # Clear all users from database
```

### Frontend
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ Input validation
- ✅ CORS configuration
- ✅ File upload validation
- ✅ SQL injection prevention (MongoDB)
- ✅ XSS protection

## 🎨 UI/UX Features

- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern and clean interface
- ✅ Loading states and skeletons
- ✅ Toast notifications
- ✅ Form validation
- ✅ Error handling
- ✅ Smooth animations
- ✅ Accessible components

## 📦 Database Schema

### User
- name, phone, email, password
- role (farmer, shopOwner, admin)
- addresses (for farmers)
- shopName, shopAddress (for shop owners)
- isBlocked, isVerified

### Product
- name, category, brand, price, stock
- description, usage, images
- sellerId (reference to User)
- rating, numReviews
- isAvailable

### Order
- farmerId, sellerId (references to User)
- products (array of order items)
- totalAmount, deliveryAddress
- paymentMethod, paymentStatus
- orderStatus, statusHistory
- cancelReason

### Cart
- farmerId (reference to User)
- items (array of cart items)

### Wishlist
- farmerId (reference to User)
- products (array of product references)

### Review
- productId, userId (references)
- rating, comment
- isVerified

### Notification
- userId (reference to User)
- type, title, message
- isRead, relatedId

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Render)

1. Set environment variables
2. Update MONGODB_URI to production database
3. Change JWT_SECRET to strong random string
4. Set NODE_ENV=production
5. Configure CORS for production domain
6. Deploy using platform CLI or Git

### Frontend Deployment (Vercel/Netlify)

1. Update API base URL in `src/services/api.ts`
2. Build production bundle: `npm run build`
3. Deploy `dist` folder
4. Configure environment variables if needed

For detailed deployment instructions, see [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify .env configuration
- Check if port 5000 is available
- Run `npm install` to ensure dependencies are installed

### Frontend won't connect to backend
- Verify backend is running on port 5000
- Check CORS configuration in backend
- Clear browser cache and localStorage
- Check browser console for errors

### Images not uploading
- Verify `uploads/products` directory exists
- Check file size (max 5MB)
- Verify file type (jpg, png, gif, webp)
- Check Cloudinary configuration if using

### "User already exists" error
- Run `npm run clear-users` in backend directory
- Or use a different phone number

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 👥 Authors

- **KrishakMart Team**

## 🙏 Acknowledgments

- React and Node.js communities
- Radix UI for accessible components
- Tailwind CSS for styling
- MongoDB for database
- All open-source contributors

## 📞 Support

For support, email support@krishakmart.com or open an issue in the repository.

---

**Made with ❤️ for farmers and agricultural communities**

**Status:** ✅ Production Ready
**Last Updated:** February 10, 2026
