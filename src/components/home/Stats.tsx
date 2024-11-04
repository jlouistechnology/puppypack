import React from 'react';
import { Star } from 'lucide-react';

const Stats = () => {
  return (
    <div className="bg-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">10,000+</div>
            <div className="mt-2 text-gray-600">Happy Puppies</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">4.9/5</div>
            <div className="mt-2 text-gray-600">User Rating</div>
            <div className="flex justify-center mt-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
              ))}
            </div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">24/7</div>
            <div className="mt-2 text-gray-600">AI Support</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-600">52</div>
            <div className="mt-2 text-gray-600">Week Program</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;