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
  BarChart3,
  Store,
  Menu,
  X,
  Home,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

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
    { icon: UserCircle, label: 'My Profile', path: '/shop-owner/profile' },
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
      case 'farmer': return getFarmerMenuItems();
      case 'shopOwner': return getShopOwnerMenuItems();
      case 'admin': return getAdminMenuItems();
      default: return [];
    }
  };

  const menuItems = getMenuItems();

  const title =
    (user?.role === 'farmer' && 'Farmer Dashboard') ||
    (user?.role === 'shopOwner' && 'Shop Owner') ||
    (user?.role === 'admin' && 'Admin Panel') ||
    'Dashboard';

  const sidebarW = collapsed ? 'w-[72px]' : 'w-72';
  const mainML = collapsed ? 'md:ml-[72px]' : 'md:ml-72';

  const NavItem = ({ item, onClick }: { item: typeof menuItems[0]; onClick?: () => void }) => {
    const Icon = item.icon;
    const isActive = location.pathname === item.path;
    return (
      <Link to={item.path} onClick={onClick} title={collapsed ? item.label : undefined}>
        <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
          isActive ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
        } ${collapsed ? 'justify-center' : ''}`}>
          <Icon className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
        </div>
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">

      {/* Mobile top bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-green-200 shadow-sm">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
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
      <aside className={`hidden md:flex flex-col ${sidebarW} bg-white border-r border-green-200 shadow-md fixed left-0 top-0 h-screen overflow-hidden transition-all duration-300 z-20`}>

        {/* Header */}
        <div className={`flex items-center border-b border-green-100 p-4 ${collapsed ? 'justify-center' : 'justify-between'}`}>
          {!collapsed && (
            <div className="min-w-0">
              <h2 className="text-base font-bold text-green-700 truncate">{title}</h2>
              <p className="text-xs text-gray-500 truncate">Welcome, {user?.name}</p>
            </div>
          )}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-green-50 hover:text-green-700 transition-colors flex-shrink-0"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {user?.role === 'shopOwner' && (
            <Link to="/" title={collapsed ? 'Back to Home' : undefined}>
              <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-gray-600 hover:bg-green-50 hover:text-green-700 border border-green-100 mb-2 ${collapsed ? 'justify-center' : ''}`}>
                <Home className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="font-medium text-sm">Back to Home</span>}
              </div>
            </Link>
          )}

          {menuItems.map((item) => (
            <NavItem key={item.path} item={item} />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-3 border-t border-green-100">
          <button
            onClick={handleLogout}
            title={collapsed ? 'Logout' : undefined}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all ${collapsed ? 'justify-center' : ''}`}
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="font-medium text-sm">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
          mobileOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setMobileOpen(false)}
      />

      {/* Mobile Sidebar drawer */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-green-200 shadow-lg flex flex-col overflow-hidden transform transition-transform md:hidden ${
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-green-100 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-green-700">{title}</h2>
            <p className="text-xs text-gray-500 mt-0.5">Welcome, {user?.name}</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-2 rounded-xl border border-green-200 text-green-700 hover:bg-green-50 transition-colors"
            aria-label="Close menu"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {user?.role === 'shopOwner' && (
            <Link to="/" onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-gray-600 hover:bg-green-50 hover:text-green-700 border border-green-100 mb-2">
                <Home className="h-5 w-5" />
                <span className="font-medium text-sm">Back to Home</span>
              </div>
            </Link>
          )}

          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <div className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                  isActive ? 'bg-green-600 text-white shadow-md' : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                }`}>
                  <Icon className="h-5 w-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-green-100">
          <button
            onClick={() => { setMobileOpen(false); handleLogout(); }}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className={`flex-1 ml-0 ${mainML} p-4 sm:p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto transition-all duration-300`}>
        {children}
      </main>
    </div>
  );
};
