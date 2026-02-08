import express from 'express';
import { addReview, getProductReviews } from '../controllers/review.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

router.get('/:productId', getProductReviews);
router.post('/:productId', protect, authorize('farmer'), addReview);

export default router;
