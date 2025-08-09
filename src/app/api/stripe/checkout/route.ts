import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_SECRET_KEY;
  if (!secret) {
    return new Response(JSON.stringify({ error: "Missing STRIPE_SECRET_KEY" }), { status: 500 });
  }

  const stripe = new Stripe(secret, { apiVersion: "2024-06-20" });

  const { priceId } = await req.json().catch(() => ({ priceId: null }));

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    line_items: [{
      price: priceId || "price_12345_example", // replace with your real Price ID
      quantity: 1
    }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/thanks`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/billing`
  });

  return new Response(JSON.stringify({ url: session.url }), {
    headers: { "Content-Type": "application/json" }
  });
}
