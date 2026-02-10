import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Store, FileText, Save, Mail, Edit2, X, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { toast } from 'sonner';
import { updateProfile } from '../../../services/userService';

export const ShopOwnerProfile: React.FC = () => {
  const { user, setUser } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    phone: '',
    email: '',
    shopName: '',
    shopAddress: '',
    shopDescription: '',
    gstNumber: '',
  });

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        shopName: user.shopName || '',
        shopAddress: user.shopAddress || '',
        shopDescription: user.shopDescription || '',
        gstNumber: user.gstNumber || '',
      });
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!profile.name.trim()) {
      toast.error('Name is required');
      return;
    }
    if (!profile.shopName.trim()) {
      toast.error('Shop name is required');
      return;
    }

    try {
      setLoading(true);
      
      const updateData = {
        name: profile.name.trim(),
        email: profile.email.trim() || undefined,
        shopName: profile.shopName.trim(),
        shopAddress: profile.shopAddress.trim() || undefined,
        shopDescription: profile.shopDescription.trim() || undefined,
        gstNumber: profile.gstNumber.trim() || undefined,
      };

      console.log('Sending update data:', updateData);

      const updatedUser = await updateProfile(updateData);
      
      console.log('Received updated user:', updatedUser);
      
      // Update user in context - check if setUser exists
      if (typeof setUser === 'function') {
        setUser(updatedUser);
      } else {
        console.error('setUser is not a function, updating localStorage only');
      }
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully! Please refresh the page to see changes.');
      setIsEditing(false);
      
      // Reload the page after a short delay to show the updated data
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      console.error('Error response:', error.response);
      const message = error.response?.data?.message || error.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    // Reset to original values
    if (user) {
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        shopName: user.shopName || '',
        shopAddress: user.shopAddress || '',
        shopDescription: user.shopDescription || '',
        gstNumber: user.gstNumber || '',
      });
    }
    setIsEditing(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Shop Profile</h1>
          <p className="text-gray-600">Manage your shop information</p>
        </div>
        {!isEditing && (
          <Button
            onClick={() => setIsEditing(true)}
            className="bg-green-600 hover:bg-green-700 gap-2"
          >
            <Edit2 className="h-4 w-4" />
            Edit Profile
          </Button>
        )}
      </div>

      <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 max-w-3xl">
        <form onSubmit={handleSave} className="space-y-6">
          {/* Shop Name */}
          <div>
            <Label htmlFor="shopName" className="text-base flex items-center gap-2 mb-2">
              <Store className="h-4 w-4" />
              Shop Name *
            </Label>
            {isEditing ? (
              <Input
                id="shopName"
                value={profile.shopName}
                onChange={(e) => setProfile({ ...profile, shopName: e.target.value })}
                className="text-base py-6 border-2"
                placeholder="Enter your shop name"
                required
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                {profile.shopName || 'Not provided'}
              </div>
            )}
          </div>

          {/* Owner Name */}
          <div>
            <Label htmlFor="name" className="text-base flex items-center gap-2 mb-2">
              <User className="h-4 w-4" />
              Owner Name *
            </Label>
            {isEditing ? (
              <Input
                id="name"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="text-base py-6 border-2"
                placeholder="Enter your name"
                required
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                {profile.name || 'Not provided'}
              </div>
            )}
          </div>

          {/* Phone Number */}
          <div>
            <Label htmlFor="phone" className="text-base flex items-center gap-2 mb-2">
              <Phone className="h-4 w-4" />
              Mobile Number
            </Label>
            <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-100 rounded-lg">
              {profile.phone || 'Not provided'}
              <span className="text-sm text-gray-500 ml-2">(Cannot be changed)</span>
            </div>
          </div>

          {/* Email */}
          <div>
            <Label htmlFor="email" className="text-base flex items-center gap-2 mb-2">
              <Mail className="h-4 w-4" />
              Email Address
            </Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="text-base py-6 border-2"
                placeholder="Enter your email (optional)"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                {profile.email || 'Not provided'}
              </div>
            )}
          </div>

          {/* Shop Address */}
          <div>
            <Label htmlFor="shopAddress" className="text-base flex items-center gap-2 mb-2">
              <MapPin className="h-4 w-4" />
              Shop Address
            </Label>
            {isEditing ? (
              <Textarea
                id="shopAddress"
                value={profile.shopAddress}
                onChange={(e) => setProfile({ ...profile, shopAddress: e.target.value })}
                className="text-base border-2 min-h-[100px]"
                placeholder="Enter your complete shop address"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg min-h-[100px]">
                {profile.shopAddress || 'Not provided'}
              </div>
            )}
          </div>

          {/* Shop Description */}
          <div>
            <Label htmlFor="shopDescription" className="text-base flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              Shop Description
            </Label>
            {isEditing ? (
              <Textarea
                id="shopDescription"
                value={profile.shopDescription}
                onChange={(e) => setProfile({ ...profile, shopDescription: e.target.value })}
                className="text-base border-2 min-h-[120px]"
                placeholder="Describe your shop, products, and services"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg min-h-[120px]">
                {profile.shopDescription || 'Not provided'}
              </div>
            )}
          </div>

          {/* GST Number */}
          <div>
            <Label htmlFor="gstNumber" className="text-base flex items-center gap-2 mb-2">
              <FileText className="h-4 w-4" />
              GST Number
            </Label>
            {isEditing ? (
              <Input
                id="gstNumber"
                value={profile.gstNumber}
                onChange={(e) => setProfile({ ...profile, gstNumber: e.target.value })}
                className="text-base py-6 border-2"
                placeholder="Enter your GST number (optional)"
              />
            ) : (
              <div className="text-lg font-semibold text-gray-800 py-3 px-4 bg-gray-50 rounded-lg">
                {profile.gstNumber || 'Not provided'}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          {isEditing && (
            <div className="flex gap-4 pt-4">
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="flex-1 py-6 text-lg"
                onClick={handleCancel}
                disabled={loading}
              >
                <X className="h-5 w-5 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="flex-1 bg-green-600 hover:bg-green-700 py-6 text-lg"
                disabled={loading}
              >
                <Check className="h-5 w-5 mr-2" />
                {loading ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          )}
        </form>
      </div>

      {/* Account Information */}
      <div className="bg-white rounded-xl p-8 shadow-md border-2 border-gray-200 max-w-3xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Information</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-600">Account Type</span>
            <span className="font-semibold text-gray-800">Shop Owner</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-600">Account Status</span>
            <span className="font-semibold text-green-600">Active</span>
          </div>
          <div className="flex justify-between items-center py-3 border-b">
            <span className="text-gray-600">Member Since</span>
            <span className="font-semibold text-gray-800">
              {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) : 'N/A'}
            </span>
          </div>
          <div className="flex justify-between items-center py-3">
            <span className="text-gray-600">Verification Status</span>
            <span className={`font-semibold ${user?.isVerified ? 'text-green-600' : 'text-orange-600'}`}>
              {user?.isVerified ? 'Verified' : 'Pending Verification'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
