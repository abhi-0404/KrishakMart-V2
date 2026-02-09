import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Tractor, Menu, Phone, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';

export const Navbar: React.FC = () => {
  const { user, cart, logout, language, setLanguage } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="lg" variant="outline" className="gap-2 border-[#2f7c4f] text-[#2f7c4f] font-semibold">
                    <User className="h-5 w-5" />
                    <span className="hidden sm:inline">{user.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={() => navigate(getDashboardLink())}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] font-semibold">
                    Login
                  </Button>
                </Link>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="lg" className="bg-[#2f7c4f] hover:bg-[#236240] text-white gap-2 font-semibold">
                      <User className="h-5 w-5" />
                      <span className="hidden sm:inline">Sign Up</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem onClick={() => navigate('/signup/farmer')}>
                      🧑‍🌾 Sign up as Farmer
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/signup/shop-owner')}>
                      🏪 Sign up as Shop Owner
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}

            {/* Mobile Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="lg" variant="ghost" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => navigate('/')}>Home</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/shop')}>Shop</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/become-seller')}>Become a Seller</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/about')}>About</DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate('/contact')}>Contact</DropdownMenuItem>
                {!user && (
                  <>
                    <DropdownMenuItem onClick={() => navigate('/login')} className="font-semibold text-[#2f7c4f]">
                      Login
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/signup/farmer')}>
                      🧑‍🌾 Farmer Signup
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/signup/shop-owner')}>
                      🏪 Shop Owner Signup
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};
