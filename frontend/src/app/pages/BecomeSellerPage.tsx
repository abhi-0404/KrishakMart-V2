import React from 'react';
import { Link } from 'react-router-dom';
import { Store, DollarSign, Users, TrendingUp, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';

export const BecomeSellerPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">Become a Seller on AgriMart</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto mb-8">
            Join hundreds of shop owners reaching farmers across India. Grow your business online!
          </p>
          <Link to="/signup/shop-owner">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-12 py-8 gap-3">
              <Store className="h-6 w-6" />
              Register Your Shop
            </Button>
          </Link>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="bg-green-100 p-4 rounded-xl inline-block mb-4 group-hover:scale-105 transition-transform duration-300">
              <Users className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Reach More Farmers</h3>
            <p className="text-gray-600">
              Connect with 1000+ farmers looking for quality farming supplies
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4 group-hover:scale-105 transition-transform duration-300">
              <DollarSign className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Grow Your Revenue</h3>
            <p className="text-gray-600">
              Increase sales by 3x with online presence and easy ordering
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="bg-orange-100 p-4 rounded-xl inline-block mb-4 group-hover:scale-105 transition-transform duration-300">
              <Store className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Easy to Manage</h3>
            <p className="text-gray-600">
              Simple dashboard to manage products, orders, and earnings
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center hover:border-green-500 hover:shadow-lg transition-all duration-300 group overflow-hidden">
            <div className="bg-purple-100 p-4 rounded-xl inline-block mb-4 group-hover:scale-105 transition-transform duration-300">
              <TrendingUp className="h-10 w-10 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Business Growth</h3>
            <p className="text-gray-600">
              Get insights and analytics to grow your agricultural business
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-green-200 mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Register', desc: 'Sign up with your shop details and documents' },
              { step: '2', title: 'List Products', desc: 'Add your farming products with details and prices' },
              { step: '3', title: 'Receive Orders', desc: 'Get orders from farmers in your area' },
              { step: '4', title: 'Earn & Grow', desc: 'Deliver products and grow your business' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="text-center bg-green-50 rounded-xl p-6 border-2 border-green-100 hover:border-green-500 hover:shadow-lg transition-all duration-300 group">
                <div className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                  {step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Features */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-12 text-white mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Seller Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              'Easy product listing and management',
              'Real-time order notifications',
              'Secure payment processing',
              'Detailed earnings reports',
              'Customer management tools',
              'Inventory tracking',
              'Marketing support',
              '24/7 seller support',
            ].map((feature, index) => (
              <div key={index} className="flex items-center gap-3">
                <CheckCircle className="h-6 w-6 flex-shrink-0" />
                <span className="text-lg">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Ready to Start Selling?</h2>
          <p className="text-xl text-gray-600 mb-8">Join AgriMart today and reach thousands of farmers</p>
          <Link to="/signup/shop-owner">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-xl px-12 py-8 gap-3">
              <Store className="h-6 w-6" />
              Create Seller Account
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
