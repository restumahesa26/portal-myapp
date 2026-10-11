'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { AppItem, AppFormData } from '@/types/app';
import { getAppsList, createAppItem, updateAppItem } from '@/lib/firestore';
import { DemoBanner } from '@/components/DemoBanner';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { StatsRibbon } from '@/components/StatsRibbon';
import { AppGrid } from '@/components/AppGrid';
import { AppFormModal } from '@/components/AppFormModal';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import { Layers, ShieldCheck, Heart } from 'lucide-react';

export default function HomePage() {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);

  const { isAdmin } = useAuth();

  const fetchApps = async () => {
    setLoading(true);
    try {
      const data = await getAppsList();
      setApps(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      fetchApps();
    } else {
      setApps([]);
      setLoading(false);
    }
  }, [isAdmin]);

  // Compute dynamic categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    apps.forEach((app) => {
      if (app.category) set.add(app.category);
    });
    return ['All', ...Array.from(set)];
  }, [apps]);

  // Statistics
  const prodCount = useMemo(() => {
    return apps.filter((a) => a.status === 'Production').length;
  }, [apps]);

  const handleCreateOrUpdate = async (formData: AppFormData) => {
    if (editingApp) {
      await updateAppItem(editingApp.id, formData);
    } else {
      await createAppItem(formData);
    }
    await fetchApps();
    setAddModalOpen(false);
    setEditingApp(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 selection:bg-amber-100 selection:text-amber-900">
      {/* Demo Banner */}
      <DemoBanner />

      {/* Navigation Bar */}
      <Navbar
        onOpenAddModal={() => {
          setEditingApp(null);
          setAddModalOpen(true);
        }}
      />

      {/* Hero Section matching Reference */}
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
        totalAppsCount={apps.length}
        apps={apps}
      />

      {/* Dark Stats Ribbon matching Reference */}
      <StatsRibbon totalCount={apps.length} prodCount={prodCount} />

      {/* Interactive App Grid */}
      <main className="flex-1">
        <AppGrid
          apps={apps}
          loading={loading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedStatus={selectedStatus}
          setSelectedStatus={setSelectedStatus}
          categories={categories}
          onOpenAddModal={() => {
            setEditingApp(null);
            setAddModalOpen(true);
          }}
          onEditApp={(app) => {
            setEditingApp(app);
            setAddModalOpen(true);
          }}
        />
      </main>

      {/* Add / Edit Modal */}
      <AppFormModal
        isOpen={addModalOpen}
        onClose={() => {
          setAddModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingApp}
      />

      {/* Minimalist Editorial Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-white border border-neutral-200 p-0.5 shadow-2xs flex items-center justify-center">
              <Image
                src="/my-logo.png"
                alt="Logo Mufti Restu"
                width={32}
                height={32}
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div>
              <div className="font-heading font-extrabold text-sm text-neutral-900">
                Personal App Launcher
              </div>
              <div className="text-xs text-neutral-400">
                Crafted for focused productivity & zero clutter.
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs text-neutral-500 font-medium">
            <span>Next.js 15+</span>
            <span>•</span>
            <span>Tailwind CSS</span>
            <span>•</span>
            <span>Firebase Auth</span>
          </div>

          <div className="text-xs text-neutral-400">
            &copy; 2026 Private Hub. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
