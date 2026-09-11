import { getRequestConfig } from 'next-intl/server';

const SUPPORTED_LOCALES = ['id', 'en'] as const;
type AppLocale = (typeof SUPPORTED_LOCALES)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;
  const locale: AppLocale =
    requestedLocale && SUPPORTED_LOCALES.includes(requestedLocale as AppLocale)
      ? (requestedLocale as AppLocale)
      : 'id';

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});
