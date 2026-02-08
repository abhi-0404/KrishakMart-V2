# KrishakMart - Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will be available at: **http://localhost:5173**

### 3. Build for Production
```bash
npm run build
```

## 📱 Application Features

### User Roles
- **Farmer**: Browse products, manage cart, place orders, track deliveries
- **Shop Owner**: Add products, manage inventory, process orders, view earnings
- **Admin**: Oversee platform, manage users, view reports

### Key Pages
- **Home** (`/`) - Landing page with featured products and categories
- **Shop** (`/shop`) - Browse all products with filters
- **Product Details** (`/product/:id`) - Detailed product information
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order placement
- **Login** (`/login`) - User authentication
- **Dashboards** - Role-specific dashboards for Farmer, Shop Owner, and Admin

## 🔐 Demo Login

The application uses mock authentication. You can login with any credentials:

### Farmer Login
- Mobile: Any 10-digit number
- Password: Any password
- Redirects to: `/farmer/dashboard`

### Shop Owner Login
- Mobile: Any 10-digit number
- Password: Any password
- Redirects to: `/shop-owner/dashboard`

### Admin Login
- Click "Demo Admin Login" button
- Redirects to: `/admin/dashboard`

## 🛠️ Technology Stack

- **React 18.3.1** - UI library
- **TypeScript** - Type safety
- **Vite 6.3.5** - Build tool
- **React Router 7.13.0** - Routing
- **Tailwind CSS 4.1.12** - Styling
- **Radix UI** - Accessible components
- **Lucide React** - Icons
- **Recharts** - Data visualization
- **Sonner** - Toast notifications

## 📂 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── context/        # React Context (state management)
│   │   └── data/           # Mock data
│   ├── styles/             # Global styles
│   └── main.tsx            # Application entry point
├── index.html              # HTML template
├── package.json            # Dependencies
└── vite.config.ts          # Vite configuration
```

## ✅ Verification

The application has been tested and verified:
- ✅ Dependencies installed successfully
- ✅ Build completes without errors
- ✅ Development server runs on port 5173
- ✅ All routes are properly configured
- ✅ Mock data is available
- ✅ Authentication flow works

## 🎯 Next Steps

1. Start the dev server: `npm run dev`
2. Open http://localhost:5173 in your browser
3. Explore the application as different user roles
4. Test the shopping flow: Browse → Add to Cart → Checkout
5. Try the dashboard features for each role

## 📝 Notes

- All data is mock data stored in memory
- No backend or database required
- State resets on page refresh
- Perfect for UI/UX demonstration and testing
