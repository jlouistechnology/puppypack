import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Star } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-32 w-96 h-96 rounded-full bg-purple-100 blur-3xl opacity-50" />
        <div className="absolute -bottom-40 -left-32 w-96 h-96 rounded-full bg-pink-100 blur-3xl opacity-50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="relative z-10">
            {/* Rating badge */}
            <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-8">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-gray-600">
                Trusted by 10,000+ puppy parents
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Raise a happy,{' '}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  well-trained puppy
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-3 bg-purple-200 opacity-30 blur-sm" />
              </span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-relaxed">
              Get personalized guidance, 24/7 AI support, and expert-backed
              training plans tailored to your puppy's needs.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-lg shadow-lg text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Your Journey
              </Link>
            </div>
          </div>

          {/* Right Column - Image & Waggles */}
          <div className="relative">
            {/* Main image */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-300">
              <img
                src="https://images.unsplash.com/photo-1546421845-6471bdcf3edf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
                alt="Happy puppy with owner"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Waggles card */}
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 flex items-center space-x-3 transform hover:scale-105 transition-transform duration-200">
              <div className="relative">
                <img
                  src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
                  alt="Waggles"
                  className="w-16 h-16"
                />
                <Sparkles className="absolute -top-1 -right-1 h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900">Meet Waggles</span>
                  <Sparkles className="h-4 w-4 text-yellow-400" />
                </div>
                <p className="text-sm text-gray-600">Your AI Puppy Expert</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-purple-200 rounded-full blur-xl opacity-60" />
            <div className="absolute -bottom-8 right-20 w-20 h-20 bg-pink-200 rounded-full blur-xl opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;