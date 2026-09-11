import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '70vh', textAlign: 'center', padding: '2rem' }}>
      <h1 style={{ fontSize: '6rem', fontWeight: 700, color: 'var(--color-text-muted)', marginBottom: '0.5rem' }}>404</h1>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Halaman Tidak Ditemukan</h2>
      <p style={{ color: 'var(--color-text-secondary)', marginBottom: '2rem' }}>Halaman yang Anda cari tidak ada atau telah dipindahkan.</p>
      <Link href="/" style={{ padding: '0.5rem 1.5rem', background: 'var(--color-primary)', color: 'white', borderRadius: 'var(--radius-md)', textDecoration: 'none', fontWeight: 600, fontSize: '0.875rem' }}>
        ← Kembali ke Beranda
      </Link>
    </div>
  );
}
