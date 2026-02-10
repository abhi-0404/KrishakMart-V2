import React, { useState } from 'react';
import { Search, Mail, Phone, MapPin, Calendar, MoreVertical, Trash2, Ban, CheckCircle, Users } from 'lucide-react';
import { toast } from 'sonner';

interface Farmer {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  status: 'active' | 'suspended';
  totalOrders: number;
}

const mockFarmers: Farmer[] = [
  { id: '1', name: 'Ramesh Kumar', email: 'ramesh@example.com', phone: '+91 98765 43210', location: 'Meerut, UP', joinedDate: '2023-10-12', status: 'active', totalOrders: 12 },
  { id: '2', name: 'Suresh Singh', email: 'suresh@example.com', phone: '+91 87654 32109', location: 'Bhatinda, Punjab', joinedDate: '2023-11-05', status: 'active', totalOrders: 8 },
  { id: '3', name: 'Mahendra Singh', email: 'mahi@example.com', phone: '+91 76543 21098', location: 'Ranchi, Jharkhand', joinedDate: '2023-11-20', status: 'suspended', totalOrders: 3 },
  { id: '4', name: 'Amit Patel', email: 'amit@example.com', phone: '+91 65432 10987', location: 'Anand, Gujarat', joinedDate: '2023-12-01', status: 'active', totalOrders: 15 },
  { id: '5', name: 'Vijay Patil', email: 'vijay@example.com', phone: '+91 54321 09876', location: 'Satara, Maharashtra', joinedDate: '2023-12-15', status: 'active', totalOrders: 6 },
];

export const AdminFarmers: React.FC = () => {
  const [farmers, setFarmers] = useState<Farmer[]>(mockFarmers);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFarmers = farmers.filter(f => 
    f.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.phone.includes(searchTerm)
  );

  const toggleStatus = (id: string) => {
    setFarmers(prev => prev.map(f => {
      if (f.id === id) {
        const newStatus = f.status === 'active' ? 'suspended' : 'active';
        toast.success(`Farmer ${f.name} has been ${newStatus === 'active' ? 'activated' : 'suspended'}`);
        return { ...f, status: newStatus };
      }
      return f;
    }));
  };

  const deleteFarmer = (id: string) => {
    const farmer = farmers.find(f => f.id === id);
    if (confirm(`Are you sure you want to delete farmer ${farmer?.name}?`)) {
      setFarmers(prev => prev.filter(f => f.id !== id));
      toast.error(`Farmer ${farmer?.name} has been removed`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Farmers</h1>
          <p className="text-gray-600">View and manage registered farmers on the platform</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border-2 border-green-200 shadow-sm flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Total Farmers:</span>
          <span className="text-lg font-bold text-green-700">{farmers.length}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-green-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, email or phone..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Farmers Table */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-50 border-b-2 border-green-100">
              <tr>
                <th className="px-6 py-4 font-bold text-green-800">Farmer Info</th>
                <th className="px-6 py-4 font-bold text-green-800">Location</th>
                <th className="px-6 py-4 font-bold text-green-800">Joined Date</th>
                <th className="px-6 py-4 font-bold text-green-800">Orders</th>
                <th className="px-6 py-4 font-bold text-green-800">Status</th>
                <th className="px-6 py-4 font-bold text-green-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {filteredFarmers.map((farmer) => (
                <tr key={farmer.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 font-bold">
                        {farmer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{farmer.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Mail className="h-3 w-3" /> {farmer.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Phone className="h-3 w-3" /> {farmer.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      {farmer.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {farmer.joinedDate}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-bold">
                      {farmer.totalOrders} Orders
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      farmer.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {farmer.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => toggleStatus(farmer.id)}
                        className={`p-2 rounded-lg transition-colors ${
                          farmer.status === 'active' ? 'text-orange-600 hover:bg-orange-100' : 'text-green-600 hover:bg-green-100'
                        }`}
                        title={farmer.status === 'active' ? 'Suspend Farmer' : 'Activate Farmer'}
                      >
                        {farmer.status === 'active' ? <Ban className="h-5 w-5" /> : <CheckCircle className="h-5 w-5" />}
                      </button>
                      <button
                        onClick={() => deleteFarmer(farmer.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Farmer"
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
        {filteredFarmers.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No farmers found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};
