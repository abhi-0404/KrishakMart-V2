import API from './api';
import { Product } from './productService';

export interface Wishlist {
  _id: string;
  farmerId: string;
  products: Product[];
  createdAt: string;
  updatedAt: string;
}

// Get user's wishlist
export const getWishlist = async () => {
  try {
    const { data } = await API.get('/wishlist');
    return data.data;
  } catch (error) {
    console.error('Error fetching wishlist:', error);
    throw error;
  }
};

// Add product to wishlist
export const addToWishlist = async (productId: string) => {
  try {
    const { data } = await API.post(`/wishlist/${productId}`);
    return data.data;
  } catch (error) {
    console.error('Error adding to wishlist:', error);
    throw error;
  }
};

// Remove product from wishlist
export const removeFromWishlist = async (productId: string) => {
  try {
    const { data } = await API.delete(`/wishlist/${productId}`);
    return data.data;
  } catch (error) {
    console.error('Error removing from wishlist:', error);
    throw error;
  }
};

// Move product from wishlist to cart
export const moveToCart = async (productId: string) => {
  try {
    const { data } = await API.post(`/wishlist/${productId}/move-to-cart`);
    return data;
  } catch (error) {
    console.error('Error moving to cart:', error);
    throw error;
  }
};
