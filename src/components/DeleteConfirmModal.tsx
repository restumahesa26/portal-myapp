'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  appTitle: string;
  loading?: boolean;
}

export function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  appTitle,
  loading = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 shadow-[0_24px_64px_rgba(0,0,0,0.18)] border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mb-4 border border-red-200/60">
          <Trash2 className="w-6 h-6 stroke-[2]" />
        </div>

        <h3 className="font-heading font-extrabold text-xl text-neutral-950 mb-2">
          Delete Application?
        </h3>
        <p className="text-sm text-neutral-600 leading-relaxed mb-6">
          Are you sure you want to remove <strong className="text-neutral-900">&quot;{appTitle}&quot;</strong> from your portal? This action cannot be undone.
        </p>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-100">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-full text-xs font-semibold text-neutral-600 hover:bg-neutral-100 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-6 py-2.5 rounded-full text-xs font-bold bg-red-600 hover:bg-red-700 text-white transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Deleting...' : 'Yes, Delete'}
          </button>
        </div>
      </div>
    </div>
  );
}
