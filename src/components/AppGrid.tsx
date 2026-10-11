'use client';

import React from 'react';
import { AppItem } from '@/types/app';
import { AppCard } from '@/components/AppCard';
import { Search, Plus, Filter, Lock, ShieldAlert, LogOut } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AppGridProps {
  apps: AppItem[];
  loading: boolean;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  categories: string[];
  onOpenAddModal: () => void;
  onEditApp: (app: AppItem) => void;
}

export function AppGrid({
  apps,
  loading,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  selectedStatus,
  setSelectedStatus,
  categories,
  onOpenAddModal,
  onEditApp,
}: AppGridProps) {
  const { user, isAdmin, loading: authLoading, signInWithGoogle, signOut } = useAuth();

  // If authenticating, show skeleton
  if (authLoading) {
    return (
      <section id="apps-section" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-100 min-h-[500px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-3xl p-6 border border-neutral-200 animate-pulse h-64" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // If not logged in or not using an allowed email, lock the section and show required message
  if (!isAdmin) {
    return (
      <section id="apps-section" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-100 min-h-[550px] flex items-center justify-center">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white rounded-3xl border border-neutral-200/90 p-8 sm:p-12 text-center shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
            {/* Lock Icon */}
            <div className="w-16 h-16 rounded-3xl bg-neutral-900 text-amber-400 flex items-center justify-center mx-auto mb-6 shadow-sm border border-neutral-800">
              <Lock className="w-7 h-7 stroke-[2]" />
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-semibold mb-3">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
              Akses Terbatas • Single-Tenant Portal
            </div>

            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-neutral-950 tracking-tight mb-2">
              Daftar Aplikasi Terkunci
            </h2>

            {/* Required notice requested by the user */}
            <div className="bg-amber-50 border border-amber-200/80 rounded-2xl p-4 my-5 text-amber-950 font-semibold text-sm sm:text-base leading-relaxed shadow-2xs">
              Anda harus di-allow oleh admin untuk mengakses daftar aplikasi ini.
            </div>

            {!user ? (
              <div className="mt-4 space-y-4">
                <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                  Silakan login dengan akun Google Anda yang telah didaftarkan untuk membuka akses ke seluruh daftar aplikasi.
                </p>
                <div>
                  <button
                    onClick={() => signInWithGoogle()}
                    className="inline-flex items-center justify-center gap-3 px-8 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-all font-semibold text-sm shadow-sm hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                  >
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
                    <span>Masuk dengan Google</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div className="bg-neutral-50 rounded-2xl p-3.5 border border-neutral-200/80 max-w-sm mx-auto text-xs text-neutral-600">
                  Akun saat ini:{' '}
                  <span className="font-bold text-neutral-900 block truncate mt-0.5">
                    {user.email}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                  Email ini belum masuk dalam whitelist admin. Silakan beralih ke akun yang di-allow atau hubungi pemilik portal.
                </p>
                <div>
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-neutral-900 hover:bg-black text-white text-xs font-semibold transition-all cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Ganti Akun / Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Filter apps for authorized users
  const filteredApps = apps.filter((app) => {
    // Only show active apps on main launcher (unless user is admin)
    if (!app.isActive && !isAdmin) return false;

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = app.title.toLowerCase().includes(q);
      const matchDesc = app.description.toLowerCase().includes(q);
      const matchCat = (app.category || '').toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchCat) return false;
    }

    // Category filter
    if (selectedCategory !== 'All') {
      if (app.category !== selectedCategory) return false;
    }

    // Status filter
    if (selectedStatus !== 'All') {
      if (app.status !== selectedStatus) return false;
    }

    return true;
  });

  return (
    <section id="apps-section" className="py-16 md:py-24 bg-[#FAFAFA] border-t border-neutral-100 min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-400 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-900" />
              Application Launcher
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-neutral-950 tracking-tight">
              All Deployed Apps
            </h2>
            <p className="text-sm text-neutral-500 mt-1">
              Showing {filteredApps.length} of {apps.length} total applications
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {categories.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'bg-black text-white shadow-xs'
                      : 'bg-white text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200/70'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Filters Bar: Status pills */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-3 px-4 bg-white rounded-2xl border border-neutral-200/80 mb-8 shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-semibold text-neutral-500">
            <Filter className="w-3.5 h-3.5 text-neutral-400" />
            <span>Status:</span>
            {['All', 'Production', 'Beta', 'WIP'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-3 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                  selectedStatus === status
                    ? 'bg-neutral-900 text-white font-bold'
                    : 'text-neutral-600 hover:bg-neutral-100 font-medium'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {isAdmin && (
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-neutral-100 hover:bg-black hover:text-white text-neutral-800 transition-all cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              Add New App
            </button>
          )}
        </div>

        {/* Loading Skeleton */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-6 border border-neutral-200 animate-pulse flex flex-col gap-4 h-64"
              >
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 bg-neutral-200 rounded-2xl" />
                  <div className="w-20 h-6 bg-neutral-200 rounded-full" />
                </div>
                <div className="w-3/4 h-5 bg-neutral-200 rounded-md mt-2" />
                <div className="w-full h-4 bg-neutral-100 rounded-md" />
                <div className="w-2/3 h-4 bg-neutral-100 rounded-md" />
                <div className="mt-auto pt-4 border-t border-neutral-100 flex justify-between">
                  <div className="w-16 h-4 bg-neutral-100 rounded-full" />
                  <div className="w-12 h-4 bg-neutral-100 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredApps.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-3xl border border-neutral-200/80 p-12 sm:p-16 text-center max-w-xl mx-auto shadow-2xs">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mx-auto mb-4 border border-amber-200">
              <Search className="w-7 h-7" />
            </div>
            <h3 className="font-heading font-bold text-xl text-neutral-900 mb-2">
              No applications found
            </h3>
            <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
              We couldn&apos;t find any apps matching your filters or search query &quot;{searchQuery}&quot;.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('All');
                  setSelectedStatus('All');
                }}
                className="px-5 py-2.5 rounded-full text-xs font-semibold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
              {isAdmin && (
                <button
                  onClick={onOpenAddModal}
                  className="px-5 py-2.5 rounded-full text-xs font-semibold bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                >
                  Create New App
                </button>
              )}
            </div>
          </div>
        ) : (
          /* App Cards Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredApps.map((app) => (
              <AppCard key={app.id} app={app} onEdit={onEditApp} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
