import React, { useState, useEffect } from 'react';
import { Gift, Sparkles, Bot, User, Send } from 'lucide-react';

interface ChatMessage {
  role: 'assistant' | 'user';
  content: string;
}

const DEMO_CONVERSATION: ChatMessage[] = [
  {
    role: 'user',
    content: 'Help! My puppy just chewed up some Christmas wrapping paper. Should I be worried?'
  },
  {
    role: 'assistant',
    content: 'Don\'t worry! Most wrapping paper is non-toxic, but it\'s best to prevent further chewing. Keep an eye on your puppy for the next few hours and ensure they\'re drinking water and acting normally. To prevent this in the future, keep wrapping supplies in a secure area and provide appropriate chew toys. Would you like some recommendations for puppy-safe holiday activities?'
  }
];

export default function ChristmasSale() {
  const [timeLeft, setTimeLeft] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [displayedMessages, setDisplayedMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const midnight = new Date();
      midnight.setHours(24, 0, 0, 0);
      const diff = midnight.getTime() - now.getTime();

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentMessageIndex < DEMO_CONVERSATION.length) {
        if (!isTyping) {
          setIsTyping(true);
          setTimeout(() => {
            setDisplayedMessages(prev => [...prev, DEMO_CONVERSATION[currentMessageIndex]]);
            setIsTyping(false);
            setCurrentMessageIndex(prev => prev + 1);
          }, 2000);
        }
      } else {
        setCurrentMessageIndex(0);
        setDisplayedMessages([]);
      }
    }, 6000);

    return () => clearInterval(typingInterval);
  }, [currentMessageIndex, isTyping]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-purple-800 text-white">
      {/* Hero Section */}
      <div className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1513639725746-c5d3e861f32a?q=80&w=2670&auto=format&fit=crop"
            alt="Christmas Puppy"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/80 to-purple-900/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-red-600/20 text-red-200 px-4 py-2 rounded-full mb-6">
            <Gift className="h-5 w-5" />
            <span>Special Holiday Offer - Ends in {timeLeft}</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Give Your Puppy the Gift of
            <span className="block text-red-400">Perfect Training</span>
          </h1>

          <div className="mb-8">
            <span className="text-2xl text-gray-300 line-through">$99</span>
            <span className="text-5xl font-bold text-white ml-4">$47</span>
            <span className="text-xl text-gray-300 ml-2">one-time</span>
          </div>

          <a
            href="https://buy.stripe.com/8wM7wb5Fv5uq28U5kA"
            className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Get Lifetime Access Now
          </a>
        </div>
      </div>

      {/* AI Chat Demo Section */}
      <div className="relative bg-gradient-to-b from-purple-900 to-purple-800 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full mb-6">
              <Sparkles className="h-5 w-5 text-purple-300" />
              <span className="text-purple-200">Meet Your AI Puppy Expert</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              24/7 Support from Waggles
            </h2>
            <p className="text-purple-200 max-w-2xl mx-auto mb-8">
              Meet Waggles, your personal AI puppy expert trained on decades of veterinary knowledge, 
              behavioral science, and expert training techniques. Available 24/7 to answer questions, 
              provide guidance, and ensure you're making the best decisions for your puppy's health 
              and happiness. From basic training to complex behavioral challenges, Waggles is here 
              to help you every step of the way.
            </p>
          </div>

          <div className="bg-purple-800/50 rounded-xl p-6 backdrop-blur-lg shadow-xl max-w-2xl mx-auto">
            <div className="flex items-center space-x-3 mb-6">
              <img
                src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
                alt="Waggles"
                className="w-12 h-12 rounded-full bg-purple-700 p-2"
              />
              <div>
                <h3 className="font-semibold text-white">Waggles</h3>
                <p className="text-sm text-purple-200">Your AI Puppy Expert</p>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              {displayedMessages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 ${
                    message.role === 'assistant' ? '' : 'justify-end'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <Bot className="h-6 w-6 text-purple-300 mt-1" />
                  )}
                  <div
                    className={`rounded-lg p-3 max-w-[80%] ${
                      message.role === 'assistant'
                        ? 'bg-purple-700/50 text-white'
                        : 'bg-purple-600/50 text-white ml-auto'
                    }`}
                  >
                    {message.content}
                  </div>
                  {message.role === 'user' && (
                    <User className="h-6 w-6 text-purple-300 mt-1" />
                  )}
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <Bot className="h-6 w-6 text-purple-300" />
                  <div className="bg-purple-700/50 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-purple-300 rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Ask Waggles anything about puppy care..."
                className="w-full bg-purple-700/30 rounded-lg py-3 px-4 pr-12 text-white placeholder-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <Send className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-purple-300" />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gradient-to-b from-purple-800 to-purple-900 py-24">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-purple-700/30 px-4 py-2 rounded-full mb-6">
              <Gift className="h-5 w-5 text-purple-300" />
              <span className="text-purple-200">Everything Included</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Your Complete Puppy Training Solution
            </h2>
            <p className="text-purple-200">
              Get instant access to our comprehensive platform and raise a happy, well-behaved puppy with confidence.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="bg-purple-800/30 backdrop-blur-lg rounded-lg p-6 border border-purple-700/30"
              >
                <div className="flex items-center space-x-3">
                  <Sparkles className="h-5 w-5 text-purple-300" />
                  <span className="text-white">{feature}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="https://buy.stripe.com/8wM7wb5Fv5uq28U5kA"
              className="inline-block bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg text-xl font-semibold hover:from-red-600 hover:to-red-700 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}