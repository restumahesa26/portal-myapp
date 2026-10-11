'use client';

import React from 'react';
import { Layers, ShieldCheck, Zap, Lock } from 'lucide-react';

interface StatsRibbonProps {
  totalCount: number;
  prodCount: number;
}

export function StatsRibbon({ totalCount, prodCount }: StatsRibbonProps) {
  return (
    <section className="bg-black text-white py-8 border-y border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center">
          {/* Stat 1: Yellow badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 shadow-sm">
              <Layers className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                {totalCount}+
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                Integrated Apps
              </div>
            </div>
          </div>

          {/* Stat 2: Coral Red badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-rose-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                100%
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                Private & Whitelisted
              </div>
            </div>
          </div>

          {/* Stat 3: Amber Gold badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-neutral-950 flex items-center justify-center shrink-0 shadow-sm">
              <Zap className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                {prodCount} Live
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                Production Releases
              </div>
            </div>
          </div>

          {/* Stat 4: Dark Slate / Neutral badge */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-neutral-800 text-amber-400 flex items-center justify-center shrink-0 border border-neutral-700/60 shadow-sm">
              <Lock className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-white">
                Single-User
              </div>
              <div className="text-xs text-neutral-400 font-medium">
                Owner Only Access
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
