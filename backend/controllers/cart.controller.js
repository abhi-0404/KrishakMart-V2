import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';

// @desc    Get user cart
// @route   GET /api/cart
// @access  Private (Farmer)
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ farmerId: req.user._id })
      .populate('items.productId');

    if (!cart) {
      cart = await Cart.create({ farmerId: req.user._id, items: [] });
    }

    res.json({
      success: true,
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Add item to cart
// @route   POST /api/cart
// @access  Private (Farmer)
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    // Check if product exists and has stock
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ farmerId: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        farmerId: req.user._id,
        items: [{ productId, quantity }]
      });
    } else {
      // Check if item already exists
      const itemIndex = cart.items.findIndex(
        item => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        // Update quantity
        cart.items[itemIndex].quantity += quantity;
      } else {
        // Add new item
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    cart = await Cart.findOne({ farmerId: req.user._id })
      .populate('items.productId');

    res.json({
      success: true,
      message: 'Item added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update cart item quantity
// @route   PUT /api/cart/:productId
// @access  Private (Farmer)
export const updateCartItem = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { productId } = req.params;

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: 'Quantity must be at least 1'
      });
    }

    // Check stock
    const product = await Product.findById(productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient stock'
      });
    }

    let cart = await Cart.findOne({ farmerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    const itemIndex = cart.items.findIndex(
      item => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item not found in cart'
      });
    }

    cart.items[itemIndex].quantity = quantity;
    await cart.save();

    cart = await Cart.findOne({ farmerId: req.user._id })
      .populate('items.productId');

    res.json({
      success: true,
      message: 'Cart updated',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Remove item from cart
// @route   DELETE /api/cart/:productId
// @access  Private (Farmer)
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ farmerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = cart.items.filter(
      item => item.productId.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ farmerId: req.user._id })
      .populate('items.productId');

    res.json({
      success: true,
      message: 'Item removed from cart',
      data: updatedCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Clear cart
// @route   DELETE /api/cart
// @access  Private (Farmer)
export const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ farmerId: req.user._id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: 'Cart not found'
      });
    }

    cart.items = [];
    await cart.save();

    res.json({
      success: true,
      message: 'Cart cleared',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
