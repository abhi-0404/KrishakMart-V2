import React, { useState, useEffect } from 'react';
import { Package, Truck, CheckCircle } from 'lucide-react';
import { getMyOrders, Order } from '../../../services/orderService';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

export const FarmerOrders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Packed':
        return <Package className="h-5 w-5" />;
      case 'Shipped':
        return <Truck className="h-5 w-5" />;
      case 'Delivered':
        return <CheckCircle className="h-5 w-5" />;
      default:
        return <Package className="h-5 w-5" />;
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
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
        <p className="text-gray-600">Track and manage your orders ({orders.length} total)</p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-green-200">
          <p className="text-xl text-gray-600">No orders placed yet</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
              {/* Order Header */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Order #{order._id.slice(-8)}</h3>
                  <p className="text-sm text-gray-600">Placed on {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <Badge className={`${getStatusColor(order.orderStatus)} flex items-center gap-2 px-4 py-2 text-sm`}>
                  {getStatusIcon(order.orderStatus)}
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

              {/* Order Footer */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-200 gap-4">
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Delivery Address</p>
                  <p className="font-medium text-gray-800">
                    {typeof order.deliveryAddress === 'string' 
                      ? order.deliveryAddress 
                      : order.deliveryAddress?.fullAddress || 'N/A'}
                  </p>
                  {order.deliveryAddress?.phone && (
                    <p className="text-sm text-gray-600 mt-1">Phone: {order.deliveryAddress.phone}</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Payment Method</p>
                  <p className="font-medium text-gray-800 mb-2">{order.paymentMethod}</p>
                  <p className="text-sm text-gray-600">Total Amount</p>
                  <p className="text-2xl font-bold text-green-700">₹{order.totalAmount}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
