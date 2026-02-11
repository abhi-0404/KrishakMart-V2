import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishakmart';

const clearProducts = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Delete all products
    console.log('🗑️  Deleting all products...');
    const result = await Product.deleteMany({});
    console.log(`✅ Deleted ${result.deletedCount} products`);

    console.log('\n✅ All products cleared successfully!');
    console.log('📝 Users are still intact. You can now add real products.');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing products:', error);
    process.exit(1);
  }
};

clearProducts();
