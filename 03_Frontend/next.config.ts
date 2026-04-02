import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

const nextConfig: NextConfig = {
  // Use a custom dist directory to avoid intermittent Windows lock issues on `.next/trace`.
  distDir: '.next-cache',
};

export default withNextIntl(nextConfig);
