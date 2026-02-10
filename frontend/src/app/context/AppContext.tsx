import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '../../services/productService';
import API from '../../services/api';
import { toast } from 'sonner';

interface CartItem {
  product: Product;
  quantity: number;
}

interface User {
  _id: string;
  name: string;
  role: 'farmer' | 'shopOwner' | 'admin';
  email?: string;
  phone?: string;
  shopName?: string;
  addresses?: any[];
}

interface AppContextType {
  user: User | null;
  login: (credentials: { phone: string; password: string }) => Promise<void>;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product) => Promise<void>;
  removeFromCart: (productId: string) => Promise<void>;
  updateCartQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  wishlist: Product[];
  addToWishlist: (product: Product) => Promise<void>;
  removeFromWishlist: (productId: string) => Promise<void>;
  language: 'en' | 'hi';
  setLanguage: (lang: 'en' | 'hi') => void;
  loading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');
  const [loading, setLoading] = useState(false);

  // Load user from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    const persistSession = localStorage.getItem('persistSession');
    
    if (token && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        
        // Only auto-login if persistSession is true (admin only)
        if (persistSession === 'true') {
          setUser(parsedUser);
          // Fetch cart and wishlist if farmer
          if (parsedUser.role === 'farmer') {
            fetchCart();
            fetchWishlist();
          }
        } else {
          // Clear localStorage for non-persistent sessions
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          localStorage.removeItem('persistSession');
        }
      } catch (error) {
        console.error('Error loading user:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('persistSession');
      }
    }
  }, []);

  const login = async (credentials: { phone: string; password: string }) => {
    try {
      setLoading(true);
      const { data } = await API.post('/auth/login', credentials);
      
      const userData = data.data.user;
      const token = data.data.token;
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Mark session type - only admin gets persistent session
      if (userData.role === 'admin') {
        localStorage.setItem('persistSession', 'true');
      } else {
        localStorage.setItem('persistSession', 'false');
      }
      
      setUser(userData);
      
      // Fetch cart and wishlist if farmer
      if (userData.role === 'farmer') {
        await fetchCart();
        await fetchWishlist();
      }
      
      toast.success('Login successful!');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Login failed';
      toast.error(message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('persistSession');
    setUser(null);
    setCart([]);
    setWishlist([]);
    toast.success('Logged out successfully');
  };

  const fetchCart = async () => {
    try {
      const { data } = await API.get('/cart');
      // Transform backend cart to frontend format
      const cartItems = data.data.items.map((item: any) => ({
        product: item.productId,
        quantity: item.quantity
      }));
      setCart(cartItems);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const fetchWishlist = async () => {
    try {
      const { data } = await API.get('/wishlist');
      setWishlist(data.data.products || []);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToCart = async (product: Product) => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      await API.post('/cart', {
        productId: product._id,
        quantity: 1
      });
      
      // Update local state
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.product._id === product._id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.product._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { product, quantity: 1 }];
      });
      
      toast.success('Added to cart');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to add to cart';
      toast.error(message);
    }
  };

  const removeFromCart = async (productId: string) => {
    try {
      await API.delete(`/cart/${productId}`);
      setCart((prevCart) => prevCart.filter((item) => item.product._id !== productId));
      toast.success('Removed from cart');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to remove from cart';
      toast.error(message);
    }
  };

  const updateCartQuantity = async (productId: string, quantity: number) => {
    if (quantity <= 0) {
      await removeFromCart(productId);
      return;
    }

    try {
      await API.put(`/cart/${productId}`, { quantity });
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.product._id === productId ? { ...item, quantity } : item
        )
      );
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to update cart';
      toast.error(message);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const addToWishlist = async (product: Product) => {
    if (!user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      await API.post(`/wishlist/${product._id}`);
      setWishlist((prevWishlist) => {
        if (prevWishlist.find((p) => p._id === product._id)) {
          return prevWishlist;
        }
        return [...prevWishlist, product];
      });
      toast.success('Added to wishlist');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to add to wishlist';
      toast.error(message);
    }
  };

  const removeFromWishlist = async (productId: string) => {
    try {
      await API.delete(`/wishlist/${productId}`);
      setWishlist((prevWishlist) => prevWishlist.filter((p) => p._id !== productId));
      toast.success('Removed from wishlist');
    } catch (error: any) {
      const message = error.response?.data?.message || 'Failed to remove from wishlist';
      toast.error(message);
    }
  };

  return (
    <AppContext.Provider
      value={{
        user,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        wishlist,
        addToWishlist,
        removeFromWishlist,
        language,
        setLanguage,
        loading,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
