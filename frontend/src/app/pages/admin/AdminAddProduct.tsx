import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, DollarSign, FileText, Image, Save, ArrowLeft } from 'lucide-react';
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
import { categories } from '../../data/mockData';
import { toast } from 'sonner';

export const AdminAddProduct: React.FC = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    usage: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Admin product added successfully!');
    navigate('/admin/my-products');
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-green-100 rounded-full transition-colors">
          <ArrowLeft className="h-6 w-6 text-green-700" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Add Admin Product</h1>
          <p className="text-gray-600">List a product directly from the platform administration</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md border-2 border-green-600 max-w-3xl">
        <div className="space-y-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-4">
            <p className="text-sm text-green-800 font-medium">
              Note: This product will be listed with "Platform Official" as the seller.
            </p>
          </div>

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
              placeholder="e.g., Official Agri Hub Seed Kit"
              className="mt-2 text-base py-6 border-2 focus:ring-green-500"
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
                  {categories?.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>
                      {cat.icon} {cat.name}
                    </SelectItem>
                  )) || [
                    <SelectItem key="seeds" value="seeds">Seeds</SelectItem>,
                    <SelectItem key="tools" value="tools">Tools</SelectItem>
                  ]}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="brand" className="text-base">Official Brand Name *</Label>
              <Input
                id="brand"
                value={product.brand}
                onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                placeholder="e.g., AgriHub Official"
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
                Selling Price (₹) *
              </Label>
              <Input
                id="price"
                type="number"
                value={product.price}
                onChange={(e) => setProduct({ ...product, price: e.target.value })}
                placeholder="e.g., 999"
                className="mt-2 text-base py-6 border-2"
                required
              />
            </div>

            <div>
              <Label htmlFor="stock" className="text-base">Inventory Stock *</Label>
              <Input
                id="stock"
                type="number"
                value={product.stock}
                onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                placeholder="e.g., 500"
                className="mt-2 text-base py-6 border-2"
                required
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-base flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Detailed Description *
            </Label>
            <Textarea
              id="description"
              value={product.description}
              onChange={(e) => setProduct({ ...product, description: e.target.value })}
              placeholder="Provide a comprehensive description of the product..."
              className="mt-2 text-base border-2 min-h-[120px]"
              required
            />
          </div>

          {/* Upload Image */}
          <div>
            <Label htmlFor="image" className="text-base flex items-center gap-2">
              <Image className="h-4 w-4" />
              Product Image
            </Label>
            <div className="mt-2 border-2 border-dashed border-green-300 rounded-lg p-8 text-center hover:border-green-600 transition-colors cursor-pointer bg-green-50/50">
              <Image className="h-12 w-12 text-green-600 mx-auto mb-3" />
              <p className="text-green-800 mb-2 font-medium">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">Official product images help build trust</p>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" size="lg" className="w-full bg-green-700 hover:bg-green-800 gap-2 py-6 text-lg shadow-lg">
            <Save className="h-5 w-5" />
            Publish as Official Product
          </Button>
        </div>
      </form>
    </div>
  );
};
