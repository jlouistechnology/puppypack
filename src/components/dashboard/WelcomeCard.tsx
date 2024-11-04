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

interface WelcomeCardProps {
  puppy: PuppyProfile | null;
  currentWeek: number;
}

const DEVELOPMENT_STAGES = [
  { name: 'Neonatal', weeks: '0-2', color: 'bg-blue-400', start: 0, end: 2 },
  { name: 'Socialization', weeks: '3-12', color: 'bg-green-400', start: 3, end: 12 },
  { name: 'Juvenile', weeks: '13-24', color: 'bg-yellow-400', start: 13, end: 24 },
  { name: 'Adolescent', weeks: '25-48', color: 'bg-orange-400', start: 25, end: 48 },
  { name: 'Adult', weeks: '49+', color: 'bg-red-400', start: 49, end: 260 }
];

export default function WelcomeCard({ puppy, currentWeek }: WelcomeCardProps) {
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

  const getAgeInWeeks = () => {
    if (!puppy?.birthday) return 0;
    const birthDate = new Date(puppy.birthday);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
  };

  const getCurrentStage = () => {
    const ageInWeeks = getAgeInWeeks();
    return Math.max(0, DEVELOPMENT_STAGES.findIndex(
      stage => ageInWeeks >= stage.start && ageInWeeks <= stage.end
    ));
  };

  const getTimelinePosition = () => {
    const ageInWeeks = getAgeInWeeks();
    
    // Find the current stage
    const currentStage = DEVELOPMENT_STAGES.find(
      stage => ageInWeeks >= stage.start && ageInWeeks <= stage.end
    );
    
    if (!currentStage) return 100; // Adult stage

    // Calculate position within the stage
    const stageStartPosition = {
      'Neonatal': 0,
      'Socialization': 5,
      'Juvenile': 25,
      'Adolescent': 50,
      'Adult': 75
    }[currentStage.name];

    const stageWidth = {
      'Neonatal': 5,
      'Socialization': 20,
      'Juvenile': 25,
      'Adolescent': 25,
      'Adult': 25
    }[currentStage.name];

    const progressInStage = (ageInWeeks - currentStage.start) / (currentStage.end - currentStage.start);
    return stageStartPosition + (progressInStage * stageWidth);
  };

  const currentStageIndex = getCurrentStage();

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
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
            <p className="text-gray-600">{calculateAge()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium text-gray-600">Development Timeline</p>
          <p className="text-sm text-gray-500">Current Stage: {DEVELOPMENT_STAGES[currentStageIndex].name}</p>
        </div>
        
        <div className="relative">
          {/* Timeline Track */}
          <div className="h-3 bg-gray-100 rounded-full flex overflow-hidden">
            {DEVELOPMENT_STAGES.map((stage, index) => {
              const width = index === 0 ? 5 : 
                           index === 1 ? 20 :
                           index === 2 ? 25 :
                           index === 3 ? 25 : 25;
              return (
                <div
                  key={stage.name}
                  className={`${stage.color} ${index === 0 ? 'rounded-l-full' : ''} ${
                    index === DEVELOPMENT_STAGES.length - 1 ? 'rounded-r-full' : ''
                  } ${index <= currentStageIndex ? 'opacity-100' : 'opacity-20'}`}
                  style={{ width: `${width}%` }}
                />
              );
            })}
          </div>

          {/* Current Position Marker */}
          <div 
            className="absolute top-0 w-4 h-4 bg-white border-2 border-purple-600 rounded-full shadow-md transform -translate-y-1/4"
            style={{ 
              left: `${getTimelinePosition()}%`,
              transform: 'translate(-50%, -25%)'
            }}
          />

          {/* Stage Labels */}
          <div className="flex mt-2">
            {DEVELOPMENT_STAGES.map((stage, index) => {
              const width = index === 0 ? 5 : 
                           index === 1 ? 20 :
                           index === 2 ? 25 :
                           index === 3 ? 25 : 25;
              return (
                <div
                  key={stage.name}
                  className="text-xs text-gray-600"
                  style={{ width: `${width}%` }}
                >
                  <div className={`${index <= currentStageIndex ? 'font-medium' : ''}`}>
                    {stage.name}
                    <span className="block text-gray-400">
                      {stage.weeks} weeks
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}