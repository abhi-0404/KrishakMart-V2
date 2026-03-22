import React, { useState } from 'react';
import { User, Phone, MapPin, Save, Building2, Map } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export const FarmerProfile: React.FC = () => {
  const { user } = useApp();
  const [profile, setProfile] = useState({
    name: user?.name || '',
    mobile: user?.mobile || '',
    location: user?.location || '',
    district: '',
    state: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">My Profile</h1>
        <p className="text-gray-500 text-sm">Manage your account information</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 max-w-2xl">
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
            <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">Mobile Number</Label>
            <div className="relative mt-1.5">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={profile.mobile}
                onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="location" className="text-sm font-medium text-gray-700">Village / Location</Label>
            <div className="relative mt-1.5">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="location"
                placeholder="Enter your village or location"
                value={profile.location}
                onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="district" className="text-sm font-medium text-gray-700">District</Label>
              <div className="relative mt-1.5">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="district"
                  placeholder="District"
                  value={profile.district}
                  onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                  className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="state" className="text-sm font-medium text-gray-700">State</Label>
              <div className="relative mt-1.5">
                <Map className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="state"
                  placeholder="State"
                  value={profile.state}
                  onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                  className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500"
                />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl gap-2">
            <Save className="h-4 w-4" />
            Save Changes
          </Button>

        </form>
      </div>
    </div>
  );
};
