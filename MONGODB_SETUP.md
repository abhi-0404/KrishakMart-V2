# MongoDB Setup Guide - Fix 500 Login Error

## Problem
The login endpoint returns a 500 error because MongoDB is not running or not installed.

## Quick Solutions

### Option 1: MongoDB Atlas (Cloud - Easiest, No Installation)

1. **Sign up for MongoDB Atlas** (Free tier available)
   - Go to: https://www.mongodb.com/cloud/atlas
   - Create a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "Free" tier (M0)
   - Select a cloud provider and region close to you
   - Click "Create"

3. **Setup Database Access**
   - Go to "Database Access" in left menu
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Setup Network Access**
   - Go to "Network Access" in left menu
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left menu
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

6. **Update .env file**
   ```env
   MONGODB_URI=mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/krishakmart
   ```

### Option 2: Local MongoDB (Requires Installation)

1. **Download MongoDB Community Edition**
   - Go to: https://www.mongodb.com/try/download/community
   - Download for Windows
   - Run the installer

2. **Install with Default Settings**
   - Choose "Complete" installation
   - Install MongoDB as a Service (checked by default)
   - Install MongoDB Compass (optional GUI tool)

3. **Verify Installation**
   ```cmd
   mongod --version
   ```

4. **Start MongoDB Service** (if not auto-started)
   ```cmd
   net start MongoDB
   ```

5. **Update .env file** (should already be set)
   ```env
   MONGODB_URI=mongodb://localhost:27017/krishakmart
   ```

## After MongoDB is Running

### 1. Seed the Database with Test Data

```cmd
cd KrishakMart\backend
npm run seed
```

This creates test users:
- **Farmer**: Phone: `9876543210`, Password: `farmer123`
- **Shop Owner**: Phone: `9876543220`, Password: `shop123`
- **Admin**: Phone: `9999999999`, Password: `admin123`

### 2. Start the Backend Server

```cmd
npm run dev
```

### 3. Test the Login

Now try logging in with:
- Phone: `9876543210`
- Password: `farmer123`

## Troubleshooting

### Still getting 500 error?

1. **Check backend console** - Look for the actual error message
2. **Verify MongoDB connection** - Backend should show "✅ MongoDB Connected Successfully"
3. **Check if users exist** - Run the seed script again
4. **Verify .env file** - Make sure MONGODB_URI is correct

### MongoDB Atlas connection issues?

- Make sure you replaced `<password>` in the connection string
- Check that your IP is whitelisted (or use "Allow from Anywhere")
- Verify username and password are correct
- Make sure the database user has read/write permissions

### Local MongoDB not starting?

```cmd
# Check if MongoDB service is running
sc query MongoDB

# Start MongoDB service
net start MongoDB

# If service doesn't exist, MongoDB might not be installed correctly
```
