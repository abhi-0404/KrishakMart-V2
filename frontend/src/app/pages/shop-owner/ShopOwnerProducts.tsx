import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { getSellerProducts, deleteProduct, Product } from '../../../services/productService';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { toast } from 'sonner';

export const ShopOwnerProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

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
                    src={product.image}
                    alt={product.name}
                    className="w-32 h-32 object-cover rounded-lg"
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
                      <Button variant="outline" size="sm" className="border-green-600 text-green-600 hover:bg-green-50">
                        <Edit className="h-4 w-4" />
                      </Button>
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
                      <p className="text-xl font-bold text-gray-800">{product.stock} units</p>
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
