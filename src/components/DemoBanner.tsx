'use client';

import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Sparkles, ShieldCheck, ShieldAlert, X } from 'lucide-react';

export function DemoBanner() {
  const { isConfigured, user, isAdmin, loginAsMockAdmin, loginAsMockUnauthorized, signOut } = useAuth();
  const [dismissed, setDismissed] = useState(false);

  // If Firebase is configured or dismissed, don't show
  if (isConfigured || dismissed) return null;

  return (
    <aside aria-label="Demo Mode Notification" className="bg-amber-400 text-neutral-950 px-4 py-2.5 text-xs font-medium border-b border-amber-500/30">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-center sm:text-left">
          <Sparkles className="w-4 h-4 shrink-0 text-neutral-900" />
          <span>
            <strong>Local Preview Active:</strong> Firebase credentials not yet configured. All CRUD data saves locally.
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!user ? (
            <>
              <button
                onClick={loginAsMockAdmin}
                className="px-3 py-1 bg-black text-white hover:bg-neutral-800 rounded-full font-bold text-[11px] transition-all cursor-pointer"
              >
                Simulate Owner Login
              </button>
              <button
                onClick={loginAsMockUnauthorized}
                className="px-3 py-1 bg-white/80 hover:bg-white text-neutral-900 rounded-full font-bold text-[11px] transition-all cursor-pointer"
              >
                Test 403 Forbidden
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <span className="font-bold text-[11px] bg-black/10 px-2 py-0.5 rounded-full">
                {isAdmin ? '🛡️ Logged in as Owner' : '⛔ Logged in as Unauthorized'}
              </span>
              <button
                onClick={signOut}
                className="px-2.5 py-0.5 bg-neutral-900 text-white rounded-full text-[11px] font-bold hover:bg-black transition-colors cursor-pointer"
              >
                Reset
              </button>
            </div>
          )}

          <button
            onClick={() => setDismissed(true)}
            aria-label="Dismiss banner"
            className="w-5 h-5 rounded-full hover:bg-amber-500/40 flex items-center justify-center transition-colors ml-1 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
