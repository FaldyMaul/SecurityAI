export type UserRole = 'model_owner' | 'admin' | 'builder' | 'public_viewer';

export interface User {
  id: string;
  email: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  preferences: UserPreferences;
  notifications: NotificationSettings;
  createdAt: string;
}

export interface UserPreferences {
  locale: 'id' | 'en';
  dateFormat: 'dd/MM/yyyy' | 'MM/dd/yyyy' | 'yyyy-MM-dd';
  theme: 'light' | 'dark' | 'system';
}

export interface NotificationSettings {
  reviewAssigned: boolean;
  benchmarkCompleted: boolean;
  benchmarkFailed: boolean;
  modelPublished: boolean;
}
