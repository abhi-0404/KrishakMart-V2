import React, { useState, useEffect } from 'react';
import { DollarSign, TrendingUp, Calendar } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { getSellerOrders } from '../../../services/orderService';
import { toast } from 'sonner';

interface EarningsData {
  month: string;
  earnings: number;
}

interface Transaction {
  orderId: string;
  amount: number;
  date: string;
  status: string;
}

export const ShopOwnerEarnings: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [todayEarnings, setTodayEarnings] = useState(0);
  const [monthEarnings, setMonthEarnings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);
  const [monthlyData, setMonthlyData] = useState<EarningsData[]>([]);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);
  const [yesterdayEarnings, setYesterdayEarnings] = useState(0);
  const [lastMonthEarnings, setLastMonthEarnings] = useState(0);

  useEffect(() => {
    fetchEarningsData();
  }, []);

  const fetchEarningsData = async () => {
    try {
      setLoading(true);
      const orders = await getSellerOrders();
      
      // Filter only completed/delivered orders for earnings
      const completedOrders = orders.filter((order: any) => 
        order.status === 'delivered' || order.status === 'completed'
      );

      // Calculate today's earnings
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayOrders = completedOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === today.getTime();
      });
      const todayTotal = todayOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      setTodayEarnings(todayTotal);

      // Calculate yesterday's earnings for comparison
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayOrders = completedOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        orderDate.setHours(0, 0, 0, 0);
        return orderDate.getTime() === yesterday.getTime();
      });
      const yesterdayTotal = yesterdayOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      setYesterdayEarnings(yesterdayTotal);

      // Calculate this month's earnings
      const currentMonth = today.getMonth();
      const currentYear = today.getFullYear();
      const monthOrders = completedOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === currentMonth && orderDate.getFullYear() === currentYear;
      });
      const monthTotal = monthOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      setMonthEarnings(monthTotal);

      // Calculate last month's earnings for comparison
      const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
      const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
      const lastMonthOrders = completedOrders.filter((order: any) => {
        const orderDate = new Date(order.createdAt);
        return orderDate.getMonth() === lastMonth && orderDate.getFullYear() === lastMonthYear;
      });
      const lastMonthTotal = lastMonthOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      setLastMonthEarnings(lastMonthTotal);

      // Calculate total earnings
      const total = completedOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      setTotalEarnings(total);

      // Calculate monthly earnings for chart (last 6 months)
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const monthlyEarnings: EarningsData[] = [];
      
      for (let i = 5; i >= 0; i--) {
        const date = new Date(currentYear, currentMonth - i, 1);
        const month = date.getMonth();
        const year = date.getFullYear();
        
        const monthOrders = completedOrders.filter((order: any) => {
          const orderDate = new Date(order.createdAt);
          return orderDate.getMonth() === month && orderDate.getFullYear() === year;
        });
        
        const earnings = monthOrders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
        
        monthlyEarnings.push({
          month: monthNames[month],
          earnings: earnings
        });
      }
      setMonthlyData(monthlyEarnings);

      // Get recent transactions (last 10 completed orders)
      const recent = completedOrders
        .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 10)
        .map((order: any) => ({
          orderId: order._id,
          amount: order.totalAmount,
          date: new Date(order.createdAt).toLocaleDateString('en-IN'),
          status: order.status === 'delivered' ? 'Completed' : order.status
        }));
      setRecentTransactions(recent);

    } catch (error) {
      console.error('Error fetching earnings data:', error);
      toast.error('Failed to load earnings data');
    } finally {
      setLoading(false);
    }
  };

  const calculatePercentageChange = (current: number, previous: number) => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const todayChange = calculatePercentageChange(todayEarnings, yesterdayEarnings);
  const monthChange = calculatePercentageChange(monthEarnings, lastMonthEarnings);

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading earnings data...</p>
      </div>
    );
  }

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
            <TrendingUp className={`h-5 w-5 ${todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`} />
          </div>
          <p className="text-gray-600 text-sm mb-1">Today's Earnings</p>
          <p className="text-3xl font-bold text-gray-800">₹{todayEarnings.toLocaleString('en-IN')}</p>
          <p className={`text-sm mt-2 ${todayChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {todayChange >= 0 ? '+' : ''}{todayChange}% from yesterday
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-blue-100 p-4 rounded-xl">
              <Calendar className="h-8 w-8 text-blue-600" />
            </div>
            <TrendingUp className={`h-5 w-5 ${monthChange >= 0 ? 'text-blue-600' : 'text-red-600'}`} />
          </div>
          <p className="text-gray-600 text-sm mb-1">This Month</p>
          <p className="text-3xl font-bold text-gray-800">₹{monthEarnings.toLocaleString('en-IN')}</p>
          <p className={`text-sm mt-2 ${monthChange >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
            {monthChange >= 0 ? '+' : ''}{monthChange}% from last month
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="bg-purple-100 p-4 rounded-xl">
              <DollarSign className="h-8 w-8 text-purple-600" />
            </div>
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
          <p className="text-3xl font-bold text-gray-800">₹{totalEarnings.toLocaleString('en-IN')}</p>
          <p className="text-sm text-purple-600 mt-2">All time</p>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Monthly Earnings</h2>
        {monthlyData.length > 0 ? (
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => [`₹${Number(value).toLocaleString('en-IN')}`, 'Earnings']}
                  contentStyle={{ backgroundColor: '#fff', border: '2px solid #16a34a' }}
                />
                <Bar dataKey="earnings" fill="#16a34a" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No earnings data available yet
          </div>
        )}
      </div>

      {/* Recent Transactions */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Recent Transactions</h2>
        {recentTransactions.length > 0 ? (
          <div className="space-y-4">
            {recentTransactions.map((transaction, index) => (
              <div key={index} className="flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Order #{transaction.orderId.slice(-6)}</h3>
                    <p className="text-sm text-gray-600">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-green-700">₹{transaction.amount.toLocaleString('en-IN')}</p>
                  <p className={`text-sm ${transaction.status === 'Completed' ? 'text-green-600' : 'text-orange-600'}`}>
                    {transaction.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">
            No transactions yet
          </div>
        )}
      </div>
    </div>
  );
};
