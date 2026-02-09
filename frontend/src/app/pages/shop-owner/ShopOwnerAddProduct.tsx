import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, FileText, Image, Save } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { categories, createProduct } from '../../../services/productService';
import { toast } from 'sonner';

export const ShopOwnerAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    usage: '',
    image: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product.category) {
      toast.error('Please select a category');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload (if needed in future)
      const formData = new FormData();
      formData.append('name', product.name);
      formData.append('category', product.category);
      formData.append('brand', product.brand);
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('description', product.description);
      if (product.usage) formData.append('usage', product.usage);
      if (product.image) formData.append('image', product.image);

      await createProduct(formData);
      toast.success('Product added successfully!');
      navigate('/shop-owner/products');
    } catch (error: any) {
      console.error('Error adding product:', error);
      const message = error.response?.data?.message || 'Failed to add product';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Add New Product</h1>
        <p className="text-gray-600">List a new farming product for sale</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 max-w-3xl">
        <div className="space-y-6">
          {/* Product Name */}
          <div>
            <Label htmlFor="name" className="text-base flex items-center gap-2">
              <Package className="h-4 w-4" />
              Product Name *
            </Label>
            <Input
              id="name"
              value={product.name}
              onChange={(e) => setProduct({ ...product, name: e.target.value })}
              placeholder="e.g., Wheat Seeds Premium Quality"
              className="mt-2 text-base py-6 border-2"
              required
            />
          </div>

          {/* Category and Brand */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category" className="text-base">Category *</Label>
              <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
                <SelectTrigger className="mt-2 text-base py-6 border-2">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand" className="text-base">Brand *</Label>
              <Input
                id="brand"
                value={product.brand}
                onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                placeholder="e.g., AgriGrow"
                className="mt-2 text-base py-6 border-2"
                required
              />
            </div>
          </div>

          {/* Price and Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price (₹) *
              </Label>
              <Input
                id="price"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="e.g., 850"
                className="mt-2 text-base py-6 border-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="stock" className="text-base">Stock Quantity *</Label>
              <Input
                id="stock"
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                placeholder="e.g., 150"
                className="mt-2 text-base py-6 border-2"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Product Description *
            </Label>
            <Textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Describe the product features, quality, and benefits..."
              className="mt-2 text-base border-2 min-h-[120px]"
              required
            />
          </div>

          {/* Usage Information */}
          <div>
            <Label htmlFor="usage" className="text-base">Usage Information</Label>
            <Textarea
              id="usage"
              value={product.usage}
              onChange={(e) => setProduct({ ...product, usage: e.target.value })}
              placeholder="e.g., Ideal for winter season cultivation. Sow 40-50 kg per acre."
              className="mt-2 text-base border-2 min-h-[100px]"
            />
          </div>

          {/* Upload Image */}
          <div>
            <Label htmlFor="image" className="text-base flex items-center gap-2">
              <Image className="h-4 w-4" />
              Product Image
            </Label>
            <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer">
              <Image className="h-12 w-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 5MB</p>
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            size="lg" 
            className="w-full bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
            disabled={loading}
          >
            <Save className="h-5 w-5" />
            {loading ? 'Saving...' : 'Save Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};
