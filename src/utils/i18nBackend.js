import i18n from 'i18next';
import HttpBackend from 'i18next-http-backend';

i18n.use(HttpBackend).init({
  backend: {
    loadPath: '@/locales/{{lng}}/{{ns}}.json',
  },
  fallbackLng: 'en',
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
