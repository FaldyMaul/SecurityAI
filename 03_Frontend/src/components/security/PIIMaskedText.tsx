'use client';

interface PIIMaskedTextProps {
  text: string;
}

function maskEmail(text: string): string {
  return text.replace(/([a-zA-Z0-9._%+-]{2})[a-zA-Z0-9._%+-]*(@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, '$1***$2');
}

function maskPhone(text: string): string {
  return text.replace(/(\+?\d{2,3})?[-.\s]?\d{3,4}[-.\s]?\d{3,4}[-.\s]?\d{3,4}/g, (match) => {
    const digits = match.replace(/\D/g, '');
    if (digits.length < 8) return match;
    const maskedTail = '*'.repeat(Math.max(0, digits.length - 4));
    return `${digits.slice(0, 2)}${maskedTail}${digits.slice(-2)}`;
  });
}

function maskNik(text: string): string {
  return text.replace(/\b\d{16}\b/g, (match) => `${match.slice(0, 4)}********${match.slice(-4)}`);
}

export function PIIMaskedText({ text }: PIIMaskedTextProps) {
  const masked = maskNik(maskPhone(maskEmail(text)));

  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        color: 'var(--color-text-secondary)',
        background: 'var(--color-bg-secondary)',
        border: '1px solid var(--color-border)',
        borderRadius: '8px',
        padding: '0.25rem 0.45rem',
      }}
      title="PDP-compliant masked output"
    >
      {masked}
    </span>
  );
}
