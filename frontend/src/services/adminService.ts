import API from './api';

export interface DashboardStats {
  overview: {
    totalFarmers: number;
    totalSellers: number;
    totalProducts: number;
    totalOrders: number;
    totalRevenue: number;
  };
  ordersByStatus: Array<{
    _id: string;
    count: number;
  }>;
  productsByCategory: Array<{
    _id: string;
    count: number;
    totalValue: number;
  }>;
  monthlySales: Array<{
    _id: {
      year: number;
      month: number;
    };
    totalSales: number;
    orderCount: number;
  }>;
}

export interface SellerEarnings {
  totalEarnings: number;
  totalOrders: number;
  monthlyEarnings: Array<{
    _id: {
      year: number;
      month: number;
    };
    earnings: number;
    orders: number;
  }>;
}

// Get all users (admin)
export const getAllUsers = async (role?: string) => {
  try {
    const params = role ? `?role=${role}` : '';
    const { data } = await API.get(`/admin/users${params}`);
    return data.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

// Block/Unblock user (admin)
export const toggleBlockUser = async (userId: string) => {
  try {
    const { data } = await API.put(`/admin/users/${userId}/block`);
    return data.data;
  } catch (error) {
    console.error('Error toggling user block:', error);
    throw error;
  }
};

// Get all orders (admin)
export const getAllOrders = async () => {
  try {
    const { data } = await API.get('/admin/orders');
    return data.data;
  } catch (error) {
    console.error('Error fetching all orders:', error);
    throw error;
  }
};

// Get all products (admin)
export const getAllProducts = async () => {
  try {
    const { data } = await API.get('/admin/products');
    return data.data;
  } catch (error) {
    console.error('Error fetching all products:', error);
    throw error;
  }
};

// Get dashboard stats (admin)
export const getDashboardStats = async (): Promise<DashboardStats> => {
  try {
    const { data } = await API.get('/admin/stats');
    return data.data;
  } catch (error) {
    console.error('Error fetching dashboard stats:', error);
    throw error;
  }
};

// Get seller earnings (shop owner/admin)
export const getSellerEarnings = async (sellerId?: string): Promise<SellerEarnings> => {
  try {
    const url = sellerId 
      ? `/admin/seller/${sellerId}/earnings` 
      : '/admin/seller/earnings';
    const { data } = await API.get(url);
    return data.data;
  } catch (error) {
    console.error('Error fetching seller earnings:', error);
    throw error;
  }
};
