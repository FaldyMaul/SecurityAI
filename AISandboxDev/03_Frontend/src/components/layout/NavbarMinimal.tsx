import Link from 'next/link';
import styles from './NavbarMinimal.module.css';

export function NavbarMinimal() {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛡️</span>
          <span className={styles.logoText}>AI Sandbox</span>
        </Link>
      </div>
    </header>
  );
}
