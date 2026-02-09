import React, { useState } from 'react';
import { User, Phone, MapPin, Store, FileText, Save } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { toast } from 'sonner';

export const ShopOwnerProfile: React.FC = () => {
  const { user } = useApp();
  const [profile, setProfile] = useState({
    shopName: user?.shopName || '',
    ownerName: user?.name || '',
    mobile: user?.mobile || '',
    shopAddress: '',
    licenseNumber: '',
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Profile</h1>
        <p className="text-gray-600">Manage your shop information</p>
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 max-w-2xl">
        <form onSubmit={handleSave} className="space-y-6">
          <div>
            <Label htmlFor="shopName" className="text-base flex items-center gap-2">
              <Store className="h-4 w-4" />
              Shop Name
            </Label>
            <Input
              id="shopName"
              value={profile.shopName}
              onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
          </div>

          <div>
            <Label htmlFor="ownerName" className="text-base flex items-center gap-2">
              <User className="h-4 w-4" />
              Owner Name
            </Label>
            <Input
              id="ownerName"
              value={profile.ownerName}
              onChange={(e) => setProfile({ ...profile, ownerName: e.target.value })}
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
            <Label htmlFor="shopAddress" className="text-base flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Shop Address
            </Label>
            <Input
              id="shopAddress"
              value={profile.shopAddress}
              onChange={(e) => setProfile({ ...profile, shopAddress: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
          </div>

          <div>
            <Label htmlFor="licenseNumber" className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              License Number
            </Label>
            <Input
              id="licenseNumber"
              value={profile.licenseNumber}
              onChange={(e) => setProfile({ ...profile, licenseNumber: e.target.value })}
              className="mt-2 text-base py-6 border-2"
            />
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
