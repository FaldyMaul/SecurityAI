import { PublicNavbar } from '@/components/layout/PublicNavbar';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div data-layout="public" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PublicNavbar />
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  );
}
