# 🚀 Get Started with KrishakMart

Welcome to KrishakMart! This guide will help you get the application running in just a few minutes.

---

## ⚡ Quick Start (Windows)

### Option 1: Using Batch Scripts (Easiest)

1. **Verify Setup**
   ```
   Double-click: verify-setup.bat
   ```
   This checks if everything is installed correctly.

2. **Seed Database** (First time only)
   ```
   Double-click: seed-database.bat
   ```
   This creates test users and products.

3. **Start Backend**
   ```
   Double-click: start-backend.bat
   ```
   Keep this window open.

4. **Start Frontend** (New window)
   ```
   Double-click: start-frontend.bat
   ```
   Keep this window open.

5. **Open Browser**
   ```
   Visit: http://localhost:5173
   ```

### Option 2: Using Command Line

```bash
# Terminal 1 - Backend
cd backend
npm install
npm run seed
npm run dev

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

---

## 🔑 Login Credentials

After running the seed script, use these credentials:

### Admin Account
- **Phone:** 9999999999
- **Password:** admin123
- **Access:** Full platform control

### Farmer Account
- **Phone:** 9876543210
- **Password:** farmer123
- **Access:** Browse, shop, order

### Shop Owner Account
- **Phone:** 9876543220
- **Password:** shop123
- **Access:** Manage products, orders

---

## 📋 Prerequisites

Before you start, make sure you have:

### Required
- ✅ **Node.js** (v16+) - [Download](https://nodejs.org/)
- ✅ **MongoDB** - [Download](https://www.mongodb.com/try/download/community)

### Optional
- **MongoDB Compass** - GUI for database
- **Postman** - API testing
- **VS Code** - Code editor

---

## 🎯 What to Test

### As Farmer (Buyer)
1. ✅ Browse products on homepage
2. ✅ Search for "wheat" or "fertilizer"
3. ✅ Filter by category (Seeds, Fertilizers, etc.)
4. ✅ Add products to cart
5. ✅ Add products to wishlist
6. ✅ Update cart quantities
7. ✅ Proceed to checkout
8. ✅ Select delivery address
9. ✅ Place order
10. ✅ View order history
11. ✅ Track order status
12. ✅ Rate and review products

### As Shop Owner (Seller)
1. ✅ View dashboard
2. ✅ Add new product with images
3. ✅ Edit existing products
4. ✅ Update stock quantity
5. ✅ View incoming orders
6. ✅ Accept/Reject orders
7. ✅ Update order status (Packed → Shipped → Delivered)
8. ✅ View earnings dashboard
9. ✅ Check monthly analytics

### As Admin
1. ✅ View dashboard with statistics
2. ✅ View all users (farmers and sellers)
3. ✅ Block/Unblock users
4. ✅ View all products
5. ✅ Delete products
6. ✅ View all orders
7. ✅ Update order statuses
8. ✅ View platform analytics

---

## 🌐 Application URLs

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:5173 | Main application |
| Backend API | http://localhost:5000/api | API endpoints |
| Health Check | http://localhost:5000/api/health | API status |
| MongoDB | mongodb://localhost:27017 | Database |

---

## 📚 Documentation

### Essential Guides
1. **SETUP_GUIDE.md** - Detailed setup instructions
2. **API_REFERENCE.md** - Complete API documentation
3. **QUICK_REFERENCE.md** - Quick command reference
4. **FEATURES_CHECKLIST.md** - All features list

### Additional Resources
5. **DEPLOYMENT_GUIDE.md** - Deploy to production
6. **PROJECT_SUMMARY.md** - Project overview
7. **README.md** - Main documentation

---

## 🐛 Common Issues & Solutions

### Issue: MongoDB Connection Error

**Error Message:**
```
MongooseServerSelectionError: connect ECONNREFUSED
```

**Solution:**
```bash
# Windows
net start MongoDB

# Mac
brew services start mongodb-community

# Linux
sudo systemctl start mongod
```

### Issue: Port Already in Use

**Error Message:**
```
Port 5000 is already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Issue: Dependencies Not Installing

**Solution:**
```bash
# Delete and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Issue: Can't Login

**Solution:**
1. Make sure backend is running
2. Run seed script: `npm run seed`
3. Use correct credentials (see above)
4. Check browser console for errors

---

## 🎨 Sample Data

After running the seed script, you'll have:

### Users (5)
- 1 Admin
- 2 Farmers
- 2 Shop Owners

### Products (15)
- 3 Seeds products
- 3 Fertilizers
- 2 Pesticides
- 3 Tools
- 2 Irrigation equipment
- 2 Animal feed

### Categories (6)
- Seeds 🌱
- Fertilizers 🌿
- Pesticides 🧴
- Tools 🔧
- Irrigation 💧
- Feed 🐄

---

## 🔄 Development Workflow

### Daily Development
```bash
# Start backend (Terminal 1)
cd backend
npm run dev

# Start frontend (Terminal 2)
cd frontend
npm run dev

# Both servers will auto-reload on file changes
```

### Reset Database
```bash
cd backend
npm run seed
```

### View Database
```bash
# Using MongoDB Shell
mongosh
use krishakmart
db.users.find()
db.products.find()
db.orders.find()

# Or use MongoDB Compass GUI
```

---

## 📱 Features Overview

### ✅ Implemented Features

**Authentication**
- User registration (Farmer/Shop Owner)
- Login with phone and password
- JWT token authentication
- Password change
- Role-based access

**Shopping (Farmer)**
- Browse products
- Search and filter
- Add to cart
- Wishlist
- Place orders
- Track orders
- Cancel orders
- Reorder
- Rate and review

**Selling (Shop Owner)**
- Add products
- Upload images
- Manage inventory
- Process orders
- Update status
- View earnings
- Analytics

**Administration**
- User management
- Product moderation
- Order oversight
- Platform analytics
- Sales reports

---

## 🎯 Next Steps

### After Getting Started

1. **Explore the Application**
   - Try all three user roles
   - Test complete order flow
   - Check all features

2. **Customize**
   - Update branding
   - Modify colors
   - Add your content

3. **Deploy**
   - Follow DEPLOYMENT_GUIDE.md
   - Deploy to production
   - Configure domain

4. **Enhance**
   - Add payment gateway
   - Implement email notifications
   - Add more features

---

## 💡 Pro Tips

1. **Keep Both Terminals Open**
   - Backend in one terminal
   - Frontend in another
   - Both need to run simultaneously

2. **Use Browser DevTools**
   - F12 to open console
   - Check Network tab for API calls
   - View errors in Console tab

3. **Check Logs**
   - Backend logs in terminal
   - Frontend logs in browser console
   - MongoDB logs in MongoDB terminal

4. **Test Thoroughly**
   - Try all user roles
   - Test edge cases
   - Verify error handling

5. **Read Documentation**
   - API_REFERENCE.md for API details
   - SETUP_GUIDE.md for detailed setup
   - QUICK_REFERENCE.md for commands

---

## 🆘 Need Help?

### Documentation
- **Setup Issues:** SETUP_GUIDE.md
- **API Questions:** API_REFERENCE.md
- **Quick Commands:** QUICK_REFERENCE.md
- **Deployment:** DEPLOYMENT_GUIDE.md

### Troubleshooting Steps
1. Check if MongoDB is running
2. Verify both servers are running
3. Check browser console for errors
4. Check terminal for backend errors
5. Try clearing browser cache
6. Try restarting servers

### Common Commands
```bash
# Check Node version
node --version

# Check MongoDB version
mongod --version

# Check if port is in use
netstat -ano | findstr :5000

# View MongoDB databases
mongosh --eval "show dbs"
```

---

## ✅ Success Checklist

Before you start developing, make sure:

- [ ] Node.js is installed
- [ ] MongoDB is installed and running
- [ ] Backend dependencies installed (`npm install`)
- [ ] Frontend dependencies installed (`npm install`)
- [ ] Database seeded (`npm run seed`)
- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] Can login with test credentials
- [ ] Can browse products
- [ ] Can place an order

---

## 🎉 You're Ready!

If you've completed the quick start steps above, you should now have:

✅ Backend API running on http://localhost:5000
✅ Frontend app running on http://localhost:5173
✅ MongoDB with test data
✅ Test accounts to login with
✅ Full e-commerce platform ready to use

**Start exploring and happy coding!** 🚀

---

## 📞 Quick Links

- **Frontend:** http://localhost:5173
- **Backend:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health
- **Documentation:** See README.md

---

**"Mitti Se Digital Tak"** 🌾

**Bringing agriculture to the digital age!**

---

**Last Updated:** February 9, 2026
**Version:** 1.0.0
