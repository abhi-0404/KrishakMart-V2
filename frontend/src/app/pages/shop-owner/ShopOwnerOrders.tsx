import React, { useState, useEffect } from 'react';
import { getSellerOrders, updateOrderStatus, Order } from '../../../services/orderService';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { toast } from 'sonner';

export const ShopOwnerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getSellerOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (orderId: string, newStatus: 'Pending' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled') => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success(`Order status updated to ${newStatus}`);
      fetchOrders(); // Refresh orders
    } catch (error) {
      console.error('Error updating order status:', error);
      toast.error('Failed to update order status');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Packed':
        return 'bg-blue-500';
      case 'Shipped':
        return 'bg-orange-500';
      case 'Delivered':
        return 'bg-green-600';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Orders Received</h1>
        <p className="text-gray-600">Manage customer orders ({orders.length} total)</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-green-200">
          <p className="text-xl text-gray-600">No orders received yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Order #{order._id.slice(-8)}</h3>
                  <p className="text-sm text-gray-600">
                    Customer: {order.farmerId.name} • {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Badge className={`${getStatusColor(order.orderStatus)} px-4 py-2 text-sm mt-3 md:mt-0`}>
                  {order.orderStatus}
                </Badge>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6">
                {order.products.map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.productName}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{item.productName}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                      <p className="text-sm font-semibold text-green-700">₹{item.price * item.quantity}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Details & Actions */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-4 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivery Address</p>
                  <p className="font-medium text-gray-800">{order.deliveryAddress}</p>
                  <p className="text-sm font-bold text-green-700 mt-2">Total: ₹{order.totalAmount}</p>
                </div>

                <div className="flex gap-3 items-center">
                  <Select
                    defaultValue={order.orderStatus}
                    onValueChange={(value: any) => handleStatusUpdate(order._id, value)}
                  >
                    <SelectTrigger className="w-[160px] border-2 border-green-300">
                      <SelectValue placeholder="Update Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Packed">Packed</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
