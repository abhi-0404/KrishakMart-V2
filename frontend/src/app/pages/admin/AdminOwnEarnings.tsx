import React, { useEffect, useState } from 'react';
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
import { DollarSign, TrendingUp, ShoppingBag, Landmark, ArrowUpRight, Loader2 } from 'lucide-react';
import { getSellerEarnings } from '../../../services/adminService';
import { getSellerProducts } from '../../../services/productService';
import { getSellerOrders } from '../../../services/orderService';
import { toast } from 'sonner';

interface MonthlyData {
  month: string;
  platformCommission: number;
  adminStoreSales: number;
}

export const AdminOwnEarnings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [earningsData, setEarningsData] = useState<MonthlyData[]>([]);
  const [totalCommission, setTotalCommission] = useState(0);
  const [totalAdminSales, setTotalAdminSales] = useState(0);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      
      // Fetch admin's earnings as a seller
      const earnings = await getSellerEarnings();
      
      // Fetch admin's orders
      const orders = await getSellerOrders();
      
      // Transform monthly earnings data
      const monthlyData: MonthlyData[] = earnings.monthlyEarnings.map((item: any) => {
        const date = new Date(item._id.year, item._id.month - 1);
        const monthName = date.toLocaleDateString('en-US', { month: 'short' });
        
        return {
          month: monthName,
          platformCommission: 0, // Admin doesn't pay commission on own products
          adminStoreSales: item.earnings
        };
      });

      setEarningsData(monthlyData);
      setTotalCommission(0); // Admin doesn't pay commission
      setTotalAdminSales(earnings.totalEarnings);
      
      // Get recent completed orders
      const completedOrders = orders
        .filter((order: any) => order.orderStatus === 'Delivered')
        .slice(0, 3)
        .map((order: any) => ({
          id: order._id,
          date: new Date(order.createdAt).toLocaleDateString(),
          product: order.products.map((p: any) => p.productName).join(', '),
          amount: order.totalAmount,
          status: 'Completed'
        }));
      
      setRecentOrders(completedOrders);
      
    } catch (error) {
      console.error('Error fetching earnings:', error);
      toast.error('Failed to load earnings data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading earnings data...</p>
        </div>
      </div>
    );
  }

  const totalEarnings = totalCommission + totalAdminSales;
  const growthPercentage = earningsData.length >= 2 
    ? ((earningsData[earningsData.length - 1].adminStoreSales - earningsData[earningsData.length - 2].adminStoreSales) / earningsData[earningsData.length - 2].adminStoreSales * 100).toFixed(1)
    : '0.0';

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
          <div className="flex items-center gap-1 text-gray-500 text-sm">
            <span>Admin products don't pay commission</span>
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
            <span>{growthPercentage > '0' ? '+' : ''}{growthPercentage}% from last month</span>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-600 to-green-800 p-6 rounded-xl shadow-lg text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/20 rounded-xl">
              <DollarSign className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-white/80 font-medium">Combined Admin Net</p>
              <h3 className="text-3xl font-bold">₹{totalEarnings.toLocaleString()}</h3>
            </div>
          </div>
          <p className="text-white/70 text-sm">Total available for withdrawal or reinvestment</p>
        </div>
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100">
        <h3 className="text-xl font-bold text-gray-800 mb-6">Revenue Breakdown Trends</h3>
        {earningsData.length > 0 ? (
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `₹${value >= 1000 ? (value/1000) + 'k' : value}`} />
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
        ) : (
          <div className="h-96 flex items-center justify-center text-gray-500">
            <div className="text-center">
              <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <p className="text-lg">No earnings data available yet</p>
              <p className="text-sm mt-2">Start selling products to see your earnings</p>
            </div>
          </div>
        )}
      </div>

      {/* Recent Store Transactions */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center">
          <h3 className="font-bold text-gray-800">Recent Admin Store Sales</h3>
          <button 
            onClick={() => window.location.href = '/admin/orders'}
            className="text-sm text-green-600 font-bold hover:underline"
          >
            View All Transactions
          </button>
        </div>
        {recentOrders.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {recentOrders.map((tx) => (
              <div key={tx.id} className="px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div>
                  <p className="font-bold text-gray-800">{tx.product}</p>
                  <p className="text-xs text-gray-500">{tx.date} • ID: {tx.id.slice(-8).toUpperCase()}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-700">₹{tx.amount.toLocaleString()}</p>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    {tx.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center text-gray-500">
            <ShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p>No recent transactions</p>
            <p className="text-sm mt-1">Completed orders will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
};
