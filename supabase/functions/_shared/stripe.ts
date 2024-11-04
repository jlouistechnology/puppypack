import Stripe from 'https://esm.sh/stripe@13.10.0?target=deno';
import { getStripeKey } from './config.ts';

let stripeInstance: Stripe | null = null;

export async function getStripe() {
  if (!stripeInstance) {
    const stripeKey = await getStripeKey();
    stripeInstance = new Stripe(stripeKey, {
      apiVersion: '2023-10-16',
      httpClient: Stripe.createFetchHttpClient(),
    });
  }
  return stripeInstance;
}