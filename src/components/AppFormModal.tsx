'use client';

import React, { useState, useEffect } from 'react';
import { AppItem, AppFormData, AppStatus } from '@/types/app';
import { AVAILABLE_ICON_PRESETS, AppIcon } from '@/components/AppIcon';
import { X } from 'lucide-react';

interface AppFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AppFormData) => Promise<void>;
  initialData?: AppItem | null;
}

export const PREDEFINED_CATEGORIES = [
  'Productivity',
  'Dev Tools',
  'AI & LLM',
  'DevOps & Cloud',
  'Website & Blog',
  'Finance & Billing',
  'Utilities',
  'Client Work',
  'Media & Design',
  'General',
];

export function AppFormModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}: AppFormModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [iconPreset, setIconPreset] = useState('Globe');
  const [category, setCategory] = useState('Productivity');
  const [isCustomCategory, setIsCustomCategory] = useState(false);
  const [status, setStatus] = useState<AppStatus>('Production');
  const [order, setOrder] = useState(1);
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || '');
      setDescription(initialData.description || '');
      setUrl(initialData.url || '');
      setIconUrl(initialData.iconUrl || '');
      setIconPreset(initialData.iconPreset || 'Globe');
      const cat = initialData.category || 'Productivity';
      setCategory(cat);
      setIsCustomCategory(!PREDEFINED_CATEGORIES.includes(cat));
      setStatus(initialData.status || 'Production');
      setOrder(initialData.order || 1);
      setIsActive(initialData.isActive ?? true);
    } else {
      setTitle('');
      setDescription('');
      setUrl('');
      setIconUrl('');
      setIconPreset('Globe');
      setCategory('Productivity');
      setIsCustomCategory(false);
      setStatus('Production');
      setOrder(1);
      setIsActive(true);
    }
    setError('');
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Title is required');
      return;
    }
    if (!url.trim()) {
      setError('URL is required');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await onSubmit({
        title: title.trim(),
        description: description.trim(),
        url: url.trim(),
        iconUrl: iconUrl.trim() || '',
        iconPreset,
        category: category.trim() || 'General',
        status,
        order: Number(order) || 1,
        isActive,
      });
      onClose();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Failed to save app. Please check inputs.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 py-6 sm:py-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-[0_24px_64px_rgba(0,0,0,0.2)] border border-neutral-100 overflow-hidden">
        {/* Fixed Header */}
        <div className="shrink-0 flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-100 bg-white">
          <div>
            <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-neutral-950">
              {initialData ? 'Edit Application' : 'Add New Application'}
            </h3>
            <p className="text-xs text-neutral-500 mt-0.5">
              Fill in the details for your launcher portal card.
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-600 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} id="app-form" className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-5">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          {/* 2-Column Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
            {/* Left Column: Basic App Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  App Title *
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Personal Task Manager"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black text-sm text-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Target URL *
                </label>
                <input
                  type="url"
                  required
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://app.yourdomain.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black text-sm text-neutral-900 focus:outline-hidden"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description of the app functionality..."
                  className="w-full px-4 py-2.5 rounded-xl border border-neutral-200 focus:border-black focus:ring-1 focus:ring-black text-sm text-neutral-900 focus:outline-hidden resize-none"
                />
              </div>
            </div>

            {/* Right Column: Taxonomy, Icons, and Status */}
            <div className="space-y-4">
              {/* Category, Status, Order in 3 columns */}
              <div className="grid grid-cols-3 gap-2.5">
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 truncate">
                      Category
                    </label>
                    {isCustomCategory && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsCustomCategory(false);
                          setCategory('Productivity');
                        }}
                        className="text-[9px] text-neutral-500 hover:text-black underline cursor-pointer"
                      >
                        Pilih Opsi
                      </button>
                    )}
                  </div>

                  {!isCustomCategory ? (
                    <select
                      value={category}
                      onChange={(e) => {
                        if (e.target.value === '__custom__') {
                          setIsCustomCategory(true);
                          setCategory('');
                        } else {
                          setCategory(e.target.value);
                        }
                      }}
                      className="w-full px-2.5 py-2 rounded-xl border border-neutral-200 focus:border-black text-xs font-medium text-neutral-900 focus:outline-hidden cursor-pointer bg-white"
                    >
                      {PREDEFINED_CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                      <option value="__custom__">+ Tulis Manual...</option>
                    </select>
                  ) : (
                    <input
                      type="text"
                      autoFocus
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="Ketik kategori..."
                      className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:border-black text-xs text-neutral-900 focus:outline-hidden"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5 truncate">
                    Status
                  </label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as AppStatus)}
                    className="w-full px-2.5 py-2 rounded-xl border border-neutral-200 focus:border-black text-xs font-medium text-neutral-900 focus:outline-hidden cursor-pointer"
                  >
                    <option value="Production">Production</option>
                    <option value="Beta">Beta</option>
                    <option value="WIP">WIP</option>
                    <option value="Archive">Archive</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1.5 truncate">
                    Priority
                  </label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:border-black text-sm text-neutral-900 focus:outline-hidden"
                  />
                </div>
              </div>

              {/* Icon Configuration & Preview Box */}
              <div className="p-3.5 bg-neutral-50 rounded-2xl border border-neutral-200/70 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1">
                      Icon Preset
                    </label>
                    <select
                      value={iconPreset}
                      onChange={(e) => setIconPreset(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 focus:border-black text-xs text-neutral-900 focus:outline-hidden cursor-pointer bg-white"
                    >
                      {AVAILABLE_ICON_PRESETS.map((iconName) => (
                        <option key={iconName} value={iconName}>
                          {iconName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-neutral-700 mb-1 truncate">
                      Icon URL (Optional)
                    </label>
                    <input
                      type="url"
                      value={iconUrl}
                      onChange={(e) => setIconUrl(e.target.value)}
                      placeholder="https://.../icon.png"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-neutral-200 focus:border-black text-xs text-neutral-900 focus:outline-hidden bg-white"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2.5 pt-1 border-t border-neutral-200/60">
                  <AppIcon
                    iconUrl={iconUrl}
                    iconPreset={iconPreset}
                    title={title || 'Preview'}
                    className="w-8 h-8 shrink-0"
                  />
                  <span className="text-[11px] text-neutral-500 font-medium">
                    Icon Preview on Card
                  </span>
                </div>
              </div>

              {/* Active Toggle */}
              <div className="flex items-center justify-between p-3 bg-neutral-50 rounded-2xl border border-neutral-200/70">
                <div>
                  <div className="text-xs font-bold text-neutral-900">
                    Active on Portal
                  </div>
                  <div className="text-[11px] text-neutral-500">
                    Show or hide from main launcher
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-10 h-5.5 bg-neutral-200 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-4.5 after:w-4.5 after:transition-all peer-checked:bg-black"></div>
                </label>
              </div>
            </div>
          </div>
        </form>

        {/* Fixed Footer */}
        <div className="shrink-0 flex items-center justify-end gap-3 px-6 sm:px-8 py-4 border-t border-neutral-100 bg-white">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="app-form"
            disabled={loading}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Saving...' : initialData ? 'Update App' : 'Create App'}
          </button>
        </div>
      </div>
    </div>
  );
}
