import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { User, Phone, MapPin, Lock, Store, FileText, Tractor, Leaf, ShoppingBag, Globe, ChevronDown, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import API from '../../services/api';

const LANGUAGES = [
  { code: 'en', native: 'English' },
  { code: 'hi', native: 'हिंदी' },
];

export const SignupPage: React.FC = () => {
  const { userType } = useParams<{ userType: 'farmer' | 'shop-owner' }>();
  const { login, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const [farmerData, setFarmerData] = useState({ name: '', mobile: '', village: '', password: '' });
  const [shopOwnerData, setShopOwnerData] = useState({
    shopName: '', ownerName: '', mobile: '', shopAddress: '', licenseNumber: '', password: '',
  });

  const handleFarmerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', {
        name: farmerData.name,
        phone: farmerData.mobile,
        password: farmerData.password,
        role: 'farmer',
      });
      await login({ phone: farmerData.mobile, password: farmerData.password });
      toast.success('Account created successfully!');
      navigate('/farmer/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const handleShopOwnerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await API.post('/auth/register', {
        name: shopOwnerData.ownerName,
        phone: shopOwnerData.mobile,
        password: shopOwnerData.password,
        role: 'shopOwner',
        shopName: shopOwnerData.shopName,
        shopAddress: shopOwnerData.shopAddress,
      });
      await login({ phone: shopOwnerData.mobile, password: shopOwnerData.password });
      toast.success('Shop account created successfully!');
      navigate('/shop-owner/dashboard');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const isFarmer = userType === 'farmer';

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
              <Tractor className="h-14 w-14 text-green-700" />
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
          <p className="text-green-100 mt-3 text-base max-w-xs mx-auto">
            Your trusted platform for agricultural products, tools, and supplies — straight from farm to shop.
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
            <div className="flex lg:hidden items-center gap-3">
              <div className="bg-green-700 p-2.5 rounded-xl">
                <Tractor className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-extrabold text-green-800">KrishakMart</h1>
                <p className="text-green-600 text-xs tracking-widest uppercase">Agri Marketplace</p>
              </div>
            </div>
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
                        ${language === lang.code ? 'bg-green-50 text-green-700 font-semibold' : 'text-gray-700 hover:bg-gray-50'}`}
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
            <h2 className="text-2xl font-bold text-gray-800">
              {isFarmer ? '🧑‍🌾 Farmer Sign Up' : '🏪 Shop Owner Sign Up'}
            </h2>
            <p className="text-gray-500 mt-1 text-sm">Create your account to get started</p>
          </div>

          <div className="bg-white rounded-2xl shadow-md p-8 border border-gray-100">
            {isFarmer ? (
              <form onSubmit={handleFarmerSignup} className="space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name *</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="name" type="text" placeholder="Enter your name"
                      value={farmerData.name}
                      onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="mobile" type="tel" placeholder="10-digit mobile number"
                      value={farmerData.mobile}
                      onChange={(e) => setFarmerData({ ...farmerData, mobile: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="village" className="text-sm font-medium text-gray-700">Village / Location *</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="village" type="text" placeholder="Enter your village"
                      value={farmerData.village}
                      onChange={(e) => setFarmerData({ ...farmerData, village: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password"
                      value={farmerData.password}
                      onChange={(e) => setFarmerData({ ...farmerData, password: e.target.value })}
                      className="pl-10 pr-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Farmer Account'}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link>
                </p>
              </form>
            ) : (
              <form onSubmit={handleShopOwnerSignup} className="space-y-5">
                <div>
                  <Label htmlFor="shopName" className="text-sm font-medium text-gray-700">Shop Name *</Label>
                  <div className="relative mt-1.5">
                    <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="shopName" type="text" placeholder="Enter shop name"
                      value={shopOwnerData.shopName}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, shopName: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="ownerName" className="text-sm font-medium text-gray-700">Owner Name *</Label>
                  <div className="relative mt-1.5">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="ownerName" type="text" placeholder="Enter your name"
                      value={shopOwnerData.ownerName}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, ownerName: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number *</Label>
                  <div className="relative mt-1.5">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="mobile" type="tel" placeholder="10-digit mobile number"
                      value={shopOwnerData.mobile}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, mobile: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="shopAddress" className="text-sm font-medium text-gray-700">Shop Address *</Label>
                  <div className="relative mt-1.5">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="shopAddress" type="text" placeholder="Enter shop address"
                      value={shopOwnerData.shopAddress}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, shopAddress: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                  </div>
                </div>

                <div>
                  <Label htmlFor="licenseNumber" className="text-sm font-medium text-gray-700">License Number (Optional)</Label>
                  <div className="relative mt-1.5">
                    <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="licenseNumber" type="text" placeholder="Enter license number"
                      value={shopOwnerData.licenseNumber}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, licenseNumber: e.target.value })}
                      className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">Password *</Label>
                  <div className="relative mt-1.5">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="Create a password"
                      value={shopOwnerData.password}
                      onChange={(e) => setShopOwnerData({ ...shopOwnerData, password: e.target.value })}
                      className="pl-10 pr-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
                    <button type="button" onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl" disabled={loading}>
                  {loading ? 'Creating Account...' : 'Create Shop Account'}
                </Button>

                <p className="text-center text-sm text-gray-500">
                  Already have an account?{' '}
                  <Link to="/login" className="text-green-600 font-semibold hover:underline">Login</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
