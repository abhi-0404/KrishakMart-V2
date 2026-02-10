import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Package, DollarSign, FileText, Image, Save, X, Upload, ArrowLeft } from 'lucide-react';
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
import { categories, getProduct, updateProduct } from '../../../services/productService';
import { toast } from 'sonner';
import { getImageUrl } from '../../../utils/imageUtils';

export const ShopOwnerEditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetchingProduct, setFetchingProduct] = useState(true);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<string[]>([]);
  const [product, setProduct] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    stock: '',
    description: '',
    usage: '',
  });

  useEffect(() => {
    if (id) {
      fetchProductData();
    }
  }, [id]);

  const fetchProductData = async () => {
    try {
      setFetchingProduct(true);
      const data = await getProduct(id!);
      
      setProduct({
        name: data.name,
        category: data.category,
        brand: data.brand,
        price: data.price.toString(),
        stock: data.stock.toString(),
        description: data.description,
        usage: data.usage || '',
      });
      
      // Set existing images
      if (data.images && data.images.length > 0) {
        setExistingImages(data.images);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Failed to load product details');
      navigate('/shop-owner/products');
    } finally {
      setFetchingProduct(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    // Validate file types and sizes
    const validFiles = files.filter(file => {
      if (!file.type.startsWith('image/')) {
        toast.error(`${file.name} is not an image file`);
        return false;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error(`${file.name} is too large. Maximum size is 5MB`);
        return false;
      }
      return true;
    });

    const totalImages = existingImages.length + selectedImages.length + validFiles.length;
    if (totalImages > 5) {
      toast.error('Maximum 5 images allowed');
      return;
    }

    // Add new files to existing ones
    const newImages = [...selectedImages, ...validFiles];
    setSelectedImages(newImages);

    // Create previews for new files
    const newPreviews = [...imagePreviews];
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        newPreviews.push(e.target?.result as string);
        setImagePreviews([...newPreviews]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeNewImage = (index: number) => {
    const newImages = selectedImages.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setSelectedImages(newImages);
    setImagePreviews(newPreviews);
  };

  const removeExistingImage = (index: number) => {
    const newExistingImages = existingImages.filter((_, i) => i !== index);
    setExistingImages(newExistingImages);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!product.name.trim()) {
      toast.error('Product name is required');
      return;
    }
    if (!product.category) {
      toast.error('Please select a category');
      return;
    }
    if (!product.brand.trim()) {
      toast.error('Brand is required');
      return;
    }
    if (!product.price || parseFloat(product.price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }
    if (!product.stock || parseInt(product.stock) < 0) {
      toast.error('Please enter a valid stock quantity');
      return;
    }
    if (!product.description.trim()) {
      toast.error('Product description is required');
      return;
    }

    try {
      setLoading(true);
      
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('name', product.name.trim());
      formData.append('category', product.category);
      formData.append('brand', product.brand.trim());
      formData.append('price', product.price);
      formData.append('stock', product.stock);
      formData.append('description', product.description.trim());
      formData.append('usage', product.usage.trim());

      // Add existing images that weren't removed
      existingImages.forEach((image) => {
        formData.append('existingImages', image);
      });

      // Add new images to FormData
      selectedImages.forEach((image) => {
        formData.append('images', image);
      });

      console.log('Updating product with data:', {
        name: product.name.trim(),
        category: product.category,
        brand: product.brand.trim(),
        price: product.price,
        stock: product.stock,
        existingImageCount: existingImages.length,
        newImageCount: selectedImages.length
      });

      await updateProduct(id!, formData);
      toast.success('Product updated successfully!');
      navigate('/shop-owner/products');
    } catch (error: any) {
      console.error('Error updating product:', error);
      const message = error.response?.data?.message || 'Failed to update product';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingProduct) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-600">Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/shop-owner/products')}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Edit Product</h1>
          <p className="text-gray-600">Update your product details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 max-w-4xl">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="price" className="text-base flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Price (₹) *
              </Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
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
                min="0"
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

          {/* Product Images */}
          <div>
            <Label className="text-base flex items-center gap-2">
              <Image className="h-4 w-4" />
              Product Images (Max 5)
            </Label>
            
            {/* Existing Images */}
            {existingImages.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">Current Images ({existingImages.length}):</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {existingImages.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={getImageUrl(image)}
                        alt={`Existing ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-gray-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeExistingImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload New Images */}
            {(existingImages.length + selectedImages.length) < 5 && (
              <div className="mt-4">
                <input
                  type="file"
                  id="images"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <label
                  htmlFor="images"
                  className="block border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-green-500 transition-colors cursor-pointer"
                >
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 mb-2">Click to upload new images</p>
                  <p className="text-sm text-gray-500">PNG, JPG up to 5MB each</p>
                </label>
              </div>
            )}

            {/* New Image Previews */}
            {imagePreviews.length > 0 && (
              <div className="mt-4">
                <p className="text-sm text-gray-600 mb-3">New Images ({imagePreviews.length}):</p>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {imagePreviews.map((preview, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={preview}
                        alt={`New ${index + 1}`}
                        className="w-full h-24 object-cover rounded-lg border-2 border-green-200"
                      />
                      <button
                        type="button"
                        onClick={() => removeNewImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button 
              type="button"
              variant="outline"
              size="lg" 
              className="flex-1 py-6 text-lg"
              onClick={() => navigate('/shop-owner/products')}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              size="lg" 
              className="flex-1 bg-green-600 hover:bg-green-700 gap-2 py-6 text-lg"
              disabled={loading}
            >
              <Save className="h-5 w-5" />
              {loading ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
