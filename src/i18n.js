import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

const normalizePath = (path) => path.length > 1 ? path.replace(/\/+$/, '') : path
const storedLanguage = window.localStorage.getItem('dancepoint-language');
export const preferredLanguage = ['pl', 'en'].includes(storedLanguage) ? storedLanguage : 'pl';
const root = document.getElementById('root')
export const isHydratingPrerender = root?.dataset.prerenderedPath === normalizePath(window.location.pathname)
const initialLanguage = isHydratingPrerender ? 'pl' : preferredLanguage

export const i18nReady = i18n
  .use(Backend) // Загрузка файлов из /public/locales
  .use(initReactI18next) // Интеграция с React
  .init({
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: ['pl', 'en'],
    load: 'languageOnly',
    debug: false,
    showSupportNotice: false,
    interpolation: {
      escapeValue: false, // React сам защищает от XSS
    }
  });

export default i18n;
