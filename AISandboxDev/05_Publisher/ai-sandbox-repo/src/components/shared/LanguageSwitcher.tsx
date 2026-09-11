'use client';

import styles from './LanguageSwitcher.module.css';

interface LanguageSwitcherProps {
  locale?: string;
  onChange?: (locale: string) => void;
}

export function LanguageSwitcher({ locale = 'id', onChange }: LanguageSwitcherProps) {
  return (
    <div className={styles.switcher}>
      <button
        className={`${styles.btn} ${locale === 'id' ? styles.active : ''}`}
        onClick={() => onChange?.('id')}
      >
        ID
      </button>
      <button
        className={`${styles.btn} ${locale === 'en' ? styles.active : ''}`}
        onClick={() => onChange?.('en')}
      >
        EN
      </button>
    </div>
  );
}
