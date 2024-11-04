import { supabase } from './supabaseClient';
import OpenAI from 'openai';

interface Puppy {
  breed: string;
  gender: string;
  birthday: string;
}

interface Milestone {
  id: string;
  headline: string;
  content: string;
  photo_url: string;
  stage: string;
}

const DEFAULT_PHOTOS = {
  Neonatal: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa',
  Socialization: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa',
  Juvenile: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa',
  Adolescent: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa',
  Adult: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa'
};

export async function generateMilestone(puppy: Puppy, currentWeek: number): Promise<Milestone> {
  try {
    // Get OpenAI key from config
    const { data: { openai_key }, error: keyError } = await supabase
      .from('config')
      .select('openai_key')
      .single();

    if (keyError) throw keyError;

    const openai = new OpenAI({
      apiKey: openai_key
    });

    // Generate milestone content
    const prompt = `Create a developmental milestone summary for a ${currentWeek}-week-old ${puppy.breed} (${puppy.gender}). Include:
    1. A brief headline (1 line)
    2. Key developmental characteristics (3-4 sentences)
    3. The developmental stage (Neonatal/Socialization/Juvenile/Adolescent/Adult)

    Format the response as JSON with headline, content, and stage fields.`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const response = JSON.parse(completion.choices[0].message.content || '{}');

    // Store in database
    const { data: milestone, error: insertError } = await supabase
      .from('milestones')
      .insert({
        breed: puppy.breed,
        gender: puppy.gender,
        age_weeks: currentWeek,
        headline: response.headline,
        content: response.content,
        stage: response.stage,
        photo_url: DEFAULT_PHOTOS[response.stage as keyof typeof DEFAULT_PHOTOS],
        size_category: getSizeCategory(puppy.breed)
      })
      .select()
      .single();

    if (insertError) throw insertError;

    return milestone;
  } catch (error) {
    console.error('Error generating milestone:', error);
    throw error;
  }
}

function getSizeCategory(breed: string): string {
  // Add logic to categorize breeds by size
  const smallBreeds = ['Chihuahua', 'Yorkshire Terrier', 'Pomeranian'];
  const mediumBreeds = ['Beagle', 'Border Collie', 'Bulldog'];
  const largeBreeds = ['German Shepherd', 'Golden Retriever', 'Labrador Retriever'];

  if (smallBreeds.includes(breed)) return 'small';
  if (mediumBreeds.includes(breed)) return 'medium';
  if (largeBreeds.includes(breed)) return 'large';
  
  return 'medium'; // Default to medium if breed is not found
}