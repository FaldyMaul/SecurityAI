import { NavbarMinimal } from '@/components/layout/NavbarMinimal';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <NavbarMinimal />
      <main style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 'calc(100vh - var(--navbar-height))', background: 'var(--color-bg-secondary)' }}>
        {children}
      </main>
    </>
  );
}
