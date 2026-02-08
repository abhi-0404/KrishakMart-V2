# KrishakMart Project Structure

Complete file structure and organization

---

## 📁 Root Structure

```
KrishakMart/
├── frontend/                 # React Frontend Application
├── backend/                  # Node.js Backend API
├── FULLSTACK_SETUP.md       # Complete setup guide
├── PROJECT_STRUCTURE.md     # This file
├── BRAND_GUIDE.md           # Brand guidelines
├── COLOR_REFERENCE.md       # Color reference
└── README.md                # Project overview
```

---

## 🎨 Frontend Structure

```
frontend/
├── public/                   # Static assets
├── src/
│   ├── app/
│   │   ├── components/      # Reusable components
│   │   │   ├── ui/          # UI components (buttons, cards, etc.)
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   └── DashboardLayout.tsx
│   │   │
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── ProductListingPage.tsx
│   │   │   ├── ProductDetailsPage.tsx
│   │   │   ├── CartPage.tsx
│   │   │   ├── CheckoutPage.tsx
│   │   │   ├── LoginPage.tsx
│   │   │   ├── SignupPage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── ContactPage.tsx
│   │   │   ├── BecomeSellerPage.tsx
│   │   │   │
│   │   │   ├── farmer/      # Farmer pages
│   │   │   │   ├── FarmerDashboard.tsx
│   │   │   │   ├── FarmerOrders.tsx
│   │   │   │   ├── FarmerWishlist.tsx
│   │   │   │   └── FarmerProfile.tsx
│   │   │   │
│   │   │   ├── shop-owner/  # Shop Owner pages
│   │   │   │   ├── ShopOwnerDashboard.tsx
│   │   │   │   ├── ShopOwnerProducts.tsx
│   │   │   │   ├── ShopOwnerAddProduct.tsx
│   │   │   │   ├── ShopOwnerOrders.tsx
│   │   │   │   ├── ShopOwnerEarnings.tsx
│   │   │   │   └── ShopOwnerProfile.tsx
│   │   │   │
│   │   │   └── admin/       # Admin pages
│   │   │       └── AdminDashboard.tsx
│   │   │
│   │   ├── context/         # React Context
│   │   │   └── AppContext.tsx
│   │   │
│   │   ├── data/            # Mock data (to be replaced with API)
│   │   │   └── mockData.ts
│   │   │
│   │   └── App.tsx          # Main app component
│   │
│   ├── styles/              # Global styles
│   │   ├── index.css
│   │   ├── fonts.css
│   │   ├── tailwind.css
│   │   └── theme.css
│   │
│   └── main.tsx             # Entry point
│
├── index.html               # HTML template
├── package.json             # Dependencies
├── vite.config.ts           # Vite configuration
├── postcss.config.mjs       # PostCSS config
└── README.md                # Frontend docs
```

---

## 🔧 Backend Structure

```
backend/
├── controllers/             # Request handlers
│   ├── auth.controller.js
│   ├── product.controller.js
│   ├── cart.controller.js
│   ├── order.controller.js
│   ├── user.controller.js
│   ├── wishlist.controller.js
│   ├── review.controller.js
│   └── admin.controller.js
│
├── models/                  # Database models
│   ├── User.model.js
│   ├── Product.model.js
│   ├── Cart.model.js
│   ├── Order.model.js
│   ├── Wishlist.model.js
│   └── Review.model.js
│
├── routes/                  # API routes
│   ├── auth.routes.js
│   ├── product.routes.js
│   ├── cart.routes.js
│   ├── order.routes.js
│   ├── user.routes.js
│   ├── wishlist.routes.js
│   ├── review.routes.js
│   └── admin.routes.js
│
├── middleware/              # Custom middleware
│   └── auth.middleware.js
│
├── uploads/                 # Uploaded files (created automatically)
│
├── server.js                # Server entry point
├── package.json             # Dependencies
├── .env.example             # Environment template
├── .env                     # Environment variables (create this)
├── .gitignore               # Git ignore rules
└── README.md                # Backend docs
```

---

## 🗄️ Database Collections

### MongoDB Collections (Auto-created)

```
krishakmart (database)
├── users                    # All users (farmers, sellers, admins)
├── products                 # All products
├── carts                    # Shopping carts
├── orders                   # All orders
├── wishlists                # Farmer wishlists
└── reviews                  # Product reviews
```

---

## 📋 Key Files Explained

### Frontend

**`src/app/App.tsx`**
- Main application component
- React Router setup
- Route definitions
- Protected routes logic

**`src/app/context/AppContext.tsx`**
- Global state management
- User authentication state
- Cart state
- Wishlist state
- Language preference

**`src/app/components/Navbar.tsx`**
- Navigation bar
- User menu
- Cart icon
- Language switcher

**`src/app/pages/HomePage.tsx`**
- Landing page
- Hero section with tagline
- Featured products
- Categories

**`src/styles/theme.css`**
- Brand colors (Forest Green, Soil Brown)
- CSS variables
- Theme configuration

**`vite.config.ts`**
- Vite configuration
- Build optimization
- Code splitting

### Backend

**`server.js`**
- Express server setup
- MongoDB connection
- Middleware configuration
- Route mounting
- Error handling

**`models/User.model.js`**
- User schema
- Password hashing
- Address management
- Role-based fields

**`models/Product.model.js`**
- Product schema
- Category validation
- Stock management
- Rating system

**`models/Order.model.js`**
- Order schema
- Order status tracking
- Payment information
- Delivery address

**`controllers/auth.controller.js`**
- User registration
- Login logic
- JWT token generation
- Password management

**`middleware/auth.middleware.js`**
- JWT verification
- User authentication
- Role-based authorization
- Token generation

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
PUT    /api/auth/password
```

### Products
```
GET    /api/products
GET    /api/products/:id
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id
GET    /api/products/seller/my-products
```

### Cart
```
GET    /api/cart
POST   /api/cart
PUT    /api/cart/:productId
DELETE /api/cart/:productId
DELETE /api/cart
```

### Orders
```
POST   /api/orders
GET    /api/orders/my-orders
GET    /api/orders/seller/orders
GET    /api/orders/:id
PUT    /api/orders/:id/status
PUT    /api/orders/:id/cancel
POST   /api/orders/:id/reorder
```

### Wishlist
```
GET    /api/wishlist
POST   /api/wishlist/:productId
DELETE /api/wishlist/:productId
POST   /api/wishlist/:productId/move-to-cart
```

### Reviews
```
GET    /api/reviews/:productId
POST   /api/reviews/:productId
```

### User
```
PUT    /api/users/profile
POST   /api/users/addresses
PUT    /api/users/addresses/:addressId
DELETE /api/users/addresses/:addressId
```

### Admin
```
GET    /api/admin/users
PUT    /api/admin/users/:id/block
GET    /api/admin/orders
GET    /api/admin/products
GET    /api/admin/stats
GET    /api/admin/seller/earnings
```

---

## 🎨 Component Hierarchy

```
App
├── AppProvider (Context)
│   └── Router
│       ├── PublicLayout
│       │   ├── Navbar
│       │   ├── Page Component
│       │   └── Footer
│       │
│       └── DashboardLayout (Protected)
│           ├── Sidebar
│           └── Dashboard Page
```

---

## 🔐 Authentication Flow

```
1. User submits login form
2. Frontend sends POST to /api/auth/login
3. Backend validates credentials
4. Backend generates JWT token
5. Frontend stores token in localStorage
6. Frontend includes token in subsequent requests
7. Backend verifies token on protected routes
```

---

## 🛒 Order Flow

```
1. Farmer adds products to cart
2. Farmer proceeds to checkout
3. Farmer selects delivery address
4. Farmer places order
5. Backend creates order
6. Backend reduces product stock
7. Backend clears cart
8. Shop Owner receives order
9. Shop Owner updates status
10. Farmer tracks order
```

---

## 📦 Dependencies

### Frontend
- React 18.3.1
- React Router 7.13.0
- Axios (to be added)
- Tailwind CSS 4.1.12
- Radix UI components
- Lucide React (icons)

### Backend
- Express 4.18.2
- Mongoose 8.0.3
- bcryptjs 2.4.3
- jsonwebtoken 9.0.2
- cors 2.8.5
- dotenv 16.3.1

---

## 🚀 Build & Deploy

### Frontend Build
```bash
cd frontend
npm run build
# Output: frontend/dist/
```

### Backend Deploy
```bash
cd backend
npm start
# Runs on PORT from .env
```

---

## 📝 Configuration Files

### Frontend
- `vite.config.ts` - Vite configuration
- `postcss.config.mjs` - PostCSS configuration
- `package.json` - Dependencies and scripts

### Backend
- `.env` - Environment variables
- `package.json` - Dependencies and scripts

---

## 🎯 Next Steps

1. **Connect Frontend to Backend**
   - Replace mock data with API calls
   - Add axios for HTTP requests
   - Implement authentication flow

2. **Add Image Upload**
   - Implement multer for file uploads
   - Or integrate Cloudinary

3. **Add Notifications**
   - Real-time order updates
   - Email notifications

4. **Add Payment Gateway**
   - Integrate Razorpay/Stripe
   - Handle payment callbacks

5. **Add Search**
   - Implement full-text search
   - Add filters and sorting

---

**Project Status:** ✅ Backend Complete | 🔄 Frontend Integration Pending

**Next:** Connect frontend to backend API
