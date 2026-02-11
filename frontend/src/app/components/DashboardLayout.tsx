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
  Home,
} from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const { user, logout } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

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
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white border-b-2 border-green-200 p-4 flex items-center justify-between sticky top-0 z-40">
        <div>
          <h2 className="text-xl font-bold text-green-700">
            {user?.role === 'farmer' && 'Farmer Dashboard'}
            {user?.role === 'shopOwner' && 'Seller Dashboard'}
            {user?.role === 'admin' && 'Admin Panel'}
          </h2>
          <p className="text-xs text-gray-600">{user?.name}</p>
        </div>
        <Button
          variant="ghost"
          size="lg"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Settings className="h-6 w-6" />
        </Button>
      </div>

      <div className="flex">
        {/* Sidebar - Desktop */}
        <aside className="hidden lg:block w-72 bg-white min-h-screen border-r-2 border-green-200 shadow-lg">
          <div className="p-6 border-b-2 border-green-200">
            <h2 className="text-2xl font-bold text-green-700">
              {user?.role === 'farmer' && 'Farmer Dashboard'}
              {user?.role === 'shopOwner' && 'Seller Dashboard'}
              {user?.role === 'admin' && 'Admin Panel'}
            </h2>
            <p className="text-sm text-gray-600 mt-1">Welcome, {user?.name}</p>
          </div>

          <nav className="p-4 space-y-2">
            {/* Back to Home - Only for Shop Owners */}
            {user?.role === 'shopOwner' && (
              <Link to="/">
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-green-100 border-2 border-green-200 mb-4">
                  <Home className="h-5 w-5" />
                  <span className="font-medium">Back to Home</span>
                </div>
              </Link>
            )}

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
=======
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex">
      {/* Sidebar - Fixed */}
      <aside className="w-72 bg-white border-r-2 border-green-200 shadow-lg fixed left-0 top-0 h-screen overflow-y-auto">
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
>>>>>>> 9cdea91589647563e5cdcfaf3420fc4ddc0065f9

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

<<<<<<< HEAD
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <>
            <div 
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsSidebarOpen(false)}
            />
            <aside className="lg:hidden fixed left-0 top-0 bottom-0 w-72 bg-white z-50 shadow-2xl overflow-y-auto">
              <div className="p-6 border-b-2 border-green-200 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-green-700">
                    {user?.role === 'farmer' && 'Farmer Dashboard'}
                    {user?.role === 'shopOwner' && 'Seller Dashboard'}
                    {user?.role === 'admin' && 'Admin Panel'}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">{user?.name}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSidebarOpen(false)}
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </div>

              <nav className="p-4 space-y-2">
                {/* Back to Home - Only for Shop Owners */}
                {user?.role === 'shopOwner' && (
                  <Link to="/" onClick={() => setIsSidebarOpen(false)}>
                    <div className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 hover:bg-green-100 border-2 border-green-200 mb-4">
                      <Home className="h-5 w-5" />
                      <span className="font-medium">Back to Home</span>
                    </div>
                  </Link>
                )}

                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  return (
                    <Link 
                      key={item.path} 
                      to={item.path}
                      onClick={() => setIsSidebarOpen(false)}
                    >
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
                    handleLogout();
                    setIsSidebarOpen(false);
                  }}
                  className="w-full justify-start gap-3 px-4 py-3 mt-4 text-red-600 hover:bg-red-50 hover:text-red-700"
                >
                  <LogOut className="h-5 w-5" />
                  <span className="font-medium">Logout</span>
                </Button>
              </nav>
            </aside>
          </>
        )}

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
=======
      {/* Main Content - Scrollable with left margin */}
      <main className="flex-1 ml-72 p-8 overflow-y-auto">
        {children}
      </main>
>>>>>>> 9cdea91589647563e5cdcfaf3420fc4ddc0065f9
    </div>
  );
};
