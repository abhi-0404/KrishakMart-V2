import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['order_placed', 'order_accepted', 'order_rejected', 'order_packed', 'order_shipped', 'order_delivered', 'order_cancelled', 'new_product', 'stock_low'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  orderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  isRead: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ userId: 1, isRead: 1, createdAt: -1 });

export default mongoose.model('Notification', notificationSchema);
