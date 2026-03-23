import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Check, X } from 'lucide-react';
import { getSellerProducts, deleteProduct, Product } from '../../../services/productService';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { getFirstImage } from '../../../utils/imageUtils';
import API from '../../../services/api';

export const ShopOwnerProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingStock, setEditingStock] = useState<string | null>(null);
  const [stockValue, setStockValue] = useState<string>('');

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getSellerProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  const startEditStock = (product: Product) => {
    setEditingStock(product._id);
    setStockValue(String(product.stock));
  };

  const cancelEditStock = () => {
    setEditingStock(null);
    setStockValue('');
  };

  const saveStock = async (productId: string) => {
    const newStock = parseInt(stockValue, 10);
    if (isNaN(newStock) || newStock < 0) { toast.error('Enter a valid stock number'); return; }
    try {
      await API.patch(`/products/${productId}/stock`, { stock: newStock });
      setProducts(prev => prev.map(p =>
        p._id === productId ? { ...p, stock: newStock, isAvailable: newStock > 0 } : p
      ));
      toast.success('Stock updated!');
      setEditingStock(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to update stock');
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully!');
      fetchProducts(); // Refresh list
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error('Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Products</h1>
          <p className="text-gray-600">{products.length} products listed</p>
        </div>
        <Link to="/shop-owner/add-product">
          <Button size="lg" className="bg-green-600 hover:bg-green-700 gap-2">
            <Plus className="h-5 w-5" />
            Add New Product
          </Button>
        </Link>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border-2 border-green-200">
          <p className="text-xl text-gray-600 mb-4">No products added yet</p>
          <Link to="/shop-owner/add-product">
            <Button className="bg-green-600 hover:bg-green-700">
              <Plus className="h-5 w-5 mr-2" />
              Add Your First Product
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-200">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="flex-shrink-0">
                  <img
                    src={getFirstImage(product.images)}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.svg';
                    }}
                  />
                </div>

                {/* Product Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <div className="text-sm font-medium text-green-600 mb-1">{product.brand}</div>
                      <h3 className="text-2xl font-bold text-gray-800 mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Link to={`/shop-owner/edit-product/${product._id}`}>
                        <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
                        className="border-red-600 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-4 gap-4 mt-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Price</p>
                      <p className="text-xl font-bold text-green-700">₹{product.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Stock</p>
                      {editingStock === product._id ? (
                        <div className="flex items-center gap-1.5">
                          <input
                            type="number" min="0" value={stockValue}
                            onChange={e => setStockValue(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') saveStock(product._id); if (e.key === 'Escape') cancelEditStock(); }}
                            className="w-20 px-2 py-1 text-sm border-2 border-[#2E7D32] rounded-lg outline-none font-bold"
                            autoFocus
                          />
                          <button onClick={() => saveStock(product._id)}
                            className="w-7 h-7 rounded-lg bg-[#2E7D32] text-white flex items-center justify-center hover:bg-green-800">
                            <Check className="h-3.5 w-3.5" />
                          </button>
                          <button onClick={cancelEditStock}
                            className="w-7 h-7 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center hover:bg-gray-200">
                            <X className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <p className={`text-xl font-bold ${product.stock === 0 ? 'text-red-600' : 'text-gray-800'}`}>
                            {product.stock} units
                          </p>
                          {product.stock === 0 && (
                            <span className="text-[10px] bg-red-100 text-red-600 font-bold px-1.5 py-0.5 rounded">OUT</span>
                          )}
                          <button onClick={() => startEditStock(product)}
                            className="flex items-center gap-1 text-xs text-[#2E7D32] font-semibold bg-green-50 hover:bg-green-100 px-2 py-1 rounded-lg transition-colors">
                            <Package className="h-3 w-3" /> Update
                          </button>
                        </div>
                      )}
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Category</p>
                      <Badge className="bg-blue-500">{product.category}</Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rating</p>
                      <p className="text-xl font-bold text-gray-800">⭐ {product.rating || 4.5}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
