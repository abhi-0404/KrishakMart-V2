# KrishakMart - Quick Reference Card

## 🚀 Quick Start

### Start Backend
```bash
cd backend
npm install
npm run seed    # First time only
npm run dev
```
Backend: http://localhost:5000

### Start Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend: http://localhost:5173

---

## 🔑 Test Credentials

| Role | Phone | Password |
|------|-------|----------|
| Admin | 9999999999 | admin123 |
| Farmer | 9876543210 | farmer123 |
| Shop Owner | 9876543220 | shop123 |

---

## 📁 Key Files

### Backend
```
backend/
├── server.js              # Entry point
├── .env                   # Environment variables
├── models/                # Database schemas
├── controllers/           # Business logic
├── routes/                # API endpoints
└── middleware/            # Auth, upload, errors
```

### Frontend
```
frontend/
├── src/
│   ├── services/          # API calls
│   ├── app/
│   │   ├── pages/         # Page components
│   │   ├── components/    # Reusable components
│   │   └── context/       # State management
│   └── styles/            # CSS files
```

---

## 🔌 API Endpoints

### Base URL
```
http://localhost:5000/api
```

### Authentication
```
POST   /auth/register      # Register
POST   /auth/login         # Login
GET    /auth/me            # Get user
PUT    /auth/password      # Update password
```

### Products
```
GET    /products           # List all
GET    /products/:id       # Get one
POST   /products           # Create (Shop Owner)
PUT    /products/:id       # Update (Shop Owner)
DELETE /products/:id       # Delete (Shop Owner)
```

### Cart
```
GET    /cart               # Get cart
POST   /cart               # Add item
PUT    /cart/:productId    # Update quantity
DELETE /cart/:productId    # Remove item
```

### Orders
```
POST   /orders             # Create order
GET    /orders/my-orders   # Farmer orders
GET    /orders/seller/orders # Seller orders
PUT    /orders/:id/status  # Update status
PUT    /orders/:id/cancel  # Cancel order
```

---

## 🗄️ Database Models

### User
```javascript
{
  name, phone, email, password,
  role: 'farmer' | 'shopOwner' | 'admin',
  addresses: [],
  shopName, shopAddress, // For shop owners
  isBlocked
}
```

### Product
```javascript
{
  name, category, brand, price, stock,
  description, usage, images: [],
  sellerId, shopOwner,
  rating, numReviews, isAvailable
}
```

### Order
```javascript
{
  farmerId, sellerId, products: [],
  totalAmount, deliveryAddress,
  paymentMethod, paymentStatus,
  orderStatus, statusHistory: [],
  cancelReason
}
```

---

## 🎨 Product Categories

- seeds
- fertilizers
- pesticides
- tools
- irrigation
- feed

---

## 📊 Order Statuses

1. Pending
2. Accepted
3. Packed
4. Shipped
5. Delivered
6. Cancelled
7. Rejected

---

## 🔐 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/krishakmart
JWT_SECRET=your_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (api.ts)
```typescript
baseURL: 'http://localhost:5000/api'
```

---

## 🛠️ Common Commands

### Backend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run seed         # Seed database
npm start            # Start production
```

### Frontend
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Build for production
```

### Database
```bash
mongosh              # Open MongoDB shell
use krishakmart      # Switch to database
db.users.find()      # View users
db.products.find()   # View products
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
mongod --version

# Start MongoDB (Windows)
net start MongoDB

# Start MongoDB (Mac/Linux)
brew services start mongodb-community
```

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Clear Node Modules
```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 📦 Key Dependencies

### Backend
- express: Web framework
- mongoose: MongoDB ODM
- jsonwebtoken: JWT auth
- bcryptjs: Password hashing
- multer: File upload
- cors: CORS handling

### Frontend
- react: UI library
- react-router-dom: Routing
- axios: HTTP client
- tailwindcss: Styling
- sonner: Notifications

---

## 🔍 Useful Queries

### Find User by Phone
```javascript
db.users.findOne({ phone: "9876543210" })
```

### Find Products by Category
```javascript
db.products.find({ category: "seeds" })
```

### Find Orders by Status
```javascript
db.orders.find({ orderStatus: "Pending" })
```

### Count Users by Role
```javascript
db.users.countDocuments({ role: "farmer" })
```

---

## 🎯 Testing Checklist

### Backend
- [ ] Health check: GET /api/health
- [ ] Register user: POST /auth/register
- [ ] Login: POST /auth/login
- [ ] Get products: GET /products
- [ ] Create product: POST /products (with token)

### Frontend
- [ ] Open http://localhost:5173
- [ ] Login with test credentials
- [ ] Browse products
- [ ] Add to cart
- [ ] Place order
- [ ] Check dashboard

---

## 📱 User Flows

### Farmer Flow
1. Register/Login
2. Browse products
3. Add to cart
4. Checkout
5. Track order
6. Review product

### Shop Owner Flow
1. Register/Login
2. Add products
3. View orders
4. Update status
5. View earnings

### Admin Flow
1. Login
2. View dashboard
3. Manage users
4. Manage products
5. View analytics

---

## 🔗 Important URLs

### Local Development
- Frontend: http://localhost:5173
- Backend: http://localhost:5000
- API Health: http://localhost:5000/api/health
- MongoDB: mongodb://localhost:27017

### Documentation
- Setup Guide: SETUP_GUIDE.md
- API Reference: API_REFERENCE.md
- Features: FEATURES_CHECKLIST.md
- Deployment: DEPLOYMENT_GUIDE.md

---

## 💡 Pro Tips

1. **Always run seed script first** for test data
2. **Check MongoDB is running** before starting backend
3. **Use Postman** for API testing
4. **Check browser console** for frontend errors
5. **Check terminal** for backend errors
6. **Use MongoDB Compass** for database visualization
7. **Keep both terminals open** (backend + frontend)
8. **Clear browser cache** if seeing old data

---

## 🆘 Quick Help

### Backend Not Starting
1. Check MongoDB is running
2. Verify .env file exists
3. Check port 5000 is free
4. Run `npm install`

### Frontend Not Starting
1. Check backend is running
2. Verify API URL in api.ts
3. Check port 5173 is free
4. Run `npm install`

### Can't Login
1. Check backend is running
2. Verify user exists (run seed)
3. Check credentials
4. Check browser console

### Images Not Uploading
1. Check uploads/products/ exists
2. Verify file size < 5MB
3. Check file type is image
4. Check backend logs

---

## 📞 Need More Help?

- **Setup Issues:** See SETUP_GUIDE.md
- **API Questions:** See API_REFERENCE.md
- **Deployment:** See DEPLOYMENT_GUIDE.md
- **Features:** See FEATURES_CHECKLIST.md

---

**Quick Reference v1.0**
**Last Updated:** February 9, 2026
