/** Format a date string using the user's locale */
export function formatDate(
  dateString: string,
  locale: string = 'id-ID',
  style: 'short' | 'medium' | 'long' = 'medium'
): string {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions =
    style === 'short'
      ? { day: '2-digit', month: '2-digit', year: 'numeric' }
      : style === 'medium'
        ? { day: 'numeric', month: 'short', year: 'numeric' }
        : { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };

  return new Intl.DateTimeFormat(locale, options).format(date);
}

/** Format a number (e.g., score) */
export function formatNumber(
  value: number,
  locale: string = 'id-ID',
  decimals: number = 0
): string {
  return new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format elapsed seconds as HH:MM:SS or MM:SS */
export function formatDuration(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;

  if (h > 0) {
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  }
  return `${m}:${s.toString().padStart(2, '0')}`;
}

/** Format a relative time (e.g., "2 hari lalu") */
export function formatRelativeTime(dateString: string, locale: string = 'id-ID'): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });

  if (diffSeconds < 60) return rtf.format(-diffSeconds, 'second');
  if (diffSeconds < 3600) return rtf.format(-Math.floor(diffSeconds / 60), 'minute');
  if (diffSeconds < 86400) return rtf.format(-Math.floor(diffSeconds / 3600), 'hour');
  if (diffSeconds < 2592000) return rtf.format(-Math.floor(diffSeconds / 86400), 'day');
  return formatDate(dateString, locale, 'medium');
}
