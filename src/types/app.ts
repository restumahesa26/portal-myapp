export type AppStatus = 'Production' | 'Beta' | 'WIP' | 'Archive';

export interface AppItem {
  id: string;
  title: string;
  description: string;
  url: string;
  iconUrl?: string;
  iconPreset?: string; // name of a lucide icon e.g. "CheckSquare", "Bot", "Globe", etc.
  category?: string;   // e.g. "Productivity", "Dev Tools", "AI", "Portfolio"
  status?: AppStatus;  // e.g. "Production", "WIP", "Beta"
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
}

export type AppFormData = Omit<AppItem, 'id' | 'createdAt' | 'updatedAt'>;
