import React, { useEffect, useState } from 'react';
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
import { Download, Filter, TrendingUp, DollarSign, ShoppingBag, Users, Store } from 'lucide-react';
import { getDashboardStats, DashboardStats } from '../../../services/adminService';
import { toast } from 'sonner';

const COLORS = ['#166534', '#15803d', '#14532d', '#22c55e', '#86efac', '#4ade80'];

export const AdminReports: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
    } catch (error) {
      toast.error('Failed to load reports');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading reports...</p>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  // Transform monthly sales data for charts
  const salesData = stats.monthlySales.map(item => ({
    month: new Date(item._id.year, item._id.month - 1).toLocaleDateString('en-US', { month: 'short' }),
    sales: item.totalSales,
    orders: item.orderCount
  }));

  // Transform category data for pie chart
  const categoryData = stats.productsByCategory.map(item => ({
    name: item._id.charAt(0).toUpperCase() + item._id.slice(1),
    value: item.count,
    totalValue: item.totalValue
  }));

  // Calculate average order value
  const avgOrderValue = stats.overview.totalOrders > 0 
    ? Math.round(stats.overview.totalRevenue / stats.overview.totalOrders)
    : 0;

  // Calculate order status percentages
  const totalOrders = stats.ordersByStatus.reduce((sum, item) => sum + item.count, 0);
  const deliveredOrders = stats.ordersByStatus.find(item => item._id === 'Delivered')?.count || 0;
  const fulfillmentRate = totalOrders > 0 ? Math.round((deliveredOrders / totalOrders) * 100) : 0;

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Sales & Analytics Reports</h1>
          <p className="text-gray-600">Deep dive into platform performance and growth metrics</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <button 
            onClick={fetchStats}
            className="flex items-center justify-center gap-2 bg-white px-4 py-2 rounded-lg border-2 border-green-200 text-green-700 font-bold hover:bg-green-50 transition-colors w-full sm:w-auto"
          >
            <Filter className="h-5 w-5" /> Refresh
          </button>
          <button 
            onClick={() => toast.info('Export feature coming soon')}
            className="flex items-center justify-center gap-2 bg-green-600 px-4 py-2 rounded-lg text-white font-bold hover:bg-green-700 shadow-md transition-colors w-full sm:w-auto"
          >
            <Download className="h-5 w-5" /> Export PDF
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
          <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Avg. Order Value</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-800">₹{avgOrderValue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
          <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Revenue</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-800">₹{stats.overview.totalRevenue.toLocaleString()}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
          <div className="bg-purple-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Store className="h-6 w-6 text-purple-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Active Sellers</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-800">{stats.overview.totalSellers}</h3>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-gray-100">
          <div className="bg-orange-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Users className="h-6 w-6 text-orange-600" />
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Farmers</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-2xl font-bold text-gray-800">{stats.overview.totalFarmers}</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Growth (Last 6 Months)</h3>
          {salesData.length > 0 ? (
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
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No sales data available
            </div>
          )}
        </div>

        {/* Order Volume */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Order Volume</h3>
          {salesData.length > 0 ? (
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
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No order data available
            </div>
          )}
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Products by Category</h3>
          {categoryData.length > 0 ? (
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
                      label={(entry) => `${entry.name}: ${entry.value}`}
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number, name: string, props: any) => [
                        `${value} products (₹${props.payload.totalValue.toLocaleString()})`,
                        props.payload.name
                      ]}
                    />
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
                    <span className="text-sm font-bold text-gray-800">{entry.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-80 flex items-center justify-center text-gray-500">
              No category data available
            </div>
          )}
        </div>

        {/* Platform Health */}
        <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
          <h3 className="text-xl font-bold text-gray-800 mb-6">Platform Health Indicators</h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Order Fulfillment Rate</span>
                <span className="text-sm font-bold text-green-700">{fulfillmentRate}%</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-green-600 h-3 rounded-full" style={{ width: `${fulfillmentRate}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Products</span>
                <span className="text-sm font-bold text-blue-700">{stats.overview.totalProducts}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-blue-600 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-600">Total Orders</span>
                <span className="text-sm font-bold text-purple-700">{stats.overview.totalOrders}</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-3">
                <div className="bg-purple-600 h-3 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>

            {/* Order Status Breakdown */}
            <div className="pt-4 border-t-2 border-gray-100">
              <h4 className="text-sm font-bold text-gray-700 mb-3">Order Status Breakdown</h4>
              <div className="space-y-2">
                {stats.ordersByStatus.map((status) => (
                  <div key={status._id} className="flex justify-between text-sm">
                    <span className="text-gray-600">{status._id}</span>
                    <span className="font-bold text-gray-800">{status.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
