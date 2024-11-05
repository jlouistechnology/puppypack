import React, { useState, useEffect } from 'react';
import { Bot, Sparkles } from 'lucide-react';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const DEMO_CONVERSATION: ChatMessage[] = [
  {
    role: 'user',
    content: 'Is it safe to feed my puppy leftover turkey from Thanksgiving?'
  },
  {
    role: 'assistant',
    content: 'Plain, cooked turkey meat in small amounts can be safe for puppies, but there are some important things to keep in mind! Avoid giving them turkey skin, bones, or meat seasoned with garlic, onions, or heavy spices as these can be harmful. Also, sudden changes in diet can upset their stomach. I recommend giving only a small taste mixed with their regular food. Would you like some tips on safe holiday treats for puppies?'
  }
];

export default function BlackFriday() {
  const [timeLeft, setTimeLeft] = useState('');
  const [showResponse, setShowResponse] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      
      const difference = midnight.getTime() - now.getTime();
      
      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const typingTimer = setInterval(() => {
      if (!showResponse) {
        setIsTyping(true);
        setTimeout(() => {
          setShowResponse(true);
          setIsTyping(false);
        }, 2000);
      }
    }, 6000);

    return () => clearInterval(typingTimer);
  }, [showResponse]);

  return (
    <div className="bg-purple-900 min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[600px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1601979031925-424e53b6caaa"
            alt="Black Friday Sale"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black opacity-60"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Black Friday Special: Save $52 Today!
          </h1>
          
          <div className="text-xl text-white mb-8">
            Get everything you need to raise a happy, well-trained puppy for life - at our lowest price ever!
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 mb-8">
            <div className="text-white text-sm mb-1">Offer ends in:</div>
            <div className="text-2xl font-bold text-white">{timeLeft}</div>
          </div>

          <div className="flex items-center space-x-4 mb-8">
            <span className="text-4xl font-bold text-white line-through opacity-75">$99</span>
            <span className="text-6xl font-bold text-white">$47</span>
            <span className="text-xl text-white opacity-75">one-time</span>
          </div>

          <a
            href="https://buy.stripe.com/8wM7wb5Fv5uq28U5kA"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            Get Lifetime Access Now
          </a>
        </div>
      </div>

      {/* AI Chat Demo Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Meet Your AI Puppy Expert</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Get instant, personalized guidance for all your puppy parenting questions. Waggles combines expert knowledge with AI intelligence to ensure your puppy's health, training, and happiness. From basic training to complex behavioral challenges, Waggles is here to help you every step of the way.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-purple-800/50 rounded-2xl p-6 backdrop-blur-sm">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative">
              <img
                src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
                alt="Waggles"
                className="w-12 h-12 rounded-full bg-purple-700 p-1"
              />
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                <Sparkles className="h-3 w-3 text-purple-600" />
              </div>
            </div>
            <div>
              <div className="font-semibold text-white">Waggles</div>
              <div className="text-sm text-gray-300">Your AI Puppy Expert</div>
            </div>
          </div>

          <div className="space-y-4 mb-6">
            <div className="flex justify-end">
              <div className="bg-purple-600 text-white rounded-lg rounded-tr-none p-3 max-w-[80%]">
                {DEMO_CONVERSATION[0].content}
              </div>
            </div>

            {(showResponse || isTyping) && (
              <div className="flex items-start space-x-2">
                <Bot className="h-6 w-6 text-purple-400 mt-2" />
                <div className="bg-purple-700/50 text-white rounded-lg rounded-tl-none p-3 max-w-[80%]">
                  {isTyping ? (
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce delay-200" />
                    </div>
                  ) : (
                    DEMO_CONVERSATION[1].content
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Ask Waggles anything about puppy care..."
              className="w-full bg-purple-700/30 text-white placeholder-purple-300 rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-white">
              <Sparkles className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 py-20 bg-gradient-to-b from-purple-900 to-purple-800">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-purple-800/50 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-5 w-5 text-purple-300" />
            <span className="text-sm font-medium text-purple-300">Everything Included</span>
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Complete Puppy Training Solution
          </h2>
          <p className="text-purple-200 max-w-2xl mx-auto">
            Get instant access to our comprehensive platform and raise a happy, well-behaved puppy with confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            'Personalized 52-week training plan',
            '24/7 AI puppy expert assistance',
            'Progress tracking & assessments',
            'Weekly action items & guidance',
            'Health & wellness monitoring',
            'Community support',
            'Lifetime updates & support'
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-6 border border-purple-700/50"
            >
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-2 h-2 bg-purple-400 rounded-full" />
                </div>
                <span className="text-purple-100">{feature}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="https://buy.stripe.com/8wM7wb5Fv5uq28U5kA"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all transform hover:scale-105"
          >
            <span>Get Started Today</span>
            <Sparkles className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>
  );
}