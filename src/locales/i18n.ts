import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import trTranslations from './tr.json';

const LANG_STORAGE_KEY = 'userLanguage';

const storedLanguage = localStorage.getItem(LANG_STORAGE_KEY) || 'en';

i18n
  .use(initReactI18next)
  .init({
    lng: storedLanguage,
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslations,
      },
      tr: {
        translation: trTranslations,
      },
    },
    interpolation: {
      escapeValue: false,
    },
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem(LANG_STORAGE_KEY, lng);
});

export default i18n;
