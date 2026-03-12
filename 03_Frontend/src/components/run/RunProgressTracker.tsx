/** Placeholder: RunProgressTracker — wraps Legion ProgressBar with step counter + elapsed time */
export function RunProgressTracker({ progress, elapsed }: { progress?: { percentComplete: number; currentStepLabel: string; currentStep: number; totalSteps: number }; elapsed?: number }) {
  const pct = progress?.percentComplete ?? 0;
  return (
    <div style={{ padding: 'var(--space-4)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-lg)' }} role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-live="polite">
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-2)' }}>
        <span>{progress?.currentStepLabel ?? 'Waiting...'}</span>
        <span>Step {progress?.currentStep ?? 0}/{progress?.totalSteps ?? 0}</span>
      </div>
      <div style={{ height: 8, background: 'var(--color-bg-tertiary)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${pct}%`, background: 'var(--color-primary)', borderRadius: 'var(--radius-full)', transition: 'width 0.5s ease' }} />
      </div>
      {elapsed !== undefined && <div style={{ marginTop: 'var(--space-2)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>Elapsed: {Math.floor(elapsed / 60)}m {elapsed % 60}s</div>}
    </div>
  );
}
