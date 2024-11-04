import React from 'react';
import { X, MessageSquare } from 'lucide-react';
import { GuidanceTask } from '../lib/generateGuidance';

interface GuidanceModalProps {
  task: GuidanceTask;
  onClose: () => void;
  puppy: any;
  onAskWaggles?: (question: string) => void;
}

const GuidanceModal: React.FC<GuidanceModalProps> = ({
  task,
  onClose,
  puppy,
  onAskWaggles
}) => {
  const handleAskWaggles = () => {
    if (onAskWaggles) {
      onAskWaggles(`Can you help me with ${task.title.toLowerCase()}? Specifically, ${task.summary}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">Week {task.week}: {task.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <p className="text-gray-600 italic mb-4">{task.summary}</p>
          <div className="prose max-w-none">
            {task.details.split('\n').map((paragraph, index) => (
              <p key={index} className="mb-4">{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-gray-50">
          <button
            onClick={handleAskWaggles}
            className="w-full flex items-center justify-center space-x-2 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Ask Waggles For Help On This</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuidanceModal;