'use client';

import React from 'react';
import { AppItem } from '@/types/app';
import { AppIcon } from '@/components/AppIcon';
import { ArrowUpRight, Edit3 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface AppCardProps {
  app: AppItem;
  onEdit?: (app: AppItem) => void;
}

export function AppCard({ app, onEdit }: AppCardProps) {
  const { isAdmin } = useAuth();

  // Status badge styling adhering to design system
  const renderStatusBadge = () => {
    switch (app.status) {
      case 'Production':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/60 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Production
          </span>
        );
      case 'Beta':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/60 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            Beta
          </span>
        );
      case 'WIP':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200/60 shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            WIP
          </span>
        );
      case 'Archive':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-600 border border-neutral-200 shadow-2xs">
            Archived
          </span>
        );
      default:
        return null;
    }
  };

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Standard open in new tab
  };

  return (
    <div className="relative group">
      <a
        href={app.url}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleCardClick}
        className="flex flex-col h-full bg-white rounded-3xl p-6 border border-neutral-200/80 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_36px_-6px_rgba(0,0,0,0.09)] hover:border-neutral-900 transition-all duration-200 hover:-translate-y-1.5 cursor-pointer"
      >
        {/* Top Row: Icon + Status Badge + Arrow Link */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <AppIcon
            iconUrl={app.iconUrl}
            iconPreset={app.iconPreset}
            title={app.title}
            className="w-13 h-13"
          />

          <div className="flex items-center gap-2">
            {renderStatusBadge()}

            <div className="w-8 h-8 rounded-full bg-neutral-50 group-hover:bg-black group-hover:text-white text-neutral-500 flex items-center justify-center transition-all shrink-0">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Content: Title & Description */}
        <div className="flex-1">
          <h3 className="font-heading font-bold text-lg text-neutral-900 group-hover:text-black tracking-tight mb-2 leading-snug">
            {app.title}
          </h3>
          <p className="text-sm text-neutral-500 font-normal leading-relaxed line-clamp-2">
            {app.description || 'No description provided.'}
          </p>
        </div>

        {/* Bottom Metadata: Category Tag & Clean Launch Prompt */}
        <div className="mt-5 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs">
          <span className="font-semibold text-neutral-500 bg-neutral-100/80 px-2.5 py-1 rounded-full">
            {app.category || 'General'}
          </span>

          <span className="font-semibold text-neutral-400 group-hover:text-neutral-900 transition-colors flex items-center gap-1">
            Launch App
          </span>
        </div>
      </a>

      {/* Admin Quick Action (Edit) */}
      {isAdmin && onEdit && (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onEdit(app);
          }}
          title="Edit Application"
          className="absolute top-4 right-14 z-20 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs border border-neutral-200 text-neutral-600 hover:text-black hover:border-black flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-xs cursor-pointer"
        >
          <Edit3 className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
}
