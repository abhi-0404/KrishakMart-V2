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
import { upload } from '../middleware/upload.middleware.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/seller/my-products', protect, authorize('shopOwner', 'admin'), getSellerProducts);
router.get('/:id', getProduct);
router.post('/', protect, authorize('shopOwner', 'admin'), upload.array('images', 5), createProduct);
router.put('/:id', protect, authorize('shopOwner', 'admin'), upload.array('images', 5), updateProduct);
router.delete('/:id', protect, authorize('shopOwner', 'admin'), deleteProduct);

export default router;
