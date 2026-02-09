# KrishakMart - Complete Setup Guide

This guide will help you set up and run the KrishakMart application on your local machine.

## Prerequisites

Before you begin, ensure you have the following installed:

1. **Node.js** (v16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **MongoDB** (Community Edition)
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud): https://www.mongodb.com/cloud/atlas
   - Verify installation: `mongod --version`

3. **Git** (optional, for cloning)
   - Download from: https://git-scm.com/

## Step 1: Get the Code

If you have the project folder, skip to Step 2.

```bash
# Clone the repository (if using Git)
git clone <repository-url>
cd KrishakMart
```

## Step 2: Backend Setup

### 2.1 Install Backend Dependencies

```bash
cd backend
npm install
```

### 2.2 Configure Environment Variables

The `.env` file is already created with default values. Update if needed:

```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/krishakmart
JWT_SECRET=krishakmart_super_secret_jwt_key_2024_change_in_production
FRONTEND_URL=http://localhost:5173
```

**For MongoDB Atlas (Cloud):**
Replace `MONGODB_URI` with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/krishakmart
```

### 2.3 Start MongoDB (Local Only)

**Windows:**
```bash
# MongoDB should start automatically as a service
# Or manually start:
"C:\Program Files\MongoDB\Server\7.0\bin\mongod.exe"
```

**Mac/Linux:**
```bash
# Start MongoDB service
sudo systemctl start mongod
# Or
brew services start mongodb-community
```

### 2.4 Seed the Database (Optional but Recommended)

This will create sample users and products:

```bash
npm run seed
```

You'll see test credentials printed in the console.

### 2.5 Start the Backend Server

```bash
npm run dev
```

You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
📍 API: http://localhost:5000/api
```

**Test the API:**
Open browser and visit: http://localhost:5000/api/health

You should see: `{"status":"OK","message":"KrishakMart API is running"}`

## Step 3: Frontend Setup

Open a **new terminal** (keep backend running).

### 3.1 Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 3.2 Start the Frontend Server

```bash
npm run dev
```

You should see:
```
VITE v6.3.5  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

### 3.3 Open the Application

Open your browser and visit: **http://localhost:5173**

## Step 4: Test the Application

### 4.1 Login with Test Accounts

If you ran the seed script, use these credentials:

**Admin Account:**
- Phone: `9999999999`
- Password: `admin123`

**Farmer Account:**
- Phone: `9876543210`
- Password: `farmer123`

**Shop Owner Account:**
- Phone: `9876543220`
- Password: `shop123`

### 4.2 Test Features

**As Farmer:**
1. Browse products on homepage
2. Add products to cart
3. Add products to wishlist
4. Place an order
5. View order history
6. Track order status

**As Shop Owner:**
1. View dashboard
2. Add new products
3. View incoming orders
4. Update order status
5. View earnings

**As Admin:**
1. View all users
2. View all products
3. View all orders
4. View dashboard analytics
5. Block/Unblock users

## Troubleshooting

### MongoDB Connection Error

**Error:** `MongooseServerSelectionError: connect ECONNREFUSED`

**Solution:**
1. Ensure MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # Mac/Linux
   sudo systemctl status mongod
   ```

2. Check MongoDB URI in `.env` file
3. For Atlas, ensure IP is whitelisted

### Port Already in Use

**Error:** `Port 5000 is already in use`

**Solution:**
1. Change PORT in backend `.env` file
2. Or kill the process using port 5000:
   ```bash
   # Windows
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   
   # Mac/Linux
   lsof -ti:5000 | xargs kill -9
   ```

### Frontend Can't Connect to Backend

**Error:** Network errors in browser console

**Solution:**
1. Ensure backend is running on port 5000
2. Check CORS settings in `backend/server.js`
3. Verify API URL in `frontend/src/services/api.ts`

### Module Not Found Errors

**Error:** `Cannot find module 'xyz'`

**Solution:**
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Image Upload Not Working

**Solution:**
1. Ensure `backend/uploads/products/` directory exists
2. Check file permissions
3. Verify multer configuration in `backend/middleware/upload.middleware.js`

## Project Structure

```
KrishakMart/
├── backend/
│   ├── controllers/      # Business logic
│   ├── models/          # Database schemas
│   ├── routes/          # API endpoints
│   ├── middleware/      # Auth, upload, etc.
│   ├── scripts/         # Utility scripts
│   ├── uploads/         # Uploaded files
│   ├── server.js        # Entry point
│   ├── .env            # Environment variables
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── app/
    │   │   ├── components/  # React components
    │   │   ├── pages/       # Page components
    │   │   └── context/     # State management
    │   ├── services/        # API calls
    │   └── styles/          # CSS files
    ├── package.json
    └── vite.config.ts
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/password` - Update password

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Shop Owner)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove item

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders/my-orders` - Get farmer orders
- `GET /api/orders/seller/orders` - Get seller orders
- `PUT /api/orders/:id/status` - Update status
- `PUT /api/orders/:id/cancel` - Cancel order

### Wishlist
- `GET /api/wishlist` - Get wishlist
- `POST /api/wishlist/:productId` - Add to wishlist
- `DELETE /api/wishlist/:productId` - Remove from wishlist

### Reviews
- `GET /api/reviews/:productId` - Get reviews
- `POST /api/reviews/:productId` - Add review

### Admin
- `GET /api/admin/users` - Get all users
- `PUT /api/admin/users/:id/block` - Block/Unblock user
- `GET /api/admin/stats` - Get dashboard stats

## Development Tips

### Hot Reload

Both frontend and backend support hot reload:
- Backend: Uses `nodemon` - saves automatically restart server
- Frontend: Uses Vite HMR - changes reflect instantly

### Database Management

**View Database:**
```bash
# Using MongoDB Compass (GUI)
# Download: https://www.mongodb.com/products/compass
# Connect to: mongodb://localhost:27017

# Using MongoDB Shell
mongosh
use krishakmart
db.users.find()
db.products.find()
```

**Reset Database:**
```bash
cd backend
npm run seed
```

### Testing API with Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import collection (create one with all endpoints)
3. Set base URL: `http://localhost:5000/api`
4. Add Authorization header: `Bearer <token>`

## Production Deployment

### Backend (Render/Heroku)

1. Create account on Render.com
2. Create new Web Service
3. Connect GitHub repository
4. Set environment variables:
   - `MONGODB_URI` (MongoDB Atlas)
   - `JWT_SECRET`
   - `FRONTEND_URL`
5. Deploy

### Frontend (Vercel/Netlify)

1. Build the project:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy `dist` folder to Vercel/Netlify

3. Update API URL in `frontend/src/services/api.ts`:
   ```typescript
   baseURL: 'https://your-backend-url.com/api'
   ```

### Database (MongoDB Atlas)

1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP addresses (0.0.0.0/0 for all)
4. Get connection string
5. Update `MONGODB_URI` in backend

## Next Steps

1. **Customize**: Update branding, colors, content
2. **Add Features**: Payment gateway, email notifications
3. **Test**: Thoroughly test all features
4. **Deploy**: Deploy to production
5. **Monitor**: Set up logging and monitoring

## Support

For issues and questions:
- Check troubleshooting section above
- Review error messages carefully
- Check browser console for frontend errors
- Check terminal for backend errors

## Resources

- **MongoDB Docs**: https://docs.mongodb.com/
- **Express Docs**: https://expressjs.com/
- **React Docs**: https://react.dev/
- **Vite Docs**: https://vitejs.dev/

---

**Happy Coding! 🚀**

**"Mitti Se Digital Tak"**
