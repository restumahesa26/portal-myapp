'use client';

import React from 'react';
import {
  Globe,
  CheckSquare,
  Sparkles,
  Activity,
  Code2,
  CreditCard,
  Terminal,
  Database,
  Layers,
  FolderGit2,
  Cpu,
  Bookmark,
  Shield,
  Zap,
  Layout,
  LucideIcon,
} from 'lucide-react';
import Image from 'next/image';

const iconMap: Record<string, LucideIcon> = {
  CheckSquare,
  Sparkles,
  Activity,
  Globe,
  Code2,
  CreditCard,
  Terminal,
  Database,
  Layers,
  FolderGit2,
  Cpu,
  Bookmark,
  Shield,
  Zap,
  Layout,
};

interface AppIconProps {
  iconUrl?: string;
  iconPreset?: string;
  title: string;
  className?: string;
}

export function AppIcon({ iconUrl, iconPreset, title, className = 'w-12 h-12' }: AppIconProps) {
  // If a valid image URL is provided
  if (iconUrl && iconUrl.startsWith('http')) {
    return (
      <div className={`relative ${className} rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200/80 flex items-center justify-center`}>
        <Image
          src={iconUrl}
          alt={title}
          fill
          sizes="48px"
          className="object-cover"
          unoptimized
        />
      </div>
    );
  }

  // If a preset is configured
  const IconComponent = (iconPreset && iconMap[iconPreset]) || Globe;

  return (
    <div
      className={`${className} rounded-2xl bg-amber-50 border border-amber-200/60 text-amber-700 flex items-center justify-center shadow-xs transition-colors group-hover:bg-amber-100 group-hover:text-amber-800`}
    >
      <IconComponent className="w-6 h-6 stroke-[1.8]" />
    </div>
  );
}

export const AVAILABLE_ICON_PRESETS = Object.keys(iconMap);
