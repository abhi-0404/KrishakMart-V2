import React from 'react';
import { Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from '../../components/ProductCard';
import { Button } from '../../components/ui/button';
import { Link } from 'react-router-dom';

export const FarmerWishlist: React.FC = () => {
  const { wishlist } = useApp();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <Heart className="h-24 w-24 text-gray-300 mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Your Wishlist is Empty</h2>
        <p className="text-xl text-gray-600 mb-8">Save products you love for later!</p>
        <Link to="/shop">
          <Button size="lg" className="bg-green-600 hover:bg-green-700">
            Browse Products
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">My Wishlist</h1>
        <p className="text-gray-600">{wishlist.length} items saved for later</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {wishlist.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
