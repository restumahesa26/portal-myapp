'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShieldAlert, LogOut, Home, Lock } from 'lucide-react';

export default function AccessDeniedPage() {
  const { user, signOut, adminEmail } = useAuth();

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
        >
          <Home className="w-4 h-4" />
          Back to Portal
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-red-500 bg-red-50 px-2.5 py-1 rounded-full border border-red-200">
          403 Forbidden
        </span>
      </div>

      {/* Main Content */}
      <div className="max-w-md w-full mx-auto my-auto py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-3xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-6 border border-red-200/60 shadow-xs">
            <ShieldAlert className="w-8 h-8 stroke-[2.2]" />
          </div>

          {/* Heading */}
          <h1 className="font-heading font-extrabold text-3xl text-neutral-950 tracking-tight mb-2">
            Access Denied
          </h1>
          <p className="text-sm text-neutral-500 mb-6 leading-relaxed">
            This portal is strictly private. Your Google account does not match the whitelisted owner email.
          </p>

          {/* Current Account Card */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 mb-6 text-left">
            <div className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 mb-1">
              Signed-in Account
            </div>
            <div className="font-semibold text-sm text-neutral-900 truncate">
              {user?.email || 'Unknown Google Account'}
            </div>
            <div className="text-[11px] text-red-600 font-medium mt-1 flex items-center gap-1">
              <Lock className="w-3 h-3" />
              Not authorized for admin or modification access
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => signOut()}
              className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-sm shadow-sm cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out & Switch Account</span>
            </button>

            <Link
              href="/"
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-all font-semibold text-xs cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Return to Public Launcher</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-neutral-400 font-medium">
        Whitelisted Admin: <code className="bg-neutral-100 px-2 py-0.5 rounded text-neutral-700">{adminEmail}</code>
      </div>
    </div>
  );
}
