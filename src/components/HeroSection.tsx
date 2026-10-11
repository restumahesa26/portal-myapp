'use client';

import React from 'react';
import Image from 'next/image';
import { Search, ArrowRight, Sparkles, CheckCircle2, Shield, Activity } from 'lucide-react';

import { AppItem } from '@/types/app';

interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
  categories: string[];
  totalAppsCount: number;
  apps?: AppItem[];
}

export function HeroSection({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
  totalAppsCount,
  apps = [],
}: HeroSectionProps) {
  const handleScrollToGrid = (e: React.FormEvent) => {
    e.preventDefault();
    const el = document.getElementById('apps-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-8 pb-16 md:pt-16 md:pb-24 overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Heading, Subhead, Search Pill */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200/80 text-neutral-800 text-xs font-semibold w-fit mb-6 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Private Developer Hub
            </div>

            {/* Signature Headline matching the reference image */}
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl md:text-6xl text-neutral-950 tracking-tight leading-[1.12] mb-6">
              Find Your{' '}
              <span className="inline-flex items-center justify-center align-middle mx-1 px-4 py-1.5 rounded-full border border-neutral-900 bg-neutral-50/50 hover:bg-neutral-100 transition-colors">
                <ArrowRight className="w-6 h-6 md:w-8 md:h-8 text-neutral-900 stroke-[2.2]" />
              </span>{' '}
              <br className="hidden sm:inline" />
              Apps & Tools Here <br />
              In One Place
            </h1>

            {/* Subhead */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed mb-8">
              Quickly launch personal websites, access private side projects, and manage all your deployed production tools without clutter.
            </p>

            {/* Search Bar matching reference pill container */}
            <form
              onSubmit={handleScrollToGrid}
              className="max-w-2xl bg-white border border-neutral-200 rounded-full p-2 pl-6 flex items-center gap-3 shadow-[0_10px_35px_-10px_rgba(0,0,0,0.07)] hover:border-neutral-300 transition-all focus-within:border-black focus-within:ring-2 focus-within:ring-black/5"
            >
              {/* Search text input */}
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="App name or keyword..."
                  className="w-full bg-transparent text-sm sm:text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden"
                />
              </div>

              {/* Divider */}
              <div className="w-[1px] h-6 bg-neutral-200 hidden sm:block" />

              {/* Category dropdown */}
              <div className="hidden sm:block">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-transparent text-sm text-neutral-600 font-medium focus:outline-hidden pr-2 cursor-pointer"
                >
                  <option value="All">All Categories</option>
                  {categories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              {/* Circular Search Action Button */}
              <button
                type="submit"
                aria-label="Search apps"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black hover:bg-neutral-800 text-white flex items-center justify-center shrink-0 transition-transform active:scale-95 shadow-sm cursor-pointer"
              >
                <Search className="w-5 h-5 stroke-[2.2]" />
              </button>
            </form>
          </div>

          {/* Right Column: Floating Bento Graphic inspired by Reference */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Warm Graphic Accent Backdrop */}
            <div className="absolute -top-6 -right-6 w-72 h-72 sm:w-88 sm:h-88 bg-amber-400 rounded-[48px] -rotate-6 transition-transform -z-10 opacity-95" />
            <div className="absolute top-12 right-12 w-48 h-48 bg-red-400/20 rounded-full blur-2xl -z-10" />

            {/* Container for Floating Cards */}
            <div className="relative w-full max-w-md pt-4 pb-6">
              {/* Floating Card 1: Owner Profile Badge (mirrors Aubrey Menzie card in reference) */}
              <div className="absolute -top-4 -right-2 sm:-right-4 z-20 bg-white rounded-3xl p-4 shadow-[0_16px_36px_-6px_rgba(0,0,0,0.12)] border border-neutral-100 flex flex-col items-center gap-2.5 w-44 animate-in fade-in slide-in-from-bottom-2 duration-500">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-white border border-neutral-200/80 p-0.5 shadow-xs overflow-hidden flex items-center justify-center">
                    <Image
                      src="/my-logo.png"
                      alt="Mufti Restu Logo"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain rounded-full"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 bg-black text-amber-400 w-5 h-5 rounded-full flex items-center justify-center text-[10px] shadow-xs">
                    ✦
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-heading font-bold text-sm text-neutral-900 leading-tight">
                    Mufti Restu
                  </div>
                  <div className="text-[11px] text-neutral-500 font-medium">
                    Owner & Developer
                  </div>
                </div>
                <div className="w-full bg-black text-white text-xs font-semibold py-1.5 px-3 rounded-full text-center hover:bg-neutral-800 transition-colors cursor-pointer">
                  Online
                </div>
              </div>

              {/* Floating Card 2: Main Featured Selector Card (mirrors the Find Job list card in reference) */}
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.1)] border border-neutral-100 z-10 mr-12 sm:mr-16">
                <div className="flex items-center justify-between pb-4 border-b border-neutral-100 mb-4">
                  <div>
                    <div className="text-xs font-semibold text-neutral-400 uppercase tracking-wider">
                      Quick Launcher
                    </div>
                    <div className="font-heading font-extrabold text-base text-neutral-900 flex items-center gap-1.5 mt-0.5">
                      Personal Hub <span className="text-amber-500">▾</span>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    {totalAppsCount} Active
                  </span>
                </div>

                {/* Micro App List Items */}
                <div className="space-y-3.5">
                  {apps.length === 0 ? (
                    <div className="py-5 text-center text-xs text-neutral-400 font-medium">
                      Belum ada aplikasi yang ditambahkan.
                    </div>
                  ) : (
                    apps.slice(0, 2).map((app) => (
                      <a
                        key={app.id}
                        href={app.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 p-2 rounded-2xl hover:bg-neutral-50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-full bg-black text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                          {app.title.charAt(0).toUpperCase()}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-heading font-bold text-sm text-neutral-900 truncate">
                            {app.title}
                          </div>
                          <div className="text-xs text-neutral-500 flex items-center gap-2">
                            <span>{app.category || 'General'}</span>
                            <span className="text-neutral-300">•</span>
                            <span className="text-emerald-600 font-medium">{app.status || 'Active'}</span>
                          </div>
                        </div>
                      </a>
                    ))
                  )}
                </div>

                {/* Bottom link inside floating card */}
                <a
                  href="#apps-section"
                  className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 hover:text-black group cursor-pointer"
                >
                  <span>Explore All Apps</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
