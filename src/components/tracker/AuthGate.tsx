"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { observeAuth, signInWithGoogle, signOutFirebase, observeUserData, saveUserData } from "@/lib/firebase";
import type { User } from "firebase/auth";
import type { DataModel } from "@/lib/types";

interface AuthGateProps {
  data: DataModel;
  setData: React.Dispatch<React.SetStateAction<DataModel>>;
}

export default function AuthGate({ data, setData }: AuthGateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [ready, setReady] = useState(false);
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const unsub = observeAuth((u) => {
      setUser(u);
      setReady(true);
    });
    return () => unsub();
  }, []);

  useEffect(() => {
    if (!user) return;

    // Subscribe to user data changes
    const unsub = observeUserData(user.uid, (cloudData) => {
      if (cloudData) {
        setData(cloudData as DataModel);
      }
    });

    return () => unsub();
  }, [user, setData]);

  useEffect(() => {
    if (!user || syncing) return;

    // Save data to cloud when it changes
    const saveToCloud = async () => {
      setSyncing(true);
      try {
        await saveUserData(user.uid, data);
      } catch (error) {
        console.error("Failed to save to cloud:", error);
      } finally {
        setSyncing(false);
      }
    };

    const timeoutId = setTimeout(saveToCloud, 1000); // Debounce saves
    return () => clearTimeout(timeoutId);
  }, [data, user, syncing]);

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
      {syncing && (
        <span className="text-xs text-slate-500">Syncing...</span>
      )}
      <Button variant="secondary" size="md" onClick={signOutFirebase}>
        Sign out
      </Button>
    </div>
  );
}
