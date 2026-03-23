import React, { useState, useRef, useEffect, ReactNode, Suspense } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Search, ShoppingCart, User, Heart, Package, LayoutDashboard,
  LogOut, ChevronDown, Menu, X, Home, Phone, Globe, Send, MapPin,
} from 'lucide-react';
import { Footer } from './Footer';
import { useApp } from '../context/AppContext';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { translations } from '../../utils/translations';
import { toast } from 'sonner';
import { categories } from '../../services/productService';

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="text-center">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-green-600 mx-auto mb-3" />
      <p className="text-gray-500 text-sm">Loading...</p>
    </div>
  </div>
);

interface FarmerLayoutProps { children: ReactNode }

export const FarmerLayout: React.FC<FarmerLayoutProps> = ({ children }) => {
  const { user, cart, wishlist, logout, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const t = translations[language];

  const [searchQuery, setSearchQuery] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [supportForm, setSupportForm] = useState({ name: user?.name || '', mobile: user?.phone || '', message: '' });

  const profileRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  const LANGUAGES = [
    { code: 'en' as const, native: 'English' },
    { code: 'hi' as const, native: 'हिंदी' },
  ];
  const currentLang = LANGUAGES.find(l => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setProfileOpen(false);
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSupportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!supportForm.message.trim()) { toast.error('Please enter a message'); return; }
    toast.success('Message sent! We will contact you soon.');
    setSupportForm(f => ({ ...f, message: '' }));
    setSupportOpen(false);
  };

  const navLinks = [
    { label: t.home, path: '/farmer/store', icon: Home },
    { label: t.myOrders, path: '/farmer/orders', icon: Package },
    { label: t.wishlist, path: '/farmer/wishlist', icon: Heart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── Top Bar ── */}
      <header className="bg-[#2f7c4f] sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex items-center gap-3 h-16">

            {/* Logo */}
            <Link to="/farmer/store" className="flex items-center gap-2 shrink-0">
              <img src="/krishakmart-logo.png" alt="KrishakMart" className="h-9 w-9" />
              <div className="hidden sm:block">
                <div className="text-white font-bold text-lg leading-none">KrishakMart</div>
                <div className="text-green-200 text-[10px] italic">Mitti Se Digital Tak</div>
              </div>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-2 sm:mx-4">
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Search seeds, fertilizers, tools..."
                  className="flex-1 px-4 py-2.5 text-sm rounded-l-lg border-0 outline-none text-gray-800 bg-white"
                />
                <button type="submit"
                  className="bg-yellow-400 hover:bg-yellow-500 px-4 py-2.5 rounded-r-lg transition-colors">
                  <Search className="h-4 w-4 text-gray-800" />
                </button>
              </div>
            </form>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0">

              {/* Language */}
              <div className="relative hidden sm:block" ref={langRef}>
                <button onClick={() => setLangOpen(!langOpen)}
                  className="flex items-center gap-1 text-white hover:text-green-200 transition-colors px-2 py-1.5 rounded-lg hover:bg-green-700 text-xs">
                  <Globe className="h-4 w-4" />
                  <span className="hidden md:inline">{currentLang.native}</span>
                  <ChevronDown className="h-3 w-3" />
                </button>
                {langOpen && (
                  <div className="absolute right-0 mt-1 w-32 bg-white rounded-lg shadow-xl border border-gray-100 overflow-hidden z-50">
                    {LANGUAGES.map(lang => (
                      <button key={lang.code} onClick={() => { setLanguage(lang.code); setLangOpen(false); }}
                        className={`flex items-center justify-between w-full px-3 py-2 text-sm transition-colors ${language === lang.code ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}>
                        {lang.native}
                        {language === lang.code && <span className="text-green-600 text-xs">✓</span>}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Support */}
              <button onClick={() => setSupportOpen(true)}
                className="hidden sm:flex items-center gap-1 text-white hover:text-green-200 px-2 py-1.5 rounded-lg hover:bg-green-700 transition-colors text-xs">
                <Phone className="h-4 w-4" />
                <span className="hidden md:inline">{t.support}</span>
              </button>

              {/* Wishlist */}
              <Link to="/farmer/wishlist"
                className="relative flex items-center gap-1 text-white hover:text-green-200 px-2 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                <Heart className="h-5 w-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {wishlist.length}
                  </span>
                )}
                <span className="hidden md:inline text-xs">Wishlist</span>
              </Link>

              {/* Cart */}
              <Link to="/cart"
                className="relative flex items-center gap-1 text-white hover:text-green-200 px-2 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                <ShoppingCart className="h-5 w-5" />
                {cart.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-gray-900 text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold">
                    {cart.length}
                  </span>
                )}
                <span className="hidden md:inline text-xs">{t.myCart}</span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative" ref={profileRef}>
                <button onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-1.5 text-white hover:text-green-200 px-2 py-1.5 rounded-lg hover:bg-green-700 transition-colors">
                  <div className="w-7 h-7 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold text-sm">
                    {user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div className="hidden md:block text-left">
                    <div className="text-xs text-green-200 leading-none">Hello,</div>
                    <div className="text-sm font-semibold leading-none truncate max-w-[80px]">{user?.name?.split(' ')[0]}</div>
                  </div>
                  <ChevronDown className="h-3 w-3 hidden md:block" />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
                    {/* User info */}
                    <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 font-bold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold text-sm">{user?.name}</p>
                          <p className="text-green-200 text-xs">{user?.phone}</p>
                        </div>
                      </div>
                    </div>

                    <div className="py-1">
                      {[
                        { icon: LayoutDashboard, label: 'My Dashboard', path: '/farmer/dashboard' },
                        { icon: Package, label: t.myOrders, path: '/farmer/orders' },
                        { icon: Heart, label: t.wishlist, path: '/farmer/wishlist' },
                        { icon: ShoppingCart, label: t.myCart, path: '/cart' },
                        { icon: User, label: 'Profile', path: '/farmer/profile' },
                      ].map(item => (
                        <button key={item.path}
                          onClick={() => { navigate(item.path); setProfileOpen(false); }}
                          className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm transition-colors ${location.pathname === item.path ? 'bg-green-50 text-green-700 font-medium' : 'text-gray-700 hover:bg-gray-50'}`}>
                          <item.icon className="h-4 w-4" />
                          {item.label}
                        </button>
                      ))}
                      <div className="border-t border-gray-100 my-1" />
                      <button onClick={handleLogout}
                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors">
                        <LogOut className="h-4 w-4" />
                        {t.logout}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu toggle */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden text-white p-1.5 rounded-lg hover:bg-green-700 transition-colors">
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#236240] border-t border-green-600 px-4 py-3 space-y-1">
            {navLinks.map(link => (
              <Link key={link.path} to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === link.path ? 'bg-white text-green-700' : 'text-green-100 hover:bg-green-700'}`}>
                <link.icon className="h-4 w-4" /> {link.label}
              </Link>
            ))}
            <button onClick={() => { setSupportOpen(true); setMobileMenuOpen(false); }}
              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-green-100 hover:bg-green-700 transition-colors">
              <Phone className="h-4 w-4" /> {t.support}
            </button>
          </div>
        )}
      </header>

      {/* ── Main Content ── */}
      <main className="flex-1">
        <Suspense fallback={<LoadingFallback />}>
          {children}
        </Suspense>
      </main>

      {/* ── Footer ── */}
      <Footer />

      {/* ── Support Dialog ── */}
      {supportOpen && (
        <>
          <div className="fixed inset-0 bg-black/40 z-50" onClick={() => setSupportOpen(false)} />
          <div className="fixed inset-x-4 top-20 md:right-6 md:left-auto md:w-96 z-50">
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 bg-gradient-to-r from-green-600 to-green-700">
                <h2 className="text-white font-bold">{t.sendMessage}</h2>
                <button onClick={() => setSupportOpen(false)} className="text-green-200 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              <form onSubmit={handleSupportSubmit} className="p-5 space-y-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t.yourName}</Label>
                  <Input value={supportForm.name} onChange={e => setSupportForm(f => ({ ...f, name: e.target.value }))}
                    placeholder={t.enterName} className="mt-1 border-gray-200 focus:border-green-500" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t.mobileNumber}</Label>
                  <Input value={supportForm.mobile} onChange={e => setSupportForm(f => ({ ...f, mobile: e.target.value }))}
                    placeholder={t.enterMobile} className="mt-1 border-gray-200 focus:border-green-500" />
                </div>
                <div>
                  <Label className="text-sm font-medium text-gray-700">{t.message}</Label>
                  <Textarea value={supportForm.message} onChange={e => setSupportForm(f => ({ ...f, message: e.target.value }))}
                    placeholder={t.howCanWeHelp} className="mt-1 border-gray-200 focus:border-green-500 min-h-[80px]" required />
                </div>
                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white rounded-xl gap-2">
                  <Send className="h-4 w-4" /> {t.sendMessageBtn}
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
