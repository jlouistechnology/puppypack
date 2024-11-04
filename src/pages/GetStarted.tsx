import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { toast } from 'sonner';

export default function GetStarted() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        priceId: 'price_monthly', // Replace with your Stripe price ID
        successUrl: `${window.location.origin}/signup?payment_success=true`,
        cancelUrl: `${window.location.origin}/get-started`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Subscription error:', error);
      toast.error('Failed to start subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white py-12">
      <div className="max-w-3xl mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Home
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Start Your PuppyPack Journey
            </h1>
            <p className="text-gray-600">
              Get started with our monthly plan and give your puppy the best start in life
            </p>
          </div>

          <div className="bg-purple-50 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Monthly Plan</h2>
              <span className="text-2xl font-bold text-purple-600">$9/month</span>
            </div>
            <ul className="space-y-3 mb-6">
              {[
                'Personalized 52-week training plan',
                '24/7 AI puppy expert assistance',
                'Progress tracking & assessments',
                'Weekly action items & guidance',
                'Health & wellness monitoring',
                'Community support',
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-gray-700">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleSubscribe}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : (
              'Start Monthly Plan'
            )}
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Cancel anytime • 30-day money-back guarantee • Secure payment
          </p>
        </div>
      </div>
    </div>
  );
}