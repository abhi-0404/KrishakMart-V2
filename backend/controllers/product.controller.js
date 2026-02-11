import Product from '../models/Product.model.js';
import User from '../models/User.model.js';

// @desc    Get all products with filters
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort, sellerId } = req.query;
    const { sellerId: sellerIdParam } = req.params;
    
    let query = {};
    
    // Only show available products to non-admin users
    // Admins can see all products
    if (!req.user || req.user.role !== 'admin') {
      query.isAvailable = true;
    }

    // Seller filter (from query param or route param)
    if (sellerId || sellerIdParam) {
      query.sellerId = sellerId || sellerIdParam;
    }

    // Category filter
    if (category) {
      query.category = category;
    }

    // Search filter
    if (search) {
      query.$text = { $search: search };
    }

    // Price range filter
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    // Build query
    let productsQuery = Product.find(query).populate('sellerId', 'name shopName shopAddress phone');

    // Sorting
    if (sort === 'price-asc') {
      productsQuery = productsQuery.sort({ price: 1 });
    } else if (sort === 'price-desc') {
      productsQuery = productsQuery.sort({ price: -1 });
    } else if (sort === 'rating') {
      productsQuery = productsQuery.sort({ rating: -1 });
    } else {
      productsQuery = productsQuery.sort({ createdAt: -1 });
    }

    const products = await productsQuery;

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('sellerId', 'name shopName phone email');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Create product
// @route   POST /api/products
// @access  Private (Shop Owner)
export const createProduct = async (req, res) => {
  try {
    const { name, category, brand, price, stock, description, usage } = req.body;

    // Debug: Log the request data
    console.log('Creating product with data:', {
      name,
      category,
      brand,
      price,
      stock,
      description,
      usage: usage || 'empty',
      filesCount: req.files ? req.files.length : 0
    });

    const seller = await User.findById(req.user._id);

    // Handle image uploads
    let images = [];
    
    if (req.files && req.files.length > 0) {
      // If using Cloudinary
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        try {
          const { uploadToCloudinary } = await import('../middleware/upload.middleware.js');
          
          // Upload each file to Cloudinary
          const uploadPromises = req.files.map(file => uploadToCloudinary(file));
          images = await Promise.all(uploadPromises);
          
          console.log('Images uploaded to Cloudinary:', images);
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed, using local storage:', cloudinaryError);
          // Fallback to local storage
          images = req.files.map(file => `/uploads/products/${file.filename}`);
        }
      } else {
        // Local storage fallback
        images = req.files.map(file => `/uploads/products/${file.filename}`);
        console.log('Images stored locally:', images);
      }
    } else if (req.body.images) {
      // If images are provided as URLs (for testing or external URLs)
      images = Array.isArray(req.body.images) ? req.body.images : [req.body.images];
    }

    const productData = {
      name,
      category,
      brand,
      price: parseFloat(price),
      stock: parseInt(stock),
      description,
      usage: usage || '',
      images,
      sellerId: req.user._id,
      shopOwner: seller.shopName || seller.name,
      isAvailable: parseInt(stock) > 0
    };

    console.log('Creating product with final data:', productData);

    const product = await Product.create(productData);

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    });
  } catch (error) {
    console.error('Error creating product:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to create product'
    });
  }
};

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Shop Owner)
export const updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    console.log('Updating product with data:', {
      name: req.body.name,
      category: req.body.category,
      existingImages: req.body.existingImages,
      newFiles: req.files ? req.files.length : 0
    });

    // Handle images
    let images = [];
    
    // Keep existing images that weren't removed
    if (req.body.existingImages) {
      images = Array.isArray(req.body.existingImages) 
        ? req.body.existingImages 
        : [req.body.existingImages];
    }

    // Add new uploaded images
    if (req.files && req.files.length > 0) {
      // If using Cloudinary
      if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
        try {
          const { uploadToCloudinary } = await import('../middleware/upload.middleware.js');
          
          // Upload each file to Cloudinary
          const uploadPromises = req.files.map(file => uploadToCloudinary(file));
          const cloudinaryImages = await Promise.all(uploadPromises);
          images = [...images, ...cloudinaryImages];
          
          console.log('New images uploaded to Cloudinary:', cloudinaryImages);
        } catch (cloudinaryError) {
          console.error('Cloudinary upload failed, using local storage:', cloudinaryError);
          // Fallback to local storage
          const localImages = req.files.map(file => `/uploads/products/${file.filename}`);
          images = [...images, ...localImages];
        }
      } else {
        // Local storage fallback
        const localImages = req.files.map(file => `/uploads/products/${file.filename}`);
        images = [...images, ...localImages];
        console.log('New images stored locally:', localImages);
      }
    }

    // Update product data
    const updateData = {
      name: req.body.name,
      category: req.body.category,
      brand: req.body.brand,
      price: parseFloat(req.body.price),
      stock: parseInt(req.body.stock),
      description: req.body.description,
      usage: req.body.usage || '',
      images,
      isAvailable: parseInt(req.body.stock) > 0
    };

    console.log('Final update data:', updateData);

    product = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Product updated successfully',
      data: product
    });
  } catch (error) {
    console.error('Error updating product:', error);
    
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }
    
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to update product'
    });
  }
};

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Shop Owner/Admin)
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this product'
      });
    }

    await product.deleteOne();

    res.json({
      success: true,
      message: 'Product deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update product stock
// @route   PATCH /api/products/:id/stock
// @access  Private (Shop Owner)
export const updateStock = async (req, res) => {
  try {
    const { stock } = req.body;

    if (stock === undefined || stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Valid stock quantity is required'
      });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product.stock = stock;
    product.isAvailable = stock > 0;
    await product.save();

    res.json({
      success: true,
      message: 'Stock updated successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Toggle product visibility
// @route   PATCH /api/products/:id/visibility
// @access  Private (Shop Owner/Admin)
export const toggleProductVisibility = async (req, res) => {
  try {
    const { isAvailable } = req.body;

    if (isAvailable === undefined) {
      return res.status(400).json({
        success: false,
        message: 'isAvailable field is required'
      });
    }

    let product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    // Check ownership
    if (product.sellerId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this product'
      });
    }

    product.isAvailable = isAvailable;
    await product.save();

    res.json({
      success: true,
      message: `Product ${isAvailable ? 'is now visible' : 'is now hidden'} to users`,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get seller's products
// @route   GET /api/products/seller/my-products
// @access  Private (Shop Owner)
export const getSellerProducts = async (req, res) => {
  try {
    const products = await Product.find({ sellerId: req.user._id })
      .sort({ createdAt: -1 });

    // Debug: Log the products to see the images array
    console.log('Seller products:', products.map(p => ({
      name: p.name,
      images: p.images,
      image: p.image // virtual field
    })));

    res.json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
