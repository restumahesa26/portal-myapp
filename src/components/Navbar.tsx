'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, LogOut, LayoutDashboard, Plus, ExternalLink } from 'lucide-react';

import Image from 'next/image';

interface NavbarProps {
  onOpenAddModal?: () => void;
}

export function Navbar({ onOpenAddModal }: NavbarProps) {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full overflow-hidden bg-white border border-neutral-200/80 p-0.5 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-neutral-900 transition-all">
            <Image
              src="/my-logo.png"
              alt="Logo Mufti Restu"
              width={40}
              height={40}
              className="w-full h-full object-contain rounded-full"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-xl tracking-tight text-neutral-900 group-hover:text-black">
              Mufti<span className="text-amber-500">Hub</span>
            </span>
            <span className="text-[10px] uppercase font-semibold tracking-widest text-neutral-400 -mt-1">
              Personal Portal
            </span>
          </div>
        </Link>

        {/* Navigation links & status */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
          <Link
            href="/"
            className="hover:text-black transition-colors"
          >
            Launcher
          </Link>
          <a
            href="#apps-section"
            className="hover:text-black transition-colors"
          >
            All Apps
          </a>
          {isAdmin && (
            <Link
              href="/admin"
              className="flex items-center gap-1.5 text-neutral-800 hover:text-black font-semibold transition-colors"
            >
              <LayoutDashboard className="w-4 h-4 text-amber-500" />
              Admin Panel
            </Link>
          )}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-neutral-500 hover:text-neutral-800 transition-colors"
          >
            GitHub
            <ExternalLink className="w-3 h-3" />
          </a>
        </nav>

        {/* Right side actions */}
        <div className="flex items-center gap-3">
          {isAdmin && onOpenAddModal && (
            <button
              onClick={onOpenAddModal}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold bg-amber-400 text-neutral-900 hover:bg-amber-300 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-3.5 h-3.5" />
              Add App
            </button>
          )}

          {user ? (
            <div className="flex items-center gap-3 bg-neutral-50 border border-neutral-200/80 rounded-full pl-3 pr-1.5 py-1.5">
              <div className="flex items-center gap-2">
                {isAdmin ? (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-full">
                    <ShieldCheck className="w-3 h-3 text-emerald-600" />
                    Owner
                  </span>
                ) : (
                  <span className="text-[11px] font-medium text-neutral-500">
                    Visitor
                  </span>
                )}
                <span className="text-xs font-medium text-neutral-700 max-w-[120px] truncate hidden sm:inline">
                  {user.displayName || user.email}
                </span>
              </div>
              <button
                onClick={() => signOut()}
                title="Sign Out"
                className="w-8 h-8 rounded-full bg-white hover:bg-red-50 text-neutral-600 hover:text-red-600 border border-neutral-200/60 flex items-center justify-center transition-colors shadow-2xs"
              >
                <LogOut className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-semibold bg-black text-white hover:bg-neutral-800 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
