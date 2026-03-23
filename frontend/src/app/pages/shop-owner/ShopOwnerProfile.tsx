import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Store, FileText, Save, Mail, Calendar, BadgeCheck, Hash } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import { translations } from '../../../utils/translations';
import { LocationPicker, LocationData } from '../../components/LocationPicker';
import { updateProfile } from '../../../services/userService';

export const ShopOwnerProfile: React.FC = () => {
  const { user, setUser, language } = useApp();
  const t = translations[language];
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    shopName: '',
    shopAddress: '',
    shopDescription: '',
    gstNumber: '',
    shopLocation: { latitude: 0, longitude: 0, address: '' },
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        email: user.email || '',
        shopName: user.shopName || '',
        shopAddress: user.shopAddress || '',
        shopDescription: user.shopDescription || '',
        gstNumber: user.gstNumber || '',
        shopLocation: user.shopLocation || { latitude: 0, longitude: 0, address: '' },
      });
    }
  }, [user]);


  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.name.trim()) { toast.error('Name is required'); return; }
    if (!profile.shopName.trim()) { toast.error('Shop name is required'); return; }
    try {
      setLoading(true);
      const updatedUser = await updateProfile({
        name: profile.name.trim(),
        email: profile.email.trim() || undefined,
        shopName: profile.shopName.trim(),
        shopAddress: profile.shopAddress.trim() || undefined,
        shopDescription: profile.shopDescription.trim() || undefined,
        gstNumber: profile.gstNumber.trim() || undefined,
        shopLocation: profile.shopLocation.latitude ? profile.shopLocation : undefined,
      });
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      toast.success('Profile updated successfully!');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : 'N/A';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t.shopProfile}</h1>
        <p className="text-gray-500 text-sm">{t.manageShop}</p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
            {user?.shopName?.charAt(0).toUpperCase() || user?.name?.charAt(0).toUpperCase() || 'S'}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{user?.shopName || user?.name}</p>
            <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">Shop Owner</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Phone className="h-4 w-4 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">{t.phone}</p>
              <p className="font-medium text-gray-800">{user?.phone || t.notSet}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Mail className="h-4 w-4 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">{t.email}</p>
              <p className="font-medium text-gray-800">{user?.email || t.notSet}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <Calendar className="h-4 w-4 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">{t.memberSince}</p>
              <p className="font-medium text-gray-800">{memberSince}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
            <BadgeCheck className="h-4 w-4 text-green-600 shrink-0" />
            <div>
              <p className="text-xs text-gray-500">Status</p>
              <p className={`font-medium ${user?.isVerified ? 'text-green-700' : 'text-orange-600'}`}>
                {user?.isVerified ? t.verified : t.pendingVerification}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <p className="text-sm font-semibold text-gray-700 mb-5">{t.editInformation}</p>
        <form onSubmit={handleSave} className="space-y-5">

          <div>
            <Label htmlFor="shopName" className="text-sm font-medium text-gray-700">Shop Name *</Label>
            <div className="relative mt-1.5">
              <Store className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="shopName" placeholder="Enter your shop name" value={profile.shopName}
                onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
            </div>
          </div>

          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Owner Name *</Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="name" placeholder="Enter your full name" value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="email" type="email" placeholder="Enter your email (optional)" value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input value={user?.phone || ''} disabled
                className="pl-10 py-5 bg-gray-50 text-gray-500 cursor-not-allowed" />
            </div>
            <p className="text-xs text-gray-400 mt-1">{t.phoneCannotChange}</p>
          </div>

          <div>
            <Label htmlFor="shopAddress" className="text-sm font-medium text-gray-700">Shop Address</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea id="shopAddress" placeholder="Enter your complete shop address" value={profile.shopAddress}
                onChange={(e) => setProfile({ ...profile, shopAddress: e.target.value })}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[90px]" />
            </div>
          </div>

          <div>
            <Label htmlFor="shopDescription" className="text-sm font-medium text-gray-700">Shop Description</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea id="shopDescription" placeholder="Describe your shop and products" value={profile.shopDescription}
                onChange={(e) => setProfile({ ...profile, shopDescription: e.target.value })}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[90px]" />
            </div>
          </div>

          <div>
            <Label htmlFor="gstNumber" className="text-sm font-medium text-gray-700">GST Number</Label>
            <div className="relative mt-1.5">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="gstNumber" placeholder="Enter GST number (optional)" value={profile.gstNumber}
                onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" />
            </div>
          </div>

          {/* Location */}
          <LocationPicker
            label="Shop Location (GPS)"
            value={profile.shopLocation.latitude ? profile.shopLocation as LocationData : undefined}
            onChange={(loc) => setProfile(p => ({ ...p, shopLocation: loc }))}
          />

          <Button type="submit" disabled={loading}
            className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl gap-2">
            <Save className="h-4 w-4" />
            {loading ? t.saving : t.saveChanges}
          </Button>

        </form>
      </div>
    </div>
  );
};
