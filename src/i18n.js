import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';

i18n
  .use(Backend) // Загрузка файлов из /public/locales
  .use(LanguageDetector) // Автоопределение языка браузера
  .use(initReactI18next) // Интеграция с React
  .init({
    lng: 'pl',
    fallbackLng: 'pl', // Язык по умолчанию
    debug: true,
    interpolation: {
      escapeValue: false, // React сам защищает от XSS
    }
  });

export default i18n;
