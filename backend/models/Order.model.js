import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  quantity: {
    type: Number,
    required: true,
    min: 1
  },
  price: {
    type: Number,
    required: true
  },
  image: String
});

const orderSchema = new mongoose.Schema({
  farmerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: String,
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [orderItemSchema],
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryAddress: {
    fullAddress: { type: String, required: true },
    village: String,
    district: String,
    state: String,
    pincode: String,
    phone: String
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'UPI', 'QR'],
    default: 'COD'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed'],
    default: 'Pending'
  },
  orderStatus: {
    type: String,
    enum: ['Pending', 'Accepted', 'Packed', 'Shipped', 'Delivered', 'Cancelled', 'Rejected'],
    default: 'Pending'
  },
  statusHistory: [{
    status: String,
    timestamp: { type: Date, default: Date.now },
    note: String
  }],
  cancelReason: String,
  orderDate: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Order', orderSchema);
