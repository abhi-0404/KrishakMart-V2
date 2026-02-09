import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { Toaster } from './components/ui/sonner';

// Layout Components (keep these as regular imports)
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { DashboardLayout } from './components/DashboardLayout';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./pages/HomePage').then(m => ({ default: m.HomePage })));
const ProductListingPage = lazy(() => import('./pages/ProductListingPage').then(m => ({ default: m.ProductListingPage })));
const ProductDetailsPage = lazy(() => import('./pages/ProductDetailsPage').then(m => ({ default: m.ProductDetailsPage })));
const CartPage = lazy(() => import('./pages/CartPage').then(m => ({ default: m.CartPage })));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage').then(m => ({ default: m.CheckoutPage })));
const LoginPage = lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));
const SignupPage = lazy(() => import('./pages/SignupPage').then(m => ({ default: m.SignupPage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then(m => ({ default: m.AboutPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then(m => ({ default: m.ContactPage })));
const BecomeSellerPage = lazy(() => import('./pages/BecomeSellerPage').then(m => ({ default: m.BecomeSellerPage })));

// Farmer Pages
const FarmerDashboard = lazy(() => import('./pages/farmer/FarmerDashboard').then(m => ({ default: m.FarmerDashboard })));
const FarmerOrders = lazy(() => import('./pages/farmer/FarmerOrders').then(m => ({ default: m.FarmerOrders })));
const FarmerWishlist = lazy(() => import('./pages/farmer/FarmerWishlist').then(m => ({ default: m.FarmerWishlist })));
const FarmerProfile = lazy(() => import('./pages/farmer/FarmerProfile').then(m => ({ default: m.FarmerProfile })));

// Shop Owner Pages
const ShopOwnerDashboard = lazy(() => import('./pages/shop-owner/ShopOwnerDashboard').then(m => ({ default: m.ShopOwnerDashboard })));
const ShopOwnerProducts = lazy(() => import('./pages/shop-owner/ShopOwnerProducts').then(m => ({ default: m.ShopOwnerProducts })));
const ShopOwnerAddProduct = lazy(() => import('./pages/shop-owner/ShopOwnerAddProduct').then(m => ({ default: m.ShopOwnerAddProduct })));
const ShopOwnerOrders = lazy(() => import('./pages/shop-owner/ShopOwnerOrders').then(m => ({ default: m.ShopOwnerOrders })));
const ShopOwnerEarnings = lazy(() => import('./pages/shop-owner/ShopOwnerEarnings').then(m => ({ default: m.ShopOwnerEarnings })));
const ShopOwnerProfile = lazy(() => import('./pages/shop-owner/ShopOwnerProfile').then(m => ({ default: m.ShopOwnerProfile })));

// Admin Pages
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user } = useApp();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Loading...</p>
    </div>
  </div>
);

// Layout wrapper for public pages
const PublicLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

function AppContent() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicLayout>
              <HomePage />
            </PublicLayout>
          }
        />
        <Route
          path="/shop"
          element={
            <PublicLayout>
              <ProductListingPage />
            </PublicLayout>
          }
        />
        <Route
          path="/product/:id"
          element={
            <PublicLayout>
              <ProductDetailsPage />
            </PublicLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <PublicLayout>
              <CartPage />
            </PublicLayout>
          }
        />
        <Route
          path="/checkout"
          element={
            <PublicLayout>
              <CheckoutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/about"
          element={
            <PublicLayout>
              <AboutPage />
            </PublicLayout>
          }
        />
        <Route
          path="/contact"
          element={
            <PublicLayout>
              <ContactPage />
            </PublicLayout>
          }
        />
        <Route
          path="/become-seller"
          element={
            <PublicLayout>
              <BecomeSellerPage />
            </PublicLayout>
          }
        />
        <Route path="/login" element={<Suspense fallback={<LoadingFallback />}><LoginPage /></Suspense>} />
        <Route path="/signup/:userType" element={<Suspense fallback={<LoadingFallback />}><SignupPage /></Suspense>} />

        {/* Farmer Routes */}
        <Route
          path="/farmer/dashboard"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <FarmerDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/orders"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <FarmerOrders />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/wishlist"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <FarmerWishlist />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/farmer/profile"
          element={
            <ProtectedRoute allowedRoles={['farmer']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <FarmerProfile />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Shop Owner Routes */}
        <Route
          path="/shop-owner/dashboard"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/products"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerProducts />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/add-product"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerAddProduct />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/orders"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerOrders />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/earnings"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerEarnings />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/shop-owner/profile"
          element={
            <ProtectedRoute allowedRoles={['shopOwner']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <ShopOwnerProfile />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/farmers"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/shop-owners"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <DashboardLayout>
                <Suspense fallback={<LoadingFallback />}>
                  <AdminDashboard />
                </Suspense>
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch all - redirect to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster position="top-right" />
    </Router>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}