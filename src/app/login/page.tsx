'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, ArrowLeft, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const { user, isAdmin, signInWithGoogle, loading, isConfigured } = useAuth();
  const router = useRouter();
  const [authError, setAuthError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      if (isAdmin) {
        router.push('/');
      } else {
        router.push('/access-denied');
      }
    }
  }, [user, isAdmin, loading, router]);

  const handleGoogleSignIn = async () => {
    setAuthError('');
    setSubmitting(true);
    try {
      await signInWithGoogle();
    } catch (err: unknown) {
      console.error(err);
      setAuthError('Authentication was cancelled or failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between p-6 sm:p-12">
      {/* Top Bar */}
      <div className="max-w-md w-full mx-auto flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-500 hover:text-black transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Portal
        </Link>
        <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400">
          Single-User Mode
        </span>
      </div>

      {/* Main Login Box */}
      <div className="max-w-md w-full mx-auto my-auto py-12">
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-neutral-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.06)] text-center">
          {/* Brand Emblem */}
          <div className="w-20 h-20 rounded-3xl bg-white border border-neutral-200/80 p-1 flex items-center justify-center mx-auto mb-6 shadow-xs overflow-hidden">
            <Image
              src="/my-logo.png"
              alt="Logo Mufti Restu"
              width={76}
              height={76}
              className="w-full h-full object-contain rounded-2xl"
              priority
            />
          </div>

          {/* Heading & Subtext */}
          <h1 className="font-heading font-extrabold text-3xl text-neutral-950 tracking-tight mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-neutral-500 max-w-xs mx-auto mb-8 leading-relaxed">
            Personal portal is restricted to the authorized owner. Sign in with your whitelisted Google Account.
          </p>

          {authError && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded-2xl flex items-center gap-2.5 text-left font-medium">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
              <span>{authError}</span>
            </div>
          )}

          {/* Sign In with Google Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={submitting || loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-sm shadow-sm hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
          >
            {/* Google SVG Logo */}
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.9c2.28-2.1 3.64-5.2 3.64-9.14z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.92H1.21v3.15C3.25 21.43 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.32 14.28c-.24-.72-.38-1.49-.38-2.28s.14-1.56.38-2.28V6.57H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.43l4.11-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.25 2.57 1.21 6.57l4.11 3.15c.94-2.82 3.58-4.97 6.68-4.97z"
              />
            </svg>
            <span>{submitting ? 'Connecting...' : 'Sign in with Google'}</span>
          </button>

          {!isConfigured && (
            <p className="mt-4 text-[11px] text-amber-600 bg-amber-50 py-2 px-3 rounded-full border border-amber-200/60 font-medium">
              Demo mode: Clicking will sign in as the preview owner.
            </p>
          )}

          {/* Security Badge */}
          <div className="mt-8 pt-6 border-t border-neutral-100 flex items-center justify-center gap-2 text-xs text-neutral-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Encrypted Single-Tenant Authorization</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-neutral-400 font-medium">
        &copy; 2026 My App Hub. Strict Single-User Portal.
      </div>
    </div>
  );
}
