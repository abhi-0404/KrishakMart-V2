import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingBag, Store, ArrowRight, CheckCircle, Package, Clock, Edit } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { CategoryCard } from '../components/CategoryCard';
import { ProductCard } from '../components/ProductCard';
import { categories } from '../../services/productService';
import { getProducts, Product, getSellerProducts } from '../../services/productService';
import { getSellerOrders } from '../../services/orderService';
import { toast } from 'sonner';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/ui/badge';
import { getFirstImage } from '../../utils/imageUtils';
import { translations } from '../../utils/translations';

export const HomePage: React.FC = () => {
  const { user, language } = useApp();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [pendingOrders, setPendingOrders] = useState<any[]>([]);
  const navigate = useNavigate();
  
  const t = translations[language];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      if (user?.role === 'shopOwner') {
        // Fetch seller's own products
        const sellerProducts = await getSellerProducts();
        setProducts(sellerProducts);
        
        // Fetch pending orders
        const orders = await getSellerOrders();
        const pending = orders.filter((order: any) => 
          order.orderStatus === 'Pending' || order.orderStatus === 'Accepted'
        );
        setPendingOrders(pending);
      } else {
        // Fetch all products for farmers/guests
        const data = await getProducts();
        setProducts(data);
      }
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
      <section className="relative h-[350px] sm:h-[450px] md:h-[600px] bg-gradient-to-r from-[#2f7c4f] to-[#236240] overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 h-full flex items-center">
          <div className="max-w-2xl space-y-3 sm:space-y-4 md:space-y-8">
            <div className="space-y-1 sm:space-y-2 md:space-y-4">
              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                KrishakMart
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-[#f5ede3] italic">
                Mitti Se Digital Tak
              </p>
            </div>
            <p className="text-sm sm:text-base md:text-xl text-green-100 leading-relaxed">
              Quality agricultural products delivered directly to farmers. Save time, grow better.
            </p>
            {user?.role !== 'shopOwner' && (
              <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 md:gap-4">
                <Link to="/shop" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-[#2f7c4f] hover:bg-green-50 text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 gap-2 md:gap-3 font-semibold">
                    <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    Shop Farming Products
                  </Button>
                </Link>
                <Link to="/become-seller" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 border-white text-white hover:bg-white hover:text-[#2f7c4f] text-sm sm:text-base md:text-lg px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-6 gap-2 md:gap-3 font-semibold">
                    <Store className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
                    Become a Seller
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Bar - Hidden for Shop Owners */}
      {user?.role !== 'shopOwner' && (
        <section className="bg-white py-6 md:py-8 shadow-md -mt-8 md:-mt-12 relative z-10 mx-2 sm:mx-4 lg:mx-16 rounded-xl md:rounded-2xl">
          <div className="max-w-4xl mx-auto px-4 md:px-6">
            <div className="relative">
              <Search className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 md:h-6 md:w-6 text-gray-400" />
              <Input
                placeholder="Search for seeds, fertilizers, tools..."
                className="pl-10 md:pl-14 pr-4 py-4 md:py-6 text-base md:text-lg border-2 border-gray-200 rounded-lg md:rounded-xl focus:border-[#2f7c4f]"
              />
            </div>
          </div>
        </section>
      )}

      {/* Trust Badges - Hidden for Shop Owners */}
      {user?.role !== 'shopOwner' && (
        <section className="py-8 md:py-12 bg-[#f0f9f4]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-3 md:gap-4">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-[#2f7c4f] flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Genuine Products</h3>
                  <p className="text-sm md:text-base text-gray-600">100% authentic supplies</p>
                </div>
              </div>
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-3 md:gap-4">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-[#2f7c4f] flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Fast Delivery</h3>
                  <p className="text-sm md:text-base text-gray-600">Quick doorstep delivery</p>
                </div>
              </div>
              <div className="bg-white rounded-lg md:rounded-xl p-4 md:p-6 shadow-md border-2 border-[#bae5cd] flex items-center gap-3 md:gap-4">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-[#2f7c4f] flex-shrink-0" />
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800">Farmer Friendly</h3>
                  <p className="text-sm md:text-base text-gray-600">Easy to use platform</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Categories Section - Hidden for Shop Owners */}
      {user?.role !== 'shopOwner' && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3 md:mb-4">Shop by Category</h2>
              <p className="text-lg md:text-xl text-gray-600">Find everything you need for your farm</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} {...category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-[#f0f9f4] to-white">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12 gap-3 sm:gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">
                {user?.role === 'shopOwner' ? t.myProductsSection : 'Featured Products'}
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">
                {user?.role === 'shopOwner' ? 'Manage your product inventory' : 'Top quality farming supplies'}
              </p>
            </div>
            {user?.role === 'shopOwner' ? (
              <Link to="/shop-owner/products" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full sm:w-auto border-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] gap-2 font-semibold text-sm md:text-base">
                  {t.viewAll}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/shop" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full sm:w-auto border-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] gap-2 font-semibold text-sm md:text-base">
                  {t.viewAll}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            )}
          </div>
          {loading ? (
            <div className="text-center py-8 sm:py-12">
              <p className="text-base sm:text-lg md:text-xl text-gray-600">{t.loading}</p>
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-8 sm:py-12">
              <Package className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-3 sm:mb-4">
                {user?.role === 'shopOwner' ? t.noProducts : 'No products available yet'}
              </p>
              {user?.role === 'shopOwner' && (
                <Link to="/shop-owner/add-product">
                  <Button className="bg-green-600 hover:bg-green-700 text-sm md:text-base">
                    {t.addFirstProduct}
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {products.slice(0, 4).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Pending Orders Section - Only for Shop Owners */}
      {user?.role === 'shopOwner' && (
        <section className="py-8 sm:py-12 md:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12 gap-3 sm:gap-4">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-1 sm:mb-2">{t.pendingOrdersSection}</h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-600">Orders waiting for your action</p>
              </div>
              <Link to="/shop-owner/orders" className="w-full sm:w-auto">
                <Button size="sm" variant="outline" className="w-full sm:w-auto border-2 border-[#2f7c4f] text-[#2f7c4f] hover:bg-[#f0f9f4] gap-2 font-semibold text-sm md:text-base">
                  {t.viewAllOrders}
                  <ArrowRight className="h-4 w-4 md:h-5 md:w-5" />
                </Button>
              </Link>
            </div>
            {loading ? (
              <div className="text-center py-8 sm:py-12">
                <p className="text-base sm:text-lg md:text-xl text-gray-600">{t.loading}</p>
              </div>
            ) : pendingOrders.length === 0 ? (
              <div className="text-center py-8 sm:py-12 bg-gray-50 rounded-lg md:rounded-xl border-2 border-gray-200">
                <Clock className="h-10 w-10 sm:h-12 sm:w-12 md:h-16 md:w-16 text-gray-400 mx-auto mb-3 sm:mb-4" />
                <p className="text-base sm:text-lg md:text-xl text-gray-600">{t.noPendingOrders}</p>
                <p className="text-xs sm:text-sm md:text-base text-gray-500 mt-2">All orders are up to date!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                {pendingOrders.slice(0, 4).map((order) => (
                  <div key={order._id} className="bg-white rounded-lg md:rounded-xl p-3 sm:p-4 md:p-6 shadow-md border-2 border-orange-200 hover:border-orange-400 transition-all">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <div>
                        <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-800">
                          {t.orderID} #{order._id.slice(-8).toUpperCase()}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-600">
                          {order.farmerId?.name || t.customer}
                        </p>
                      </div>
                      <Badge className={`text-xs ${order.orderStatus === 'Pending' ? 'bg-orange-500' : 'bg-blue-500'}`}>
                        {order.orderStatus === 'Pending' ? t.pending : 
                         order.orderStatus === 'Accepted' ? t.accepted :
                         order.orderStatus === 'Delivered' ? t.delivered : t.cancelled}
                      </Badge>
                    </div>
                    <div className="space-y-1 sm:space-y-2 mb-3 sm:mb-4">
                      <p className="text-xs md:text-sm text-gray-600">
                        <span className="font-semibold">{t.items}:</span> {order.products.length}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        <span className="font-semibold">{t.total}:</span> ₹{order.totalAmount.toLocaleString('en-IN')}
                      </p>
                      <p className="text-xs md:text-sm text-gray-600">
                        <span className="font-semibold">Date:</span> {new Date(order.createdAt).toLocaleDateString('en-IN')}
                      </p>
                    </div>
                    <Link to="/shop-owner/orders">
                      <Button className="w-full bg-green-600 hover:bg-green-700 text-sm md:text-base py-2 md:py-3">
                        {t.viewDetails}
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* How to Order Section - Hidden for Shop Owners */}
      {user?.role !== 'shopOwner' && (
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
      )}

      {/* Seasonal Offer Banner - Hidden for Shop Owners */}
      {user?.role !== 'shopOwner' && (
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
      )}
    </div>
  );
};
