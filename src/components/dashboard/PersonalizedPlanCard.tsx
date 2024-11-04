import React, { useState } from 'react';
import WeeklyGuidance from '../WeeklyGuidance';
import GuidanceModal from '../GuidanceModal';
import { GuidanceTask } from '../../lib/generateGuidance';

interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
  created_at: string;
}

interface PersonalizedPlanCardProps {
  puppy: PuppyProfile | null;
  currentWeek: number;
  forceRefresh?: number;
}

export default function PersonalizedPlanCard({ puppy, currentWeek, forceRefresh }: PersonalizedPlanCardProps) {
  const [selectedTask, setSelectedTask] = useState<GuidanceTask | null>(null);

  const handleAskWaggles = (question: string) => {
    const event = new CustomEvent('openAIChat', { 
      detail: { question } 
    });
    window.dispatchEvent(event);
  };

  return (
    <>
      <WeeklyGuidance 
        puppy={puppy} 
        currentWeek={currentWeek}
        onAskWaggles={handleAskWaggles}
        forceRefresh={forceRefresh}
      />

      {selectedTask && (
        <GuidanceModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
          puppy={puppy}
          onAskWaggles={(question) => {
            handleAskWaggles(question);
            setSelectedTask(null);
          }}
        />
      )}
    </>
  );
}