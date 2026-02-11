import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { Button } from '../components/ui/button';

export const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600">We're here to help! Reach out to us anytime.</p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-xl p-8 shadow-lg border-2 border-green-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <Phone className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Phone</h3>
                  <p className="text-gray-600">+91-1800-123-4567</p>
                  <p className="text-sm text-gray-500">Toll-free (9 AM - 6 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Mail className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email</h3>
                  <p className="text-gray-600">support@agrimart.com</p>
                  <p className="text-sm text-gray-500">24/7 support</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-lg">
                  <MapPin className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Address</h3>
                  <p className="text-gray-600">
                    AgriMart Headquarters<br />
                    Connaught Place, New Delhi<br />
                    India - 110001
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Working Hours</h3>
                  <p className="text-gray-600">
                    Monday - Saturday: 9:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
            <p className="mb-6">Our customer support team is available to assist you with any queries.</p>
            <a href="tel:18001234567">
              <Button size="lg" className="w-full bg-white text-green-700 hover:bg-green-50">
                <Phone className="h-5 w-5 mr-2" />
                Call Now: 1800-123-4567
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
