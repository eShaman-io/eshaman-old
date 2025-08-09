"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/lib/firebase-auth";

export default function Navbar() {
  const [user, setUser] = useState<null | { email?: string | null; displayName?: string | null }>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (u) => {
      if (u) setUser({ email: u.email, displayName: u.displayName });
      else setUser(null);
    });
  }, []);

  const signInGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  };

  return (
    <header className="mb-6 flex items-center justify-between rounded-2xl bg-white/5 ring-1 ring-white/10 p-4">
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-white/20" />
        <Link href="/" className="font-semibold tracking-tight">eShaman</Link>
      </div>
      <nav className="flex gap-4 text-sm">
        <Link href="/oracle" className="hover:underline">Oracle</Link>
        <Link href="/billing" className="hover:underline">Billing</Link>
        <Link href="/rituals" className="hover:underline">Rituals</Link>
      </nav>
      <div className="flex items-center gap-2">
        {user ? (
          <>
            <span className="text-xs text-slate-300">{user.displayName || user.email}</span>
            <button className="rounded-2xl px-3 py-1 bg-white/10 hover:bg-white/20" onClick={() => signOut(auth)}>
              Sign out
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="rounded-2xl px-3 py-1 bg-white/10 hover:bg-white/20">Sign in</Link>
            <button className="rounded-2xl px-3 py-1 bg-white/10 hover:bg-white/20" onClick={signInGoogle}>
              Google
            </button>
          </>
        )}
      </div>
    </header>
  );
}
