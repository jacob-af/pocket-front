import { NextRequest, NextResponse } from "next/server";

import Stripe from "stripe";
import { auth } from "@/lib/auth";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY as string;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10"
});

export async function POST(req: NextRequest) {
  const sess = await auth();
  console.log(req);
  if (req.method === "POST") {
    try {
      // Ensure origin is defined
      const origin = req.headers.get("origin");
      if (!origin) {
        throw new Error("Origin header is not defined");
      }
      // Create Checkout Sessions from body params.
      const session: Stripe.Response<Stripe.Checkout.Session> =
        await stripe.checkout.sessions.create({
          line_items: [
            {
              //price: "price_1PUeYC06lYv58VXCLZ57S3xW", //testmode
              price: "price_1PUeiz06lYv58VXCR2zRQiR2", //live mode
              quantity: 1
            }
          ],
          customer_email: sess?.user.email,
          mode: "subscription",
          success_url: `${origin}/db?success=true`,
          cancel_url: `${origin}/welcome?success=false`,
          automatic_tax: { enabled: true }
        });
      if (session.url) {
        return NextResponse.redirect(session.url, 303);
      }

      return NextResponse.json(
        { error: "Failed to create session URL" },
        { status: 500 }
      );
    } catch (err) {
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "Unknown error";
      return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
  } else {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }
}
