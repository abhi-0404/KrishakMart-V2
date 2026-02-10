# 🚀 KrishakMart - Quick Start Guide

Get up and running in 5 minutes!

## Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)
- Git

## 1️⃣ Clone & Setup (2 minutes)

```bash
# Clone repository
git clone <repository-url>
cd KrishakMart

# Run setup script
# Windows:
setup.bat

# Linux/Mac:
chmod +x setup.sh
./setup.sh
```

## 2️⃣ Configure Environment (1 minute)

Edit `backend/.env`:

```env
MONGODB_URI=mongodb://localhost:27017/krishakmart
JWT_SECRET=your_secret_key_here_min_32_chars
```

## 3️⃣ Start Application (1 minute)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

## 4️⃣ Access Application (30 seconds)

- Frontend: http://localhost:5173
- Backend: http://localhost:5000/api
- Health: http://localhost:5000/api/health

## 5️⃣ Test It Out (30 seconds)

1. Go to http://localhost:5173
2. Click "Signup" → Register as Farmer
3. Browse products
4. Add to cart
5. Checkout!

## 🎯 Common Commands

```bash
# Backend
npm run dev          # Start dev server
npm run test         # Test endpoints
npm run clear-users  # Clear test data

# Frontend
npm run dev          # Start dev server
npm run build        # Build for production
```

## 🐛 Troubleshooting

### Backend won't start
```bash
# Check MongoDB is running
mongod --version

# Check port 5000 is free
netstat -ano | findstr :5000  # Windows
lsof -i :5000                 # Mac/Linux
```

### Frontend won't connect
- Verify backend is running on port 5000
- Check browser console for errors
- Clear browser cache

### "User already exists"
```bash
cd backend
npm run clear-users
```

## 📚 Next Steps

- Read [README.md](./README.md) for detailed documentation
- Check [INTEGRATION_COMPLETE.md](./INTEGRATION_COMPLETE.md) for features
- See [PRODUCTION_CHECKLIST.md](./PRODUCTION_CHECKLIST.md) for deployment

## 🎉 You're Ready!

Start building amazing features for farmers! 🌾

---

**Need Help?** Check the documentation or open an issue.
