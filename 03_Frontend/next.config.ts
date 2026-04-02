import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Removed distDir '.next-cache' to allow standard Vercel/Cloudflare build output
};

export default withNextIntl(nextConfig);
