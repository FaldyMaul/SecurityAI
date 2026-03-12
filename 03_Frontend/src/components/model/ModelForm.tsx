'use client';

import type { CSSProperties, FormEvent } from 'react';
import { useState, useCallback } from 'react';

interface FormData {
  name: string;
  provider: string;
  baseModel: string;
  endpointUrl: string;
  authMethod: string;
  apiKey: string;
}

interface FormErrors {
  name?: string;
  provider?: string;
  baseModel?: string;
  endpointUrl?: string;
  authMethod?: string;
  apiKey?: string;
}

interface ModelFormProps {
  initialData?: Partial<FormData>;
  onSubmit?: (data: FormData) => void;
  onCancel?: () => void;
}

const INITIAL_DATA: FormData = {
  name: '',
  provider: '',
  baseModel: '',
  endpointUrl: '',
  authMethod: 'bearer',
  apiKey: '',
};

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Nama model wajib diisi';
  else if (data.name.trim().length < 3) errors.name = 'Nama model minimal 3 karakter';
  if (!data.provider.trim()) errors.provider = 'Provider wajib diisi';
  if (!data.baseModel.trim()) errors.baseModel = 'Base model wajib diisi';
  if (!data.endpointUrl.trim()) errors.endpointUrl = 'Endpoint URL wajib diisi';
  else if (!/^https?:\/\/.+/.test(data.endpointUrl)) errors.endpointUrl = 'URL harus dimulai dengan http:// atau https://';
  if (!data.apiKey.trim()) errors.apiKey = 'API key wajib diisi';
  return errors;
}

const inputBase: CSSProperties = {
  padding: '0.6rem 0.75rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border, #2a2a4a)',
  background: 'var(--color-surface-alt, #16213e)',
  color: 'var(--color-text, #e2e8f0)',
  fontSize: '0.875rem',
  width: '100%',
  boxSizing: 'border-box',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
};

const inputError: CSSProperties = {
  ...inputBase,
  borderColor: '#ef4444',
  boxShadow: '0 0 0 2px rgba(239,68,68,0.2)',
};

const labelStyle: CSSProperties = {
  fontSize: '0.8rem',
  fontWeight: 600,
  color: 'var(--color-text, #e2e8f0)',
  marginBottom: '0.25rem',
};

const errorText: CSSProperties = {
  fontSize: '0.75rem',
  color: '#ef4444',
  marginTop: '0.25rem',
};

export function ModelForm({ initialData, onSubmit, onCancel }: ModelFormProps) {
  const [form, setForm] = useState<FormData>({ ...INITIAL_DATA, ...initialData });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }, [errors]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    if (submitting) return;
    setSubmitting(true);
    setSubmitted(false);

    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      onSubmit?.(form);
    }, 1200);
  }, [form, submitting, onSubmit]);

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '540px' }}>
      {submitted && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(16,185,129,0.1)',
            border: '1px solid rgba(16,185,129,0.3)',
            borderRadius: '8px',
            color: '#10b981',
            fontSize: '0.85rem',
            fontWeight: 500,
          }}
        >
          Model berhasil disimpan.
        </div>
      )}

      {Object.keys(errors).length > 0 && (
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.3)',
            borderRadius: '8px',
            color: '#ef4444',
            fontSize: '0.8rem',
          }}
        >
          Harap perbaiki {Object.keys(errors).length} kesalahan sebelum menyimpan.
        </div>
      )}

      <div>
        <label style={labelStyle}>Nama Model <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          style={errors.name ? inputError : inputBase}
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Contoh: GPT-4o Indonesia"
        />
        {errors.name && <div style={errorText}>{errors.name}</div>}
      </div>

      <div>
        <label style={labelStyle}>Provider <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          style={errors.provider ? inputError : inputBase}
          value={form.provider}
          onChange={(e) => handleChange('provider', e.target.value)}
          placeholder="Contoh: OpenAI"
        />
        {errors.provider && <div style={errorText}>{errors.provider}</div>}
      </div>

      <div>
        <label style={labelStyle}>Base Model <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          style={errors.baseModel ? inputError : inputBase}
          value={form.baseModel}
          onChange={(e) => handleChange('baseModel', e.target.value)}
          placeholder="Contoh: gpt-4o"
        />
        {errors.baseModel && <div style={errorText}>{errors.baseModel}</div>}
      </div>

      <div>
        <label style={labelStyle}>Endpoint URL <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          style={errors.endpointUrl ? inputError : inputBase}
          value={form.endpointUrl}
          onChange={(e) => handleChange('endpointUrl', e.target.value)}
          placeholder="https://api.example.com/v1/completions"
        />
        {errors.endpointUrl && <div style={errorText}>{errors.endpointUrl}</div>}
      </div>

      <div>
        <label style={labelStyle}>Auth Method</label>
        <select
          style={inputBase}
          value={form.authMethod}
          onChange={(e) => handleChange('authMethod', e.target.value)}
        >
          <option value="bearer">Bearer Token</option>
          <option value="api_key">API Key</option>
          <option value="basic">Basic Auth</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>API Key <span style={{ color: '#ef4444' }}>*</span></label>
        <input
          type="password"
          style={errors.apiKey ? inputError : inputBase}
          value={form.apiKey}
          onChange={(e) => handleChange('apiKey', e.target.value)}
          placeholder="sk-..."
        />
        {errors.apiKey && <div style={errorText}>{errors.apiKey}</div>}
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.5rem' }}>
        <button
          type="submit"
          disabled={submitting}
          style={{
            padding: '0.6rem 1.5rem',
            background: submitting ? '#4b5563' : 'var(--color-primary, #6366f1)',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 600,
            fontSize: '0.875rem',
            cursor: submitting ? 'not-allowed' : 'pointer',
            opacity: submitting ? 0.6 : 1,
            transition: 'opacity 0.2s',
          }}
        >
          {submitting ? 'Menyimpan...' : 'Simpan Model'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            style={{
              padding: '0.6rem 1.5rem',
              border: '1px solid var(--color-border, #2a2a4a)',
              borderRadius: '8px',
              background: 'none',
              color: 'var(--color-text, #e2e8f0)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            Batal
          </button>
        )}
      </div>
    </form>
  );
}