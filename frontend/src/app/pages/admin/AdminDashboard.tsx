import React from 'react';
import { Users, Store, Package, ShoppingBag, TrendingUp, DollarSign } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Platform overview and management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-4 rounded-xl">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Farmers</p>
          <p className="text-3xl font-bold text-gray-800">1,247</p>
          <p className="text-sm text-green-600 mt-2">+12% this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <Store className="h-8 w-8 text-blue-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Shop Owners</p>
          <p className="text-3xl font-bold text-gray-800">156</p>
          <p className="text-sm text-blue-600 mt-2">+8% this month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-4 rounded-xl">
              <Package className="h-8 w-8 text-purple-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-800">2,845</p>
          <p className="text-sm text-purple-600 mt-2">+156 new today</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-orange-100 p-4 rounded-xl">
              <ShoppingBag className="h-8 w-8 text-orange-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-orange-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-800">8,456</p>
          <p className="text-sm text-orange-600 mt-2">245 pending</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-4 rounded-xl">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Platform Revenue</p>
          <p className="text-3xl font-bold text-gray-800">₹45,23,450</p>
          <p className="text-sm text-green-600 mt-2">This month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-red-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-red-100 p-4 rounded-xl">
              <TrendingUp className="h-8 w-8 text-red-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-red-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Growth Rate</p>
          <p className="text-3xl font-bold text-gray-800">+28%</p>
          <p className="text-sm text-red-600 mt-2">vs last month</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Platform Activity</h2>
        <div className="space-y-4">
          {[
            { icon: Users, action: 'New farmer registered', detail: 'Ramesh Kumar from Meerut', time: '2 minutes ago', color: 'green' },
            { icon: Store, action: 'New shop registered', detail: 'Agro Supplies Hub', time: '15 minutes ago', color: 'blue' },
            { icon: Package, action: 'New product listed', detail: 'Wheat Seeds Premium Quality', time: '1 hour ago', color: 'purple' },
            { icon: ShoppingBag, action: 'Order completed', detail: 'Order #ORD2345', time: '2 hours ago', color: 'orange' },
          ].map((activity, index) => {
            const Icon = activity.icon;
            const bgColor = `bg-${activity.color}-100`;
            const textColor = `text-${activity.color}-600`;
            
            return (
              <div key={index} className="flex items-center gap-4 p-4 border-2 border-gray-200 rounded-lg">
                <div className={`${bgColor} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${textColor}`} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">{activity.action}</h3>
                  <p className="text-sm text-gray-600">{activity.detail}</p>
                </div>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
