import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart
} from '../controllers/wishlist.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);
router.use(authorize('farmer'));

router.get('/', getWishlist);
router.post('/:productId', addToWishlist);
router.delete('/:productId', removeFromWishlist);
router.post('/:productId/move-to-cart', moveToCart);

export default router;
