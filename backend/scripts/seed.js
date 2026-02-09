import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Product from '../models/Product.model.js';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishakmart';

// Sample data
const users = [
  {
    name: 'Admin User',
    phone: '9999999999',
    password: 'admin123',
    role: 'admin',
    email: 'admin@krishakmart.com'
  },
  {
    name: 'Ramesh Kumar',
    phone: '9876543210',
    password: 'farmer123',
    role: 'farmer',
    email: 'ramesh@example.com',
    addresses: [{
      label: 'Home',
      fullAddress: 'Village Rampur, Near Temple',
      village: 'Rampur',
      district: 'Meerut',
      state: 'Uttar Pradesh',
      pincode: '250001',
      phone: '9876543210',
      isDefault: true
    }]
  },
  {
    name: 'Suresh Patel',
    phone: '9876543211',
    password: 'farmer123',
    role: 'farmer',
    email: 'suresh@example.com',
    addresses: [{
      label: 'Home',
      fullAddress: 'Village Patelnagar',
      village: 'Patelnagar',
      district: 'Meerut',
      state: 'Uttar Pradesh',
      pincode: '250002',
      phone: '9876543211',
      isDefault: true
    }]
  },
  {
    name: 'Agri Supplies Store',
    phone: '9876543220',
    password: 'shop123',
    role: 'shopOwner',
    email: 'agrisupplies@example.com',
    shopName: 'Agri Supplies Store',
    shopAddress: 'Main Market, Meerut',
    shopDescription: 'Quality agricultural products for farmers',
    gstNumber: 'GST123456789'
  },
  {
    name: 'Kisan Bhandar',
    phone: '9876543221',
    password: 'shop123',
    role: 'shopOwner',
    email: 'kisanbhandar@example.com',
    shopName: 'Kisan Bhandar',
    shopAddress: 'Gandhi Road, Meerut',
    shopDescription: 'Complete farming solutions',
    gstNumber: 'GST987654321'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB Connected');

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    console.log('✅ Data cleared');

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = await User.create(users);
    console.log(`✅ Created ${createdUsers.length} users`);

    // Get shop owners
    const shopOwners = createdUsers.filter(u => u.role === 'shopOwner');

    // Sample products
    const products = [
      // Seeds
      {
        name: 'Wheat Seeds - HD 2967',
        category: 'seeds',
        brand: 'IARI',
        price: 450,
        stock: 100,
        description: 'High yielding wheat variety suitable for irrigated conditions',
        usage: 'Sow in November-December. Requires 4-5 irrigations',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Wheat+Seeds'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'Rice Seeds - Pusa Basmati 1121',
        category: 'seeds',
        brand: 'Pusa',
        price: 850,
        stock: 80,
        description: 'Premium basmati rice seeds with excellent aroma',
        usage: 'Transplant in June-July. Requires regular irrigation',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Rice+Seeds'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'Tomato Seeds - Hybrid',
        category: 'seeds',
        brand: 'Syngenta',
        price: 250,
        stock: 150,
        description: 'High yielding hybrid tomato seeds',
        usage: 'Sow in nursery, transplant after 25-30 days',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Tomato+Seeds'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      // Fertilizers
      {
        name: 'Urea Fertilizer - 50kg',
        category: 'fertilizers',
        brand: 'IFFCO',
        price: 300,
        stock: 200,
        description: 'Nitrogen fertilizer for all crops',
        usage: 'Apply as per soil test recommendations',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Urea'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'DAP Fertilizer - 50kg',
        category: 'fertilizers',
        brand: 'IFFCO',
        price: 1350,
        stock: 150,
        description: 'Di-ammonium phosphate for better root development',
        usage: 'Apply at sowing time',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=DAP'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'NPK 19:19:19 - 25kg',
        category: 'fertilizers',
        brand: 'Coromandel',
        price: 850,
        stock: 100,
        description: 'Balanced NPK fertilizer for all crops',
        usage: 'Apply during vegetative growth stage',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=NPK'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      // Pesticides
      {
        name: 'Chlorpyrifos 20% EC - 1L',
        category: 'pesticides',
        brand: 'Bayer',
        price: 450,
        stock: 75,
        description: 'Broad spectrum insecticide',
        usage: 'Spray 2ml per liter of water',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Pesticide'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      {
        name: 'Mancozeb 75% WP - 500g',
        category: 'pesticides',
        brand: 'UPL',
        price: 280,
        stock: 90,
        description: 'Fungicide for disease control',
        usage: 'Spray 2.5g per liter of water',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Fungicide'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      // Tools
      {
        name: 'Garden Spade',
        category: 'tools',
        brand: 'Falcon',
        price: 350,
        stock: 50,
        description: 'Heavy duty garden spade with wooden handle',
        usage: 'For digging and soil preparation',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Spade'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      {
        name: 'Pruning Shears',
        category: 'tools',
        brand: 'Gardena',
        price: 450,
        stock: 40,
        description: 'Professional pruning shears',
        usage: 'For cutting branches and stems',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Shears'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'Hand Cultivator',
        category: 'tools',
        brand: 'Falcon',
        price: 250,
        stock: 60,
        description: 'Hand cultivator for weeding',
        usage: 'For removing weeds and loosening soil',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Cultivator'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      // Irrigation
      {
        name: 'Drip Irrigation Kit - 100m',
        category: 'irrigation',
        brand: 'Jain',
        price: 2500,
        stock: 30,
        description: 'Complete drip irrigation system',
        usage: 'For efficient water management',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Drip+Kit'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'Sprinkler System',
        category: 'irrigation',
        brand: 'Netafim',
        price: 1800,
        stock: 25,
        description: 'Rotating sprinkler for uniform water distribution',
        usage: 'For large field irrigation',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Sprinkler'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      },
      // Feed
      {
        name: 'Cattle Feed - 50kg',
        category: 'feed',
        brand: 'Amul',
        price: 1200,
        stock: 80,
        description: 'Nutritious cattle feed',
        usage: 'Feed 2-3 kg per animal per day',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Cattle+Feed'],
        sellerId: shopOwners[0]._id,
        shopOwner: shopOwners[0].shopName
      },
      {
        name: 'Poultry Feed - 25kg',
        category: 'feed',
        brand: 'Godrej',
        price: 850,
        stock: 100,
        description: 'Complete poultry feed',
        usage: 'Feed as per bird age and weight',
        images: ['https://via.placeholder.com/400x400/2f7c4f/ffffff?text=Poultry+Feed'],
        sellerId: shopOwners[1]._id,
        shopOwner: shopOwners[1].shopName
      }
    ];

    console.log('📦 Creating products...');
    const createdProducts = await Product.create(products);
    console.log(`✅ Created ${createdProducts.length} products`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('\n👨‍💼 Admin:');
    console.log('   Phone: 9999999999');
    console.log('   Password: admin123');
    console.log('\n👨‍🌾 Farmer 1:');
    console.log('   Phone: 9876543210');
    console.log('   Password: farmer123');
    console.log('\n👨‍🌾 Farmer 2:');
    console.log('   Phone: 9876543211');
    console.log('   Password: farmer123');
    console.log('\n🏪 Shop Owner 1:');
    console.log('   Phone: 9876543220');
    console.log('   Password: shop123');
    console.log('\n🏪 Shop Owner 2:');
    console.log('   Phone: 9876543221');
    console.log('   Password: shop123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
