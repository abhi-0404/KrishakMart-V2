import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, Package, ArrowRight } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard';
import { getProducts, Product } from '../../../services/productService';
import { Button } from '../../components/ui/button';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

export const FarmerDashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { cart, wishlist } = useApp();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Farmer!</h1>
        <p className="text-gray-600">Here's what's happening with your orders</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Cart Items</p>
              <p className="text-3xl font-bold text-gray-800">{cart.length}</p>
            </div>
            <div className="bg-green-100 p-4 rounded-xl">
              <ShoppingBag className="h-8 w-8 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">My Orders</p>
              <p className="text-3xl font-bold text-gray-800">
                <Link to="/farmer/orders" className="hover:text-orange-600">View</Link>
              </p>
            </div>
            <div className="bg-orange-100 p-4 rounded-xl">
              <Package className="h-8 w-8 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm mb-1">Wishlist Items</p>
              <p className="text-3xl font-bold text-gray-800">{wishlist.length}</p>
            </div>
            <div className="bg-red-100 p-4 rounded-xl">
              <Heart className="h-8 w-8 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Recently Viewed */}
      <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Available Products</h2>
          <Link to="/shop">
            <Button variant="outline" className="border-green-600 text-green-600 hover:bg-green-50 gap-2">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-600">No products available yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(0, 3).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Recommended Products */}
      {!loading && products.length > 3 && (
        <div className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">More Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.slice(3, 6).map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
