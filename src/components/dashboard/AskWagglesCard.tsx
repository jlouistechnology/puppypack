import React from 'react';
import { Sparkles } from 'lucide-react';

interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
}

interface AskWagglesCardProps {
  puppy: PuppyProfile | null;
  onAskQuestion: (question: string) => void;
}

export default function AskWagglesCard({ puppy, onAskQuestion }: AskWagglesCardProps) {
  const [question, setQuestion] = React.useState('');

  const handleSubmit = () => {
    if (question.trim()) {
      onAskQuestion(question);
      setQuestion('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg shadow-lg p-6 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iYSIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVHJhbnNmb3JtPSJyb3RhdGUoNDUpIj48cGF0aCBkPSJNLTEwIDMwaDYwdjJILTEwem0tMzAgMGg2MHYySC00MHptMC00MGg2MHYySC00MHoiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iLjEiLz48L3BhdHRlcm4+PC9kZWZzPjxwYXRoIGZpbGw9InVybCgjYSkiIGQ9Ik0wIDBoMjAwdjIwMEgweiIvPjwvc3ZnPg==')] opacity-10"></div>
      
      <div className="relative">
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-white/20 rounded-full blur-lg group-hover:bg-white/30 transition-colors"></div>
            <div className="relative bg-gradient-to-br from-white/10 to-white/5 p-1 rounded-full">
              <img
                src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
                alt="Waggles"
                className="w-16 h-16 object-contain rounded-full transform group-hover:scale-105 transition-transform"
              />
              <div className="absolute -bottom-1 -right-1 bg-yellow-400 rounded-full p-1">
                <Sparkles className="h-4 w-4 text-purple-600" />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold flex items-center space-x-2">
              <span>Meet Waggles</span>
              <Sparkles className="h-5 w-5 text-yellow-300" />
            </h3>
            <p className="text-white/90">
              Your personal AI puppy expert
            </p>
          </div>
        </div>

        <div className="bg-white/10 rounded-lg p-4 mb-6 border border-white/10">
          <p className="text-sm leading-relaxed">
            Hi! I'm Waggles, your dedicated puppy advisor. I'm here to help {puppy?.name || 'your puppy'} thrive with 
            personalized guidance on training, health, behavior, and more. Ask me anything!
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What would you like to know about your puppy?"
              className="w-full p-3 bg-white rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-white/20 hover:bg-white/30 text-white py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 group"
          >
            <Sparkles className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span>Ask Waggles</span>
          </button>
        </div>
      </div>
    </div>
  );
}