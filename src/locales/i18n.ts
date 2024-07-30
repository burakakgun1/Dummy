import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './en.json';
import trTranslations from './tr.json';

i18n
  .use(initReactI18next)
  .init({
    lng: 'en', 
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

export default i18n;
