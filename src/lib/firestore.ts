import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, isFirebaseConfigured } from '@/lib/firebase';
import { AppItem, AppFormData } from '@/types/app';

const LOCAL_STORAGE_APPS_KEY = 'portal_saya_apps_data';

// Helper for local storage apps
function getLocalApps(): AppItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_APPS_KEY);
    if (!raw) {
      return [];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

function saveLocalApps(apps: AppItem[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(LOCAL_STORAGE_APPS_KEY, JSON.stringify(apps));
  } catch (err) {
    console.error('Failed to save apps to localStorage:', err);
  }
}

export async function getAppsList(): Promise<AppItem[]> {
  if (isFirebaseConfigured && db) {
    try {
      const appsRef = collection(db, 'apps');
      const q = query(appsRef, orderBy('order', 'asc'));
      const snapshot = await getDocs(q);

      if (snapshot.empty) {
        return [];
      }

      const items: AppItem[] = [];
      snapshot.forEach((docSnap) => {
        const data = docSnap.data();
        items.push({
          id: docSnap.id,
          title: data.title || '',
          description: data.description || '',
          url: data.url || '#',
          iconUrl: data.iconUrl || '',
          iconPreset: data.iconPreset || 'Globe',
          category: data.category || 'General',
          status: data.status || 'Production',
          order: typeof data.order === 'number' ? data.order : 0,
          isActive: data.isActive !== undefined ? data.isActive : true,
          createdAt: data.createdAt
            ? typeof data.createdAt?.toDate === 'function'
              ? data.createdAt.toDate().toISOString()
              : data.createdAt
            : new Date().toISOString(),
          updatedAt: data.updatedAt
            ? typeof data.updatedAt?.toDate === 'function'
              ? data.updatedAt.toDate().toISOString()
              : data.updatedAt
            : undefined,
        });
      });

      return items;
    } catch (err) {
      console.warn('Firestore fetch failed:', err);
      return [];
    }
  }

  // Fallback to localStorage when Firebase is not configured
  const local = getLocalApps();
  return local.sort((a, b) => a.order - b.order);
}

function sanitizeData<T extends Record<string, unknown>>(data: T): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(data)) {
    if (value !== undefined) {
      result[key] = value;
    } else {
      result[key] = '';
    }
  }
  return result;
}

export async function createAppItem(formData: AppFormData): Promise<AppItem> {
  const sanitized = sanitizeData({
    title: formData.title || '',
    description: formData.description || '',
    url: formData.url || '',
    iconUrl: formData.iconUrl || '',
    iconPreset: formData.iconPreset || 'Globe',
    category: formData.category || 'General',
    status: formData.status || 'Production',
    order: Number(formData.order) || 1,
    isActive: formData.isActive ?? true,
  });

  const newItem: AppItem = {
    ...formData,
    id: 'app_' + Date.now(),
    createdAt: new Date().toISOString(),
  };

  if (isFirebaseConfigured && db) {
    try {
      const appsRef = collection(db, 'apps');
      const docRef = await addDoc(appsRef, {
        ...sanitized,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      newItem.id = docRef.id;
      return newItem;
    } catch (err) {
      console.error('Firestore create error:', err);
      throw err;
    }
  }

  const existing = getLocalApps();
  const updated = [...existing, newItem];
  saveLocalApps(updated);
  return newItem;
}

export async function updateAppItem(id: string, formData: Partial<AppFormData>): Promise<void> {
  const sanitized = sanitizeData(formData as Record<string, unknown>);

  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'apps', id);
      await updateDoc(docRef, {
        ...sanitized,
        updatedAt: serverTimestamp(),
      });
      return;
    } catch (err) {
      console.error('Firestore update error:', err);
      throw err;
    }
  }

  const existing = getLocalApps();
  const updated = existing.map((app) =>
    app.id === id ? { ...app, ...formData, updatedAt: new Date().toISOString() } : app
  );
  saveLocalApps(updated);
}

export async function deleteAppItem(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'apps', id);
      await deleteDoc(docRef);
      return;
    } catch (err) {
      console.error('Firestore delete error:', err);
      throw err;
    }
  }

  const existing = getLocalApps();
  const updated = existing.filter((app) => app.id !== id);
  saveLocalApps(updated);
}
