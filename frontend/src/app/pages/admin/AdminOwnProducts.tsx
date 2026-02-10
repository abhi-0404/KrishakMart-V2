import React from 'react';
import { Plus, Edit, Trash2, Package, Star, TrendingUp } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

// Sample admin-owned products
const adminProducts = [
  {
    id: 'admin-p1',
    name: 'AgriHub Premium Soil Tester',
    brand: 'AgriHub Official',
    description: 'Professional grade soil pH and moisture tester for accurate farming.',
    price: 1499,
    stock: 85,
    category: 'Tools',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'admin-p2',
    name: 'Super-Growth Bio Fertilizer',
    brand: 'AgriHub Official',
    description: 'Proprietary organic mix for 2x faster vegetable growth.',
    price: 599,
    stock: 240,
    category: 'Fertilizers',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=200'
  }
];

export const AdminOwnProducts: React.FC = () => {
  const handleDelete = (productId: string) => {
    toast.error('Admin product removal simulation successful');
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Official Products</h1>
          <p className="text-gray-600">Products sold directly by the platform</p>
        </div>
        <Button
          onClick={() => window.location.href = '/admin/add-product'}
          size="lg"
          className="bg-green-700 hover:bg-green-800 gap-2 shadow-md"
        >
          <Plus className="h-5 w-5" />
          Add Official Product
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-green-100 rounded-lg"><Package className="h-5 w-5 text-green-600" /></div>
            <span className="text-sm font-medium text-gray-500">Live Products</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{adminProducts.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg"><TrendingUp className="h-5 w-5 text-blue-600" /></div>
            <span className="text-sm font-medium text-gray-500">Units Sold</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">1,245</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg"><Star className="h-5 w-5 text-yellow-600" /></div>
            <span className="text-sm font-medium text-gray-500">Avg. Rating</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">4.85</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {adminProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-600/20 hover:border-green-600/40 transition-all">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-40 h-40 flex-shrink-0">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-lg border-2 border-gray-100"
                />
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <Badge variant="outline" className="text-green-700 border-green-200 bg-green-50 mb-1">Official Listing</Badge>
                    <h3 className="text-2xl font-bold text-gray-800">{product.name}</h3>
                    <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:bg-blue-50">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                      className="text-red-600 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Price</p>
                    <p className="text-xl font-bold text-green-700">₹{product.price}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Inventory</p>
                    <p className="text-xl font-bold text-gray-800">{product.stock} units</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Category</p>
                    <p className="text-lg font-semibold text-gray-700">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Performance</p>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-bold text-gray-800">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
