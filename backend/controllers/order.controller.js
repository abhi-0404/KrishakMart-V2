import Order from '../models/Order.model.js';
import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';
import User from '../models/User.model.js';
import { createNotification } from './notification.controller.js';

// @desc    Create order
// @route   POST /api/orders
// @access  Private (Farmer)
export const createOrder = async (req, res) => {
  try {
    const { products, deliveryAddress, paymentMethod } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No products in order'
      });
    }

    // Validate and calculate total
    let totalAmount = 0;
    const orderItems = [];

    for (const item of products) {
      const product = await Product.findById(item.productId);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Product ${item.productId} not found`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          success: false,
          message: `Insufficient stock for ${product.name}`
        });
      }

      totalAmount += product.price * item.quantity;
      
      orderItems.push({
        productId: product._id,
        productName: product.name,
        quantity: item.quantity,
        price: product.price,
        image: product.images[0] || ''
      });

      // Reduce stock
      product.stock -= item.quantity;
      product.isAvailable = product.stock > 0;
      await product.save();
    }

    // Get seller ID from first product
    const firstProduct = await Product.findById(products[0].productId);
    
    // Create order
    const order = await Order.create({
      farmerId: req.user._id,
      customerName: req.user.name,
      sellerId: firstProduct.sellerId,
      products: orderItems,
      totalAmount,
      deliveryAddress,
      paymentMethod: paymentMethod || 'COD',
      statusHistory: [{
        status: 'Pending',
        timestamp: new Date()
      }]
    });

    // Clear cart
    await Cart.findOneAndUpdate(
      { farmerId: req.user._id },
      { items: [] }
    );

    // Create notifications
    await createNotification(
      firstProduct.sellerId,
      'order_placed',
      'New Order Received',
      `You have received a new order #${order._id.toString().slice(-6)} worth ₹${totalAmount}`,
      order._id
    );

    await createNotification(
      req.user._id,
      'order_placed',
      'Order Placed Successfully',
      `Your order #${order._id.toString().slice(-6)} has been placed successfully`,
      order._id
    );

    res.status(201).json({
      success: true,
      message: 'Order placed successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get farmer orders
// @route   GET /api/orders/my-orders
// @access  Private (Farmer)
export const getFarmerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ farmerId: req.user._id })
      .populate('sellerId', 'name shopName phone')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get seller orders
// @route   GET /api/orders/seller/orders
// @access  Private (Shop Owner)
export const getSellerOrders = async (req, res) => {
  try {
    const orders = await Order.find({ sellerId: req.user._id })
      .populate('farmerId', 'name phone addresses')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('farmerId', 'name phone email addresses')
      .populate('sellerId', 'name shopName phone email');

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (
      order.farmerId._id.toString() !== req.user._id.toString() &&
      order.sellerId._id.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this order'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update order status
// @route   PUT /api/orders/:id/status
// @access  Private (Shop Owner/Admin)
export const updateOrderStatus = async (req, res) => {
  try {
    const { status, note } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check authorization
    if (
      order.sellerId.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this order'
      });
    }

    order.orderStatus = status;
    order.statusHistory.push({
      status,
      timestamp: new Date(),
      note: note || ''
    });

    if (status === 'Delivered') {
      order.paymentStatus = 'Paid';
    }

    await order.save();

    // Create notifications
    let notificationType = 'order_accepted';
    let notificationTitle = 'Order Status Updated';
    let notificationMessage = `Your order #${order._id.toString().slice(-6)} status: ${status}`;

    if (status === 'Shipped') {
      notificationType = 'order_shipped';
      notificationTitle = 'Order Shipped';
      notificationMessage = `Your order #${order._id.toString().slice(-6)} has been shipped`;
    } else if (status === 'Delivered') {
      notificationType = 'order_delivered';
      notificationTitle = 'Order Delivered';
      notificationMessage = `Your order #${order._id.toString().slice(-6)} has been delivered`;
    } else if (status === 'Rejected') {
      notificationType = 'order_rejected';
      notificationTitle = 'Order Rejected';
      notificationMessage = `Your order #${order._id.toString().slice(-6)} has been rejected`;
    }

    await createNotification(
      order.farmerId,
      notificationType,
      notificationTitle,
      notificationMessage,
      order._id
    );

    res.json({
      success: true,
      message: 'Order status updated',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel order
// @route   PUT /api/orders/:id/cancel
// @access  Private (Farmer/Seller)
export const cancelOrder = async (req, res) => {
  try {
    const { reason } = req.body;

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    // Check if order can be cancelled
    if (['Shipped', 'Delivered'].includes(order.orderStatus)) {
      return res.status(400).json({
        success: false,
        message: 'Cannot cancel order that has been shipped or delivered'
      });
    }

    // Check authorization
    if (
      order.farmerId.toString() !== req.user._id.toString() &&
      order.sellerId.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this order'
      });
    }

    // Restore stock
    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      if (product) {
        product.stock += item.quantity;
        product.isAvailable = true;
        await product.save();
      }
    }

    order.orderStatus = 'Cancelled';
    order.cancelReason = reason;
    order.statusHistory.push({
      status: 'Cancelled',
      timestamp: new Date(),
      note: reason
    });

    await order.save();

    res.json({
      success: true,
      message: 'Order cancelled successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Reorder
// @route   POST /api/orders/:id/reorder
// @access  Private (Farmer)
export const reorder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    if (order.farmerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Add items to cart
    let cart = await Cart.findOne({ farmerId: req.user._id });
    
    if (!cart) {
      cart = await Cart.create({ farmerId: req.user._id, items: [] });
    }

    for (const item of order.products) {
      const product = await Product.findById(item.productId);
      
      if (product && product.stock >= item.quantity) {
        const existingItem = cart.items.find(
          i => i.productId.toString() === item.productId.toString()
        );

        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          cart.items.push({
            productId: item.productId,
            quantity: item.quantity
          });
        }
      }
    }

    await cart.save();

    res.json({
      success: true,
      message: 'Items added to cart',
      data: cart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
