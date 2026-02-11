import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, Tractor, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner';
import { translations } from '../../utils/translations';

export const LoginPage: React.FC = () => {
  const { login, language, setLanguage } = useApp();
  const navigate = useNavigate();
  const [farmerCredentials, setFarmerCredentials] = useState({ mobile: '', password: '' });
  const [shopOwnerCredentials, setShopOwnerCredentials] = useState({ mobile: '', password: '' });
  const [loading, setLoading] = useState(false);
  
  const t = translations[language];

  const handleFarmerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({
        phone: farmerCredentials.mobile,
        password: farmerCredentials.password
      });
      navigate('/farmer/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShopOwnerLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({
        phone: shopOwnerCredentials.mobile,
        password: shopOwnerCredentials.password
      });
      navigate('/shop-owner/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async () => {
    setLoading(true);
    try {
      console.log('Attempting admin login...');
      await login({
        phone: '9999999999',
        password: 'admin123'
      });
      console.log('Login successful, navigating to admin dashboard...');
      navigate('/admin/dashboard');
    } catch (error: any) {
      console.error('Admin login failed:', error);
      console.error('Error response:', error.response?.data);
      toast.error(error.response?.data?.message || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2f7c4f] to-[#236240] flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Language Selector */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-full p-1 shadow-lg flex gap-2">
            <button
              onClick={() => setLanguage('en')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                language === 'en'
                  ? 'bg-[#2f7c4f] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">English</span>
            </button>
            <button
              onClick={() => setLanguage('hi')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                language === 'hi'
                  ? 'bg-[#2f7c4f] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Globe className="h-4 w-4" />
              <span className="font-medium">हिंदी</span>
            </button>
          </div>
        </div>

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-block mb-4">
            <img 
              src="/krishakmart-logo.png" 
              alt="KrishakMart Logo" 
              className="h-24 w-24 md:h-32 md:w-32 mx-auto"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">KrishakMart</h1>
          <p className="text-[#f5ede3] text-lg italic">Mitti Se Digital Tak</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <Tabs defaultValue="farmer" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="farmer" className="text-base py-3">
                🧑‍🌾 {t.farmer}
              </TabsTrigger>
              <TabsTrigger value="shopOwner" className="text-base py-3">
                🏪 {t.shopOwner}
              </TabsTrigger>
            </TabsList>

            {/* Farmer Login */}
            <TabsContent value="farmer">
              <form onSubmit={handleFarmerLogin} className="space-y-5">
                <div>
                  <Label htmlFor="farmer-mobile" className="text-base">{t.mobileNumber}</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="farmer-mobile"
                      type="tel"
                      placeholder={t.enterMobile}
                      value={farmerCredentials.mobile}
                      onChange={(e) => setFarmerCredentials({ ...farmerCredentials, mobile: e.target.value })}
                      className="pl-12 py-6 text-base border-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="farmer-password" className="text-base">{t.password}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="farmer-password"
                      type="password"
                      placeholder={t.enterPassword}
                      value={farmerCredentials.password}
                      onChange={(e) => setFarmerCredentials({ ...farmerCredentials, password: e.target.value })}
                      className="pl-12 py-6 text-base border-2"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#2f7c4f] hover:bg-[#236240] text-lg py-6 font-semibold" disabled={loading}>
                  {loading ? t.loggingIn : t.loginAsFarmer}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  {t.dontHaveAccount}{' '}
                  <Link to="/signup/farmer" className="text-[#2f7c4f] font-semibold hover:underline">
                    {t.signUp}
                  </Link>
                </div>
              </form>
            </TabsContent>

            {/* Shop Owner Login */}
            <TabsContent value="shopOwner">
              <form onSubmit={handleShopOwnerLogin} className="space-y-5">
                <div>
                  <Label htmlFor="shop-mobile" className="text-base">{t.mobileNumber}</Label>
                  <div className="relative mt-2">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="shop-mobile"
                      type="tel"
                      placeholder={t.enterMobile}
                      value={shopOwnerCredentials.mobile}
                      onChange={(e) => setShopOwnerCredentials({ ...shopOwnerCredentials, mobile: e.target.value })}
                      className="pl-12 py-6 text-base border-2"
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="shop-password" className="text-base">{t.password}</Label>
                  <div className="relative mt-2">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="shop-password"
                      type="password"
                      placeholder={t.enterPassword}
                      value={shopOwnerCredentials.password}
                      onChange={(e) => setShopOwnerCredentials({ ...shopOwnerCredentials, password: e.target.value })}
                      className="pl-12 py-6 text-base border-2"
                      required
                    />
                  </div>
                </div>
                <Button type="submit" size="lg" className="w-full bg-[#2f7c4f] hover:bg-[#236240] text-lg py-6 font-semibold" disabled={loading}>
                  {loading ? t.loggingIn : t.loginAsShopOwner}
                </Button>
                <div className="text-center text-sm text-gray-600">
                  {t.dontHaveAccount}{' '}
                  <Link to="/signup/shop-owner" className="text-[#2f7c4f] font-semibold hover:underline">
                    {t.signUp}
                  </Link>
                </div>
              </form>
            </TabsContent>
          </Tabs>

          {/* Admin Demo Button */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <Button
              onClick={handleAdminLogin}
              variant="outline"
              className="w-full border-2 border-gray-300 hover:bg-gray-50 text-base py-6"
            >
              🔐 {t.demoAdminLogin}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
