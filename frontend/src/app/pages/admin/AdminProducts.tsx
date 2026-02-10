import React, { useState } from 'react';
import { Search, Package, Store, Tag, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { toast } from 'sonner';

interface AdminProduct {
  id: string;
  name: string;
  shopName: string;
  category: string;
  price: number;
  stock: number;
  status: 'active' | 'out_of_stock' | 'pending';
  image: string;
}

const mockProducts: AdminProduct[] = [
  { id: '1', name: 'Premium NPK Fertilizer', shopName: 'Green Valley Seeds', category: 'Fertilizers', price: 850, stock: 150, status: 'active', image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&q=80&w=200' },
  { id: '2', name: 'Organic Tomato Seeds', shopName: 'Kisan Mitra Fertilizers', category: 'Seeds', price: 45, stock: 500, status: 'active', image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=200' },
  { id: '3', name: 'Heavy Duty Garden Hoe', shopName: 'Agro Tech Tools', category: 'Tools', price: 1200, stock: 25, status: 'active', image: 'https://images.unsplash.com/photo-1590595906931-81f04f0ccebb?auto=format&fit=crop&q=80&w=200' },
  { id: '4', name: 'Drip Irrigation Kit', shopName: 'Modern Farm Supplies', category: 'Equipment', price: 4500, stock: 0, status: 'out_of_stock', image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=200' },
  { id: '5', name: 'Bio-Pesticide Spray', shopName: 'Soil Care Bio', category: 'Pesticides', price: 320, stock: 85, status: 'active', image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=200' },
];

export const AdminProducts: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteProduct = (id: string) => {
    if (confirm('Are you sure you want to remove this product from the platform?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
      toast.error('Product has been removed');
    }
  };

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
        <select className="px-4 py-2 rounded-lg border-2 border-gray-200 focus:border-green-500 outline-none font-medium text-gray-700">
          <option>All Categories</option>
          <option>Seeds</option>
          <option>Fertilizers</option>
          <option>Tools</option>
          <option>Equipment</option>
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
                <tr key={product.id} className="hover:bg-green-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="h-12 w-12 rounded-lg object-cover border-2 border-gray-100" />
                      <div>
                        <p className="font-bold text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 uppercase font-semibold">{product.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Store className="h-4 w-4 text-blue-600" />
                      <span className="font-medium">{product.shopName}</span>
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
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 
                      product.status === 'out_of_stock' ? 'bg-red-100 text-red-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}>
                      {product.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors" title="View Product">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
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
      </div>
    </div>
  );
};
