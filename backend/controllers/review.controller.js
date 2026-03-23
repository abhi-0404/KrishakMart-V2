import Review from '../models/Review.model.js';
import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';

// @desc    Add review
// @route   POST /api/reviews/:productId
// @access  Private (Farmer)
export const addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // ── Gate: farmer must have a Delivered order containing this product ──
    const deliveredOrder = await Order.findOne({
      farmerId: req.user._id,
      orderStatus: 'Delivered',
      'products.productId': productId,
    });

    if (!deliveredOrder) {
      return res.status(403).json({
        success: false,
        message: 'You can only review products you have purchased and received.',
      });
    }

    // Check if already reviewed
    const existingReview = await Review.findOne({ productId, farmerId: req.user._id });
    if (existingReview) {
      return res.status(400).json({ success: false, message: 'You have already reviewed this product' });
    }

    const review = await Review.create({
      productId,
      farmerId: req.user._id,
      farmerName: req.user.name,
      rating,
      comment,
    });

    // Update product rating
    const reviews = await Review.find({ productId });
    const avgRating = reviews.reduce((acc, item) => item.rating + acc, 0) / reviews.length;
    product.rating = avgRating;
    product.numReviews = reviews.length;
    await product.save();

    res.status(201).json({ success: true, message: 'Review added successfully', data: review });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get product reviews
// @route   GET /api/reviews/:productId
// @access  Public
export const getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ productId: req.params.productId })
      .populate('farmerId', 'name')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: reviews.length,
      data: reviews
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Check if farmer can review a product
// @route   GET /api/reviews/:productId/can-review
// @access  Private (Farmer)
export const canReview = async (req, res) => {
  try {
    const { productId } = req.params;

    const deliveredOrder = await Order.findOne({
      farmerId: req.user._id,
      orderStatus: 'Delivered',
      'products.productId': productId,
    });

    const alreadyReviewed = await Review.findOne({
      productId,
      farmerId: req.user._id,
    });

    res.json({
      success: true,
      data: {
        canReview: !!deliveredOrder && !alreadyReviewed,
        hasPurchased: !!deliveredOrder,
        alreadyReviewed: !!alreadyReviewed,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
