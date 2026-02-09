import React from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 45000 },
  { month: 'Feb', earnings: 52000 },
  { month: 'Mar', earnings: 48000 },
  { month: 'Apr', earnings: 61000 },
  { month: 'May', earnings: 55000 },
  { month: 'Jun', earnings: 67000 },
];

export const ShopOwnerEarnings: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Earnings</h1>
        <p className="text-gray-600">Track your revenue and sales</p>
      </div>

      {/* Earnings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-green-100 p-4 rounded-xl">
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-green-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Today's Earnings</p>
          <p className="text-3xl font-bold text-gray-800">₹12,450</p>
          <p className="text-sm text-green-600 mt-2">+15% from yesterday</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-800">₹2,45,680</p>
          <p className="text-sm text-blue-600 mt-2">+23% from last month</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-4 rounded-xl">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-800">₹18,45,230</p>
          <p className="text-sm text-purple-600 mt-2">All time</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Earnings</h2>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip
                formatter={(value) => [`₹${value}`, 'Earnings']}
                contentStyle={{ backgroundColor: '#fff', border: '2px solid #16a34a' }}
              />
              <Bar dataKey="earnings" fill="#16a34a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        <div className="space-y-4">
          {[
            { order: 'ORD001', amount: 1700, date: '2026-02-08', status: 'Completed' },
            { order: 'ORD002', amount: 3600, date: '2026-02-07', status: 'Completed' },
            { order: 'ORD003', amount: 950, date: '2026-02-07', status: 'Pending' },
            { order: 'ORD004', amount: 2100, date: '2026-02-06', status: 'Completed' },
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Order #{transaction.order}</h3>
                  <p className="text-sm text-gray-600">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-green-700">₹{transaction.amount}</p>
                <p className={`text-sm ${transaction.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                  {transaction.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
