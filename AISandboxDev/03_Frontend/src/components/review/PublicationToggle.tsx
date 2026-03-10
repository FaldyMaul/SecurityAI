import { Button } from '@/components/shared/Button';

export function PublicationToggle({ isPublished, onChange }: { isPublished: boolean; onChange: (v: boolean) => void }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-lg)',
        background: 'var(--color-bg-secondary)',
      }}
    >
      <div>
        <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>Publikasi</div>
        <div style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
          {isPublished ? 'Model tampil di halaman ranking publik' : 'Model disembunyikan dari ranking publik'}
        </div>
      </div>
      <Button variant={isPublished ? 'secondary' : 'primary'} size="sm" onClick={() => onChange(!isPublished)}>
        {isPublished ? 'Published' : 'Publish'}
      </Button>
    </div>
  );
}