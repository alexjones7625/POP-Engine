"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";

const AUTH_KEY = "pop-platform-auth";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(AUTH_KEY);
    if (token === "authenticated") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  const handleLogin = async () => {
    setError(false);
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem(AUTH_KEY, "authenticated");
      setAuthed(true);
    } else {
      setError(true);
    }
  };

  if (checking) return null;

  if (!authed) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="w-full max-w-sm p-8 space-y-6">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Lock className="size-5 text-primary" />
            </div>
            <h1 className="text-xl font-bold tracking-tight">POP Engine</h1>
            <p className="text-sm text-muted-foreground">
              Enter password to continue
            </p>
          </div>
          <div className="space-y-3">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleLogin();
              }}
              autoFocus
            />
            {error && (
              <p className="text-xs text-destructive">Wrong password</p>
            )}
            <Button onClick={handleLogin} className="w-full">
              Sign In
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
