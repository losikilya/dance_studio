import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import resources from 'virtual:translations';

const normalizePath = (path) => path.length > 1 ? path.replace(/\/+$/, '') : path
const storedLanguage = window.localStorage.getItem('dancepoint-language');
export const preferredLanguage = ['pl', 'en'].includes(storedLanguage) ? storedLanguage : 'pl';
const root = document.getElementById('root')
export const isHydratingPrerender = root?.dataset.prerenderedPath === normalizePath(window.location.pathname)
const initialLanguage = isHydratingPrerender ? 'pl' : preferredLanguage

export const i18nReady = i18n
  .use(initReactI18next) // Интеграция с React
  .init({
    lng: initialLanguage,
    fallbackLng: 'en',
    supportedLngs: ['pl', 'en'],
    resources,
    load: 'languageOnly',
    debug: false,
    showSupportNotice: false,
    interpolation: {
      escapeValue: false, // React сам защищает от XSS
    }
  });

export default i18n;
