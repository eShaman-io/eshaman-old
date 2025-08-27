"use client";

import { useState } from "react";

export default function BillingPage() {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async (priceId: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId })
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Checkout error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Billing & Subscriptions</h1>
      <p className="text-slate-300 mb-8">
        Choose your spiritual journey path and unlock deeper insights.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10">
          <h3 className="text-xl font-semibold mb-3">Basic Plan</h3>
          <div className="text-3xl font-bold mb-4">$9.90<span className="text-lg text-slate-400">/month</span></div>
          <ul className="space-y-2 mb-6 text-slate-300">
            <li>• Daily oracle readings</li>
            <li>• Basic ritual library</li>
            <li>• Community access</li>
            <li>• Email support</li>
          </ul>
          <button
            className="w-full rounded-2xl px-4 py-3 bg-purple-500 hover:bg-purple-600 disabled:opacity-50"
            onClick={() => handleCheckout("price_basic")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe to Basic"}
          </button>
        </div>

        <div className="rounded-2xl p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 ring-1 ring-purple-400/50">
          <div className="bg-purple-500 text-xs px-2 py-1 rounded-full w-fit mb-3">POPULAR</div>
          <h3 className="text-xl font-semibold mb-3">Pro Plan</h3>
          <div className="text-3xl font-bold mb-4">$19.90<span className="text-lg text-slate-400">/month</span></div>
          <ul className="space-y-2 mb-6 text-slate-300">
            <li>• Unlimited oracle readings</li>
            <li>• Complete ritual library</li>
            <li>• Personalized guidance</li>
            <li>• Priority support</li>
            <li>• Advanced insights</li>
            <li>• Exclusive content</li>
          </ul>
          <button
            className="w-full rounded-2xl px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:opacity-50"
            onClick={() => handleCheckout("price_pro")}
            disabled={loading}
          >
            {loading ? "Processing..." : "Subscribe to Pro"}
          </button>
        </div>
      </div>

      <div className="mt-8 p-6 rounded-2xl bg-white/5 ring-1 ring-white/10">
        <h3 className="text-lg font-semibold mb-3">Note</h3>
        <p className="text-slate-300 text-sm">
          To test billing functionality, you'll need to configure your Stripe API keys in the environment variables. 
          The subscription flow will redirect to Stripe Checkout for secure payment processing.
        </p>
      </div>
    </div>
  );
}