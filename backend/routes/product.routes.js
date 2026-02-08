import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  getSellerProducts
} from '../controllers/product.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/seller/my-products', protect, authorize('shopOwner'), getSellerProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('shopOwner'), createProduct);
router.put('/:id', protect, authorize('shopOwner', 'admin'), updateProduct);
router.delete('/:id', protect, authorize('shopOwner', 'admin'), deleteProduct);

export default router;
