# Seller to Buyer Product Flow Guide

## Overview
KrishakMart now has a complete e-commerce flow where shop owners can add products and farmers/users can discover, browse, and purchase them.

## How It Works

### 1. Shop Owner Adds Products
- Shop owners log in to their dashboard
- Navigate to **Products** → **Add Product**
- Fill in product details:
  - Name, Category, Brand
  - Price and Stock quantity
  - Description and Usage instructions
  - Upload up to 5 product images
- Click **Save Product**
- Product is **immediately available** to all farmers/users

### 2. Products Appear on Farmer/User Side
Products added by shop owners are automatically visible to farmers in multiple places:

#### a) **Product Listing Page** (`/shop`)
- Shows all available products from all sellers
- Filters: Category, Price range, Search
- Sorting: Latest, Price (Low/High), Rating
- Each product card shows:
  - Product image, name, brand
  - Price and stock status
  - Seller shop name (clickable)
  - Add to Cart button

#### b) **Home Page**
- Featured products section
- Category-wise browsing
- Quick access to all products

#### c) **Shop Page** (`/shop/:sellerId`)
- **NEW FEATURE**: View all products from a specific seller
- Click on any seller name to visit their shop
- Shows seller information (shop name, address, phone)
- Filter and sort products within that shop
- Great for farmers who trust specific sellers

#### d) **Product Details Page** (`/product/:id`)
- Complete product information
- Seller details with "Visit Shop" button
- Add to Cart / Buy Now options
- Add to Wishlist

### 3. Farmers Can Purchase Products

#### Shopping Flow:
1. **Browse Products**
   - View all products or filter by category
   - Search for specific items
   - Visit specific seller shops

2. **Add to Cart**
   - Click "Add to Cart" on any product
   - Adjust quantities in cart
   - Cart syncs with backend

3. **Wishlist**
   - Save products for later
   - Access from farmer dashboard

4. **Checkout**
   - Select delivery address
   - Choose payment method (COD/UPI/QR)
   - Place order

5. **Order Tracking**
   - View order status in dashboard
   - Track: Pending → Accepted → Packed → Shipped → Delivered
   - Receive notifications

### 4. Shop Owner Receives Orders
- Notification when order is placed
- View orders in dashboard
- Update order status
- Track earnings

## Key Features

### For Shop Owners:
✅ Easy product management (Add/Edit/Delete)
✅ Stock management with auto-availability
✅ Image uploads (Cloudinary or local)
✅ Order management
✅ Earnings tracking

### For Farmers/Users:
✅ Browse all products from all sellers
✅ Visit specific seller shops
✅ Filter by category, price, search
✅ Add to cart and wishlist
✅ Place orders with multiple payment options
✅ Track order status
✅ View order history

### Product Visibility:
✅ Products are **immediately visible** after shop owner adds them
✅ No approval workflow needed (instant listing)
✅ Only products with `isAvailable: true` are shown
✅ Stock automatically updates on orders
✅ Products with 0 stock are hidden

## API Endpoints

### Public (Farmers/Users):
- `GET /api/products` - Get all available products
- `GET /api/products/:id` - Get single product
- `GET /api/products/seller/:sellerId/products` - Get products by specific seller

### Protected (Shop Owners):
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- `PATCH /api/products/:id/stock` - Update stock
- `GET /api/products/seller/my-products` - Get own products

### Cart & Orders:
- `POST /api/cart` - Add to cart
- `GET /api/cart` - Get cart
- `POST /api/orders` - Place order
- `GET /api/orders/my-orders` - Get farmer orders
- `GET /api/orders/seller/orders` - Get seller orders

## Frontend Routes

### Public Routes:
- `/` - Home page
- `/shop` - All products listing
- `/shop/:sellerId` - **NEW**: Specific seller's shop page
- `/product/:id` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout page

### Farmer Routes:
- `/farmer/dashboard` - Dashboard
- `/farmer/orders` - Order history
- `/farmer/wishlist` - Saved products
- `/farmer/profile` - Profile settings

### Shop Owner Routes:
- `/shop-owner/dashboard` - Dashboard
- `/shop-owner/products` - Manage products
- `/shop-owner/add-product` - Add new product
- `/shop-owner/orders` - Manage orders
- `/shop-owner/earnings` - View earnings

## Testing the Flow

1. **As Shop Owner:**
   ```
   - Login as shop owner
   - Go to Products → Add Product
   - Fill details and upload images
   - Save product
   ```

2. **As Farmer:**
   ```
   - Login as farmer (or browse without login)
   - Go to Shop page
   - See the newly added product
   - Click on seller name to visit their shop
   - Add product to cart
   - Proceed to checkout
   - Place order
   ```

3. **Verify:**
   ```
   - Shop owner receives order notification
   - Product stock is reduced
   - Order appears in both dashboards
   ```

## Notes

- Products are filtered by `isAvailable: true` (only shown if in stock)
- Stock automatically updates when orders are placed
- Multi-seller carts are supported
- Real-time notifications for orders
- Responsive design for mobile/desktop
- Image optimization with fallbacks

## Future Enhancements

- Product reviews and ratings
- Advanced search with filters
- Product recommendations
- Seller ratings
- Multi-seller checkout
- Payment gateway integration
- Order cancellation
- Return/refund system
