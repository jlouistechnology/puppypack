import React from 'react';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'assistant' | 'user';
    content: string;
  };
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const formatContent = (content: string) => {
    if (message.role === 'assistant') {
      const processedContent = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      const parts = processedContent.split(/(\d+\.\s)/);
      
      if (parts.length > 1) {
        return (
          <div className="space-y-3">
            {parts.map((part, index) => {
              if (part.match(/^\d+\.\s$/)) {
                const nextPart = parts[index + 1];
                return (
                  <div key={index} className="flex space-x-2">
                    <span className="font-semibold">{part}</span>
                    <span dangerouslySetInnerHTML={{ __html: nextPart }} />
                  </div>
                );
              } else if (!parts[index - 1]?.match(/^\d+\.\s$/)) {
                return <p key={index} dangerouslySetInnerHTML={{ __html: part }} />;
              }
              return null;
            })}
          </div>
        );
      }
      
      return <p dangerouslySetInnerHTML={{ __html: processedContent }} />;
    }
    
    return <p>{content}</p>;
  };

  return (
    <div
      className={`flex items-start space-x-2 ${
        message.role === 'assistant' ? '' : 'flex-row-reverse space-x-reverse'
      }`}
    >
      <div
        className={`p-4 rounded-lg max-w-[80%] ${
          message.role === 'assistant'
            ? 'bg-purple-50 text-gray-900'
            : 'bg-purple-600 text-white'
        }`}
      >
        <div className="flex items-start space-x-2">
          {message.role === 'assistant' ? (
            <img
              src="https://napmnlicyjqaxxpwglxk.supabase.co/storage/v1/object/public/assets/PuppyPackWaggles.png"
              alt="Waggles"
              className="w-6 h-6 object-contain flex-shrink-0"
            />
          ) : (
            <User className="h-5 w-5 mt-1 flex-shrink-0" />
          )}
          <div className="text-sm leading-relaxed">
            {formatContent(message.content)}
          </div>
        </div>
      </div>
    </div>
  );
};