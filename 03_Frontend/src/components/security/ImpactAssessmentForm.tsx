'use client';

import { useState } from 'react';
import { Button } from '@/components/shared/Button';

export interface ImpactAssessmentValue {
  processingPurpose: string;
  containsPersonalData: boolean;
  sensitiveDataType: string;
  impactLevel: 'low' | 'medium' | 'high';
  mitigationPlan: string;
}

interface ImpactAssessmentFormProps {
  initialValue?: Partial<ImpactAssessmentValue>;
  onSubmit?: (value: ImpactAssessmentValue) => void;
}

export function ImpactAssessmentForm({ initialValue, onSubmit }: ImpactAssessmentFormProps) {
  const [value, setValue] = useState<ImpactAssessmentValue>({
    processingPurpose: initialValue?.processingPurpose || '',
    containsPersonalData: initialValue?.containsPersonalData ?? true,
    sensitiveDataType: initialValue?.sensitiveDataType || 'name,email,phone',
    impactLevel: initialValue?.impactLevel || 'medium',
    mitigationPlan: initialValue?.mitigationPlan || '',
  });

  const update = <K extends keyof ImpactAssessmentValue>(key: K, next: ImpactAssessmentValue[K]) => {
    setValue((prev) => ({ ...prev, [key]: next }));
  };

  return (
    <section
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: '12px',
        padding: '1rem',
        background: 'var(--color-surface)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
      }}
    >
      <div>
        <h3 style={{ margin: 0, fontSize: '1rem', color: 'var(--color-text-primary)' }}>Impact Assessment (ISO 42001 A.5)</h3>
        <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.82rem', color: 'var(--color-text-secondary)' }}>
          Dokumentasikan risiko dampak model terhadap privasi, keamanan, dan kepatuhan sebelum model dipublikasikan.
        </p>
      </div>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}>
        Tujuan Pemrosesan
        <input
          value={value.processingPurpose}
          onChange={(event) => update('processingPurpose', event.target.value)}
          placeholder="Contoh: chatbot layanan pelanggan sektor perbankan"
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.55rem 0.7rem',
            background: 'var(--color-bg)',
          }}
        />
      </label>

      <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem' }}>
        <input
          type="checkbox"
          checked={value.containsPersonalData}
          onChange={(event) => update('containsPersonalData', event.target.checked)}
        />
        Mengandung data personal (PDP)
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}>
        Kategori Data Personal
        <input
          value={value.sensitiveDataType}
          onChange={(event) => update('sensitiveDataType', event.target.value)}
          placeholder="Contoh: NIK, alamat, nomor telepon"
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.55rem 0.7rem',
            background: 'var(--color-bg)',
          }}
        />
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}>
        Tingkat Dampak
        <select
          value={value.impactLevel}
          onChange={(event) => update('impactLevel', event.target.value as ImpactAssessmentValue['impactLevel'])}
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.55rem 0.7rem',
            background: 'var(--color-bg)',
          }}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', fontSize: '0.82rem', fontWeight: 600 }}>
        Rencana Mitigasi
        <textarea
          value={value.mitigationPlan}
          onChange={(event) => update('mitigationPlan', event.target.value)}
          rows={3}
          placeholder="Contoh: masking PII, filtering prompt injection, log audit berkala"
          style={{
            border: '1px solid var(--color-border)',
            borderRadius: '8px',
            padding: '0.55rem 0.7rem',
            background: 'var(--color-bg)',
            resize: 'vertical',
          }}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={() => onSubmit?.(value)}>Simpan Assessment</Button>
      </div>
    </section>
  );
}
