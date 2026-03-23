import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, IndianRupee, FileText, ImagePlus, Save, X, Upload, Tag, Layers, BookOpen } from 'lucide-react';
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
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    usage: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) { toast.error(`${file.name} is not an image`); return false; }
      if (file.size > 5 * 1024 * 1024) { toast.error(`${file.name} exceeds 5MB`); return false; }
      return true;
    });

    if (selectedImages.length + validFiles.length > 5) { toast.error('Maximum 5 images allowed'); return; }

    const newImages = [...selectedImages, ...validFiles];
    setSelectedImages(newImages);

    const newPreviews = [...imagePreviews];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => { newPreviews.push(e.target?.result as string); setImagePreviews([...newPreviews]); };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
    setImagePreviews(imagePreviews.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product.name.trim()) { toast.error('Product name is required'); return; }
    if (!product.category) { toast.error('Please select a category'); return; }
    if (!product.brand.trim()) { toast.error('Brand is required'); return; }
    if (!product.price || parseFloat(product.price) <= 0) { toast.error('Enter a valid price'); return; }
    if (!product.stock || parseInt(product.stock) < 0) { toast.error('Enter a valid stock quantity'); return; }
    if (!product.description.trim()) { toast.error('Description is required'); return; }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', product.name.trim());
      formData.append('category', product.category);
      formData.append('brand', product.brand.trim());
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('description', product.description.trim());
      formData.append('usage', product.usage.trim());
      selectedImages.forEach(image => formData.append('images', image));

      await createProduct(formData);
      toast.success('Product added successfully!');
      setProduct({ name: '', category: '', brand: '', price: '', stock: '', description: '', usage: '' });
      setSelectedImages([]);
      setImagePreviews([]);
      navigate('/shop-owner/products');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Add New Product</h1>
        <p className="text-gray-500 text-sm">List a new farming product for sale</p>
      </div>

      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Product Name */}
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Product Name *</Label>
            <div className="relative mt-1.5">
              <Package className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="name" placeholder="e.g., Wheat Seeds Premium Quality"
                value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
            </div>
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category" className="text-sm font-medium text-gray-700">Category *</Label>
            <div className="relative mt-1.5">
              <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 z-10 pointer-events-none" />
              <Select value={product.category} onValueChange={(value) => setProduct({ ...product, category: value })}>
                <SelectTrigger className="pl-10 py-5 h-auto border-gray-200 focus:border-green-500 focus:ring-green-500">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={cat.id}>{cat.icon} {cat.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Brand */}
          <div>
            <Label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand *</Label>
            <div className="relative mt-1.5">
              <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input id="brand" placeholder="e.g., AgriGrow"
                value={product.brand} onChange={(e) => setProduct({ ...product, brand: e.target.value })}
                className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
            </div>
          </div>

          {/* Price & Stock */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">Price (₹) *</Label>
              <div className="relative mt-1.5">
                <IndianRupee className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="price" type="number" min="0" step="0.01" placeholder="e.g., 850"
                  value={product.price} onChange={(e) => setProduct({ ...product, price: e.target.value })}
                  className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
              </div>
            </div>
            <div>
              <Label htmlFor="stock" className="text-sm font-medium text-gray-700">Stock Qty *</Label>
              <div className="relative mt-1.5">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input id="stock" type="number" min="0" placeholder="e.g., 150"
                  value={product.stock} onChange={(e) => setProduct({ ...product, stock: e.target.value })}
                  className="pl-10 py-5 border-gray-200 focus:border-green-500 focus:ring-green-500" required />
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description *</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea id="description" placeholder="Describe the product features, quality, and benefits..."
                value={product.description} onChange={(e) => setProduct({ ...product, description: e.target.value })}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[100px]" required />
            </div>
          </div>

          {/* Usage */}
          <div>
            <Label htmlFor="usage" className="text-sm font-medium text-gray-700">Usage Information</Label>
            <div className="relative mt-1.5">
              <BookOpen className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Textarea id="usage" placeholder="e.g., Ideal for winter season. Sow 40-50 kg per acre."
                value={product.usage} onChange={(e) => setProduct({ ...product, usage: e.target.value })}
                className="pl-10 border-gray-200 focus:border-green-500 focus:ring-green-500 min-h-[80px]" />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <Label className="text-sm font-medium text-gray-700">
              Product Images <span className="text-gray-400 font-normal">(max 5)</span>
            </Label>
            <div className="mt-1.5">
              <input type="file" id="images" multiple accept="image/*" onChange={handleImageUpload} className="hidden" />
              <label htmlFor="images"
                className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl p-6 cursor-pointer hover:border-green-500 hover:bg-green-50 transition-all duration-200">
                <div className="bg-green-100 p-3 rounded-full">
                  <ImagePlus className="h-5 w-5 text-green-600" />
                </div>
                <p className="text-sm text-gray-600 font-medium">Click to upload images</p>
                <p className="text-xs text-gray-400">PNG, JPG up to 5MB each</p>
              </label>
            </div>

            {imagePreviews.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-500 mb-2">{imagePreviews.length}/5 images selected</p>
                <div className="grid grid-cols-5 gap-2">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img src={preview} alt={`Preview ${index + 1}`}
                        className="w-full h-16 object-cover rounded-lg border border-gray-200" />
                      <button type="button" onClick={() => removeImage(index)}
                        className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-2">
            <Button type="button" variant="outline" onClick={() => navigate('/shop-owner/products')} disabled={loading}
              className="flex-1 py-5 border-gray-200 text-gray-600 hover:bg-gray-50 rounded-xl">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white py-5 font-semibold rounded-xl gap-2">
              <Save className="h-4 w-4" />
              {loading ? 'Saving...' : 'Save Product'}
            </Button>
          </div>

        </form>
      </div>
    </div>
  );
};
