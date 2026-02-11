import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Heart,
  UserCircle,
  LogOut,
  PlusCircle,
  DollarSign,
  Users,
  Settings,
  BarChart3,
  Store,
  Menu,
  X,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getFarmerMenuItems = () => [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/farmer/dashboard' },
    { icon: ShoppingBag, label: 'My Orders', path: '/farmer/orders' },
    { icon: Heart, label: 'Wishlist', path: '/farmer/wishlist' },
    { icon: UserCircle, label: 'Profile', path: '/farmer/profile' },
  ];

  const getShopOwnerMenuItems = () => [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/shop-owner/dashboard' },
    { icon: Package, label: 'My Products', path: '/shop-owner/products' },
    { icon: PlusCircle, label: 'Add Product', path: '/shop-owner/add-product' },
    { icon: ShoppingBag, label: 'Orders Received', path: '/shop-owner/orders' },
    { icon: DollarSign, label: 'Earnings', path: '/shop-owner/earnings' },
    { icon: UserCircle, label: 'Profile', path: '/shop-owner/profile' },
  ];

  const getAdminMenuItems = () => [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin/dashboard' },
    { icon: Users, label: 'Manage Farmers', path: '/admin/farmers' },
    { icon: Store, label: 'Manage Shop Owners', path: '/admin/shop-owners' },
    { icon: Package, label: 'All Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'All Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Platform Reports', path: '/admin/reports' },
    { icon: Package, label: 'My Store Products', path: '/admin/my-products' },
    { icon: PlusCircle, label: 'Add Store Product', path: '/admin/add-product' },
    { icon: DollarSign, label: 'Admin Earnings', path: '/admin/earnings' },
  ];

  const getMenuItems = () => {
    if (!user) return [];
    switch (user.role) {
      case 'farmer':
        return getFarmerMenuItems();
      case 'shopOwner':
        return getShopOwnerMenuItems();
      case 'admin':
        return getAdminMenuItems();
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  const title =
    (user?.role === 'farmer' && 'Farmer Dashboard') ||
    (user?.role === 'shopOwner' && 'Shop Owner Dashboard') ||
    (user?.role === 'admin' && 'Admin Panel') ||
    'Dashboard';

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b-2 border-green-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-lg border-2 border-green-200 text-green-700 hover:bg-green-50 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="text-center">
            <p className="text-sm font-semibold text-green-700">{title}</p>
            <p className="text-xs text-gray-500">Welcome, {user?.name}</p>
          </div>
          <div className="w-10" />
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-72 bg-white border-r-2 border-green-200 shadow-lg fixed left-0 top-0 h-screen overflow-y-auto">
        <div className="p-6 border-b-2 border-green-200">
          <h2 className="text-2xl font-bold text-green-700">{title}</h2>
          <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-green-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}

          <Button
            variant="ghost"
            onClick={handleLogout}
            className="w-full justify-start gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r-2 border-green-200 shadow-lg overflow-y-auto transform transition-transform md:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-5 border-b-2 border-green-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-green-700">{title}</h2>
            <p className="text-xs text-gray-600 mt-1">Welcome, {user?.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-lg border-2 border-green-200 text-green-700 hover:bg-green-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-green-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-green-100'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </div>
              </Link>
            );
          })}

          <Button
            variant="ghost"
            onClick={() => {
              setMobileOpen(false);
              handleLogout();
            }}
            className="w-full justify-start gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </Button>
        </nav>
      </aside>

      {/* Main Content - Scrollable with left margin */}
      <main className="flex-1 ml-0 md:ml-72 p-4 sm:p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
