import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { ensureWeeklyGuidanceExists, GuidanceTask } from '../lib/generateGuidance';
import { toast } from 'sonner';

export function useGuidance(puppy: any | null) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [guidance, setGuidance] = useState<GuidanceTask[]>([]);

  useEffect(() => {
    if (!puppy) return;

    const fetchGuidance = async () => {
      try {
        setLoading(true);
        
        // Get current week
        const joinDate = new Date(puppy.created_at);
        const today = new Date();
        const diffTime = Math.abs(today.getTime() - joinDate.getTime());
        const currentWeek = Math.min(
          Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7)),
          52
        );

        // Ensure guidance exists for current week
        await ensureWeeklyGuidanceExists(puppy, currentWeek);
        
        // Fetch current week's guidance
        const { data: weeklyGuidance, error: fetchError } = await supabase
          .from('puppy_guidance')
          .select('*')
          .eq('puppy_id', puppy.id)
          .eq('week', currentWeek)
          .order('created_at', { ascending: true });

        if (fetchError) throw fetchError;

        setGuidance(weeklyGuidance || []);
      } catch (err) {
        console.error('Error:', err);
        setError(err instanceof Error ? err : new Error('Failed to load guidance'));
        toast.error('Failed to load puppy guidance');
      } finally {
        setLoading(false);
      }
    };

    fetchGuidance();
  }, [puppy]);

  return { guidance, loading, error };
}