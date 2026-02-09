import API from './api';

export interface RegisterData {
  name: string;
  phone: string;
  email?: string;
  password: string;
  role: 'farmer' | 'shopOwner';
  shopName?: string;
  shopAddress?: string;
}

export interface LoginData {
  phone: string;
  password: string;
}

export interface User {
  _id: string;
  name: string;
  phone: string;
  email?: string;
  role: 'farmer' | 'shopOwner' | 'admin';
  shopName?: string;
  shopAddress?: string;
  shopDescription?: string;
  gstNumber?: string;
  addresses?: any[];
  avatar?: string;
  isBlocked: boolean;
  createdAt: string;
  updatedAt: string;
}

// Register new user
export const register = async (userData: RegisterData) => {
  try {
    const { data } = await API.post('/auth/register', userData);
    return data;
  } catch (error) {
    console.error('Error registering:', error);
    throw error;
  }
};

// Login user
export const login = async (credentials: LoginData) => {
  try {
    const { data } = await API.post('/auth/login', credentials);
    return data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Get current user
export const getMe = async () => {
  try {
    const { data } = await API.get('/auth/me');
    return data.data;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw error;
  }
};

// Update password
export const updatePassword = async (currentPassword: string, newPassword: string) => {
  try {
    const { data } = await API.put('/auth/password', {
      currentPassword,
      newPassword
    });
    return data;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};
