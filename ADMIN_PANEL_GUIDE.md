# KrishakMart Admin Panel Guide

## Admin Login Credentials
- **Phone**: `9999999999`
- **Password**: `admin123`

Click the "🔐 Demo Admin Login" button on the login page to access the admin panel directly.

---

## Admin Panel Navigation

The admin panel includes 9 main sections accessible from the sidebar:

### 1. **Dashboard** (`/admin/dashboard`)
- Overview statistics with key metrics
- Total Farmers, Shop Owners, Products, Orders
- Platform Revenue and Growth Rate
- Recent platform activity feed

### 2. **Manage Farmers** (`/admin/farmers`)
- View all registered farmers
- Search by name, email, or phone
- Suspend/Activate farmer accounts
- Delete farmer accounts
- View farmer details (location, orders, join date)

### 3. **Manage Shop Owners** (`/admin/shop-owners`)
- Review pending shop applications
- Approve or reject new shops
- Suspend/Reactivate existing shops
- View shop details (products, sales, location)
- Track shop performance

### 4. **All Products** (`/admin/products`)
- Monitor all products on the platform
- Search and filter by category
- View product details (price, stock, shop)
- Delete inappropriate listings
- Track low stock items

### 5. **All Orders** (`/admin/orders`)
- Track all transactions platform-wide
- Filter by order status (Pending, Processing, Shipped, Delivered, Cancelled)
- Search by Order ID, customer, or shop
- View order details and amounts

### 6. **Platform Reports** (`/admin/reports`)
- Revenue growth charts (monthly trends)
- Order volume analytics
- Sales by category (pie chart)
- Platform health indicators:
  - Order fulfillment rate
  - Customer retention
  - Seller satisfaction
- Export reports to PDF

### 7. **My Store Products** (`/admin/my-products`)
- Manage products sold directly by the platform
- View official product listings
- Edit or delete admin products
- Track performance (ratings, sales)
- Special "Official Listing" badge

### 8. **Add Store Product** (`/admin/add-product`)
- Add new official platform products
- Form fields:
  - Product name
  - Category and brand
  - Price and stock
  - Description
  - Image upload
- Products listed as "Platform Official"

### 9. **Admin Earnings** (`/admin/earnings`)
- View platform commission earnings
- Track admin store direct sales
- Combined earnings overview
- Revenue breakdown charts
- Recent transaction history
- Growth percentages and trends

---

## Features

✅ **Role-Based Access Control**: Only users with `role: 'admin'` can access
✅ **Responsive Design**: Works on desktop and tablet
✅ **Real-time Search**: Filter data across all pages
✅ **Interactive Charts**: Visual analytics using Recharts
✅ **Toast Notifications**: User feedback for all actions
✅ **Status Management**: Approve, suspend, or activate users/shops
✅ **Mock Data**: Pre-populated with sample data for testing

---

## Navigation Structure

```
Admin Panel
├── Dashboard
├── Manage Farmers
├── Manage Shop Owners
├── All Products
├── All Orders
├── Platform Reports
├── My Store Products
├── Add Store Product
├── Admin Earnings
└── Logout
```

---

## Technical Details

- **Frontend**: React + TypeScript + Tailwind CSS
- **Routing**: React Router v6 with protected routes
- **Charts**: Recharts library for analytics
- **UI Components**: shadcn/ui component library
- **State Management**: React Context API
- **Notifications**: Sonner toast library

---

## Getting Started

1. Start the backend server:
   ```bash
   cd backend
   npm start
   ```

2. Start the frontend:
   ```bash
   cd frontend
   npm run dev
   ```

3. Navigate to `http://localhost:5173`

4. Click "🔐 Demo Admin Login" button

5. Explore all 9 admin pages from the sidebar

---

## Status Indicators

- 🟢 **Active/Approved**: Green badge
- 🔵 **Pending**: Blue badge
- 🔴 **Suspended/Cancelled**: Red badge
- 🟡 **Processing**: Yellow badge
- 🟠 **Out of Stock**: Orange badge

---

All pages are now fully functional with proper routing and navigation!
