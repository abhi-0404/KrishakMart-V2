import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DollarSign, TrendingUp, ShoppingBag, Landmark, ArrowUpRight } from 'lucide-react';

const earningsData = [
  { month: 'Sep', platformCommission: 45000, adminStoreSales: 120000 },
  { month: 'Oct', platformCommission: 52000, adminStoreSales: 135000 },
  { month: 'Nov', platformCommission: 48000, adminStoreSales: 155000 },
  { month: 'Dec', platformCommission: 65000, adminStoreSales: 190000 },
  { month: 'Jan', platformCommission: 72000, adminStoreSales: 210000 },
  { month: 'Feb', platformCommission: 85000, adminStoreSales: 245000 },
];

export const AdminOwnEarnings: React.FC = () => {
  const totalCommission = earningsData.reduce((acc, curr) => acc + curr.platformCommission, 0);
  const totalAdminSales = earningsData.reduce((acc, curr) => acc + curr.adminStoreSales, 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Platform & Store Earnings</h1>
        <p className="text-gray-600">Overview of platform commissions and direct admin store sales</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-green-100 rounded-xl">
              <Landmark className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Platform Commission</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{totalCommission.toLocaleString()}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-green-600 text-sm font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+12.5% from last month</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Admin Store Revenue</p>
              <h3 className="text-2xl font-bold text-gray-800">₹{totalAdminSales.toLocaleString()}</h3>
            </div>
          </div>
          <div className="flex items-center gap-1 text-blue-600 text-sm font-bold">
            <ArrowUpRight className="h-4 w-4" />
            <span>+18.2% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80 font-medium">Combined Admin Net</p>
              <h3 className="text-3xl font-bold">₹{(totalCommission + totalAdminSales).toLocaleString()}</h3>
            </div>
          </div>
          <p className="text-white/70 text-sm">Total available for withdrawal or reinvestment</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Breakdown Trends</h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={earningsData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="month" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value/1000}k`} />
              <Tooltip 
                cursor={{ fill: '#f8fafc' }}
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                formatter={(value: number) => `₹${value.toLocaleString()}`}
              />
              <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
              <Bar 
                name="Direct Store Sales" 
                dataKey="adminStoreSales" 
                fill="#15803d" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
              <Bar 
                name="Commission Earnings" 
                dataKey="platformCommission" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]} 
                barSize={40}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Store Transactions */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Admin Store Sales</h3>
          <button className="text-sm text-green-600 font-bold hover:underline">View All Transactions</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { id: 'TX-9021', date: '2024-02-09', product: 'AgriHub Soil Tester', amount: 1499, status: 'Completed' },
            { id: 'TX-9020', date: '2024-02-09', product: 'Super-Growth Fertilizer', amount: 599, status: 'Completed' },
            { id: 'TX-9019', date: '2024-02-08', product: 'Super-Growth Fertilizer (x2)', amount: 1198, status: 'Processing' },
          ].map((tx) => (
            <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-bold text-gray-800">{tx.product}</p>
                <p className="text-xs text-gray-500">{tx.date} • ID: {tx.id}</p>
              </div>
              <div className="text-right">
                <p className="font-bold text-green-700">₹{tx.amount}</p>
                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${
                  tx.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
