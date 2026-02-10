import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Store } from 'lucide-react';
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
  const { addToCart } = useApp();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const shopName = typeof product.sellerId === 'object' 
    ? (product.sellerId.shopName || product.sellerId.name)
    : 'Unknown Seller';

  return (
    <Link to={`/product/${product._id}`}>
      <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-green-500 hover:shadow-lg transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative h-56 bg-gray-100 overflow-hidden">
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
            <Badge className="absolute top-3 right-3 bg-orange-500">
              Low Stock
            </Badge>
          )}
          {product.stock > 100 && (
            <Badge className="absolute top-3 right-3 bg-green-600">
              In Stock
            </Badge>
          )}
        </div>

        {/* Product Info */}
        <div className="p-5 space-y-3">
          {/* Brand */}
          <div className="text-sm font-medium text-green-600">{product.brand}</div>

          {/* Product Name */}
          <h3 className="font-semibold text-lg text-gray-800 line-clamp-2 min-h-[3.5rem]">
            {product.name}
          </h3>

          {/* Shop Owner */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Store className="h-4 w-4" />
            <span className="truncate">{shopName}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-green-100 px-2 py-1 rounded">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-sm">{product.rating || 4.5}</span>
            </div>
            <span className="text-sm text-gray-500">({Math.floor(Math.random() * 100 + 50)} reviews)</span>
          </div>

          {/* Price and Add to Cart */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
            <div>
              <div className="text-2xl font-bold text-green-700">₹{product.price}</div>
              <div className="text-xs text-gray-500">{product.stock} units available</div>
            </div>
            <Button
              size="lg"
              onClick={handleAddToCart}
              className="bg-green-600 hover:bg-green-700 gap-2"
            >
              <ShoppingCart className="h-5 w-5" />
              Add
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
};
