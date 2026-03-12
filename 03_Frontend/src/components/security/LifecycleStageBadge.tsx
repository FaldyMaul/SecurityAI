import { Badge } from '@legion-ui-kit/react-core';

export type LifecycleStage = 'design' | 'development' | 'testing' | 'production' | 'retired';

interface LifecycleStageBadgeProps {
  stage: LifecycleStage;
}

const LABELS: Record<LifecycleStage, string> = {
  design: 'ISO A.6 Design',
  development: 'ISO A.6 Development',
  testing: 'ISO A.6 Testing',
  production: 'ISO A.6 Production',
  retired: 'ISO A.6 Retired',
};

const VARIANTS: Record<LifecycleStage, 'info' | 'primary' | 'warning' | 'success' | 'neutral'> = {
  design: 'info',
  development: 'primary',
  testing: 'warning',
  production: 'success',
  retired: 'neutral',
};

export function LifecycleStageBadge({ stage }: LifecycleStageBadgeProps) {
  return <Badge color={VARIANTS[stage] as never} label={LABELS[stage]} />;
}
