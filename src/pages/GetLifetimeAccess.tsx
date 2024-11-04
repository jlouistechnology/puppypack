import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, CheckCircle, ArrowLeft, Sparkles } from 'lucide-react';
import { createCheckoutSession } from '../lib/stripe';
import { toast } from 'sonner';

export default function GetLifetimeAccess() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        priceId: 'price_lifetime', // Replace with your Stripe price ID
        successUrl: `${window.location.origin}/signup?payment_success=true`,
        cancelUrl: `${window.location.origin}/get-lifetime-access`,
      });

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Failed to process purchase. Please try again.');
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
            <div className="relative inline-block">
              <Shield className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <Sparkles className="absolute -top-2 -right-2 h-6 w-6 text-yellow-400" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Lifetime Access to PuppyPack
            </h1>
            <p className="text-gray-600">
              Get unlimited access to all PuppyPack features with a one-time payment
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl p-6 mb-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-xl" />
            <div className="relative">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Lifetime Plan</h2>
                <div className="text-right">
                  <span className="text-lg line-through text-purple-200">$99</span>
                  <span className="text-2xl font-bold ml-2">$67</span>
                </div>
              </div>
              <ul className="space-y-3 mb-6">
                {[
                  'Personalized 52-week training plan',
                  '24/7 AI puppy expert assistance',
                  'Progress tracking & assessments',
                  'Weekly action items & guidance',
                  'Health & wellness monitoring',
                  'Community support',
                  'Lifetime updates & support',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button
            onClick={handlePurchase}
            disabled={loading}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <span className="animate-spin mr-2">⏳</span>
                Processing...
              </>
            ) : (
              'Get Lifetime Access'
            )}
          </button>

          <div className="mt-6 space-y-4">
            <p className="text-center text-sm text-gray-500">
              One-time payment • Lifetime access • 30-day money-back guarantee • Secure payment
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
              <Shield className="h-4 w-4" />
              <span>Your purchase is protected by our 30-day satisfaction guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}