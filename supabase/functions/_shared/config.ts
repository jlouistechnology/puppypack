import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function getStripeKey() {
  const { data, error } = await supabase
    .from('vault')
    .select('decrypted_secret')
    .eq('name', 'STRIPE_SECRET_KEY')
    .single();

  if (error) throw error;
  return data.decrypted_secret;
}