import { loadStripe } from "@stripe/stripe-js";

export const stripePromise = await loadStripe(
  "pk_test_51PFy2gSDGZWWYY6XZlzKHOlp2U21itQdlF0QXtFiXUbVhEQKXLU7lW7LFf9uUwBtqBo8JrA3iwbPuq0lleGDrvcB00W2oJQMAh"
);