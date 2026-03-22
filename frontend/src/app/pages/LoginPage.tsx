import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Tractor, Globe, Leaf, ShoppingBag, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { translations } from '../../utils/translations';

const LANGUAGES = [
  { code: 'en', label: 'English', native: 'English' },
  { code: 'hi', label: 'Hindi', native: 'हिंदी' },
];

export const LoginPage: React.FC = () => {
  const { login, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [farmerCredentials, setFarmerCredentials] = useState({ mobile: '', password: '' });
  const [shopOwnerCredentials, setShopOwnerCredentials] = useState({ mobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showFarmerPw, setShowFarmerPw] = useState(false);
  const [showShopPw, setShowShopPw] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const t = translations[language as keyof typeof translations];
  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleFarmerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ phone: farmerCredentials.mobile, password: farmerCredentials.password });
      toast.success('Welcome back! Logged in successfully.');
      navigate('/farmer/dashboard');
    } catch (error: any) {
      const msg = error.response?.data?.message || '';
      if (error.response?.status === 401) {
        toast.error(msg.toLowerCase().includes('password') ? 'Incorrect password. Please try again.' : 'Phone number not found. Please check and try again.');
      } else if (error.response?.status === 403) {
        toast.error('Your account has been blocked. Please contact support.');
      } else {
        toast.error(msg || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShopOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ phone: shopOwnerCredentials.mobile, password: shopOwnerCredentials.password });
      toast.success('Welcome back! Logged in successfully.');
      navigate('/shop-owner/dashboard');
    } catch (error: any) {
      const msg = error.response?.data?.message || '';
      if (error.response?.status === 401) {
        toast.error(msg.toLowerCase().includes('password') ? 'Incorrect password. Please try again.' : 'Phone number not found. Please check and try again.');
      } else if (error.response?.status === 403) {
        toast.error('Your account has been blocked. Please contact support.');
      } else {
        toast.error(msg || 'Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      await login({ phone: '9999999999', password: 'admin123' });
      toast.success('Admin login successful. Welcome!');
      navigate('/admin/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel — Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-700 via-green-600 to-emerald-500 flex-col items-center justify-center p-12 relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-[-80px] left-[-80px] w-72 h-72 bg-white/10 rounded-full" />
        <div className="absolute bottom-[-60px] right-[-60px] w-56 h-56 bg-white/10 rounded-full" />
        <div className="absolute top-1/2 right-[-40px] w-32 h-32 bg-white/5 rounded-full" />

        <div className="relative z-10 text-center">
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-white p-4 rounded-2xl shadow-lg">
              <img
                src="/krishakmart-logo.png"
                alt="KrishakMart"
                className="h-14 w-14 object-contain"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                  (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = 'block';
                }}
              />
              <Tractor className="h-14 w-14 text-green-700 hidden" />
            </div>
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-white tracking-tight">KrishakMart</h1>
              <p className="text-green-100 text-sm font-medium tracking-widest uppercase">Agri Marketplace</p>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-white text-2xl font-semibold mt-4 leading-snug">
            Empowering Farmers,<br />Connecting Markets
          </p>
          <p className="text-green-100 mt-3 text-base max-w-xs mx-auto italic">
            "Mitti Se Digital Tak"
          </p>
          <p className="text-green-100 mt-2 text-sm max-w-xs mx-auto">
            Your trusted platform for agricultural products, tools, and supplies.
          </p>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm px-4 py-2 rounded-full">
              <Leaf className="h-4 w-4" /> Fresh Produce
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm px-4 py-2 rounded-full">
              <ShoppingBag className="h-4 w-4" /> Easy Orders
            </span>
            <span className="flex items-center gap-1.5 bg-white/20 text-white text-sm px-4 py-2 rounded-full">
              <Tractor className="h-4 w-4" /> Farm Tools
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-gray-50 py-10 px-6">
        <div className="w-full max-w-md">
          {/* Top bar: mobile logo + language dropdown */}
          <div className="flex items-center justify-between mb-8">
            {/* Mobile logo */}
            <div className="flex lg:hidden items-center gap-3">
              <div className="bg-green-700 p-2.5 rounded-xl">
                <Tractor className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-green-800">KrishakMart</h1>
                <p className="text-green-600 text-xs tracking-widest uppercase">Agri Marketplace</p>
              </div>
            </div>
            {/* Spacer on desktop so dropdown stays right */}
            <div className="hidden lg:block" />

            {/* Language Dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((o) => !o)}
                className="flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Globe className="h-4 w-4 text-green-600" />
                <span>{currentLang.native}</span>
                <ChevronDown className={`h-3.5 w-3.5 text-gray-400 transition-transform ${langOpen ? 'rotate-180' : ''}`} />
              </button>

              {langOpen && (
                <div className="absolute right-0 mt-1.5 w-36 bg-white border border-gray-100 rounded-xl shadow-lg overflow-hidden z-50">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as 'en' | 'hi'); setLangOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm flex items-center justify-between transition-colors
                        ${language === lang.code
                          ? 'bg-green-50 text-green-700 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                      <span>{lang.native}</span>
                      {language === lang.code && <span className="w-1.5 h-1.5 rounded-full bg-green-600" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Welcome back</h2>
            <p className="text-gray-500 mt-1 text-sm">Login to your KrishakMart account</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            <Tabs defaultValue="farmer" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="farmer" className="text-sm py-2.5">
                  🧑‍🌾 {t.farmer}
                </TabsTrigger>
                <TabsTrigger value="shopOwner" className="text-sm py-2.5">
                  🏪 {t.shopOwner}
                </TabsTrigger>
              </TabsList>

              {/* Farmer Login */}
              <TabsContent value="farmer">
                <form onSubmit={handleFarmerLogin} className="space-y-5">
                  <div>
                    <Label htmlFor="farmer-mobile" className="text-sm font-medium text-gray-700">{t.mobileNumber}</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="farmer-mobile"
                        type="tel"
                        placeholder={t.enterMobile}
                        value={farmerCredentials.mobile}
                        onChange={(e) => setFarmerCredentials({ ...farmerCredentials, mobile: e.target.value })}
                        className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="farmer-password" className="text-sm font-medium text-gray-700">{t.password}</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="farmer-password"
                        type={showFarmerPw ? 'text' : 'password'}
                        placeholder={t.enterPassword}
                        value={farmerCredentials.password}
                        onChange={(e) => setFarmerCredentials({ ...farmerCredentials, password: e.target.value })}
                        className="pl-10 pr-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                      <button type="button" onClick={() => setShowFarmerPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showFarmerPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl" disabled={loading}>
                    {loading ? t.loggingIn : t.loginAsFarmer}
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    {t.dontHaveAccount}{' '}
                    <Link to="/signup/farmer" className="text-green-600 font-semibold hover:underline">{t.signUp}</Link>
                  </p>
                </form>
              </TabsContent>

              {/* Shop Owner Login */}
              <TabsContent value="shopOwner">
                <form onSubmit={handleShopOwnerLogin} className="space-y-5">
                  <div>
                    <Label htmlFor="shop-mobile" className="text-sm font-medium text-gray-700">{t.mobileNumber}</Label>
                    <div className="relative mt-1.5">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="shop-mobile"
                        type="tel"
                        placeholder={t.enterMobile}
                        value={shopOwnerCredentials.mobile}
                        onChange={(e) => setShopOwnerCredentials({ ...shopOwnerCredentials, mobile: e.target.value })}
                        className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="shop-password" className="text-sm font-medium text-gray-700">{t.password}</Label>
                    <div className="relative mt-1.5">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="shop-password"
                        type={showShopPw ? 'text' : 'password'}
                        placeholder={t.enterPassword}
                        value={shopOwnerCredentials.password}
                        onChange={(e) => setShopOwnerCredentials({ ...shopOwnerCredentials, password: e.target.value })}
                        className="pl-10 pr-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                        required
                      />
                      <button type="button" onClick={() => setShowShopPw((v) => !v)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        {showShopPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                  <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl" disabled={loading}>
                    {loading ? t.loggingIn : t.loginAsShopOwner}
                  </Button>
                  <p className="text-center text-sm text-gray-500">
                    {t.dontHaveAccount}{' '}
                    <Link to="/signup/shop-owner" className="text-green-600 font-semibold hover:underline">{t.signUp}</Link>
                  </p>
                </form>
              </TabsContent>
            </Tabs>

            {/* Admin Demo */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <Button
                onClick={handleAdminLogin}
                variant="outline"
                className="w-full border-2 border-gray-200 hover:bg-gray-50 text-sm py-5 text-gray-600"
                disabled={loading}
              >
                🔐 {t.demoAdminLogin}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
