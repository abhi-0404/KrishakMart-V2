import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, Store, Edit } from 'lucide-react';
import { Product } from '../../services/productService';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { useApp } from '../context/AppContext';
import { toast } from 'sonner';
import { getFirstImage } from '../../utils/imageUtils';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, user } = useApp();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const handleEditProduct = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Prevent Link navigation
    navigate(`/shop-owner/edit-product/${product._id}`);
  };

  const shopName = typeof product.sellerId === 'object' 
    ? (product.sellerId.shopName || product.sellerId.name)
    : 'Unknown Seller';

  // Check if this product belongs to the logged-in shop owner
  const isOwnProduct = user?.role === 'shopOwner' && 
    (typeof product.sellerId === 'object' 
      ? product.sellerId._id === user._id 
      : product.sellerId === user._id);

  // Hide product card completely for shop owners viewing other sellers' products
  if (user?.role === 'shopOwner' && !isOwnProduct) {
    return null;
  }

  // Determine the link destination
  const linkTo = isOwnProduct 
    ? `/shop-owner/edit-product/${product._id}` 
    : `/product/${product._id}`;

  return (
    <Link to={linkTo}>
      <div className="bg-white rounded-lg md:rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-500 hover:shadow-lg transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative h-48 md:h-56 bg-gray-100 overflow-hidden">
          <img
            src={getFirstImage(product.images)}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = '/placeholder-product.svg';
            }}
          />
          {product.stock < 20 && (
            <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-orange-500 text-xs">
              Low Stock
            </Badge>
          )}
          {product.stock > 100 && (
            <Badge className="absolute top-2 md:top-3 right-2 md:right-3 bg-green-600 text-xs">
              In Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-5 space-y-2 md:space-y-3">
          {/* Brand */}
          <div className="text-xs md:text-sm font-medium text-green-600">{product.brand}</div>

          {/* Product Name */}
          <h3 className="font-semibold text-base md:text-lg text-gray-800 line-clamp-2 min-h-[2.5rem] md:min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Shop Owner */}
          <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
            <Store className="h-3 w-3 md:h-4 md:w-4" />
            <span className="truncate">{shopName}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
              <Star className="h-3 w-3 md:h-4 md:w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-xs md:text-sm">{product.rating || 4.5}</span>
            </div>
            <span className="text-xs md:text-sm text-gray-500">({Math.floor(Math.random() * 100 + 50)})</span>
          </div>

          {/* Price and Action Button */}
          <div className="flex items-center justify-between pt-2 md:pt-3 border-t border-gray-200">
            <div>
              <div className="text-xl md:text-2xl font-bold text-green-700">₹{product.price}</div>
              <div className="text-xs text-gray-500">{product.stock} units</div>
            </div>
            {isOwnProduct ? (
              <Button
                size="sm"
                onClick={handleEditProduct}
                className="bg-blue-600 hover:bg-blue-700 gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
              >
                <Edit className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Edit</span>
              </Button>
            ) : (
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-green-600 hover:bg-green-700 gap-1 md:gap-2 text-xs md:text-sm px-2 md:px-4"
              >
                <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                <span className="hidden sm:inline">Add</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
