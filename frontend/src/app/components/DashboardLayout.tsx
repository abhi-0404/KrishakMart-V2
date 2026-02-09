import React, { ReactNode } from 'react';
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
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

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
    { icon: Package, label: 'Manage Products', path: '/admin/products' },
    { icon: ShoppingBag, label: 'Manage Orders', path: '/admin/orders' },
    { icon: BarChart3, label: 'Sales Reports', path: '/admin/reports' },
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-72 bg-white min-h-screen border-r-2 border-green-200 shadow-lg">
          <div className="p-6 border-b-2 border-green-200">
            <h2 className="text-2xl font-bold text-green-700">
              {user?.role === 'farmer' && 'Farmer Dashboard'}
              {user?.role === 'shopOwner' && 'Shop Owner Dashboard'}
              {user?.role === 'admin' && 'Admin Panel'}
            </h2>
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

        {/* Main Content */}
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  );
};
