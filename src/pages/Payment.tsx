import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle } from 'lucide-react';

export default function Payment() {
  const navigate = useNavigate();

  const handlePayment = () => {
    // TODO: Implement Stripe payment
    // For now, just navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center mb-8">
            <Shield className="mx-auto h-12 w-12 text-purple-600" />
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Your plan is ready!
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Complete your purchase to access your personalized puppy care plan
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium text-gray-900">PuppyPack Premium</h3>
                <span className="text-2xl font-bold text-gray-900">$47</span>
              </div>
              <ul className="space-y-3">
                {[
                  'Personalized 52-week care plan',
                  'AI-powered puppy assistant',
                  'Training guides and resources',
                  'Weekly progress tracking',
                  'Expert recommendations',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={handlePayment}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            >
              Complete Purchase
            </button>

            <p className="mt-2 text-xs text-center text-gray-500">
              30-day money-back guarantee • Secure payment • Instant access
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}</content>