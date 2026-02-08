import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  farmerName: String,
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

// Compound index to ensure one review per farmer per product
reviewSchema.index({ productId: 1, farmerId: 1 }, { unique: true });

export default mongoose.model('Review', reviewSchema);
