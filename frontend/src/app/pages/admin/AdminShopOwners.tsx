import React, { useState } from 'react';
import { Search, Store, Mail, Phone, MapPin, CheckCircle, XCircle, Info, MoreVertical, Ban } from 'lucide-react';
import { toast } from 'sonner';

interface ShopOwner {
  id: string;
  shopName: string;
  ownerName: string;
  email: string;
  phone: string;
  location: string;
  status: 'pending' | 'approved' | 'suspended';
  totalProducts: number;
  totalEarnings: number;
}

const mockShopOwners: ShopOwner[] = [
  { id: '1', shopName: 'Green Valley Seeds', ownerName: 'Rajesh Sharma', email: 'rajesh@greenvalley.com', phone: '+91 91234 56789', location: 'Indore, MP', status: 'approved', totalProducts: 45, totalEarnings: 125000 },
  { id: '2', shopName: 'Kisan Mitra Fertilizers', ownerName: 'Deepak Patel', email: 'deepak@kisanmitra.com', phone: '+91 82345 67890', location: 'Nagpur, MH', status: 'approved', totalProducts: 28, totalEarnings: 84000 },
  { id: '3', shopName: 'Agro Tech Tools', ownerName: 'Sanjay Gupta', email: 'sanjay@agrotech.com', phone: '+91 73456 78901', location: 'Jaipur, RJ', status: 'pending', totalProducts: 12, totalEarnings: 0 },
  { id: '4', shopName: 'Modern Farm Supplies', ownerName: 'Anita Devi', email: 'anita@modernfarm.com', phone: '+91 64567 89012', location: 'Patna, BR', status: 'approved', totalProducts: 67, totalEarnings: 210000 },
  { id: '5', shopName: 'Soil Care Bio', ownerName: 'Mohit Reddy', email: 'mohit@soilcare.com', phone: '+91 55678 90123', location: 'Hyderabad, TS', status: 'suspended', totalProducts: 15, totalEarnings: 32000 },
];

export const AdminShopOwners: React.FC = () => {
  const [shopOwners, setShopOwners] = useState<ShopOwner[]>(mockShopOwners);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOwners = shopOwners.filter(s => 
    s.shopName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    s.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const updateStatus = (id: string, newStatus: 'approved' | 'suspended') => {
    setShopOwners(prev => prev.map(s => {
      if (s.id === id) {
        toast.success(`Shop "${s.shopName}" is now ${newStatus}`);
        return { ...s, status: newStatus };
      }
      return s;
    }));
  };

  const approveShop = (id: string) => updateStatus(id, 'approved');
  const suspendShop = (id: string) => updateStatus(id, 'suspended');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Shop Owners</h1>
          <p className="text-gray-600">Review shop applications and manage existing sellers</p>
        </div>
        <div className="flex gap-4">
          <div className="bg-white px-4 py-2 rounded-lg border-2 border-blue-200 shadow-sm flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">Pending:</span>
            <span className="text-lg font-bold text-blue-700">{shopOwners.filter(s => s.status === 'pending').length}</span>
          </div>
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
                <th className="px-6 py-4 font-bold text-green-800">Products</th>
                <th className="px-6 py-4 font-bold text-green-800">Total Sales</th>
                <th className="px-6 py-4 font-bold text-green-800">Status</th>
                <th className="px-6 py-4 font-bold text-green-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {filteredOwners.map((owner) => (
                <tr key={owner.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700">
                        <Store className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{owner.shopName}</p>
                        <p className="text-sm text-gray-600">Owner: {owner.ownerName}</p>
                        <div className="flex gap-4 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-500"><Mail className="h-3 w-3" /> {owner.email}</span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {owner.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-800">{owner.totalProducts} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-700">₹{owner.totalEarnings.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      owner.status === 'approved' ? 'bg-green-100 text-green-700' : 
                      owner.status === 'pending' ? 'bg-blue-100 text-blue-700' : 
                      'bg-red-100 text-red-700'
                    }`}>
                      {owner.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      {owner.status === 'pending' && (
                        <button
                          onClick={() => approveShop(owner.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Approve Shop"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      {owner.status === 'approved' && (
                        <button
                          onClick={() => suspendShop(owner.id)}
                          className="p-2 text-orange-600 hover:bg-orange-100 rounded-lg transition-colors"
                          title="Suspend Shop"
                        >
                          <Ban className="h-5 w-5" />
                        </button>
                      )}
                      {owner.status === 'suspended' && (
                        <button
                          onClick={() => approveShop(owner.id)}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                          title="Re-activate Shop"
                        >
                          <CheckCircle className="h-5 w-5" />
                        </button>
                      )}
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View Details">
                        <Info className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
