import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Tractor, Menu, Phone, Globe, ShoppingBag, Heart, Settings } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export const Navbar: React.FC = () => {
  const { user, cart, logout, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsDropdownOpen(false);
  };

  const getDashboardLink = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'farmer':
        return '/farmer/dashboard';
      case 'shopOwner':
        return '/shop-owner/dashboard';
      case 'admin':
        return '/admin/dashboard';
      default:
        return '/';
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleMenuClick = (action: () => void) => {
    action();
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-[#bae5cd] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-[#2f7c4f] to-[#236240] p-3 rounded-xl group-hover:scale-105 transition-transform">
              <Tractor className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-[#2f7c4f]">KrishakMart</div>
              <div className="text-xs text-[#b87a47] italic">Mitti Se Digital Tak</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              Shop
            </Link>
            <Link to="/become-seller" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              Become a Seller
            </Link>
            <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              Contact
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
              className="hidden sm:flex gap-2"
            >
              <Globe className="h-4 w-4" />
              {language === 'en' ? 'हिंदी' : 'English'}
            </Button>

            {/* Support Call */}
            <Button variant="outline" size="sm" className="hidden sm:flex gap-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4]">
              <Phone className="h-4 w-4" />
              Support
            </Button>

            {/* Cart */}
            <Link to="/cart" className="relative">
              <Button size="lg" variant="ghost" className="relative">
                <ShoppingCart className="h-6 w-6 text-[#2f7c4f]" />
                {cart.length > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500">
                    {cart.length}
                  </Badge>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2 border-[#2f7c4f] text-[#2f7c4f] font-semibold hover:bg-[#f0f9f4] cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="h-5 w-5" />
                  <span className="hidden sm:inline">{user.name}</span>
                </Button>
                
                {/* Custom Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500 capitalize">
                        {user.role === 'shopOwner' ? 'Shop Owner' : user.role}
                      </p>
                    </div>
                    
                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={() => handleMenuClick(() => navigate(getDashboardLink()))}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Tractor className="h-4 w-4" />
                        Dashboard
                      </button>
                      
                      {user.role === 'farmer' && (
                        <>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/farmer/orders'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            My Orders
                          </button>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/farmer/wishlist'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Heart className="h-4 w-4" />
                            Wishlist
                          </button>
                        </>
                      )}
                      
                      {user.role === 'shopOwner' && (
                        <>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/shop-owner/products'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            My Products
                          </button>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/shop-owner/orders'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <ShoppingCart className="h-4 w-4" />
                            Orders
                          </button>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleMenuClick(() => navigate('/profile'))}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4" />
                        Edit Profile
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] font-semibold">
                    Login
                  </Button>
                </Link>
                <Link to="/signup/farmer">
                  <Button size="lg" className="bg-[#2f7c4f] hover:bg-[#236240] text-white gap-2 font-semibold">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">Sign Up</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button size="lg" variant="ghost">
                <Menu className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
