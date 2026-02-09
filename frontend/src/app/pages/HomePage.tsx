import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Store, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../../services/productService';
import { getProducts, Product } from '../../services/productService';
import { toast } from 'sonner';

export const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] bg-gradient-to-r from-[#2f7c4f] to-[#236240] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1762884109987-c0fb0d5838dc?w=1920"
            alt="Farmer in field"
            className="w-full h-full object-cover opacity-30"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                KrishakMart
              </h1>
              <p className="text-2xl md:text-3xl font-semibold text-[#f5ede3] italic">
                Mitti Se Digital Tak
              </p>
            </div>
            <p className="text-xl text-green-100">
              Quality agricultural products delivered directly to farmers. Save time, grow better.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop">
                <Button size="lg" className="bg-white text-[#2f7c4f] hover:bg-green-50 text-lg px-8 py-6 gap-3 font-semibold">
                  <ShoppingBag className="h-6 w-6" />
                  Shop Farming Products
                </Button>
              </Link>
              <Link to="/become-seller">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-[#2f7c4f] text-lg px-8 py-6 gap-3 font-semibold">
                  <Store className="h-6 w-6" />
                  Become a Seller
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="bg-white py-8 shadow-md -mt-12 relative z-10 mx-4 sm:mx-8 lg:mx-16 rounded-2xl">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            <Input
              placeholder="Search for seeds, fertilizers, tools..."
              className="pl-14 pr-4 py-6 text-lg border-2 border-gray-200 rounded-xl focus:border-[#2f7c4f]"
            />
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-[#f0f9f4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-4">
              <CheckCircle className="h-12 w-12 text-[#2f7c4f] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Genuine Products</h3>
                <p className="text-gray-600">100% authentic supplies</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-4">
              <CheckCircle className="h-12 w-12 text-[#2f7c4f] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Fast Delivery</h3>
                <p className="text-gray-600">Quick doorstep delivery</p>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-4">
              <CheckCircle className="h-12 w-12 text-[#2f7c4f] flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-gray-800">Farmer Friendly</h3>
                <p className="text-gray-600">Easy to use platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find everything you need for your farm</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} {...category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gradient-to-b from-[#f0f9f4] to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">Featured Products</h2>
              <p className="text-xl text-gray-600">Top quality farming supplies</p>
            </div>
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] gap-2 font-semibold">
                View All
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products available yet</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How to Order Section */}
      <section className="py-16 bg-[#2f7c4f] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">How to Order</h2>
            <p className="text-xl text-green-100">Simple steps to get your farming supplies</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-white text-[#2f7c4f] rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Products</h3>
              <p className="text-green-100">Search and select farming supplies</p>
            </div>
            <div className="text-center">
              <div className="bg-white text-[#2f7c4f] rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Add to Cart</h3>
              <p className="text-green-100">Choose quantity and add items</p>
            </div>
            <div className="text-center">
              <div className="bg-white text-[#2f7c4f] rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Enter Details</h3>
              <p className="text-green-100">Provide delivery address</p>
            </div>
            <div className="text-center">
              <div className="bg-white text-[#2f7c4f] rounded-full w-20 h-20 flex items-center justify-center text-3xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-xl font-bold mb-2">Receive at Home</h3>
              <p className="text-green-100">Get products at your doorstep</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Offer Banner */}
      <section className="py-12 bg-gradient-to-r from-[#b87a47] to-[#855132]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🎉 Seasonal Sale - Up to 30% Off!</h2>
              <p className="text-xl text-white/90">Special discounts on seeds and fertilizers</p>
            </div>
            <Link to="/shop">
              <Button size="lg" className="bg-white text-[#b87a47] hover:bg-[#f5ede3] text-lg px-8 py-6 font-semibold">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
