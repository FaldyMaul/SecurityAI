import type { UserRole, User } from '@/types/api';

/** Role-based landing pages after login */
export const ROLE_LANDING: Record<UserRole, string> = {
  model_owner: '/models',
  admin: '/dashboard',
  builder: '/ranking',
  public_viewer: '/',
};

/** Permission matrix — which roles can access which route groups */
export const ROLE_PERMISSIONS: Record<string, UserRole[]> = {
  '/dashboard': ['admin'],
  '/models': ['model_owner', 'admin'],
  '/models/new': ['model_owner', 'admin'],
  '/reviews': ['admin'],
  '/settings': ['model_owner', 'admin', 'builder'],
};

/** Check if a user has access to a given route */
export function hasAccess(user: User | null, pathname: string): boolean {
  if (!user) return false;

  // Find the matching permission rule (most specific first)
  const matchingRoute = Object.keys(ROLE_PERMISSIONS)
    .sort((a, b) => b.length - a.length) // longer routes first
    .find((route) => pathname.startsWith(route));

  if (!matchingRoute) return true; // no restriction = open to authenticated users
  return ROLE_PERMISSIONS[matchingRoute].includes(user.role);
}

/** Get display label for a role */
export function getRoleLabel(role: UserRole): string {
  const labels: Record<UserRole, string> = {
    model_owner: 'Model Owner',
    admin: 'Admin / Reviewer',
    builder: 'Builder',
    public_viewer: 'Public Viewer',
  };
  return labels[role];
}
