import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Package, Star, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';
import { getSellerProducts, deleteProduct, Product } from '../../../services/productService';
import { getFirstImage, getImageUrl } from '../../../utils/imageUtils';
import { useApp } from '../../context/AppContext';
import API from '../../../services/api';

type AdminProduct = Product & { isAvailable?: boolean };

export const AdminOwnProducts: React.FC = () => {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useApp();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await getSellerProducts();
      setProducts(data);
    } catch (error) {
      toast.error('Failed to load products');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    try {
      await deleteProduct(productId);
      toast.success('Product deleted successfully');
      fetchProducts(); // Refresh the list
    } catch (error) {
      toast.error('Failed to delete product');
      console.error(error);
    }
  };

  const handleAddProduct = () => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    navigate('/admin/add-product');
  };

  const handleEditProduct = (productId: string) => {
    if (!user || user.role !== 'admin') {
      navigate('/login');
      return;
    }
    navigate(`/admin/edit-product/${productId}`);
  };

  const toggleProductVisibility = async (productId: string, currentStatus: boolean | undefined) => {
    try {
      const nextStatus = !currentStatus;
      await API.patch(`/products/${productId}/visibility`, { isAvailable: nextStatus });
      toast.success(nextStatus ? 'Product is now visible to users' : 'Product is now hidden from users');
      fetchProducts();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update product visibility');
      console.error(error);
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
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Official Products</h1>
          <p className="text-gray-600">Products sold directly by the platform</p>
        </div>
        <Button
          onClick={handleAddProduct}
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
          <p className="text-2xl font-bold text-gray-800">{products.length}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg"><TrendingUp className="h-5 w-5 text-blue-600" /></div>
            <span className="text-sm font-medium text-gray-500">Total Stock</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">{products.reduce((sum, p) => sum + p.stock, 0)}</p>
        </div>
        <div className="bg-white p-6 rounded-xl border-2 border-green-100 shadow-sm">
          <div className="flex items-center gap-4 mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg"><Star className="h-5 w-5 text-yellow-600" /></div>
            <span className="text-sm font-medium text-gray-500">Avg. Rating</span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {products.length > 0 
              ? (products.reduce((sum, p) => sum + (p.rating || 0), 0) / products.length).toFixed(1)
              : '0.0'}
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl p-12 text-center border-2 border-gray-100">
          <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-800 mb-2">No Products Yet</h3>
          <p className="text-gray-600 mb-6">Start adding official products to your store</p>
          <Button
            onClick={handleAddProduct}
            className="bg-green-700 hover:bg-green-800"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Your First Product
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-xl p-6 shadow-md border-2 border-green-600/20 hover:border-green-600/40 transition-all">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-40 h-40 flex-shrink-0">
                  <img
                    src={product.images?.length ? getFirstImage(product.images) : getImageUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover rounded-lg border-2 border-gray-100"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder-product.svg';
                    }}
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
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleProductVisibility(product._id, product.isAvailable)}
                        className={product.isAvailable ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-100'}
                        title={product.isAvailable ? 'Hide from users' : 'Show to users'}
                      >
                        {product.isAvailable ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditProduct(product._id)}
                        className="text-blue-600 hover:bg-blue-50"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(product._id)}
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
                      <p className="text-lg font-semibold text-gray-700 capitalize">{product.category}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 uppercase font-bold mb-1 tracking-wider">Performance</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-gray-800">{product.rating?.toFixed(1) || '0.0'}</span>
                      </div>
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
