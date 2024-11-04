import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

interface PuppyProfile {
  name: string;
  breed: string;
  gender: string;
  birthday: string;
  photo_url: string | null;
}

export const useAIChat = (puppy: PuppyProfile | null) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (message: string, previousMessages: any[]) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: { openai_key }, error: keyError } = await supabase
        .from('config')
        .select('openai_key')
        .single();

      if (keyError || !openai_key) {
        throw new Error('Failed to get API configuration');
      }

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${openai_key}`,
        },
        body: JSON.stringify({
          model: 'gpt-4-turbo-preview',
          messages: [
            {
              role: 'system',
              content: `You are Waggles, a friendly and knowledgeable AI assistant for PuppyPack, a puppy care platform. 
              You're helping with a ${puppy?.breed} puppy named ${puppy?.name} who is ${puppy?.gender} and was born on ${puppy?.birthday}.
              Provide friendly, accurate advice about puppy care, training, and development.
              Keep responses concise but informative, and always prioritize the puppy's health and well-being.
              If you're unsure about something, recommend consulting a veterinarian.`
            },
            ...previousMessages,
            { role: 'user', content: message }
          ],
          temperature: 0.7,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process your request';
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { sendMessage, isLoading, error };
};