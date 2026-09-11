import Link from 'next/link';
import { ShieldOff } from 'lucide-react';
import styles from './AccessDenied.module.css';

export function AccessDenied() {
  return (
    <div className={styles.container}>
      <ShieldOff size={64} strokeWidth={1.5} className={styles.icon} />
      <h2 className={styles.title}>Akses Ditolak</h2>
      <p className={styles.description}>Anda tidak memiliki izin untuk mengakses halaman ini.</p>
      <Link href="/" className={styles.link}>← Kembali ke Beranda</Link>
    </div>
  );
}
