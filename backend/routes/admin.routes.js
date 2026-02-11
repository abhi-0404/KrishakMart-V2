import express from 'express';
import {
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  getAllOrders,
  getAllProducts,
  getDashboardStats,
  getSellerEarnings
} from '../controllers/admin.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.get('/users', authorize('admin'), getAllUsers);
router.put('/users/:id/block', authorize('admin'), toggleBlockUser);
router.delete('/users/:id', authorize('admin'), deleteUser);
router.get('/orders', authorize('admin'), getAllOrders);
router.get('/products', authorize('admin'), getAllProducts);
router.get('/stats', authorize('admin'), getDashboardStats);
router.get('/seller/:id/earnings', authorize('admin', 'shopOwner'), getSellerEarnings);
router.get('/seller/earnings', authorize('shopOwner'), getSellerEarnings);

export default router;
