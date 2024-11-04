import { supabase } from './supabaseClient';

export interface GuidanceTask {
  id: string;
  puppy_id: string;
  week: number;
  title: string;
  summary: string;
  details: string;
  completed: boolean;
  ignored: boolean;
  category: string;
  priority: number;
}

interface Assessment {
  basic_training_score: number;
  demeanor_score: number;
  socialization_score: number;
  health_score: number;
  adaptability_score: number;
}

const DEFAULT_TASKS = {
  1: [
    {
      title: "Basic House Training",
      summary: "Establish a consistent potty routine",
      details: "Take your puppy out first thing in the morning, after meals, after naps, and before bedtime. Choose a specific spot outside and use a command word. Reward successful potty breaks with treats and praise.",
      category: "basic_training",
      priority: 1
    },
    {
      title: "Crate Training Introduction",
      summary: "Make the crate a positive space",
      details: "Place the crate in a quiet area of your home. Add comfortable bedding and toys. Feed meals near the crate and gradually move the bowl inside. Never use the crate as punishment.",
      category: "adaptability",
      priority: 1
    },
    {
      title: "Name Recognition",
      summary: "Teach your puppy their name",
      details: "Say your puppy's name in a happy tone. When they look at you, immediately mark with 'yes!' and give a treat. Practice in different locations with varying levels of distraction.",
      category: "basic_training",
      priority: 2
    }
  ]
};

const GUIDANCE_TEMPLATES = {
  basic_training: {
    low: [
      {
        title: "Name Recognition Mastery",
        summary: "Build a stronger name response",
        details: "Practice calling your puppy's name in different locations and situations. Start in quiet areas and gradually increase distractions. Reward eye contact and coming to you when called.",
        priority: 1
      },
      {
        title: "Positive Reinforcement Training",
        summary: "Establish core training foundations",
        details: "Focus on basic commands like 'sit', 'stay', and 'come' using treats and praise. Keep training sessions short (5-10 minutes) and fun. Consistency is key!",
        priority: 2
      }
    ],
    medium: [
      {
        title: "Advanced Command Training",
        summary: "Build on existing command knowledge",
        details: "Introduce new commands like 'leave it' and 'wait'. Practice existing commands in more challenging environments with increased distractions.",
        priority: 2
      }
    ]
  },
  socialization: {
    low: [
      {
        title: "Gentle Socialization Practice",
        summary: "Build confidence with new experiences",
        details: "Create positive experiences with new people, places, and sounds. Use treats and praise to reward calm behavior. Start with calm environments and gradually increase exposure.",
        priority: 1
      }
    ],
    medium: [
      {
        title: "Supervised Play Sessions",
        summary: "Organize playdates with friendly dogs",
        details: "Arrange controlled meetings with vaccinated, friendly dogs. Monitor body language and intervene if needed. Reward positive interactions.",
        priority: 2
      }
    ]
  },
  demeanor: {
    low: [
      {
        title: "Calm Behavior Exercises",
        summary: "Practice settling and relaxation",
        details: "Work on 'place' or 'mat' training. Reward calm behavior and teach your puppy to relax on command. Practice in various environments.",
        priority: 1
      }
    ],
    medium: [
      {
        title: "Impulse Control Games",
        summary: "Build better self-control",
        details: "Practice 'wait' before meals, toys, or going through doors. Play games that require patience and self-control.",
        priority: 2
      }
    ]
  },
  health: {
    low: [
      {
        title: "Grooming Desensitization",
        summary: "Make grooming a positive experience",
        details: "Practice gentle handling exercises daily. Touch paws, ears, and mouth while giving treats. Use grooming tools for short periods with lots of rewards.",
        priority: 1
      }
    ],
    medium: [
      {
        title: "Health Check Practice",
        summary: "Simulate vet visit procedures",
        details: "Practice examining your puppy's body, opening their mouth, and touching their paws. Make it fun with treats and praise.",
        priority: 2
      }
    ]
  },
  adaptability: {
    low: [
      {
        title: "Environmental Enrichment",
        summary: "Build confidence in new situations",
        details: "Expose your puppy to new environments, sounds, and experiences in a controlled way. Use treats and praise to create positive associations.",
        priority: 1
      }
    ],
    medium: [
      {
        title: "Routine Flexibility Training",
        summary: "Practice adapting to changes",
        details: "Make small changes to daily routines while maintaining key structure. Reward calm behavior during transitions.",
        priority: 2
      }
    ]
  }
};

function getScoreCategory(score: number): 'low' | 'medium' | 'high' {
  if (score <= 4) return 'low';
  if (score <= 7) return 'medium';
  return 'high';
}

async function clearExistingTasks(puppy_id: string, week: number) {
  const { error } = await supabase
    .from('puppy_guidance')
    .delete()
    .eq('puppy_id', puppy_id)
    .eq('week', week)
    .eq('completed', false)
    .eq('ignored', false);

  if (error) throw error;
}

export async function generateGuidanceForWeek(puppy: {
  id: string;
  breed: string;
  gender: string;
  birthday: string;
  name: string;
}, week: number) {
  try {
    await clearExistingTasks(puppy.id, week);

    const weekTasks = DEFAULT_TASKS[week as keyof typeof DEFAULT_TASKS] || DEFAULT_TASKS[1];
    
    const tasks = weekTasks.map(task => ({
      puppy_id: puppy.id,
      week,
      ...task,
      completed: false,
      ignored: false
    }));

    const { data, error: insertError } = await supabase
      .from('puppy_guidance')
      .insert(tasks)
      .select();

    if (insertError) throw insertError;

    return data;
  } catch (error) {
    console.error('Error generating guidance:', error);
    throw error;
  }
}

export async function generateGuidanceFromAssessment(
  puppy: { id: string },
  assessment: Assessment,
  week: number
): Promise<GuidanceTask[]> {
  try {
    await clearExistingTasks(puppy.id, week);

    const guidanceTasks: GuidanceTask[] = [];

    Object.entries(assessment).forEach(([category, score]) => {
      const categoryName = category.replace('_score', '');
      const scoreCategory = getScoreCategory(score);
      
      if (scoreCategory !== 'high') {
        const templates = GUIDANCE_TEMPLATES[categoryName as keyof typeof GUIDANCE_TEMPLATES];
        const tasks = templates[scoreCategory as keyof typeof templates];
        
        tasks.forEach(task => {
          guidanceTasks.push({
            puppy_id: puppy.id,
            week,
            category: categoryName,
            priority: task.priority,
            ...task,
            completed: false,
            ignored: false,
            id: crypto.randomUUID()
          });
        });
      }
    });

    if (guidanceTasks.length === 0) {
      return [];
    }

    guidanceTasks.sort((a, b) => a.priority - b.priority);

    const { data, error: insertError } = await supabase
      .from('puppy_guidance')
      .insert(guidanceTasks)
      .select();

    if (insertError) throw insertError;

    return data || [];
  } catch (error) {
    console.error('Error generating guidance:', error);
    throw error;
  }
}

export async function ensureWeeklyGuidanceExists(puppy: any, week: number) {
  if (!puppy?.id) return;
  
  try {
    const { data: existingGuidance, error: fetchError } = await supabase
      .from('puppy_guidance')
      .select('*')
      .eq('puppy_id', puppy.id)
      .eq('week', week)
      .eq('completed', false)
      .eq('ignored', false);

    if (fetchError) throw fetchError;

    if (!existingGuidance || existingGuidance.length === 0) {
      const { data: latestAssessment, error: assessmentError } = await supabase
        .from('puppy_assessments')
        .select('*')
        .eq('puppy_id', puppy.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();

      if (assessmentError && assessmentError.code !== 'PGRST116') throw assessmentError;

      if (latestAssessment) {
        await generateGuidanceFromAssessment(puppy, latestAssessment, week);
      } else {
        await generateGuidanceForWeek(puppy, week);
      }
    }
  } catch (error) {
    console.error('Error ensuring weekly guidance:', error);
    throw error;
  }
}