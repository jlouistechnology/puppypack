import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import WelcomeCard from '../components/dashboard/WelcomeCard';
import MilestonesCard from '../components/MilestonesCard';
import PersonalizedPlanCard from '../components/dashboard/PersonalizedPlanCard';
import AskWagglesCard from '../components/dashboard/AskWagglesCard';
import RecommendationsCard from '../components/dashboard/RecommendationsCard';
import AssessmentCard from '../components/dashboard/AssessmentCard';
import AskAI from '../components/AskAI';

interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
  created_at: string;
}

export default function Dashboard() {
  const { user } = useAuth();
  const [puppy, setPuppy] = useState<PuppyProfile | null>(null);
  const [currentWeek, setCurrentWeek] = useState(1);
  const [showAI, setShowAI] = useState(false);
  const [initialQuestion, setInitialQuestion] = useState('');
  const [forceRefresh, setForceRefresh] = useState(0);

  useEffect(() => {
    const fetchPuppyProfile = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('puppies')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error) throw error;

        setPuppy(data);

        if (data?.birthday) {
          const birthDate = new Date(data.birthday);
          const today = new Date();
          const diffTime = Math.abs(today.getTime() - birthDate.getTime());
          const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7));
          setCurrentWeek(diffWeeks);
        }
      } catch (error) {
        console.error('Error fetching puppy profile:', error);
      }
    };

    fetchPuppyProfile();

    // Listen for AI chat events
    const handleAIChat = (event: CustomEvent<{ question: string }>) => {
      setInitialQuestion(event.detail.question);
      setShowAI(true);
    };

    window.addEventListener('openAIChat', handleAIChat as EventListener);

    return () => {
      window.removeEventListener('openAIChat', handleAIChat as EventListener);
    };
  }, [user]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="space-y-6">
        <WelcomeCard puppy={puppy} currentWeek={currentWeek} />
        
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2 space-y-6">
            <MilestonesCard puppy={puppy} currentWeek={currentWeek} />
            <AssessmentCard 
              puppy={puppy}
              onAssessmentComplete={() => setForceRefresh(prev => prev + 1)} 
            />
            <PersonalizedPlanCard 
              puppy={puppy} 
              currentWeek={currentWeek}
              forceRefresh={forceRefresh}
            />
          </div>
          
          <div className="space-y-6">
            <AskWagglesCard
              puppy={puppy}
              onAskQuestion={(question) => {
                setInitialQuestion(question);
                setShowAI(true);
              }}
            />
            <RecommendationsCard puppyName={puppy?.name} />
          </div>
        </div>
      </div>

      {showAI && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl">
            <AskAI 
              initialQuestion={initialQuestion} 
              puppy={puppy} 
              onClose={() => setShowAI(false)} 
            />
          </div>
        </div>
      )}
    </div>
  );
}