import React, { useState } from 'react';
import { Search, ShoppingBag, User, Calendar, Truck, CheckCircle, Clock, XCircle, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

interface AdminOrder {
  id: string;
  customerName: string;
  shopName: string;
  date: string;
  amount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
}

const mockOrders: AdminOrder[] = [
  { id: 'ORD-2345', customerName: 'Ramesh Kumar', shopName: 'Green Valley Seeds', date: '2024-02-08', amount: 1250, status: 'delivered', items: 3 },
  { id: 'ORD-2346', customerName: 'Suresh Singh', shopName: 'Kisan Mitra Fertilizers', date: '2024-02-09', amount: 3400, status: 'processing', items: 5 },
  { id: 'ORD-2347', customerName: 'Amit Patel', shopName: 'Modern Farm Supplies', date: '2024-02-09', amount: 850, status: 'pending', items: 1 },
  { id: 'ORD-2348', customerName: 'Vijay Patil', shopName: 'Agro Tech Tools', date: '2024-02-07', amount: 5600, status: 'shipped', items: 2 },
  { id: 'ORD-2349', customerName: 'Ramesh Kumar', shopName: 'Soil Care Bio', date: '2024-02-06', amount: 120, status: 'cancelled', items: 1 },
];

export const AdminOrders: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    o.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-700';
      case 'shipped': return 'bg-blue-100 text-blue-700';
      case 'processing': return 'bg-yellow-100 text-yellow-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'shipped': return <Truck className="h-4 w-4" />;
      case 'processing': return <Clock className="h-4 w-4" />;
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Orders</h1>
          <p className="text-gray-600">Track and monitor all transactions across the platform</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border-2 border-orange-200 shadow-sm flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Active Orders:</span>
          <span className="text-lg font-bold text-orange-700">{orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled').length}</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-green-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by Order ID, Customer or Shop..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-gray-700">
          <option>All Status</option>
          <option>Pending</option>
          <option>Processing</option>
          <option>Shipped</option>
          <option>Delivered</option>
          <option>Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-50 border-b-2 border-green-100">
              <tr>
                <th className="px-6 py-4 font-bold text-green-800">Order ID</th>
                <th className="px-6 py-4 font-bold text-green-800">Farmer</th>
                <th className="px-6 py-4 font-bold text-green-800">Shop</th>
                <th className="px-6 py-4 font-bold text-green-800">Date</th>
                <th className="px-6 py-4 font-bold text-green-800">Amount</th>
                <th className="px-6 py-4 font-bold text-green-800">Status</th>
                <th className="px-6 py-4 font-bold text-green-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">{order.id}</span>
                    <p className="text-xs text-gray-500">{order.items} items</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="font-medium text-gray-700">{order.customerName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-gray-700">{order.shopName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      {order.date}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-green-700">₹{order.amount.toLocaleString()}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase w-fit ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <MoreVertical className="h-5 w-5" />
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
