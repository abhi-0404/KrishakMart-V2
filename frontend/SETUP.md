# Frontend Setup Guide

## Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

## Installation

1. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
```

## Project Structure

- `/src/app` - Main application code
  - `/components` - Reusable UI components
  - `/pages` - Page components for different routes
  - `/context` - React context for state management
  - `/data` - Mock data for the application
- `/src/styles` - Global styles and Tailwind configuration

## Features

### User Roles
1. **Farmer** - Browse and purchase agricultural products
2. **Shop Owner** - Manage products, orders, and earnings
3. **Admin** - Oversee platform operations

### Key Pages
- Home page with featured products
- Product listing and details
- Shopping cart and checkout
- User dashboards (Farmer, Shop Owner, Admin)
- Authentication (Login/Signup)

## Default Login Credentials

For testing, you can use these mock credentials:

**Farmer:**
- Any email/mobile with role selection as "Farmer"

**Shop Owner:**
- Any email/mobile with role selection as "Shop Owner"

**Admin:**
- Any email/mobile with role selection as "Admin"

## Technology Stack

- React 18.3.1
- TypeScript
- Vite 6.3.5
- React Router 7.13.0
- Tailwind CSS 4.1.12
- Radix UI Components
- Material-UI Icons
- Recharts for data visualization

## Notes

- The application uses mock data for demonstration purposes
- Authentication is simulated (no backend required)
- All state is managed in-memory via React Context
