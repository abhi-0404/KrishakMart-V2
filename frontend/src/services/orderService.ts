import API from './api';

export interface OrderProduct {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  _id: string;
  farmerId: {
    _id: string;
    name: string;
    phone?: string;
  };
  sellerId?: {
    _id: string;
    name: string;
    shopName?: string;
  };
  products: OrderProduct[];
  totalAmount: number;
  paymentMethod: 'COD' | 'UPI' | 'QR';
  paymentStatus: 'Pending' | 'Paid' | 'Failed';
  orderStatus: 'Pending' | 'Accepted' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Rejected';
  deliveryAddress: {
    fullAddress: string;
    village?: string;
    district?: string;
    state?: string;
    pincode?: string;
    phone?: string;
  };
  statusHistory: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  cancelReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateOrderData {
  products: Array<{
    productId: string;
    quantity: number;
  }>;
  deliveryAddress: {
    fullAddress: string;
    village?: string;
    district?: string;
    state?: string;
    pincode?: string;
    phone?: string;
  };
  paymentMethod: 'COD' | 'UPI' | 'QR';
}

// Create new order (farmer)
export const createOrder = async (orderData: CreateOrderData) => {
  try {
    const { data } = await API.post('/orders', orderData);
    return data.data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// Get all orders for logged-in user (farmer or seller)
export const getMyOrders = async () => {
  try {
    const { data } = await API.get('/orders/my-orders');
    return data.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// Get single order by ID
export const getOrder = async (id: string) => {
  try {
    const { data } = await API.get(`/orders/${id}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// Update order status (seller)
export const updateOrderStatus = async (
  id: string,
  status: 'Pending' | 'Accepted' | 'Packed' | 'Shipped' | 'Delivered' | 'Cancelled' | 'Rejected',
  note?: string
) => {
  try {
    const { data } = await API.put(`/orders/${id}/status`, { status, note });
    return data.data;
  } catch (error) {
    console.error('Error updating order status:', error);
    throw error;
  }
};

// Cancel order (farmer - only if not shipped)
export const cancelOrder = async (id: string, reason: string) => {
  try {
    const { data } = await API.put(`/orders/${id}/cancel`, { reason });
    return data.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

// Reorder (farmer)
export const reorder = async (id: string) => {
  try {
    const { data } = await API.post(`/orders/${id}/reorder`);
    return data.data;
  } catch (error) {
    console.error('Error reordering:', error);
    throw error;
  }
};

// Get seller orders (shop owner)
export const getSellerOrders = async () => {
  try {
    const { data } = await API.get('/orders/seller/orders');
    return data.data;
  } catch (error) {
    console.error('Error fetching seller orders:', error);
    throw error;
  }
};

// Get all orders (admin)
export const getAllOrders = async () => {
  try {
    const { data } = await API.get('/orders');
    return data.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};
