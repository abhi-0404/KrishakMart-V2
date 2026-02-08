import express from 'express';
import {
  createOrder,
  getFarmerOrders,
  getSellerOrders,
  getOrder,
  updateOrderStatus,
  cancelOrder,
  reorder
} from '../controllers/order.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.post('/', authorize('farmer'), createOrder);
router.get('/my-orders', authorize('farmer'), getFarmerOrders);
router.get('/seller/orders', authorize('shopOwner'), getSellerOrders);
router.get('/:id', getOrder);
router.put('/:id/status', authorize('shopOwner', 'admin'), updateOrderStatus);
router.put('/:id/cancel', cancelOrder);
router.post('/:id/reorder', authorize('farmer'), reorder);

export default router;
