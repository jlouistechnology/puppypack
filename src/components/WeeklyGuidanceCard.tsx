import React, { useState } from 'react';
import { CheckCircle, AlertCircle, X, MessageSquare, ChevronRight } from 'lucide-react';
import { GuidanceTask } from '../lib/generateGuidance';

interface WeeklyGuidanceCardProps {
  task: GuidanceTask;
  onComplete: (taskId: string) => void;
  onIgnore: (taskId: string) => void;
  onAskWaggles: (question: string) => void;
}

const WeeklyGuidanceCard: React.FC<WeeklyGuidanceCardProps> = ({
  task,
  onComplete,
  onIgnore,
  onAskWaggles,
}) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div className={`bg-white rounded-lg shadow-sm p-4 ${task.completed ? 'border-l-4 border-green-500' : task.ignored ? 'border-l-4 border-gray-300' : ''}`}>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.summary}</p>
          </div>
          <div className="flex items-center space-x-2">
            {!task.completed && !task.ignored && (
              <>
                <button
                  onClick={() => onComplete(task.id)}
                  className="text-green-600 hover:text-green-700"
                  title="Mark as complete"
                >
                  <CheckCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onIgnore(task.id)}
                  className="text-gray-400 hover:text-gray-500"
                  title="Ignore task"
                >
                  <X className="h-5 w-5" />
                </button>
              </>
            )}
            <button
              onClick={() => setShowModal(true)}
              className="text-purple-600 hover:text-purple-700"
              title="Learn more"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-semibold text-gray-900">{task.title}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="prose max-w-none">
                <p className="text-gray-600 mb-4">{task.summary}</p>
                <div className="text-gray-700 whitespace-pre-wrap">{task.details}</div>
              </div>

              <div className="mt-6 flex justify-end space-x-4">
                <button
                  onClick={() => {
                    onAskWaggles(`Tell me more about: ${task.title}`);
                    setShowModal(false);
                  }}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  <MessageSquare className="h-5 w-5" />
                  <span>Ask Waggles For Help</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WeeklyGuidanceCard;