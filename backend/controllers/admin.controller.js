import mongoose from 'mongoose';
import User from '../models/User.model.js';
import Product from '../models/Product.model.js';
import Order from '../models/Order.model.js';

// @desc    Get all users
// @route   GET /api/admin/users
// @access  Private (Admin)
export const getAllUsers = async (req, res) => {
  try {
    const { role } = req.query;
    
    let query = {};
    if (role) {
      query.role = role;
    }

    const users = await User.find(query).select('-password').sort({ createdAt: -1 });

    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Block/Unblock user
// @route   PUT /api/admin/users/:id/block
// @access  Private (Admin)
export const toggleBlockUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    user.isBlocked = !user.isBlocked;
    await user.save();

    res.json({
      success: true,
      message: `User ${user.isBlocked ? 'blocked' : 'unblocked'} successfully`,
      data: user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all orders
// @route   GET /api/admin/orders
// @access  Private (Admin)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('farmerId', 'name phone')
      .populate('sellerId', 'name shopName')
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

// @desc    Get all products
// @route   GET /api/admin/products
// @access  Private (Admin)
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('sellerId', 'name shopName')
      .sort({ createdAt: -1 });

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

// @desc    Get dashboard stats
// @route   GET /api/admin/stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
  try {
    const totalFarmers = await User.countDocuments({ role: 'farmer' });
    const totalSellers = await User.countDocuments({ role: 'shopOwner' });
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();

    // Calculate total revenue
    const orders = await Order.find({ orderStatus: 'Delivered' });
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Orders by status
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$orderStatus',
          count: { $sum: 1 }
        }
      }
    ]);

    // Products by category
    const productsByCategory = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          totalValue: { $sum: { $multiply: ['$price', '$stock'] } }
        }
      }
    ]);

    // Monthly sales
    const monthlySales = await Order.aggregate([
      {
        $match: {
          orderStatus: 'Delivered',
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          totalSales: { $sum: '$totalAmount' },
          orderCount: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        overview: {
          totalFarmers,
          totalSellers,
          totalProducts,
          totalOrders,
          totalRevenue
        },
        ordersByStatus,
        productsByCategory,
        monthlySales
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get seller earnings
// @route   GET /api/admin/seller/:id/earnings
// @route   GET /api/admin/seller/earnings
// @access  Private (Shop Owner/Admin)
export const getSellerEarnings = async (req, res) => {
  try {
    const sellerId = req.params.id || req.user._id.toString();

    // Check authorization
    if (req.user.role === 'shopOwner' && sellerId !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    const orders = await Order.find({
      sellerId,
      orderStatus: 'Delivered'
    });

    const totalEarnings = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    const totalOrders = orders.length;

    // Monthly earnings
    const monthlyEarnings = await Order.aggregate([
      {
        $match: {
          sellerId: new mongoose.Types.ObjectId(sellerId),
          orderStatus: 'Delivered',
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          earnings: { $sum: '$totalAmount' },
          orders: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    res.json({
      success: true,
      data: {
        totalEarnings,
        totalOrders,
        monthlyEarnings
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
