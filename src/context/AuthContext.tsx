'use client';

import React, { createContext, useContext, useEffect, useState, useMemo, ReactNode } from 'react';
import { User, signInWithPopup, signOut as fbSignOut, onAuthStateChanged } from 'firebase/auth';
import { auth, googleProvider, isFirebaseConfigured } from '@/lib/firebase';

export function parseAllowedEmails(rawEnv?: string): string[] {
  const raw = rawEnv || process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';
  return raw
    .split(/[,;\s]+/)
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
}

interface AuthContextType {
  user: User | MockUser | null;
  loading: boolean;
  isAdmin: boolean;
  isAllowed: boolean;
  allowedEmails: string[];
  isConfigured: boolean;
  adminEmail: string;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  loginAsMockAdmin: () => void;
  loginAsMockUnauthorized: () => void;
}

export interface MockUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  isMock?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_STORAGE_MOCK_USER_KEY = 'portal_saya_mock_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | MockUser | null>(null);
  const [loading, setLoading] = useState(true);

  const allowedEmails = useMemo(() => {
    const list = parseAllowedEmails();
    return list.length > 0 ? list : ['mufti.restumahesa@gmail.com'];
  }, []);

  const adminEmail = allowedEmails.join(', ');

  useEffect(() => {
    if (isFirebaseConfigured && auth) {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // Local Mock / Demo mode
      try {
        const savedMock = localStorage.getItem(LOCAL_STORAGE_MOCK_USER_KEY);
        if (savedMock) {
          setUser(JSON.parse(savedMock));
        }
      } catch {
        // ignore
      }
      setLoading(false);
    }
  }, []);

  const signInWithGoogle = async () => {
    if (isFirebaseConfigured && auth && googleProvider) {
      setLoading(true);
      try {
        await signInWithPopup(auth, googleProvider);
      } catch (err: unknown) {
        console.error('Google Sign In failed:', err);
        throw err;
      } finally {
        setLoading(false);
      }
    } else {
      // If Firebase credentials are not yet entered, provide Mock Admin sign-in
      loginAsMockAdmin();
    }
  };

  const signOut = async () => {
    if (isFirebaseConfigured && auth) {
      await fbSignOut(auth);
    } else {
      localStorage.removeItem(LOCAL_STORAGE_MOCK_USER_KEY);
      setUser(null);
    }
  };

  const loginAsMockAdmin = () => {
    const primaryEmail = allowedEmails[0] || 'mufti.restumahesa@gmail.com';
    const mockUser: MockUser = {
      uid: 'admin-mufti-1',
      email: primaryEmail,
      displayName: 'Mufti Restu (Allowed)',
      photoURL: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      isMock: true,
    };
    localStorage.setItem(LOCAL_STORAGE_MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const loginAsMockUnauthorized = () => {
    const mockUser: MockUser = {
      uid: 'stranger-999',
      email: 'stranger.random@gmail.com',
      displayName: 'Random Visitor',
      photoURL: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=256&q=80',
      isMock: true,
    };
    localStorage.setItem(LOCAL_STORAGE_MOCK_USER_KEY, JSON.stringify(mockUser));
    setUser(mockUser);
  };

  const userEmail = (user?.email || '').trim().toLowerCase();
  const isAllowed = Boolean(user && userEmail && allowedEmails.includes(userEmail));
  const isAdmin = isAllowed;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAdmin,
        isAllowed,
        allowedEmails,
        isConfigured: isFirebaseConfigured,
        adminEmail,
        signInWithGoogle,
        signOut,
        loginAsMockAdmin,
        loginAsMockUnauthorized,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
