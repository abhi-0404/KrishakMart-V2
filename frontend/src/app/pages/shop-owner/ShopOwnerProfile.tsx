import React, { useState, useEffect } from 'react';
import { User, Phone, MapPin, Store, FileText, Save, Mail, Edit2, X, Check, Navigation } from 'lucide-react';
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
    shopLocation: {
      latitude: 0,
      longitude: 0,
      address: ''
    }
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
        shopLocation: user.shopLocation || { latitude: 0, longitude: 0, address: '' }
      });
    }
  }, [user]);

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser');
      return;
    }

    toast.info('Getting your location...');
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        
        // Try to get address from coordinates using reverse geocoding
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
          );
          const data = await response.json();
          const address = data.display_name || `${lat.toFixed(6)}, ${lon.toFixed(6)}`;
          
          setProfile({
            ...profile,
            shopLocation: {
              latitude: lat,
              longitude: lon,
              address: address
            }
          });
          toast.success('Location captured successfully!');
        } catch (error) {
          setProfile({
            ...profile,
            shopLocation: {
              latitude: lat,
              longitude: lon,
              address: `${lat.toFixed(6)}, ${lon.toFixed(6)}`
            }
          });
          toast.success('Location captured!');
        }
      },
      (error) => {
        console.error('Error getting location:', error);
        toast.error('Failed to get your location. Please enable location services.');
      }
    );
  };

  const handleManualLocation = () => {
    const lat = prompt('Enter Latitude (e.g., 28.6139):');
    const lon = prompt('Enter Longitude (e.g., 77.2090):');
    
    if (lat && lon) {
      const latitude = parseFloat(lat);
      const longitude = parseFloat(lon);
      
      if (isNaN(latitude) || isNaN(longitude)) {
        toast.error('Invalid coordinates. Please enter valid numbers.');
        return;
      }
      
      if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
        toast.error('Coordinates out of range. Latitude: -90 to 90, Longitude: -180 to 180');
        return;
      }
      
      setProfile({
        ...profile,
        shopLocation: {
          latitude,
          longitude,
          address: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }
      });
      toast.success('Location set successfully!');
    }
  };

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
    if (!profile.shopLocation.latitude || !profile.shopLocation.longitude) {
      toast.error('Shop location is required. Please set your location.');
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
        shopLocation: profile.shopLocation
      };

      console.log('Sending update data:', updateData);

      const updatedUser = await updateProfile(updateData);
      
      console.log('Received updated user:', updatedUser);
      
      // Update user in context
      if (typeof setUser === 'function') {
        setUser(updatedUser);
      }
      
      // Update local storage
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      toast.success('Profile updated successfully!');
      setIsEditing(false);
      
      // Reload to reflect changes
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      const message = error.response?.data?.message || error.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    if (user) {
      setProfile({
        name: user.name || '',
        phone: user.phone || '',
        email: user.email || '',
        shopName: user.shopName || '',
        shopAddress: user.shopAddress || '',
        shopDescription: user.shopDescription || '',
        gstNumber: user.gstNumber || '',
        shopLocation: user.shopLocation || { latitude: 0, longitude: 0, address: '' }
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

          {/* Shop Location - MANDATORY */}
          <div className="bg-green-50 border-2 border-green-300 rounded-lg p-6">
            <Label className="text-base flex items-center gap-2 mb-3">
              <Navigation className="h-5 w-5 text-green-600" />
              Shop Location (GPS Coordinates) *
            </Label>
            <p className="text-sm text-gray-600 mb-4">
              This location is used to calculate delivery distances to farmers. Please ensure accuracy.
            </p>
            
            {isEditing ? (
              <div className="space-y-4">
                <div className="flex gap-3">
                  <Button
                    type="button"
                    onClick={handleGetCurrentLocation}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Use Current Location
                  </Button>
                  <Button
                    type="button"
                    onClick={handleManualLocation}
                    variant="outline"
                    className="border-green-600 text-green-600 hover:bg-green-50"
                  >
                    Enter Manually
                  </Button>
                </div>
                
                {profile.shopLocation.latitude !== 0 && profile.shopLocation.longitude !== 0 && (
                  <div className="bg-white rounded-lg p-4 border-2 border-green-200">
                    <p className="text-sm text-gray-600 mb-2">Current Location:</p>
                    <p className="font-semibold text-gray-800">
                      Latitude: {profile.shopLocation.latitude.toFixed(6)}
                    </p>
                    <p className="font-semibold text-gray-800">
                      Longitude: {profile.shopLocation.longitude.toFixed(6)}
                    </p>
                    {profile.shopLocation.address && (
                      <p className="text-sm text-gray-600 mt-2">{profile.shopLocation.address}</p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-4 border-2 border-gray-200">
                {profile.shopLocation.latitude !== 0 && profile.shopLocation.longitude !== 0 ? (
                  <>
                    <p className="font-semibold text-gray-800">
                      Latitude: {profile.shopLocation.latitude.toFixed(6)}
                    </p>
                    <p className="font-semibold text-gray-800">
                      Longitude: {profile.shopLocation.longitude.toFixed(6)}
                    </p>
                    {profile.shopLocation.address && (
                      <p className="text-sm text-gray-600 mt-2">{profile.shopLocation.address}</p>
                    )}
                    <a
                      href={`https://www.google.com/maps?q=${profile.shopLocation.latitude},${profile.shopLocation.longitude}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 hover:text-green-700 text-sm mt-2 inline-block"
                    >
                      View on Google Maps →
                    </a>
                  </>
                ) : (
                  <p className="text-red-600 font-semibold">⚠️ Location not set - Please update your profile</p>
                )}
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
            <span className="font-semibold text-gray-800">Shop Owner (Seller)</span>
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
