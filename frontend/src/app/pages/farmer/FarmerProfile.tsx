import React, { useState } from 'react';
import { User, Phone, MapPin, Save } from 'lucide-react';
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
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Profile</h1>
        <p className="text-gray-600">Manage your account information</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <Label htmlFor="name" className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Full Name
            </Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
          </div>

          <div>
            <Label htmlFor="mobile" className="text-base flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Mobile Number
            </Label>
            <Input
              id="mobile"
              type="tel"
              value={profile.mobile}
              onChange={(e) => setProfile({ ...profile, mobile: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
          </div>

          <div>
            <Label htmlFor="location" className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Village / Location
            </Label>
            <Input
              id="location"
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="district" className="text-base">District</Label>
              <Input
                id="district"
                value={profile.district}
                onChange={(e) => setProfile({ ...profile, district: e.target.value })}
                className="mt-2 text-base py-6 border-2"
              />
            </div>
            <div>
              <Label htmlFor="state" className="text-base">State</Label>
              <Input
                id="state"
                value={profile.state}
                onChange={(e) => setProfile({ ...profile, state: e.target.value })}
                className="mt-2 text-base py-6 border-2"
              />
            </div>
          </div>

          <Button type="submit" size="lg" className="w-full bg-green-600 hover:bg-green-700 gap-2">
            <Save className="h-5 w-5" />
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};
