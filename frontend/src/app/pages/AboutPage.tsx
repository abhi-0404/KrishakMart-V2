import React from 'react';
import { Target, Users, Shield, Zap } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">About AgriMart</h1>
          <p className="text-2xl text-gray-600 max-w-3xl mx-auto">
            Connecting farmers with local suppliers, making quality farming supplies accessible to everyone.
          </p>
        </div>

        {/* Mission */}
        <div className="bg-white rounded-2xl p-12 shadow-lg border-2 border-green-200 mb-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-green-100 p-4 rounded-xl">
              <Target className="h-10 w-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            AgriMart was created to solve a critical problem faced by farmers across India - the time and effort 
            required to source quality farming supplies. We connect farmers directly with local agricultural suppliers, 
            eliminating the need for long travels and making essential farming products easily accessible online.
          </p>
        </div>

        {/* Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center">
            <div className="bg-green-100 p-4 rounded-xl inline-block mb-4">
              <Users className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Farmer-Centric</h3>
            <p className="text-gray-600">
              Designed with simplicity in mind for easy use by all farmers, regardless of tech experience.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center">
            <div className="bg-blue-100 p-4 rounded-xl inline-block mb-4">
              <Shield className="h-10 w-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Trust & Quality</h3>
            <p className="text-gray-600">
              Only genuine products from verified suppliers to ensure farmers get the best quality.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md border-2 border-green-200 text-center">
            <div className="bg-orange-100 p-4 rounded-xl inline-block mb-4">
              <Zap className="h-10 w-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast & Reliable</h3>
            <p className="text-gray-600">
              Quick delivery to save farmers' valuable time so they can focus on their fields.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-green-700 to-green-900 rounded-2xl p-12 text-white">
          <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2">1,200+</div>
              <div className="text-xl text-green-100">Farmers Served</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">150+</div>
              <div className="text-xl text-green-100">Local Suppliers</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">2,800+</div>
              <div className="text-xl text-green-100">Products Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">8,000+</div>
              <div className="text-xl text-green-100">Orders Delivered</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
