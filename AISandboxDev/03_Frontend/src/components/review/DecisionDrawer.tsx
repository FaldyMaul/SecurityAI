'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/shared/Button';
import styles from './DecisionDrawer.module.css';

const DECISIONS = [
  {
    value: 'approved',
    label: 'Approve',
    description: 'Model memenuhi standar dan dapat dilanjutkan ke publikasi.',
  },
  {
    value: 'approved_with_controls',
    label: 'Approve with controls',
    description: 'Model disetujui dengan kontrol mitigasi tambahan.',
  },
  {
    value: 'reassessment_required',
    label: 'Request reassessment',
    description: 'Model perlu benchmark ulang setelah perbaikan.',
  },
  {
    value: 'restricted',
    label: 'Restrict',
    description: 'Model memiliki risiko signifikan dan harus dibatasi.',
  },
  {
    value: 'not_approved',
    label: 'Not approved',
    description: 'Model tidak memenuhi kriteria minimum untuk rilis.',
  },
] as const;

const RISK_TREATMENTS = [
  { value: 'accept', label: 'Accept risk' },
  { value: 'mitigate', label: 'Mitigate risk' },
  { value: 'transfer', label: 'Transfer risk' },
  { value: 'avoid', label: 'Avoid risk' },
] as const;

export function DecisionDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [decision, setDecision] = useState<string>('approved');
  const [riskTreatment, setRiskTreatment] = useState<string>('mitigate');
  const [targetDate, setTargetDate] = useState('');
  const [reason, setReason] = useState('');

  const showTreatment = useMemo(() => decision !== 'approved', [decision]);

  if (!open) return null;

  return (
    <>
      <button className={styles.backdrop} onClick={onClose} aria-label="Tutup drawer keputusan" />
      <aside className={styles.drawer} role="dialog" aria-modal="true" aria-label="Keputusan Review">
        <h3 className={styles.title}>Keputusan Review</h3>
        <p className={styles.subtitle}>Pilih keputusan reviewer dan treatment risiko sebagai jejak audit keputusan.</p>

        <div className={styles.options}>
          {DECISIONS.map((item) => (
            <label key={item.value} className={styles.option}>
              <input
                type="radio"
                name="review-decision"
                value={item.value}
                checked={decision === item.value}
                onChange={(event) => setDecision(event.target.value)}
              />
              <span className={styles.optionText}>
                <span className={styles.optionTitle}>{item.label}</span>
                <span className={styles.optionDesc}>{item.description}</span>
              </span>
            </label>
          ))}
        </div>

        {showTreatment && (
          <>
            <label className={styles.fieldLabel} htmlFor="risk-treatment">
              Risk treatment
            </label>
            <select
              id="risk-treatment"
              className={styles.select}
              value={riskTreatment}
              onChange={(event) => setRiskTreatment(event.target.value)}
            >
              {RISK_TREATMENTS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <label className={styles.fieldLabel} htmlFor="target-date">
              Target completion date
            </label>
            <input
              id="target-date"
              type="date"
              className={styles.select}
              value={targetDate}
              onChange={(event) => setTargetDate(event.target.value)}
            />
          </>
        )}

        <label className={styles.fieldLabel} htmlFor="decision-reason">
          Alasan keputusan
        </label>
        <textarea
          id="decision-reason"
          className={styles.textarea}
          placeholder="Contoh: disetujui dengan kontrol filtering tambahan pada prompt injection."
          value={reason}
          onChange={(event) => setReason(event.target.value)}
        />

        <div className={styles.footer}>
          <Button variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={onClose}>Simpan Keputusan</Button>
        </div>
      </aside>
    </>
  );
}
