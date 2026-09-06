import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const storedLanguage = window.localStorage.getItem('dancepoint-language');
const initialLanguage = ['pl', 'en'].includes(storedLanguage) ? storedLanguage : 'pl';

i18n
  .use(Backend) // Загрузка файлов из /public/locales
  .use(initReactI18next) // Интеграция с React
  .init({
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: ['pl', 'en'],
    load: 'languageOnly',
    debug: false,
    interpolation: {
      escapeValue: false, // React сам защищает от XSS
    }
  });

export default i18n;
