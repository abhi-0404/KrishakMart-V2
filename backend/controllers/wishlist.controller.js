import Wishlist from '../models/Wishlist.model.js';
import Product from '../models/Product.model.js';
import Cart from '../models/Cart.model.js';

// @desc    Get wishlist
// @route   GET /api/wishlist
// @access  Private (Farmer)
export const getWishlist = async (req, res) => {
  try {
    let wishlist = await Wishlist.findOne({ farmerId: req.user._id })
      .populate('products');

    if (!wishlist) {
      wishlist = await Wishlist.create({ farmerId: req.user._id, products: [] });
    }

    res.json({
      success: true,
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add to wishlist
// @route   POST /api/wishlist/:productId
// @access  Private (Farmer)
export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    let wishlist = await Wishlist.findOne({ farmerId: req.user._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({
        farmerId: req.user._id,
        products: [productId]
      });
    } else {
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({
          success: false,
          message: 'Product already in wishlist'
        });
      }
      wishlist.products.push(productId);
      await wishlist.save();
    }

    wishlist = await Wishlist.findOne({ farmerId: req.user._id })
      .populate('products');

    res.json({
      success: true,
      message: 'Added to wishlist',
      data: wishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove from wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private (Farmer)
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    const wishlist = await Wishlist.findOne({ farmerId: req.user._id });

    if (!wishlist) {
      return res.status(404).json({
        success: false,
        message: 'Wishlist not found'
      });
    }

    wishlist.products = wishlist.products.filter(
      id => id.toString() !== productId
    );

    await wishlist.save();

    const updatedWishlist = await Wishlist.findOne({ farmerId: req.user._id })
      .populate('products');

    res.json({
      success: true,
      message: 'Removed from wishlist',
      data: updatedWishlist
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Move wishlist item to cart
// @route   POST /api/wishlist/:productId/move-to-cart
// @access  Private (Farmer)
export const moveToCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < 1) {
      return res.status(400).json({
        success: false,
        message: 'Product out of stock'
      });
    }

    // Add to cart
    let cart = await Cart.findOne({ farmerId: req.user._id });
    if (!cart) {
      cart = await Cart.create({ farmerId: req.user._id, items: [] });
    }

    const existingItem = cart.items.find(
      item => item.productId.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, quantity: 1 });
    }

    await cart.save();

    // Remove from wishlist
    const wishlist = await Wishlist.findOne({ farmerId: req.user._id });
    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        id => id.toString() !== productId
      );
      await wishlist.save();
    }

    res.json({
      success: true,
      message: 'Moved to cart'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
