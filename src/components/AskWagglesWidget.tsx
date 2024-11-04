import React from 'react';

interface AskWagglesWidgetProps {
  puppy: any;
  initialQuestion: string;
  setInitialQuestion: (question: string) => void;
  onAskWaggles: () => void;
}

export default function AskWagglesWidget({
  puppy,
  initialQuestion,
  setInitialQuestion,
  onAskWaggles
}: AskWagglesWidgetProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
          alt="Waggles"
          className="w-16 h-16 object-contain"
        />
        <div>
          <h3 className="text-lg font-semibold">Have a question? Ask Waggles!</h3>
          <p className="text-sm text-gray-600">
            Our AI assistant is here to help with personalized advice for {puppy?.name || 'your puppy'}
          </p>
        </div>
      </div>
      <div className="space-y-4">
        <input
          type="text"
          value={initialQuestion}
          onChange={(e) => setInitialQuestion(e.target.value)}
          placeholder="Type your question..."
          className="w-full p-2 border rounded-md"
        />
        <button
          onClick={onAskWaggles}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
        >
          Ask Waggles
        </button>
      </div>
    </div>
  );
}