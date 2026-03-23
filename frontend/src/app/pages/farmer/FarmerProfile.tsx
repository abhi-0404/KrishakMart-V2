import React, { useState, useRef } from 'react';
import {
  User, Phone, Mail, MapPin, Save, Calendar,
  BadgeCheck, Camera, Lock, Loader2, Building,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import API from '../../../services/api';
import { LocationPicker, LocationData } from '../../components/LocationPicker';

const BACKEND = (import.meta as any).env?.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

const avatarUrl = (src?: string) => {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  return `${BACKEND}${src}`;
};

export const FarmerProfile: React.FC = () => {
  const { user, setUser } = useApp();
  const fileRef = useRef<HTMLInputElement>(null);

  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    village: (user as any)?.village || '',
    location: (user as any)?.location as LocationData | undefined,
  });

  const roleLabel =
    user?.role === 'shopOwner' ? 'Shop Owner' :
    user?.role === 'admin' ? 'Admin' : 'Farmer';

  const memberSince = user?.createdAt
    ? new Date(user.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
    : 'N/A';

  // ── Avatar upload ──────────────────────────────────────────────────────────
  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Local preview immediately
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload to backend
    setUploadingAvatar(true);
    try {
      const form = new FormData();
      form.append('avatar', file);
      const { data } = await API.post('/users/avatar', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const updated = { ...user!, ...data.data };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      toast.success('Profile photo updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to upload photo');
      setAvatarPreview(null);
    } finally {
      setUploadingAvatar(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  // ── Profile save ───────────────────────────────────────────────────────────
  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const { data } = await API.put('/users/profile', {
        name: profile.name,
        email: profile.email,
        village: profile.village,
        location: profile.location,
      });
      const updated = { ...user!, ...data.data };
      setUser(updated);
      localStorage.setItem('user', JSON.stringify(updated));
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const currentAvatar = avatarPreview || avatarUrl((user as any)?.avatar);
  const initials = user?.name?.charAt(0).toUpperCase() || 'U';

  return (
    <div className="space-y-6 max-w-2xl" style={{ fontFamily: "'Poppins', sans-serif" }}>

      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          My Profile
        </h1>
        <p className="text-gray-500 text-sm">Manage your account information</p>
      </div>

      {/* ── Summary Card ── */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-5">

          {/* Avatar with camera overlay */}
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-md bg-green-100 flex items-center justify-center">
              {currentAvatar ? (
                <img src={currentAvatar} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <span className="text-3xl font-bold text-[#2E7D32]">{initials}</span>
              )}
            </div>
            {/* Camera button */}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              disabled={uploadingAvatar}
              className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-[#2E7D32] border-2 border-white flex items-center justify-center shadow hover:bg-green-800 transition-colors disabled:opacity-60"
              title="Change photo"
            >
              {uploadingAvatar
                ? <Loader2 className="h-3.5 w-3.5 text-white animate-spin" />
                : <Camera className="h-3.5 w-3.5 text-white" />}
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleAvatarChange}
            />
          </div>

          {/* Name + role */}
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-gray-900 truncate">{user?.name}</p>
            <span className="inline-block text-xs font-semibold bg-green-100 text-[#2E7D32] px-2.5 py-0.5 rounded-full mt-1">
              {roleLabel}
            </span>
            {uploadingAvatar && (
              <p className="text-xs text-gray-400 mt-1">Uploading photo...</p>
            )}
          </div>
        </div>

        {/* Summary stats — Role, Member Since, Status only */}
        <div className="grid grid-cols-3 gap-3 mt-5">
          <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
            <p className="text-[10px] text-gray-400 mb-0.5">Role</p>
            <p className="text-xs font-bold text-gray-700">{roleLabel}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <Calendar className="h-3 w-3 text-gray-400" />
              <p className="text-[10px] text-gray-400">Member Since</p>
            </div>
            <p className="text-xs font-bold text-gray-700">{memberSince}</p>
          </div>
          <div className="bg-gray-50 rounded-xl px-3 py-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-0.5">
              <BadgeCheck className="h-3 w-3 text-gray-400" />
              <p className="text-[10px] text-gray-400">Status</p>
            </div>
            <p className="text-xs font-bold text-[#2E7D32]">Active</p>
          </div>
        </div>
      </div>

      {/* ── Edit Form ── */}
      <form onSubmit={handleSave} className="space-y-4">

        {/* Group A: Identity */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Identity</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InputField
              id="name" label="Full Name" placeholder="Your full name"
              value={profile.name} icon={<User className="h-4 w-4" />}
              onChange={v => setProfile(p => ({ ...p, name: v }))}
            />
            <InputField
              id="email" label="Email Address" placeholder="email@example.com (optional)"
              value={profile.email} icon={<Mail className="h-4 w-4" />}
              onChange={v => setProfile(p => ({ ...p, email: v }))}
              type="email"
            />
          </div>

          {/* Locked phone */}
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
              <input
                value={user?.phone || ''}
                disabled
                className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm bg-gray-50 text-gray-400 cursor-not-allowed"
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-300" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Phone is your primary account key and cannot be changed.</p>
          </div>
        </div>

        {/* Group B: Location */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Location</p>
          <div className="space-y-4">
            <InputField
              id="village" label="Village / Market Name" placeholder="Your village or market area"
              value={profile.village} icon={<Building className="h-4 w-4" />}
              onChange={v => setProfile(p => ({ ...p, village: v }))}
            />
            <LocationPicker
              label="Verified Address"
              placeholder="Open map to pin your exact location"
              value={profile.location}
              onChange={loc => setProfile(p => ({ ...p, location: loc }))}
            />
            {profile.location && (
              <div className="grid grid-cols-3 gap-2 text-xs">
                {profile.location.city && (
                  <div className="bg-green-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-[10px]">City</p>
                    <p className="font-semibold text-gray-700 truncate">{profile.location.city}</p>
                  </div>
                )}
                {profile.location.state && (
                  <div className="bg-green-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-[10px]">State</p>
                    <p className="font-semibold text-gray-700 truncate">{profile.location.state}</p>
                  </div>
                )}
                {profile.location.pincode && (
                  <div className="bg-green-50 rounded-lg px-3 py-2">
                    <p className="text-gray-400 text-[10px]">PIN</p>
                    <p className="font-semibold text-gray-700">{profile.location.pincode}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Save button */}
        <button
          type="submit"
          disabled={saving}
          className="w-full flex items-center justify-center gap-2 bg-[#2E7D32] hover:bg-green-800 disabled:opacity-50 text-white font-bold py-3.5 rounded-xl transition-all active:scale-95"
        >
          {saving
            ? <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
            : <><Save className="h-4 w-4" /> Save Changes</>}
        </button>
      </form>
    </div>
  );
};

// ── Reusable input field ───────────────────────────────────────────────────────
const InputField: React.FC<{
  id: string;
  label: string;
  placeholder: string;
  value: string;
  icon: React.ReactNode;
  onChange: (v: string) => void;
  type?: string;
}> = ({ id, label, placeholder, value, icon, onChange, type = 'text' }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">{icon}</span>
      <input
        id={id} type={type} value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#2E7D32] focus:ring-1 focus:ring-green-200 transition-colors bg-white"
      />
    </div>
  </div>
);
