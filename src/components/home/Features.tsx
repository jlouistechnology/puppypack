import React from 'react';
import { Brain, MessageSquare, Target, Calendar, Heart, Award, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Brain,
    title: 'AI-Powered Training',
    description: 'Get personalized training plans and real-time guidance from our AI assistant, Waggles.',
    gradient: 'from-purple-600 to-indigo-600',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-100',
    shadowColor: 'shadow-purple-500/20'
  },
  {
    icon: MessageSquare,
    title: '24/7 Expert Support',
    description: 'Get instant answers to your puppy care questions, any time of day or night.',
    gradient: 'from-pink-600 to-rose-600',
    iconColor: 'text-pink-600',
    iconBg: 'bg-pink-100',
    shadowColor: 'shadow-pink-500/20'
  },
  {
    icon: Target,
    title: 'Progress Tracking',
    description: 'Monitor your puppy\'s development with detailed assessments and milestone tracking.',
    gradient: 'from-blue-600 to-cyan-600',
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-100',
    shadowColor: 'shadow-blue-500/20'
  },
  {
    icon: Calendar,
    title: 'Weekly Action Plans',
    description: 'Get structured weekly plans tailored to your puppy\'s age and development stage.',
    gradient: 'from-green-600 to-emerald-600',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-100',
    shadowColor: 'shadow-green-500/20'
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Get guidance on nutrition, exercise, and preventive care for optimal health.',
    gradient: 'from-red-600 to-orange-600',
    iconColor: 'text-red-600',
    iconBg: 'bg-red-100',
    shadowColor: 'shadow-red-500/20'
  },
  {
    icon: Award,
    title: 'Community & Support',
    description: 'Join a community of puppy parents and get expert tips and advice.',
    gradient: 'from-amber-600 to-yellow-600',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-100',
    shadowColor: 'shadow-amber-500/20'
  }
];

const Features = () => {
  return (
    <div className="relative overflow-hidden py-24">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50/50" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-md mb-8">
            <Sparkles className="h-5 w-5 text-purple-600" />
            <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Comprehensive Features
            </span>
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Everything You Need for a Happy, Well-Trained Puppy
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Our comprehensive platform helps you navigate every aspect of puppy parenthood
          </p>
        </div>

        <div className="mt-16 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title} 
                className="relative group"
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                <div className="h-full bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-purple-200 relative overflow-hidden group">
                  {/* Gradient background that shows on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon with gradient background */}
                    <div className="relative inline-flex mb-6">
                      <div className={`absolute inset-0 bg-gradient-to-r ${feature.gradient} opacity-20 rounded-xl blur-xl group-hover:opacity-30 transition-opacity duration-300`} />
                      <div className={`relative w-14 h-14 ${feature.iconBg} rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`h-7 w-7 ${feature.iconColor}`} />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors duration-300">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-gradient-to-tr from-purple-100 to-pink-100 rounded-full blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Features;