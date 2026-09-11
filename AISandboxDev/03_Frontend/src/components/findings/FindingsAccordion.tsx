'use client';

import type { FindingCategory } from '@/types/api';
import { SeverityIndicator } from '@/components/score/SeverityIndicator';
import { AlertTriangle, EyeOff, Lock, Shield } from 'lucide-react';
import { ASSESSMENT_MODULES } from '@/lib/modules';
import type { AssessmentModuleId, Finding, SeverityLevel } from '@/types/run';

const CATEGORY_ALIAS: Record<string, AssessmentModuleId> = {
  adversarial: 'adversarial',
  security: 'adversarial',
  trust: 'safety',
  'trust-safety': 'safety',
  undesirable: 'safety',
  safety: 'safety',
  privacy: 'privacy',
  data_privacy: 'privacy',
  readiness: 'hallucination',
  compliance: 'hallucination',
  hallucination: 'hallucination',
};

const CATEGORY_ICON: Record<AssessmentModuleId, typeof Shield> = {
  adversarial: Shield,
  privacy: Lock,
  safety: AlertTriangle,
  hallucination: EyeOff,
};

const severityOrder: SeverityLevel[] = ['info', 'low', 'medium', 'high', 'critical'];

function normalizeKey(value: string): string {
  return value.toLowerCase().replace(/\s+/g, '_');
}

function toModuleId(category: string): AssessmentModuleId {
  const normalized = normalizeKey(category);
  return CATEGORY_ALIAS[normalized] || 'hallucination';
}

function regroupCategories(categories: FindingCategory[]): FindingCategory[] {
  const grouped = new Map<AssessmentModuleId, Finding[]>();

  for (const category of categories) {
    const moduleId = toModuleId(category.category);
    const items = grouped.get(moduleId) || [];
    items.push(...category.findings.map((finding) => ({ ...finding, category: moduleId })));
    grouped.set(moduleId, items);
  }

  return ASSESSMENT_MODULES.map((moduleDef) => {
    const findings = grouped.get(moduleDef.id) || [];
    const maxSeverity = findings.reduce<SeverityLevel>((current, finding) => {
      return severityOrder.indexOf(finding.severity) > severityOrder.indexOf(current) ? finding.severity : current;
    }, 'info');

    return {
      category: moduleDef.name,
      count: findings.length,
      maxSeverity,
      findings,
    };
  }).filter((category) => category.count > 0);
}

export function FindingsAccordion({ categories }: { categories: FindingCategory[] }) {
  const groupedCategories = regroupCategories(categories);

  return (
    <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }}>
      {groupedCategories.map((cat) => {
        const moduleId = toModuleId(cat.findings[0]?.category || cat.category);
        const Icon = CATEGORY_ICON[moduleId];

        return (
          <details key={cat.category} style={{ borderBottom: '1px solid var(--color-border)' }}>
            <summary
              style={{
                padding: 'var(--space-3) var(--space-4)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}
            >
              <Icon size={15} />
              <span style={{ fontWeight: 600 }}>{cat.category}</span>
              <SeverityIndicator severity={cat.maxSeverity} />
              <span style={{ marginLeft: 'auto', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>{cat.count} findings</span>
            </summary>
            <div style={{ padding: 'var(--space-4)', fontSize: 'var(--text-sm)' }}>
              {cat.findings.map((finding) => (
                <div key={finding.id} style={{ padding: 'var(--space-2) 0', borderBottom: '1px solid var(--color-bg-tertiary)' }}>
                  <SeverityIndicator severity={finding.severity} /> {finding.title}
                </div>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
