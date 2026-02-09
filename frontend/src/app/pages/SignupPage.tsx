import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { User, Phone, MapPin, Lock, Store, FileText, Tractor } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { toast } from 'sonner';
import API from '../../services/api';

export const SignupPage: React.FC = () => {
  const { userType } = useParams<{ userType: 'farmer' | 'shop-owner' }>();
  const { login } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [farmerData, setFarmerData] = useState({
    name: '',
    mobile: '',
    village: '',
    password: '',
  });

  const [shopOwnerData, setShopOwnerData] = useState({
    shopName: '',
    ownerName: '',
    mobile: '',
    shopAddress: '',
    licenseNumber: '',
    password: '',
  });

  const handleFarmerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await API.post('/auth/register', {
        name: farmerData.name,
        phone: farmerData.mobile,
        password: farmerData.password,
        role: 'farmer'
      });
      
      // Auto login after signup
      await login({
        phone: farmerData.mobile,
        password: farmerData.password
      });
      
      toast.success('Account created successfully!');
      navigate('/farmer/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleShopOwnerSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data } = await API.post('/auth/register', {
        name: shopOwnerData.ownerName,
        phone: shopOwnerData.mobile,
        password: shopOwnerData.password,
        role: 'shopOwner',
        shopName: shopOwnerData.shopName,
        shopAddress: shopOwnerData.shopAddress
      });
      
      // Auto login after signup
      await login({
        phone: shopOwnerData.mobile,
        password: shopOwnerData.password
      });
      
      toast.success('Shop account created successfully!');
      navigate('/shop-owner/dashboard');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Signup failed';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-600 to-green-800 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="bg-white p-4 rounded-2xl inline-block mb-4">
            <Tractor className="h-12 w-12 text-green-700" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            {userType === 'farmer' ? '🧑‍🌾 Farmer Signup' : '🏪 Shop Owner Signup'}
          </h1>
          <p className="text-green-100">Create your account to get started</p>
        </div>

        {/* Signup Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {userType === 'farmer' ? (
            <form onSubmit={handleFarmerSignup} className="space-y-5">
              <div>
                <Label htmlFor="name" className="text-base">Full Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="name"
                    type="text"
                    placeholder="Enter your name"
                    value={farmerData.name}
                    onChange={(e) => setFarmerData({ ...farmerData, name: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile" className="text-base">Mobile Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={farmerData.mobile}
                    onChange={(e) => setFarmerData({ ...farmerData, mobile: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="village" className="text-base">Village / Location *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="village"
                    type="text"
                    placeholder="Enter your village"
                    value={farmerData.village}
                    onChange={(e) => setFarmerData({ ...farmerData, village: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-base">Password *</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={farmerData.password}
                    onChange={(e) => setFarmerData({ ...farmerData, password: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#2f7c4f] hover:bg-[#236240] text-lg py-6 font-semibold" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Farmer Account'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </form>
          ) : (
            <form onSubmit={handleShopOwnerSignup} className="space-y-5">
              <div>
                <Label htmlFor="shopName" className="text-base">Shop Name *</Label>
                <div className="relative mt-2">
                  <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="shopName"
                    type="text"
                    placeholder="Enter shop name"
                    value={shopOwnerData.shopName}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, shopName: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="ownerName" className="text-base">Owner Name *</Label>
                <div className="relative mt-2">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="ownerName"
                    type="text"
                    placeholder="Enter your name"
                    value={shopOwnerData.ownerName}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, ownerName: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="mobile" className="text-base">Mobile Number *</Label>
                <div className="relative mt-2">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="mobile"
                    type="tel"
                    placeholder="Enter 10-digit mobile number"
                    value={shopOwnerData.mobile}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, mobile: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="shopAddress" className="text-base">Shop Address *</Label>
                <div className="relative mt-2">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="shopAddress"
                    type="text"
                    placeholder="Enter shop address"
                    value={shopOwnerData.shopAddress}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, shopAddress: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="licenseNumber" className="text-base">License Number (Optional)</Label>
                <div className="relative mt-2">
                  <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="licenseNumber"
                    type="text"
                    placeholder="Enter license number"
                    value={shopOwnerData.licenseNumber}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, licenseNumber: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="text-base">Password *</Label>
                <div className="relative mt-2">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={shopOwnerData.password}
                    onChange={(e) => setShopOwnerData({ ...shopOwnerData, password: e.target.value })}
                    className="pl-12 py-6 text-base border-2"
                    required
                  />
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-[#2f7c4f] hover:bg-[#236240] text-lg py-6 font-semibold" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Shop Account'}
              </Button>

              <div className="text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-green-600 font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
