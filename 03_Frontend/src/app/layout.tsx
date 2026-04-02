import { getLocale } from 'next-intl/server';
import '@/styles/globals.css';

export const runtime = 'edge';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  
  return (
    <html lang={locale}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
