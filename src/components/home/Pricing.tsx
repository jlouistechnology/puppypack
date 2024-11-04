import React from 'react';
import { Check, Sparkles, Heart, PawPrint } from 'lucide-react';
import { Link } from 'react-router-dom';

const Pricing = () => {
  const features = [
    'Personalized 52-week training plan',
    '24/7 AI puppy expert assistance',
    'Progress tracking & assessments',
    'Weekly action items & guidance',
    'Health & wellness monitoring',
    'Community support'
  ];

  return (
    <section className="py-16 bg-purple-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-gray-600">Choose the plan that works best for you</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-white rounded-2xl shadow-lg p-8 relative border border-gray-100">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Monthly Access</h3>
              <div className="text-4xl font-bold text-gray-900 mb-1">$9<span className="text-lg font-normal text-gray-500">/month</span></div>
              <p className="text-gray-500">Cancel anytime</p>
            </div>
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-gray-600">
                  <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Link
              to="https://buy.stripe.com/6oE6s73xn7Cy00MfZf"
              className="block w-full bg-purple-600 text-white text-center py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Get Started
            </Link>
          </div>

          {/* Lifetime Plan */}
          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-2xl shadow-xl p-8 relative transform hover:scale-105 transition-transform">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1 rounded-full flex items-center space-x-1">
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">BEST VALUE</span>
            </div>
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Lifetime Access</h3>
              <div className="flex items-center justify-center space-x-2 mb-1">
                <span className="text-lg line-through text-purple-200">$99</span>
                <div className="text-4xl font-bold text-white">$47</div>
              </div>
              <p className="text-purple-100">One-time payment</p>
            </div>
            
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center text-white">
                  <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
              <li className="flex items-center text-white">
                <Check className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                <span className="font-medium">Lifetime updates & support</span>
              </li>
            </ul>
            
            <Link
              to="https://buy.stripe.com/8wM7wb5Fv5uq28U5kA"
              className="block w-full bg-white text-purple-600 text-center py-3 px-4 rounded-lg hover:bg-purple-50 transition-colors"
            >
              Get Lifetime Access
            </Link>
          </div>
        </div>

        {/* Donation Banner */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-8 border border-purple-100 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50" />
            <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-2xl opacity-50" />
            
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <Heart className="h-6 w-6 text-red-500 fill-current" />
                  <h3 className="text-xl font-bold text-gray-900">Making a Difference Together</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  A portion of every subscription directly supports local animal shelters and rescue centers, helping more puppies find their forever homes.
                </p>
              </div>
              <div className="flex items-center justify-center bg-white p-4 rounded-xl shadow-sm">
                <div className="flex items-center space-x-2">
                  <PawPrint className="h-5 w-5 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Supporting 50+ rescue centers nationwide</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;