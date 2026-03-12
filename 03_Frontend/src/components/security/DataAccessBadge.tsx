import { Badge } from '@legion-ui-kit/react-core';

export type DataAccessLevel = 'public' | 'internal' | 'restricted' | 'pdp-sensitive';

interface DataAccessBadgeProps {
  level: DataAccessLevel;
}

const LABELS: Record<DataAccessLevel, string> = {
  public: 'PDP: Public Data',
  internal: 'PDP: Internal Data',
  restricted: 'PDP: Restricted Data',
  'pdp-sensitive': 'PDP: Sensitive Personal Data',
};

const VARIANTS: Record<DataAccessLevel, 'success' | 'primary' | 'warning' | 'danger'> = {
  public: 'success',
  internal: 'primary',
  restricted: 'warning',
  'pdp-sensitive': 'danger',
};

export function DataAccessBadge({ level }: DataAccessBadgeProps) {
  return <Badge color={VARIANTS[level] as never} label={LABELS[level]} />;
}
