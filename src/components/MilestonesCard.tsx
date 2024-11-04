import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';

interface PuppyProfile {
  id: string;
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
}

interface MilestoneData {
  id: string;
  breed: string;
  gender: string;
  developmental_stage: string;
  headline: string;
  description: string;
  photo_url: string;
}

interface MilestonesCardProps {
  puppy: PuppyProfile | null;
  currentWeek: number;
}

const DEFAULT_MILESTONES: Record<string, { headline: string; description: string; photo_url: string }> = {
  'Juvenile': {
    headline: 'Building Independence & Skills',
    description: 'Your puppy is in their juvenile phase (13-24 weeks). This is an exciting time of growing independence and skill development. Focus on reinforcing training, introducing new challenges, and maintaining consistent socialization.',
    photo_url: 'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48'
  },
  'Socialization': {
    headline: 'Critical Learning & Socialization',
    description: 'Your puppy is in their critical socialization period (3-12 weeks). This is the perfect time to introduce them to new experiences, people, and other animals in a safe and positive way. Focus on building confidence and positive associations.',
    photo_url: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b'
  },
  'Adolescent': {
    headline: 'Teenage Phase & Independence',
    description: 'Your puppy is in their adolescent phase (25-48 weeks). They may test boundaries and show more independence. Continue with consistent training and provide plenty of mental and physical stimulation.',
    photo_url: 'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae'
  },
  'Adult': {
    headline: 'Maturity & Lifelong Learning',
    description: 'Your dog has reached adulthood (49+ weeks). Focus on maintaining their physical and mental health through regular exercise, enrichment activities, and preventive healthcare.',
    photo_url: 'https://images.unsplash.com/photo-1558947530-cbcf6e9aeeae'
  },
  'Neonatal': {
    headline: 'Early Development Stage',
    description: 'Your puppy is in their earliest stage of development (0-2 weeks). This is a critical time for basic physical development and bonding with their mother. Ensure a warm, safe environment and proper nutrition.',
    photo_url: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa'
  }
};

export default function MilestonesCard({ puppy, currentWeek }: MilestonesCardProps) {
  const [milestone, setMilestone] = useState<MilestoneData | null>(null);
  const [loading, setLoading] = useState(true);

  const getDevelopmentalStage = (weeks: number): string => {
    if (weeks <= 2) return 'Neonatal';
    if (weeks <= 12) return 'Socialization';
    if (weeks <= 24) return 'Juvenile';
    if (weeks <= 48) return 'Adolescent';
    return 'Adult';
  };

  useEffect(() => {
    const fetchOrCreateMilestone = async () => {
      if (!puppy) return;

      try {
        setLoading(true);
        const stage = getDevelopmentalStage(currentWeek);
        const defaultMilestone = DEFAULT_MILESTONES[stage];

        if (!defaultMilestone) {
          throw new Error(`No default milestone found for stage: ${stage}`);
        }

        // Create milestone data with correct stage and content
        const milestoneData: MilestoneData = {
          id: 'default',
          breed: puppy.breed,
          gender: puppy.gender,
          developmental_stage: stage,
          headline: defaultMilestone.headline,
          description: defaultMilestone.description,
          photo_url: defaultMilestone.photo_url
        };

        setMilestone(milestoneData);

      } catch (error) {
        console.error('Error in milestone handling:', error);
        toast.error('Failed to load milestone information');
      } finally {
        setLoading(false);
      }
    };

    fetchOrCreateMilestone();
  }, [puppy, currentWeek]);

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="flex items-center justify-center h-[250px]">
          <Loader2 className="h-6 w-6 animate-spin text-purple-600" />
        </div>
      </div>
    );
  }

  if (!milestone) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="h-[250px] flex items-center justify-center">
          <p className="text-gray-500 text-center">No milestone information available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      <div className="h-[250px] w-full relative">
        <img
          src={milestone.photo_url}
          alt={milestone.headline}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-semibold mb-2">{milestone.headline}</h3>
          <p className="text-white/90">{milestone.description}</p>
        </div>
      </div>
    </div>
  );
}