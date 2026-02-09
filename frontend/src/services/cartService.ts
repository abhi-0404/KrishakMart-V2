import API from './api';
import { Product } from './productService';

export interface CartItem {
  productId: Product;
  quantity: number;
}

export interface Cart {
  _id: string;
  farmerId: string;
  items: CartItem[];
  createdAt: string;
  updatedAt: string;
}

// Get user's cart
export const getCart = async () => {
  try {
    const { data } = await API.get('/cart');
    return data.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Add item to cart
export const addToCart = async (productId: string, quantity: number = 1) => {
  try {
    const { data } = await API.post('/cart', { productId, quantity });
    return data.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

// Update cart item quantity
export const updateCartItem = async (productId: string, quantity: number) => {
  try {
    const { data } = await API.put(`/cart/${productId}`, { quantity });
    return data.data;
  } catch (error) {
    console.error('Error updating cart:', error);
    throw error;
  }
};

// Remove item from cart
export const removeFromCart = async (productId: string) => {
  try {
    const { data } = await API.delete(`/cart/${productId}`);
    return data.data;
  } catch (error) {
    console.error('Error removing from cart:', error);
    throw error;
  }
};

// Clear entire cart
export const clearCart = async () => {
  try {
    const { data } = await API.delete('/cart');
    return data.data;
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw error;
  }
};
