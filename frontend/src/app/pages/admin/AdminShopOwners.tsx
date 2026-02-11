import React, { useState, useEffect } from 'react';
import { Search, Store, Mail, MapPin, CheckCircle, Ban, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { getAllUsers, toggleBlockUser } from '../../../services/adminService';
import API from '../../../services/api';

interface ShopOwner {
  _id: string;
  name: string;
  shopName?: string;
  email?: string;
  phone: string;
  shopAddress?: string;
  isBlocked: boolean;
  createdAt: string;
}

export const AdminShopOwners: React.FC = () => {
  const [shopOwners, setShopOwners] = useState<ShopOwner[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShopOwners();
  }, []);

  const fetchShopOwners = async () => {
    try {
      setLoading(true);
      const data = await getAllUsers('shopOwner');
      setShopOwners(data);
    } catch (error) {
      toast.error('Failed to load shop owners');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOwners = shopOwners.filter(s => 
    (s.shopName && s.shopName.toLowerCase().includes(searchTerm.toLowerCase())) || 
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.email && s.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const toggleStatus = async (id: string) => {
    try {
      await toggleBlockUser(id);
      const shop = shopOwners.find(s => s._id === id);
      toast.success(`Shop "${shop?.shopName}" status updated`);
      fetchShopOwners();
    } catch (error) {
      toast.error('Failed to update shop status');
      console.error(error);
    }
  };

  const deleteShopOwner = async (id: string) => {
    const shop = shopOwners.find(s => s._id === id);
    
    if (!confirm(`Are you sure you want to delete "${shop?.shopName || shop?.name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await API.delete(`/admin/users/${id}`);
      toast.success('Shop owner deleted successfully');
      fetchShopOwners();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete shop owner');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading shop owners...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Shop Owners</h1>
          <p className="text-gray-600">Review shop applications and manage existing sellers</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg border-2 border-green-200 shadow-sm flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Total Shops:</span>
            <span className="text-lg font-bold text-green-700">{shopOwners.length}</span>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-green-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by shop name, owner or email..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-50 border-b-2 border-green-100">
              <tr>
                <th className="px-6 py-4 font-bold text-green-800">Shop Details</th>
                <th className="px-6 py-4 font-bold text-green-800">Location</th>
                <th className="px-6 py-4 font-bold text-green-800">Joined Date</th>
                <th className="px-6 py-4 font-bold text-green-800">Status</th>
                <th className="px-6 py-4 font-bold text-green-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {filteredOwners.map((owner) => (
                <tr key={owner._id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700">
                        <Store className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{owner.shopName || 'Unnamed Shop'}</p>
                        <p className="text-sm text-gray-600">Owner: {owner.name}</p>
                        <div className="flex gap-4 mt-1">
                          {owner.email && (
                            <span className="flex items-center gap-1 text-xs text-gray-500">
                              <Mail className="h-3 w-3" /> {owner.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {owner.shopAddress || 'Not provided'}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {new Date(owner.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      !owner.isBlocked ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {!owner.isBlocked ? 'active' : 'suspended'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(owner._id)}
                        className={`p-2 rounded-lg transition-colors ${
                          !owner.isBlocked 
                            ? 'text-orange-600 hover:bg-orange-100' 
                            : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={!owner.isBlocked ? 'Suspend Shop' : 'Activate Shop'}
                      >
                        {!owner.isBlocked ? <Ban className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      <button 
                        onClick={() => deleteShopOwner(owner._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors" 
                        title="Delete Shop Owner"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredOwners.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Store className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No shop owners found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
