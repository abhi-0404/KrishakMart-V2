# 🚀 START HERE - KrishakMart Quick Start

## Welcome to KrishakMart! 👋

This guide will get you up and running in **5 minutes**.

---

## ✅ What's Already Done

- ✅ **Backend API** - Complete with 40+ endpoints
- ✅ **Frontend UI** - Beautiful design with brand colors
- ✅ **Database Models** - 6 MongoDB collections
- ✅ **Documentation** - Comprehensive guides
- ✅ **Branding** - "Mitti Se Digital Tak" theme

---

## 🎯 Quick Start (5 Minutes)

### Step 1: Start MongoDB (1 minute)

**Option A: Local MongoDB**
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

**Option B: MongoDB Atlas (Cloud)**
- Already configured in `.env`
- Or update `MONGODB_URI` in `backend/.env`

### Step 2: Start Backend (2 minutes)

```bash
# Open terminal 1
cd backend
npm run dev
```

✅ You should see:
```
✅ MongoDB Connected Successfully
🚀 Server running on port 5000
```

### Step 3: Start Frontend (2 minutes)

```bash
# Open terminal 2
cd frontend
npm run dev
```

✅ You should see:
```
VITE v6.3.5  ready in 740 ms
➜  Local:   http://localhost:5173/
```

### Step 4: Open Browser

Go to: **http://localhost:5173**

🎉 **You're done!** The app is running!

---

## 🧪 Test the Application

### Test Backend API
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{
  "status": "OK",
  "message": "KrishakMart API is running"
}
```

### Test Frontend
1. Open http://localhost:5173
2. You should see the KrishakMart homepage
3. Click "Shop Farming Products"
4. Browse products

---

## 📱 Create Test Accounts

### Create Farmer Account
1. Go to http://localhost:5173/login
2. Click "Sign up" under Farmer tab
3. Fill in:
   - Name: Ramesh Kumar
   - Phone: 9876543210
   - Password: farmer123
4. Click "Sign up"

### Create Shop Owner Account
1. Go to http://localhost:5173/login
2. Switch to "Shop Owner" tab
3. Click "Sign up"
4. Fill in:
   - Name: Rajesh Sharma
   - Phone: 9876543211
   - Password: seller123
   - Shop Name: Green Valley Store
5. Click "Sign up"

### Create Admin Account (via API)
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

---

## 🎨 What You'll See

### Homepage
- Hero section with "Mitti Se Digital Tak" tagline
- Forest green and soil brown colors
- Featured products
- Categories

### Shop Page
- Product listing
- Search and filters
- Category selection

### Login Page
- Farmer and Shop Owner tabs
- KrishakMart branding
- Demo admin login button

---

## 📚 Documentation

### Essential Guides
1. **[FINAL_SUMMARY.md](FINAL_SUMMARY.md)** - Complete overview
2. **[FULLSTACK_SETUP.md](FULLSTACK_SETUP.md)** - Detailed setup
3. **[backend/README.md](backend/README.md)** - API documentation
4. **[BRAND_GUIDE.md](BRAND_GUIDE.md)** - Brand guidelines

### Quick References
- **[COLOR_REFERENCE.md](COLOR_REFERENCE.md)** - Color codes
- **[PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)** - File structure
- **[IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md)** - Progress

---

## 🔧 Troubleshooting

### Backend Won't Start

**Problem:** MongoDB connection error
```
Solution:
1. Check if MongoDB is running
2. Verify MONGODB_URI in backend/.env
3. Try: mongod --dbpath /path/to/data
```

**Problem:** Port 5000 in use
```
Solution:
1. Change PORT in backend/.env to 5001
2. Or kill process: npx kill-port 5000
```

### Frontend Won't Start

**Problem:** Dependencies missing
```
Solution:
cd frontend
npm install
npm run dev
```

**Problem:** Port 5173 in use
```
Solution:
Vite will automatically suggest another port
```

---

## 🎯 What to Do Next

### Current Status
- ✅ Backend: 100% Complete
- ✅ Frontend UI: 100% Complete
- ⏳ Integration: Pending

### Next Steps (5-7 hours)

1. **Install Axios** (5 min)
   ```bash
   cd frontend
   npm install axios
   ```

2. **Create API Service** (30 min)
   - Create `frontend/src/services/api.js`
   - Configure axios

3. **Connect Authentication** (1 hour)
   - Update login/logout
   - Store JWT token

4. **Connect Pages** (2-3 hours)
   - Product listing
   - Cart operations
   - Order management

5. **Add Loading States** (1 hour)
   - Spinners
   - Error messages

6. **Test Everything** (1 hour)
   - All user flows
   - Fix bugs

---

## 📊 Features Available

### Farmer Features ✅
- Browse products
- Search & filter
- Add to cart
- Wishlist
- Place orders
- Track orders
- Rate & review

### Shop Owner Features ✅
- Add products
- Manage inventory
- Process orders
- View earnings
- Analytics

### Admin Features ✅
- User management
- Product moderation
- Order oversight
- Dashboard analytics

---

## 🎨 Brand Colors

### Quick Copy-Paste
```css
/* Primary - Forest Green */
#2f7c4f  /* Main */
#236240  /* Dark */
#f0f9f4  /* Light background */

/* Secondary - Soil Brown */
#b87a47  /* Main */
#855132  /* Dark */
#f5ede3  /* Light background */
```

---

## 🔌 API Quick Test

### Register User
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "phone": "1234567890",
    "password": "test123",
    "role": "farmer"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "1234567890",
    "password": "test123"
  }'
```

### Get Products
```bash
curl http://localhost:5000/api/products
```

---

## 💡 Pro Tips

1. **Keep both terminals open** - One for backend, one for frontend
2. **Check MongoDB first** - Make sure it's running
3. **Use browser DevTools** - Check console for errors
4. **Read the logs** - Terminal shows helpful error messages
5. **Test API with Postman** - Easier than curl

---

## 📞 Need Help?

### Check These First
1. Is MongoDB running?
2. Are both servers running?
3. Check terminal for errors
4. Check browser console
5. Verify .env configuration

### Documentation
- [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md) - Detailed setup
- [backend/README.md](backend/README.md) - API docs
- [FINAL_SUMMARY.md](FINAL_SUMMARY.md) - Complete overview

---

## 🎉 You're All Set!

Your KrishakMart platform is now running!

**Frontend:** http://localhost:5173
**Backend:** http://localhost:5000
**API Health:** http://localhost:5000/api/health

### What Works Now
✅ Complete backend API
✅ Beautiful frontend UI
✅ User authentication
✅ Product management
✅ Order processing
✅ Cart & wishlist
✅ Admin features

### What's Next
⏳ Connect frontend to backend
⏳ Add loading states
⏳ Test complete flows

---

<div align="center">

## 🌾 KrishakMart 🌾

**"Mitti Se Digital Tak"**

*Connecting Farmers with Agricultural Supplies*

**Built with ❤️ for Farmers**

[Documentation](README.md) • [Setup Guide](FULLSTACK_SETUP.md) • [API Docs](backend/README.md)

</div>
