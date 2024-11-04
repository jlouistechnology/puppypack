import React from 'react';

interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
  created_at: string;
}

interface PuppyHeaderProps {
  puppy: PuppyProfile | null;
  currentWeek: number;
}

export default function PuppyHeader({ puppy, currentWeek }: PuppyHeaderProps) {
  const calculateAge = () => {
    if (!puppy?.birthday) return '';
    
    const birthDate = new Date(puppy.birthday);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
    
    if (diffWeeks < 52) {
      return `${diffWeeks} weeks old`;
    } else {
      const years = Math.floor(diffWeeks / 52);
      return `${years} ${years === 1 ? 'year' : 'years'} old`;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {puppy?.photo_url ? (
            <img
              src={puppy.photo_url}
              alt={puppy.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-2xl text-purple-600">
                {puppy?.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Welcome back{puppy?.name ? `, ${puppy.name}` : ''}!</h2>
            <p className="text-gray-600">Current Progress: Week {currentWeek} of 52</p>
          </div>
        </div>
        <div className="text-right">
          <span className="text-gray-600">{calculateAge()}</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div
          className="bg-purple-600 rounded-full h-2 transition-all duration-500"
          style={{ width: `${(currentWeek / 52) * 100}%` }}
        />
      </div>
    </div>
  );
}