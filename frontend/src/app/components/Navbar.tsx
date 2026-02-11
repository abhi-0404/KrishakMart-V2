import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Tractor, Menu, Phone, Globe, ShoppingBag, Heart, Settings, X, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { toast } from 'sonner';
import { translations } from '../../utils/translations';

export const Navbar: React.FC = () => {
  const { user, cart, logout, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({
    name: '',
    mobile: '',
    message: ''
  });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const supportRef = useRef<HTMLDivElement>(null);
  
  const t = translations[language];

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
      if (supportRef.current && !supportRef.current.contains(event.target as Node)) {
        setIsSupportOpen(false);
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

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!supportForm.name.trim() || !supportForm.mobile.trim() || !supportForm.message.trim()) {
      toast.error('Please fill in all fields');
      return;
    }

    // Here you would typically send the message to your backend
    toast.success('Message sent successfully! We will contact you soon.');
    setSupportForm({ name: '', mobile: '', message: '' });
    setIsSupportOpen(false);
  };

  return (
    <nav className="bg-white border-b-2 border-[#bae5cd] sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 group">
            <div className="flex items-center justify-center">
              <img 
                src="/krishakmart-logo.png" 
                alt="KrishakMart Logo" 
                className="h-10 w-10 md:h-12 md:w-12 group-hover:scale-105 transition-transform"
              />
            </div>
            <div>
              <div className="text-xl md:text-2xl font-bold text-[#2f7c4f]">KrishakMart</div>
              <div className="text-[10px] md:text-xs text-[#b87a47] italic">Mitti Se Digital Tak</div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
              {t.home}
            </Link>
            {user?.role === 'shopOwner' ? (
              <>
                <Link to="/shop-owner/dashboard" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
                  {t.dashboard}
                </Link>
                <Link to="/shop-owner/products" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
                  {t.myProducts}
                </Link>
                <Link to="/shop-owner/orders" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
                  {t.orders}
                </Link>
              </>
            ) : (
              <>
                <Link to="/about" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
                  {t.about}
                </Link>
                <Link to="/contact" className="text-lg font-medium text-gray-700 hover:text-[#2f7c4f] transition-colors">
                  {t.contact}
                </Link>
              </>
            )}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Support Call - Hidden on small mobile */}
            <Button 
              type="button"
              variant="outline" 
              size="sm" 
              className="hidden sm:flex gap-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] px-2 md:px-3"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setIsSupportOpen(true);
              }}
            >
              <Phone className="h-4 w-4" />
              <span className="hidden md:inline">{t.support}</span>
            </Button>

            {/* Cart - Hidden for Shop Owners */}
            {user?.role !== 'shopOwner' && (
              <Link to="/cart" className="relative">
                <Button size="sm" variant="ghost" className="relative p-2">
                  <ShoppingCart className="h-5 w-5 md:h-6 md:w-6 text-[#2f7c4f]" />
                  {cart.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 bg-red-500 text-[10px] md:text-xs">
                      {cart.length}
                    </Badge>
                  )}
                </Button>
              </Link>
            )}

            {/* User Menu */}
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="gap-1 md:gap-2 border-[#2f7c4f] text-[#2f7c4f] font-semibold hover:bg-[#f0f9f4] cursor-pointer px-2 md:px-3"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <User className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline text-xs md:text-sm">{user.name}</span>
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
                      {user.role === 'shopOwner' && (
                        <>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/about'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Globe className="h-4 w-4" />
                            {t.about}
                          </button>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/contact'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Phone className="h-4 w-4" />
                            {t.contact}
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                        </>
                      )}
                      
                      {user.role === 'farmer' && (
                        <>
                          <button
                            onClick={() => handleMenuClick(() => navigate(getDashboardLink()))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Tractor className="h-4 w-4" />
                            {t.dashboard}
                          </button>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/farmer/orders'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            {t.myOrders}
                          </button>
                          <button
                            onClick={() => handleMenuClick(() => navigate('/farmer/wishlist'))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Heart className="h-4 w-4" />
                            {t.wishlist}
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                        </>
                      )}
                      
                      {user.role === 'admin' && (
                        <>
                          <button
                            onClick={() => handleMenuClick(() => navigate(getDashboardLink()))}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Tractor className="h-4 w-4" />
                            {t.dashboard}
                          </button>
                          
                          <div className="border-t border-gray-100 my-1"></div>
                        </>
                      )}
                      
                      <button
                        onClick={() => handleMenuClick(() => navigate('/profile'))}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <Settings className="h-4 w-4" />
                        {t.editProfile}
                      </button>
                      
                      <div className="border-t border-gray-100 my-1"></div>
                      
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button size="sm" variant="outline" className="border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] font-semibold px-3 md:px-4 text-xs md:text-sm">
                    {t.login}
                  </Button>
                </Link>
                <Link to="/signup/farmer">
                  <Button size="sm" className="bg-[#2f7c4f] hover:bg-[#236240] text-white gap-1 md:gap-2 font-semibold px-3 md:px-4 text-xs md:text-sm">
                    <User className="h-4 w-4" />
                    <span className="hidden sm:inline">{t.signUp}</span>
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <div className="md:hidden">
              <Button 
                size="sm" 
                variant="ghost"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t-2 border-[#bae5cd]">
            <div className="px-3 py-2 space-y-1">
              <Link 
                to="/" 
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {t.home}
              </Link>
              {user?.role === 'shopOwner' ? (
                <>
                  <Link 
                    to="/shop-owner/dashboard" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.dashboard}
                  </Link>
                  <Link 
                    to="/shop-owner/products" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.myProducts}
                  </Link>
                  <Link 
                    to="/shop-owner/orders" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.orders}
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to="/about" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.about}
                  </Link>
                  <Link 
                    to="/contact" 
                    className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t.contact}
                  </Link>
                </>
              )}
              
              {/* Support in Mobile Menu */}
              <button
                onClick={() => {
                  setIsSupportOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 w-full px-3 py-2 text-base font-medium text-gray-700 hover:bg-[#f0f9f4] rounded-lg"
              >
                <Phone className="h-5 w-5" />
                {t.support}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Support Dialog */}
      {isSupportOpen && (
        <>
          {/* Invisible overlay for click-outside detection */}
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setIsSupportOpen(false)}
          />
          
          {/* Dialog */}
          <div className="fixed inset-x-4 top-20 md:right-4 md:left-auto z-50 w-auto md:max-w-md">
            <div ref={supportRef} className="bg-white rounded-xl shadow-2xl border-2 border-green-200">
              <div className="flex items-center justify-between p-4 md:p-6 border-b bg-gradient-to-r from-green-50 to-white">
                <h2 className="text-xl md:text-2xl font-bold text-gray-800">{t.sendMessage}</h2>
                <button
                  onClick={() => setIsSupportOpen(false)}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form onSubmit={handleSupportSubmit} className="p-4 md:p-6 space-y-4">
                <div>
                  <Label htmlFor="support-name" className="text-gray-700">{t.yourName}</Label>
                  <Input
                    id="support-name"
                    value={supportForm.name}
                    onChange={(e) => setSupportForm({ ...supportForm, name: e.target.value })}
                    placeholder={t.enterName}
                    className="mt-1 border-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="support-mobile" className="text-gray-700">{t.mobileNumber}</Label>
                  <Input
                    id="support-mobile"
                    type="tel"
                    value={supportForm.mobile}
                    onChange={(e) => setSupportForm({ ...supportForm, mobile: e.target.value })}
                    placeholder={t.enterMobile}
                    className="mt-1 border-2"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="support-message" className="text-gray-700">{t.message}</Label>
                  <Textarea
                    id="support-message"
                    value={supportForm.message}
                    onChange={(e) => setSupportForm({ ...supportForm, message: e.target.value })}
                    placeholder={t.howCanWeHelp}
                    className="mt-1 min-h-[100px] border-2"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-[#2f7c4f] hover:bg-[#236240] gap-2 py-4 md:py-6 text-base md:text-lg"
                >
                  <Send className="h-4 w-4" />
                  {t.sendMessageBtn}
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};
