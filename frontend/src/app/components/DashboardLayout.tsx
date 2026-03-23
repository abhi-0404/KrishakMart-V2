import React, { ReactNode, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  ShoppingCart,
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
    { icon: ShoppingCart, label: 'My Cart', path: '/cart' },
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
        }`}>
          <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
            <Icon className="h-5 w-5" />
          </span>
          <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>{item.label}</span>
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
      <aside className={`hidden md:flex flex-col ${sidebarW} bg-white border-r border-green-200 shadow-md fixed left-0 top-0 h-screen overflow-hidden transition-[width] duration-300 ease-in-out z-20`}>

        {/* All items in one scrollable nav — toggle is first item, same box as all icons */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1 pt-4">

          {/* Toggle button — icon stays at exact same position always */}
          <button
            type="button"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-500 hover:bg-green-50 hover:text-green-700 transition-colors mb-2"
          >
            <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
              {collapsed ? <Menu className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
            </span>
            <span className={`font-semibold text-sm whitespace-nowrap overflow-hidden transition-all duration-300 text-green-700 ${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>{title}</span>
          </button>

          {/* Divider */}
          <div className="border-t border-green-100 mb-2" />

          {user?.role === 'farmer' && (
            <Link to="/farmer/store" title={collapsed ? 'Back to Store' : undefined}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 mb-1">
                <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                  <Home className="h-5 w-5" />
                </span>
                <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>← Back to Store</span>
              </div>
            </Link>
          )}
          {user?.role === 'shopOwner' && (
            <Link to="/" title={collapsed ? 'Back to Home' : undefined}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-gray-600 hover:bg-green-50 hover:text-green-700 border border-green-100 mb-1">
                <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
                  <Home className="h-5 w-5" />
                </span>
                <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>Back to Home</span>
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
            className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-red-500 hover:bg-red-50 hover:text-red-600 transition-all"
          >
            <span className="h-5 w-5 flex-shrink-0 flex items-center justify-center">
              <LogOut className="h-5 w-5" />
            </span>
            <span className={`font-medium text-sm whitespace-nowrap overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0 pointer-events-none' : 'w-auto opacity-100'}`}>Logout</span>
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
          {user?.role === 'farmer' && (
            <Link to="/farmer/store" onClick={() => setMobileOpen(false)}>
              <div className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all text-green-700 bg-green-50 hover:bg-green-100 border border-green-200 mb-2">
                <Home className="h-5 w-5" />
                <span className="font-medium text-sm">← Back to Store</span>
              </div>
            </Link>
          )}
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
      <main className={`flex-1 ml-0 ${mainML} p-4 sm:p-6 md:p-8 pt-20 md:pt-8 overflow-y-auto transition-[margin] duration-300 ease-in-out`}>
        {children}
      </main>
    </div>
  );
};
