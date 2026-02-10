import React, { useState, useEffect } from 'react';
import { Search, Package, Store, Tag, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { getAllProducts } from '../../../services/adminService';
import { deleteProduct } from '../../../services/productService';

interface AdminProduct {
  _id: string;
  name: string;
  sellerId: {
    _id: string;
    name: string;
    shopName?: string;
  };
  category: string;
  price: number;
  stock: number;
  images?: string[];
  image?: string;
}

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (p.sellerId.shopName && p.sellerId.shopName.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const deleteProductHandler = async (id: string) => {
    if (confirm('Are you sure you want to remove this product from the platform?')) {
      try {
        await deleteProduct(id);
        toast.success('Product has been removed');
        fetchProducts();
      } catch (error) {
        toast.error('Failed to delete product');
        console.error(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Manage Products</h1>
          <p className="text-gray-600">Monitor all agricultural supplies listed on the platform</p>
        </div>
        <div className="bg-white px-4 py-2 rounded-lg border-2 border-purple-200 shadow-sm flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">Total Listings:</span>
          <span className="text-lg font-bold text-purple-700">{products.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-md border-2 border-green-100 flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by product or shop name..."
            className="w-full pl-10 pr-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-gray-700"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="all">All Categories</option>
          <option value="seeds">Seeds</option>
          <option value="fertilizers">Fertilizers</option>
          <option value="pesticides">Pesticides</option>
          <option value="tools">Tools</option>
          <option value="irrigation">Irrigation</option>
          <option value="feed">Feed</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-md border-2 border-green-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-green-50 border-b-2 border-green-100">
              <tr>
                <th className="px-6 py-4 font-bold text-green-800">Product</th>
                <th className="px-6 py-4 font-bold text-green-800">Shop</th>
                <th className="px-6 py-4 font-bold text-green-800">Price</th>
                <th className="px-6 py-4 font-bold text-green-800">Stock</th>
                <th className="px-6 py-4 font-bold text-green-800">Status</th>
                <th className="px-6 py-4 font-bold text-green-800 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product._id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.images?.[0] || product.image || 'https://via.placeholder.com/50'} 
                        alt={product.name} 
                        className="h-12 w-12 rounded-lg object-cover border-2 border-gray-100" 
                      />
                      <div>
                        <p className="font-bold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 uppercase font-semibold">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Store className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{product.sellerId.shopName || product.sellerId.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-gray-800">₹{product.price}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-semibold ${product.stock < 10 ? 'text-red-600' : 'text-gray-700'}`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                      product.stock > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button 
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" 
                        title="View Product"
                        onClick={() => toast.info('View details coming soon')}
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProductHandler(product._id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        title="Delete Listing"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-20" />
            <p className="text-lg">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};
