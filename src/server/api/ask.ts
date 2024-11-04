import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { message, puppy } = await req.json();

    const systemPrompt = `You are a helpful AI assistant for PuppyPack, a puppy care platform. 
    You're helping with a ${puppy.breed} puppy named ${puppy.name} who is ${puppy.gender} and was born on ${puppy.birthday}.
    Provide friendly, accurate advice about puppy care, training, and development.
    Keep responses concise but informative, and always prioritize the puppy's health and well-being.
    If you're unsure about something, recommend consulting a veterinarian.`;

    const completion = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: message }
      ],
      model: 'gpt-4-turbo-preview',
      temperature: 0.7,
      max_tokens: 500,
    });

    return new Response(JSON.stringify({
      response: completion.choices[0].message.content
    }), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('AI Assistant Error:', error);
    return new Response(JSON.stringify({
      error: 'Failed to get AI response'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}