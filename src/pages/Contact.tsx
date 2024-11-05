import React from 'react';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';

export default function Contact() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-purple-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            We're Here To Help
          </h1>
          <p className="text-lg text-gray-600">
            Have questions about PuppyPack? We're here to support you and your puppy on every step of your journey.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Email Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Mail className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us an email anytime. We aim to respond within 24 hours.
              </p>
              <a
                href="mailto:support@puppypack.co"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
              >
                support@puppypack.co
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Location Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
              <p className="text-gray-600">
                Farmingdale, New York<br />
                United States
              </p>
            </div>
          </div>

          {/* Hours Card */}
          <div className="bg-white rounded-xl shadow-sm p-8 hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-pink-50 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Support Hours</h3>
              <p className="text-gray-600">
                Monday - Friday<br />
                9:00 AM - 6:00 PM EST
              </p>
              <p className="mt-4 text-sm text-gray-500">
                Email support available 24/7
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}