'use client';

import type { ModelStatus } from '@/types/api';
import { statusConfig } from '@/lib/statusConfig';
import { Badge } from '@legion-ui-kit/react-core';
import type { LucideIcon } from 'lucide-react';

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

  const Icon = config.icon;

  // Map AI Sandbox sizes to Legion UI sizes
  const legionSize: 'sm' | 'md' | 'lg' = size;

  // Map status to Legion UI badge variants
  const getVariant = (): 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral' => {
    if (status === 'approved' || status === 'published' || status === 'endpoint_valid') return 'success';
    if (status === 'pending_review' || status === 'validation_pending' || status === 'reassessment_required') return 'warning';
    if (status === 'validation_failed' || status === 'run_failed' || status === 'not_approved') return 'danger';
    if (status === 'run_queued' || status === 'run_in_progress') return 'info';
    if (status === 'assessment_completed') return 'secondary';
    if (status === 'restricted') return 'danger';
    if (status === 'approved_with_controls') return 'success';
    return 'neutral';
  };

  return (
    <Badge
      variant={getVariant()}
      size={legionSize}
    >
      {withIcon && <Icon size={size === 'sm' ? 12 : 14} style={{ marginRight: '4px' }} />}
      {status.replace(/_/g, ' ')}
    </Badge>
  );
}
