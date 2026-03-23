import React, { useState } from 'react';
import { User, Phone, Mail, MapPin, Save, Calendar, ShieldCheck, BadgeCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';
import API from '../../../services/api';
import { translations } from '../../../utils/translations';
import { LocationPicker, LocationData } from '../../components/LocationPicker';

export const FarmerProfile: React.FC = () => {
  const { user, setUser, language } = useApp();
  const t = translations[language];
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    village: (user as any)?.village || '',
    location: (user as any)?.location as LocationData | undefined,
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setSaving(true);
      const { data } = await API.put('/users/profile', {
        name: profile.name,
        email: profile.email,
        village: profile.village,
        location: profile.location,
      });
      setUser({ ...user!, ...data.data });
      localStorage.setItem('user', JSON.stringify({ ...user!, ...data.data }));
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const roleLabel = user?.role === 'shopOwner' ? 'Shop Owner' : user?.role === 'admin' ? 'Admin' : 'Farmer';
  const memberSince = user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' }) : 'N/A';

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">{t.myProfile}</h1>
        <p className="text-gray-500 text-sm">{t.manageAccount}</p>
      </div>

      {/* Info Card */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl font-bold text-green-700">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <div>
            <p className="text-lg font-bold text-gray-800">{user?.name}</p>
            <span className="inline-block text-xs font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded-full mt-1">{roleLabel}</span>
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
              <p className="text-xs text-gray-500">{t.accountStatus}</p>
              <p className="font-medium text-green-700">{t.active}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <p className="text-sm font-semibold text-gray-700 mb-5">{t.editInformation}</p>
        <form onSubmit={handleSave} className="space-y-5">

          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
            <div className="relative mt-1.5">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="name"
                placeholder="Enter your full name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email Address</Label>
            <div className="relative mt-1.5">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email (optional)"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="village" className="text-sm font-medium text-gray-700">Village / Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="village"
                placeholder="Enter your village or area"
                value={profile.village}
                onChange={(e) => setProfile({ ...profile, village: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <LocationPicker
            label="GPS Location (optional)"
            value={profile.location}
            onChange={(loc) => setProfile(p => ({ ...p, location: loc }))}
          />

          <div>
            <Label className="text-sm font-medium text-gray-700">Phone Number</Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                value={user?.phone || ''}
                disabled
                className="pl-10 py-5 bg-gray-50 text-gray-500 cursor-not-allowed"
              />
            </div>
            <p className="text-xs text-gray-400 mt-1">{t.phoneCannotChange}</p>
          </div>

          <Button type="submit" disabled={saving} className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl gap-2">
            <Save className="h-4 w-4" />
            {saving ? t.saving : t.saveChanges}
          </Button>

        </form>
      </div>
    </div>
  );
};
