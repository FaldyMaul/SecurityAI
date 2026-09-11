'use client';

import type { ModelStatus } from '@/types/api';
import { statusConfig } from '@/lib/statusConfig';

interface StatusBadgeProps {
  status: ModelStatus;
  size?: 'sm' | 'md' | 'lg';
  withIcon?: boolean;
}

/**
 * StatusBadge - Wraps Legion UI Badge with AI Sandbox status configuration
 * Uses Legion UI Badge component with custom status colors from statusConfig
 */
export function StatusBadge({ status, size = 'md', withIcon = true }: StatusBadgeProps) {
  const config = statusConfig[status];
  if (!config) return null;

  const STATUS_LABELS: Record<ModelStatus, string> = {
    draft: 'Draf',
    validation_pending: 'Validasi Endpoint',
    validation_failed: 'Validasi Gagal',
    endpoint_valid: 'Endpoint Valid',
    run_queued: 'Dalam Antrean',
    run_in_progress: 'Sedang Berjalan',
    run_failed: 'Gagal',
    assessment_completed: 'Selesai',
    review_ready: 'Siap Review',
    pending_review: 'Sedang di-Review',
    approved: 'Disetujui',
    approved_with_controls: 'Disetujui dengan Kontrol',
    promotion_ready: 'Siap Promosi',
    published_to_modelhub: 'Dipublikasikan ke ModelHub',
    restricted: 'Dibatasi',
    reassessment_required: 'Perlu Ulang',
    published: 'Dipublikasikan',
  };

  return (
    <span
      className={config.pulse ? 'animate-pulse-status' : undefined}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.35rem',
        borderRadius: '999px',
        padding:
          size === 'sm'
            ? '0.2rem 0.5rem'
            : size === 'lg'
              ? '0.35rem 0.75rem'
              : '0.28rem 0.62rem',
        fontSize: size === 'sm' ? '0.72rem' : size === 'lg' ? '0.82rem' : '0.78rem',
        fontWeight: 600,
        color: config.color,
        background: config.bgColor,
        border: `1px solid color-mix(in srgb, ${config.color} 35%, white)`,
      }}
    >
      {withIcon && <config.icon size={size === 'sm' ? 12 : 13} />}
      {STATUS_LABELS[status]}
    </span>
  );
}
