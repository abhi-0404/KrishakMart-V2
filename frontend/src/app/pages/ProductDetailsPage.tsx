import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Star, Store, Minus, Plus, Check } from 'lucide-react';
import { getProduct, Product } from '../../services/productService';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { getFirstImage } from '../../utils/imageUtils';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, addToWishlist, wishlist } = useApp();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const data = await getProduct(id!);
      setProduct(data);
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Button onClick={() => navigate('/shop')} className="bg-green-600 hover:bg-green-700">
            Back to Shop
          </Button>
        </div>
      </div>
    );
  }

  const isInWishlist = wishlist.some((p) => p._id === product._id);
  const shopName = typeof product.sellerId === 'object' 
    ? (product.sellerId.shopName || product.sellerId.name)
    : 'Unknown Seller';

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    toast.success(`${product.name} (x${quantity}) added to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/cart');
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      toast.info('Already in wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl border-2 border-green-200 overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative h-[500px] bg-gray-100 rounded-xl overflow-hidden">
                <img
                  src={getFirstImage(product.images)}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-product.svg';
                  }}
                />
                {product.stock < 20 && (
                  <Badge className="absolute top-4 right-4 bg-orange-500 text-white px-4 py-2 text-sm">
                    Low Stock
                  </Badge>
                )}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand */}
              <div className="text-lg font-semibold text-green-600">{product.brand}</div>

              {/* Name */}
              <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>

              {/* Rating */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-lg">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-lg">{product.rating || 4.5}</span>
                </div>
                <span className="text-gray-600">({Math.floor(Math.random() * 100 + 50)} reviews)</span>
              </div>

              {/* Shop Owner */}
              <div className="flex items-center justify-between gap-3 bg-green-50 p-4 rounded-lg border border-green-200">
                <div className="flex items-center gap-3">
                  <Store className="h-6 w-6 text-green-600" />
                  <div>
                    <div className="text-sm text-gray-600">Sold by</div>
                    <div className="font-semibold text-gray-800">{shopName}</div>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/shop/${typeof product.sellerId === 'object' ? product.sellerId._id : product.sellerId}`)}
                  className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                >
                  Visit Shop
                </Button>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <div className="text-5xl font-bold text-green-700">₹{product.price}</div>
                <div className="text-gray-600 mt-2">
                  <span className={product.stock > 20 ? 'text-green-600' : 'text-orange-600'}>
                    {product.stock > 20 ? '✓ In Stock' : '⚠ Low Stock'} ({product.stock} units available)
                  </span>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-800">Quantity:</span>
                <div className="flex items-center border-2 border-green-300 rounded-lg">
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="hover:bg-green-50"
                  >
                    <Minus className="h-5 w-5" />
                  </Button>
                  <span className="px-6 py-2 font-bold text-lg">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="hover:bg-green-50"
                  >
                    <Plus className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white text-lg py-6 gap-3"
                >
                  <ShoppingCart className="h-6 w-6" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  onClick={handleBuyNow}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white text-lg py-6"
                >
                  Buy Now
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleWishlist}
                  className="border-2 border-green-600 hover:bg-green-50 p-6"
                >
                  <Heart className={`h-6 w-6 ${isInWishlist ? 'fill-red-500 text-red-500' : 'text-green-600'}`} />
                </Button>
              </div>

              {/* Product Details */}
              <div className="space-y-4 border-t pt-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">Product Description</h3>
                  <p className="text-gray-600 leading-relaxed">{product.description}</p>
                </div>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="text-lg font-bold text-gray-800 mb-2 flex items-center gap-2">
                    <Check className="h-5 w-5 text-green-600" />
                    Usage Information
                  </h3>
                  <p className="text-gray-700">{product.usage}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
