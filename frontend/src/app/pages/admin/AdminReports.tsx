import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { Download, Filter, TrendingUp, TrendingDown, DollarSign, ShoppingBag, Users, Store } from 'lucide-react';

const salesData = [
  { month: 'Jan', sales: 450000, orders: 120 },
  { month: 'Feb', sales: 520000, orders: 145 },
  { month: 'Mar', sales: 610000, orders: 180 },
  { month: 'Apr', sales: 580000, orders: 165 },
  { month: 'May', sales: 720000, orders: 210 },
  { month: 'Jun', sales: 850000, orders: 250 },
  { month: 'Jul', sales: 980000, orders: 300 },
];

const categoryData = [
  { name: 'Seeds', value: 35 },
  { name: 'Fertilizers', value: 40 },
  { name: 'Tools', value: 15 },
  { name: 'Equipment', value: 10 },
];

const COLORS = ['#166534', '#15803d', '#14532d', '#22c55e'];

export const AdminReports: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales & Analytics Reports</h1>
          <p className="text-gray-600">Deep dive into platform performance and growth metrics</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 transition-colors">
            <Filter className="h-5 w-5" /> Filter
          </button>
          <button className="flex items-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-700 shadow-md transition-colors">
            <Download className="h-5 w-5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Order Value', value: '₹3,450', trend: '+12%', icon: DollarSign, color: 'green' },
          { label: 'Conversion Rate', value: '4.8%', trend: '+0.5%', icon: TrendingUp, color: 'blue' },
          { label: 'Active Sellers', value: '142', trend: '+8', icon: Store, color: 'purple' },
          { label: 'New Farmers', value: '256', trend: '+45', icon: Users, color: 'orange' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
            <div className={`bg-${stat.color}-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
              <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h3 className="text-2xl font-bold text-gray-800">{stat.value}</h3>
              <span className="text-xs font-bold text-green-600">{stat.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Growth (Monthly)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`₹${value.toLocaleString()}`, 'Revenue']}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="sales" 
                  stroke="#16a34a" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#16a34a' }} 
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Order Volume */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Volume</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="orders" fill="#15803d" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Sales by Category</h3>
          <div className="h-80 flex flex-col md:flex-row items-center">
            <div className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-4 w-full md:w-64">
              {categoryData.map((entry, index) => (
                <div key={entry.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                    <span className="text-sm font-medium text-gray-700">{entry.name}</span>
                  </div>
                  <span className="text-sm font-bold text-gray-800">{entry.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Platform Health */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Platform Health Indicators</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Order Fulfillment Rate</span>
                <span className="text-sm font-bold text-green-700">94%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: '94%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Customer Retention</span>
                <span className="text-sm font-bold text-blue-700">68%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '68%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Seller Satisfaction</span>
                <span className="text-sm font-bold text-purple-700">82%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: '82%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
