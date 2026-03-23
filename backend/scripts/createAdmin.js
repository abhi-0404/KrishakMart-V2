import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishakmart';

const createAdmin = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Remove existing admin if any
    await User.deleteOne({ phone: '9999999999' });

    // Create fresh admin
    const admin = await User.create({
      name: 'Admin User',
      phone: '9999999999',
      password: 'admin123',
      role: 'admin',
      email: 'admin@krishakmart.com',
    });

    console.log('✅ Admin user created successfully!');
    console.log('   Phone:    9999999999');
    console.log('   Password: admin123');
    console.log('   Role:     admin');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
};

createAdmin();
