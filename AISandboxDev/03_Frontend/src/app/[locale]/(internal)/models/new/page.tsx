'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { PageHeader } from '@/components/shared/PageHeader';
import { ModelForm } from '@/components/model/ModelForm';
import { Button } from '@/components/shared/Button';
import { ImpactAssessmentForm, type ImpactAssessmentValue } from '@/components/security/ImpactAssessmentForm';
import { useCreateModel } from '@/lib/hooks/useModels';
import type { AuthMethod } from '@/types/api';

type TabMode = 'litellm' | 'manual';
type StepMode = 1 | 2 | 3;

interface ManualFormValue {
  name: string;
  provider: string;
  baseModel: string;
  endpointUrl: string;
  authMethod: AuthMethod;
  apiKey: string;
}

export default function AddModelPage() {
  const router = useRouter();
  const createModelMutation = useCreateModel();
  const [tab, setTab] = useState<TabMode>('litellm');
  const [step, setStep] = useState<StepMode>(1);
  const [impact, setImpact] = useState<ImpactAssessmentValue | null>(null);
  const [litellmProvider, setLitellmProvider] = useState('openai');
  const [litellmAlias, setLitellmAlias] = useState('');
  const [manualForm, setManualForm] = useState<ManualFormValue | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const canContinueFromStep1 = useMemo(() => {
    if (tab === 'manual') return manualForm !== null;
    return litellmAlias.trim().length >= 3;
  }, [litellmAlias, manualForm, tab]);

  const handleSaveModel = async () => {
    setSubmitError(null);
    const isManual = tab === 'manual';

    const payload = {
      name: isManual ? manualForm?.name || '' : litellmAlias.trim(),
      provider: isManual ? manualForm?.provider || '' : litellmProvider,
      baseModel: isManual ? manualForm?.baseModel || '' : litellmAlias.trim(),
      endpointUrl: isManual
        ? manualForm?.endpointUrl || ''
        : process.env.NEXT_PUBLIC_LITELLM_PROXY_URL || 'http://localhost:4000',
      authMethod: isManual ? manualForm?.authMethod || 'bearer' : 'bearer',
      apiKey: isManual ? manualForm?.apiKey || '' : '',
      modelVersion: 'v1',
      intendedUseCase: impact?.processingPurpose || 'Asisten operasional internal perusahaan',
      description: impact?.mitigationPlan || 'Model didaftarkan dari AI Sandbox',
      source: 'manual' as const,
    };

    try {
      const response = await createModelMutation.mutateAsync(payload);
      const modelId = response.data.id;
      router.push(`/models?saved=${modelId}`);
    } catch {
      setSubmitError('Gagal menyimpan model ke backend. Pastikan backend aktif di port 8000.');
    }
  };

  return (
    <div style={{ maxWidth: '860px', margin: '0 auto' }}>
      <PageHeader title="Tambah Model" subtitle="Model Saya > Tambah Model" />

      <div style={{ display: 'flex', gap: 0, marginBottom: '1.25rem', borderBottom: '1px solid var(--color-border)' }}>
        <button
          onClick={() => {
            setTab('litellm');
            setStep(1);
            setSubmitError(null);
          }}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'none',
            fontWeight: tab === 'litellm' ? 700 : 500,
            fontSize: '0.875rem',
            color: tab === 'litellm' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderBottom: tab === 'litellm' ? '2px solid var(--color-primary)' : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          Import via LiteLLM
        </button>
        <button
          onClick={() => {
            setTab('manual');
            setStep(1);
            setSubmitError(null);
          }}
          style={{
            padding: '0.75rem 1.25rem',
            border: 'none',
            background: 'none',
            fontWeight: tab === 'manual' ? 700 : 500,
            fontSize: '0.875rem',
            color: tab === 'manual' ? 'var(--color-primary)' : 'var(--color-text-muted)',
            borderBottom: tab === 'manual' ? '2px solid var(--color-primary)' : '2px solid transparent',
            cursor: 'pointer',
            marginBottom: -1,
          }}
        >
          Manual Entry
        </button>
      </div>

      <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
        {[
          { id: 1, label: 'Model Source' },
          { id: 2, label: 'Impact Assessment' },
          { id: 3, label: 'Review & Submit' },
        ].map((item) => (
          <div
            key={item.id}
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: '999px',
              padding: '0.35rem 0.7rem',
              fontSize: '0.75rem',
              fontWeight: 600,
              background: step === item.id ? 'var(--color-primary-light)' : 'var(--color-surface)',
              color: step === item.id ? 'var(--color-primary)' : 'var(--color-text-secondary)',
            }}
          >
            {item.id}. {item.label}
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--color-border)' }}>
        {step === 1 && tab === 'litellm' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem', maxWidth: '560px' }}>
            <h3 style={{ color: 'var(--color-text-primary)', fontSize: '1rem', margin: 0 }}>Import Endpoint dari LiteLLM</h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', margin: 0 }}>
              LiteLLM menjadi sumber konfigurasi utama. Pilih provider dan model untuk mengisi konfigurasi endpoint otomatis.
            </p>

            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Provider
              <select
                value={litellmProvider}
                onChange={(event) => setLitellmProvider(event.target.value)}
                style={{ width: '100%', marginTop: '0.35rem', padding: '0.55rem 0.7rem', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg)' }}
              >
                <option>openai</option>
                <option>anthropic</option>
                <option>azure-openai</option>
                <option>gemini</option>
              </select>
            </label>

            <label style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Model Alias (LiteLLM)
              <input
                value={litellmAlias}
                onChange={(event) => setLitellmAlias(event.target.value)}
                placeholder="contoh: gpt-4o-mini"
                style={{ width: '100%', marginTop: '0.35rem', padding: '0.55rem 0.7rem', border: '1px solid var(--color-border)', borderRadius: '8px', background: 'var(--color-bg)' }}
              />
            </label>

            <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.25rem' }}>
              <Button disabled={!canContinueFromStep1} onClick={() => setStep(2)}>
                Continue to Impact Assessment
              </Button>
              <Button variant="outline" onClick={() => { setTab('manual'); setSubmitError(null); }}>Switch to Manual</Button>
            </div>
          </div>
        )}

        {step === 1 && tab === 'manual' && (
          <ModelForm
            onSubmit={(value) => {
              setManualForm({
                ...value,
                authMethod: (value.authMethod as AuthMethod) || 'bearer',
              });
              setStep(2);
            }}
            onCancel={() => {
              setStep(1);
            }}
          />
        )}

        {step === 2 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <ImpactAssessmentForm
              initialValue={{
                processingPurpose: 'Asisten operasional internal perusahaan',
                containsPersonalData: true,
                sensitiveDataType: 'nama,email,nomor telepon',
                impactLevel: 'medium',
                mitigationPlan: 'PII masking, policy guardrail, audit log mingguan',
              }}
              onSubmit={(value) => {
                setImpact(value);
                setStep(3);
              }}
            />
            <div>
              <Button variant="outline" onClick={() => setStep(1)}>
                Back to Source Setup
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <h3 style={{ margin: 0 }}>Review Sebelum Simpan</h3>
            <div style={{ border: '1px solid var(--color-border)', borderRadius: '10px', padding: '0.9rem', fontSize: '0.84rem', background: 'var(--color-bg)' }}>
              <p style={{ margin: '0 0 0.45rem 0', fontWeight: 600 }}>Sumber model</p>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                {tab === 'litellm' ? `LiteLLM (${litellmProvider} / ${litellmAlias || '-'})` : 'Manual Entry'}
              </p>
              {tab === 'manual' && manualForm && (
                <p style={{ margin: '0.45rem 0 0 0', color: 'var(--color-text-secondary)' }}>
                  {manualForm.name} | {manualForm.provider} | {manualForm.endpointUrl}
                </p>
              )}
              <p style={{ margin: '0.7rem 0 0.45rem 0', fontWeight: 600 }}>Impact assessment</p>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>
                Level dampak: {impact?.impactLevel || '-'} | Personal data: {impact?.containsPersonalData ? 'Ya' : 'Tidak'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '0.6rem' }}>
              <Button onClick={handleSaveModel} disabled={createModelMutation.isPending}>
                {createModelMutation.isPending ? 'Menyimpan...' : 'Simpan Model'}
              </Button>
              <Button variant="outline" onClick={() => setStep(2)}>Edit Assessment</Button>
            </div>
            {submitError && (
              <div
                style={{
                  padding: '0.65rem 0.8rem',
                  borderRadius: '8px',
                  border: '1px solid color-mix(in srgb, var(--color-score-critical) 40%, white)',
                  background: 'color-mix(in srgb, var(--color-score-critical) 10%, white)',
                  color: 'var(--color-text-primary)',
                  fontSize: '0.8rem',
                }}
              >
                {submitError}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
