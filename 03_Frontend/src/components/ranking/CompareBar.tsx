'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/shared/Button';
import styles from './CompareBar.module.css';

const MAX_COMPARE = 3;

interface CompareBarProps {
  selectedIds: string[];
  onCompare: () => void;
  onRemove: (id: string) => void;
  limitHitSignal?: number;
}

export function CompareBar({ selectedIds, onCompare, onRemove, limitHitSignal = 0 }: CompareBarProps) {
  const [toastVisible, setToastVisible] = useState(false);

  useEffect(() => {
    if (limitHitSignal === 0) return;
    setToastVisible(true);
    const timer = setTimeout(() => setToastVisible(false), 2500);
    return () => clearTimeout(timer);
  }, [limitHitSignal]);

  if (selectedIds.length < 2) return null;

  const displayIds = selectedIds.slice(0, MAX_COMPARE);

  return (
    <>
      {toastVisible && (
        <div className={styles.toast}>
          Maksimal {MAX_COMPARE} model untuk perbandingan.
          <button onClick={() => setToastVisible(false)} className={styles.toastClose} aria-label="Tutup notifikasi">
            x
          </button>
        </div>
      )}

      <div className={styles.bar}>
        <div className={styles.left}>
          <span className={styles.count}>
            {displayIds.length}/{MAX_COMPARE} dipilih
          </span>
          {displayIds.map((id) => (
            <span key={id} className={styles.chip}>
              {id}
              <button onClick={() => onRemove(id)} className={styles.chipClose} aria-label={`Hapus ${id}`}>
                x
              </button>
            </span>
          ))}
        </div>
        <Button onClick={onCompare} disabled={displayIds.length < 2} size="md">
          Bandingkan Model
        </Button>
      </div>
    </>
  );
}
