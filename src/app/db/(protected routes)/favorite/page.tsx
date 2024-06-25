"use client";

import React from "react";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
if (!process.env.NEXT_PUBLIC_STRIPE_KEY) {
  throw new Error("Stripe key not found");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY);
export default function PreviewPage() {
  React.useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready."
      );
    }
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <form action="/api/checkout-sessions" method="POST" name="monthly">
        <section>
          <button type="submit" role="link" value="monthly">
            Checkout
          </button>
        </section>
      </form>
    </div>
  );
}
