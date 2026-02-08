# KrishakMart - Agriculture E-Commerce Platform
## "Mitti Se Digital Tak" (From Soil to Digital)

<div align="center">

![KrishakMart Logo](https://via.placeholder.com/200x200/2f7c4f/ffffff?text=KrishakMart)

**Connecting Farmers with Agricultural Supplies**

[![Node.js](https://img.shields.io/badge/Node.js-18.x-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

</div>

---

## 📖 About

KrishakMart is a full-stack e-commerce platform designed specifically for the agricultural sector. It connects farmers directly with agricultural supply shops, making it easy to browse, order, and receive farming products at their doorstep.

### 🎯 Mission
**"Mitti Se Digital Tak"** - Bridging traditional farming with digital convenience.

### ✨ Key Features
- 🌾 **For Farmers:** Browse products, manage cart, place orders, track deliveries
- 🏪 **For Shop Owners:** Manage inventory, process orders, track earnings
- 👨‍💼 **For Admins:** Platform oversight, user management, analytics

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/yourusername/krishakmart.git
cd krishakmart

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your configuration
npm run dev

# Frontend setup (new terminal)
cd frontend
npm run dev
```

**Access the application:**
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

📚 **Detailed Setup:** See [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md)

---

## 🏗️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool
- **React Router 7.13.0** - Routing
- **Tailwind CSS 4.1.12** - Styling
- **Radix UI** - Accessible components
- **Axios** - HTTP client

### Backend
- **Node.js** - Runtime
- **Express 4.18.2** - Web framework
- **MongoDB** - Database
- **Mongoose 8.0.3** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing

---

## 📁 Project Structure

```
KrishakMart/
├── frontend/          # React application
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── context/
│   │   │   └── data/
│   │   └── styles/
│   └── package.json
│
├── backend/           # Node.js API
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
│
└── docs/             # Documentation
```

📚 **Full Structure:** See [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## 🎨 Brand Identity

### Colors
- **Primary:** Forest Green (#2f7c4f) - Growth, trust, agriculture
- **Secondary:** Soil Brown (#b87a47) - Earth, authenticity, "Mitti"

### Typography
- **Font:** Poppins - Clean, modern, readable

### Tagline
**"Mitti Se Digital Tak"** - Featured throughout the platform

📚 **Brand Guidelines:** See [BRAND_GUIDE.md](BRAND_GUIDE.md)

---

## 👥 User Roles

### 🧑‍🌾 Farmer (Buyer)
- Browse and search products
- Manage cart and wishlist
- Place and track orders
- Multiple delivery addresses
- Rate and review products
- View order history

### 🏪 Shop Owner (Seller)
- Add and manage products
- Manage inventory and stock
- Process incoming orders
- Update order status
- View earnings and analytics
- Manage shop profile

### 👨‍💼 Admin
- User management (block/unblock)
- Product moderation
- Order oversight
- Platform analytics
- Sales reports
- Dashboard statistics

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register    # Register user
POST   /api/auth/login       # Login
GET    /api/auth/me          # Get current user
PUT    /api/auth/password    # Update password
```

### Products
```
GET    /api/products         # Get all products
GET    /api/products/:id     # Get single product
POST   /api/products         # Create product
PUT    /api/products/:id     # Update product
DELETE /api/products/:id     # Delete product
```

### Cart
```
GET    /api/cart             # Get cart
POST   /api/cart             # Add to cart
PUT    /api/cart/:productId  # Update quantity
DELETE /api/cart/:productId  # Remove item
```

### Orders
```
POST   /api/orders           # Create order
GET    /api/orders/my-orders # Get farmer orders
GET    /api/orders/:id       # Get order details
PUT    /api/orders/:id/status # Update status
PUT    /api/orders/:id/cancel # Cancel order
```

📚 **Full API Docs:** See [backend/README.md](backend/README.md)

---

## ✅ Features Implemented

### Farmer Features ✅
- [x] Register/Login/Logout
- [x] Edit profile & change password
- [x] Multiple delivery addresses
- [x] Browse & search products
- [x] Filter by category, price
- [x] Add to cart
- [x] Wishlist management
- [x] Place orders
- [x] View order history
- [x] Track order status
- [x] Cancel orders
- [x] Reorder previous orders
- [x] Rate & review products

### Shop Owner Features ✅
- [x] Register/Login/Logout
- [x] Edit shop profile
- [x] Add/Edit/Delete products
- [x] Manage stock
- [x] View incoming orders
- [x] Accept/Reject orders
- [x] Update order status
- [x] View earnings dashboard
- [x] Monthly sales analytics

### Admin Features ✅
- [x] View all users
- [x] Block/Unblock users
- [x] View all products
- [x] Delete products
- [x] View all orders
- [x] Update order status
- [x] Dashboard analytics
- [x] Sales reports

### System Features ✅
- [x] JWT authentication
- [x] Role-based authorization
- [x] Password hashing
- [x] Stock auto-reduction
- [x] Cart auto-clear
- [x] Order status tracking
- [x] Product rating system
- [x] Search & filters
- [x] Responsive design

---

## 🔐 Security

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ Role-based access control
- ✅ Protected API routes
- ✅ CORS configuration
- ✅ Input validation
- ✅ Secure password requirements

---

## 📊 Database Schema

### Collections
- **users** - All users (farmers, sellers, admins)
- **products** - Product catalog
- **carts** - Shopping carts
- **orders** - Order records
- **wishlists** - Farmer wishlists
- **reviews** - Product reviews

---

## 🧪 Testing

### Backend Testing
```bash
cd backend
npm run dev

# Test health endpoint
curl http://localhost:5000/api/health
```

### Frontend Testing
```bash
cd frontend
npm run dev

# Open browser
http://localhost:5173
```

---

## 🚀 Deployment

### Backend (Render/Heroku)
1. Create account on Render.com
2. Connect GitHub repository
3. Set environment variables
4. Deploy

### Frontend (Vercel/Netlify)
1. Build: `npm run build`
2. Deploy `dist` folder
3. Update API URL

### Database (MongoDB Atlas)
1. Create free cluster
2. Get connection string
3. Update MONGODB_URI

📚 **Deployment Guide:** See [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md)

---

## 📚 Documentation

- [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md) - Complete setup guide
- [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) - File structure
- [BRAND_GUIDE.md](BRAND_GUIDE.md) - Brand guidelines
- [COLOR_REFERENCE.md](COLOR_REFERENCE.md) - Color reference
- [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) - Progress tracker
- [backend/README.md](backend/README.md) - API documentation

---

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] User authentication
- [x] Product management
- [x] Cart & checkout
- [x] Order management
- [x] Admin dashboard

### Phase 2: Integration ⏳
- [ ] Connect frontend to backend
- [ ] Add loading states
- [ ] Error handling
- [ ] Toast notifications

### Phase 3: Enhancements 📋
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] PDF invoice generation
- [ ] Real-time order updates
- [ ] Image upload (Cloudinary)

### Phase 4: Advanced Features 🚀
- [ ] Multi-language support (Hindi)
- [ ] SMS notifications
- [ ] Advanced analytics
- [ ] Recommendation system
- [ ] Mobile app

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Authors

- **Your Name** - *Initial work* - [YourGitHub](https://github.com/yourusername)

---

## 🙏 Acknowledgments

- Farmers who inspired this project
- Open source community
- All contributors

---

## 📞 Support

- **Email:** support@krishakmart.com
- **Issues:** [GitHub Issues](https://github.com/yourusername/krishakmart/issues)
- **Documentation:** [Wiki](https://github.com/yourusername/krishakmart/wiki)

---

## 📈 Status

![Backend](https://img.shields.io/badge/Backend-Complete-success)
![Frontend](https://img.shields.io/badge/Frontend-UI%20Complete-success)
![Integration](https://img.shields.io/badge/Integration-Pending-yellow)
![Documentation](https://img.shields.io/badge/Documentation-Complete-success)

**Overall Progress:** 70% Complete

---

<div align="center">

**Built with ❤️ for Farmers**

**"Mitti Se Digital Tak"**

[Website](https://krishakmart.com) • [Documentation](docs/) • [API](backend/README.md)

</div>
