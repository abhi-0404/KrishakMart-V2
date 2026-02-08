import express from 'express';
import {
  updateProfile,
  addAddress,
  updateAddress,
  deleteAddress
} from '../controllers/user.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.use(protect);

router.put('/profile', updateProfile);
router.post('/addresses', authorize('farmer'), addAddress);
router.put('/addresses/:addressId', authorize('farmer'), updateAddress);
router.delete('/addresses/:addressId', authorize('farmer'), deleteAddress);

export default router;
