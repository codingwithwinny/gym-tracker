"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { observeAuth, signInWithGoogle, signOutFirebase } from "@/lib/firebase";
import type { User } from "firebase/auth";

export default function AuthGate() {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const unsub = observeAuth((u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  if (!ready) {
    return (
      <div className="h-9 flex items-center text-sm text-slate-500">
        Loading…
      </div>
    );
  }

  if (!user) {
    return (
      <Button onClick={signInWithGoogle} size="md">
        Sign in with Google
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-slate-700">
        {user.displayName || user.email}
      </span>
      <Button variant="secondary" size="md" onClick={signOutFirebase}>
        Sign out
      </Button>
    </div>
  );
}
