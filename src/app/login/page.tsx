"use client";

import { FormEvent, useState } from "react";
import { auth } from "@/lib/firebase-auth";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (err: any) {
      setError(err?.message || "Auth error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="rounded-2xl p-6 bg-white/5 ring-1 ring-white/10 shadow-soft max-w-md mx-auto">
      <h1 className="text-2xl font-semibold">{mode === "signin" ? "Sign in" : "Create account"}</h1>
      <form onSubmit={submit} className="mt-4 space-y-3">
        <input
          className="w-full rounded-2xl bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10"
          placeholder="you@example.com" type="email" value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full rounded-2xl bg-black/30 px-3 py-2 outline-none ring-1 ring-white/10"
          placeholder="••••••••" type="password" value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-300 text-sm">{error}</p>}
        <button disabled={loading} className="rounded-2xl px-4 py-2 bg-white/10 hover:bg-white/20">
          {loading ? "Please wait…" : (mode === "signin" ? "Sign in" : "Sign up")}
        </button>
      </form>
      <button className="mt-3 text-sm text-slate-300 hover:underline"
        onClick={() => setMode(mode === "signin" ? "signup" : "signin")}>
        {mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"}
      </button>
    </div>
  );
}
