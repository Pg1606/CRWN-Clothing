import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = await loadStripe(
  process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY
);