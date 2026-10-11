'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { AppItem, AppFormData } from '@/types/app';
import {
  getAppsList,
  createAppItem,
  updateAppItem,
  deleteAppItem,
} from '@/lib/firestore';
import { AppIcon } from '@/components/AppIcon';
import { AppFormModal } from '@/components/AppFormModal';
import { DeleteConfirmModal } from '@/components/DeleteConfirmModal';
import {
  ArrowLeft,
  Plus,
  Edit2,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  ExternalLink,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';

export default function AdminPage() {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const router = useRouter();

  const [apps, setApps] = useState<AppItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingApp, setEditingApp] = useState<AppItem | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [appToDelete, setAppToDelete] = useState<AppItem | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Security guard
  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
      } else if (!isAdmin) {
        router.push('/access-denied');
      }
    }
  }, [user, isAdmin, authLoading, router]);

  // Load apps
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
    fetchApps();
  }, []);

  // CRUD actions
  const handleCreateOrUpdate = async (formData: AppFormData) => {
    if (editingApp) {
      await updateAppItem(editingApp.id, formData);
    } else {
      await createAppItem(formData);
    }
    await fetchApps();
    setModalOpen(false);
    setEditingApp(null);
  };

  const handleToggleActive = async (app: AppItem) => {
    await updateAppItem(app.id, { isActive: !app.isActive });
    await fetchApps();
  };

  const handleMoveOrder = async (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= apps.length) return;

    const currentApp = apps[index];
    const targetApp = apps[targetIndex];

    const currentOrder = currentApp.order;
    const targetOrder = targetApp.order;

    await updateAppItem(currentApp.id, { order: targetOrder });
    await updateAppItem(targetApp.id, { order: currentOrder });
    await fetchApps();
  };

  const handleDeleteConfirm = async () => {
    if (!appToDelete) return;
    setActionLoading(true);
    try {
      await deleteAppItem(appToDelete.id);
      await fetchApps();
      setDeleteModalOpen(false);
      setAppToDelete(null);
    } finally {
      setActionLoading(false);
    }
  };

  if (authLoading || (!user && authLoading)) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBFBFC]">
      {/* Admin Header */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-18 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <Link
              href="/"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 flex items-center justify-center transition-colors shrink-0"
              title="Kembali ke Launcher"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden bg-white border border-neutral-200 p-0.5 shadow-2xs flex items-center justify-center shrink-0">
                <Image
                  src="/my-logo.png"
                  alt="Logo Mufti Restu"
                  width={40}
                  height={40}
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <h1 className="font-heading font-extrabold text-base sm:text-xl text-neutral-950 truncate">
                    App Management
                  </h1>
                  <span className="text-[10px] sm:text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2 py-0.5 rounded-full flex items-center gap-1 shrink-0">
                    <ShieldCheck className="w-3 h-3 text-amber-600" />
                    Admin
                  </span>
                </div>
                <p className="text-xs text-neutral-500 hidden sm:block">
                  Organize, edit, and reorder all portal cards.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                setEditingApp(null);
                setModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-bold bg-black text-white hover:bg-neutral-800 transition-all shadow-sm active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Application</span>
              <span className="sm:hidden">Add</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Table Container */}
        <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-[0_4px_24px_rgba(0,0,0,0.03)] overflow-hidden">
          {apps.length > 0 && (
            <div className="px-4 py-2 sm:hidden text-[11px] text-neutral-400 bg-neutral-50/70 border-b border-neutral-100 flex items-center justify-between">
              <span>Geser tabel untuk detail lengkap</span>
              <span>👉</span>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left border-collapse">
              <thead>
                <tr className="border-b border-neutral-100 bg-neutral-50/70 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                  <th className="py-4 px-6 w-16">Sort</th>
                  <th className="py-4 px-6">App Details</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Status</th>
                  <th className="py-4 px-6 text-center">Active</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 text-sm">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-neutral-400">
                      Loading applications...
                    </td>
                  </tr>
                ) : apps.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-16 text-center">
                      <div className="max-w-xs mx-auto">
                        <p className="text-sm text-neutral-500 mb-4">
                          Database aplikasi masih kosong.
                        </p>
                        <button
                          onClick={() => {
                            setEditingApp(null);
                            setModalOpen(true);
                          }}
                          className="px-5 py-2.5 bg-black hover:bg-neutral-800 text-white rounded-full text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          Tambah Aplikasi Pertama
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  apps.map((app, index) => (
                    <tr
                      key={app.id}
                      className={`hover:bg-neutral-50/80 transition-colors ${
                        !app.isActive ? 'opacity-60 bg-neutral-50/40' : ''
                      }`}
                    >
                      {/* Sort Controls */}
                      <td className="py-4 px-6">
                        <div className="flex flex-col items-center gap-1">
                          <button
                            disabled={index === 0}
                            onClick={() => handleMoveOrder(index, 'up')}
                            className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30 transition-colors cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5 text-neutral-600" />
                          </button>
                          <span className="text-[11px] font-bold text-neutral-400">
                            {app.order}
                          </span>
                          <button
                            disabled={index === apps.length - 1}
                            onClick={() => handleMoveOrder(index, 'down')}
                            className="p-1 hover:bg-neutral-200 rounded disabled:opacity-30 transition-colors cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5 text-neutral-600" />
                          </button>
                        </div>
                      </td>

                      {/* App Details */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <AppIcon
                            iconUrl={app.iconUrl}
                            iconPreset={app.iconPreset}
                            title={app.title}
                            className="w-10 h-10 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-heading font-bold text-neutral-900 flex items-center gap-1.5">
                              <span>{app.title}</span>
                              <a
                                href={app.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-neutral-400 hover:text-black transition-colors"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                            <div className="text-xs text-neutral-500 truncate max-w-xs">
                              {app.url}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="py-4 px-6">
                        <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-neutral-100 text-neutral-700">
                          {app.category || 'General'}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-4 px-6">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold ${
                            app.status === 'Production'
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : app.status === 'Beta'
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          {app.status || 'WIP'}
                        </span>
                      </td>

                      {/* Active Toggle */}
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => handleToggleActive(app)}
                          title={app.isActive ? 'Hide from launcher' : 'Show on launcher'}
                          className={`p-2 rounded-xl border transition-all cursor-pointer ${
                            app.isActive
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                              : 'bg-neutral-100 text-neutral-400 border-neutral-200 hover:bg-neutral-200'
                          }`}
                        >
                          {app.isActive ? (
                            <Eye className="w-4 h-4" />
                          ) : (
                            <EyeOff className="w-4 h-4" />
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingApp(app);
                              setModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-neutral-100 hover:bg-black hover:text-white text-neutral-700 transition-colors cursor-pointer"
                            title="Edit App"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setAppToDelete(app);
                              setDeleteModalOpen(true);
                            }}
                            className="p-2 rounded-xl bg-neutral-100 hover:bg-red-600 hover:text-white text-neutral-700 transition-colors cursor-pointer"
                            title="Delete App"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add / Edit App Modal */}
      <AppFormModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingApp(null);
        }}
        onSubmit={handleCreateOrUpdate}
        initialData={editingApp}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setAppToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        appTitle={appToDelete?.title || ''}
        loading={actionLoading}
      />
    </div>
  );
}
