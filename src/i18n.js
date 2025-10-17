import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import uzTranslation from './locales/uz.json';
import uzCyrlTranslation from './locales/uz-cyrl.json';
import ruTranslation from './locales/ru.json';
import enTranslation from './locales/en.json';

const resources = {
  uz: {
    translation: uzTranslation
  },
  'uz-cyrl': {
    translation: uzCyrlTranslation
  },
  ru: {
    translation: ruTranslation
  },
  en: {
    translation: enTranslation
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'uz', // Default language is Uzbek Latin
    lng: 'uz', // Initial language
    debug: false,
    
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    interpolation: {
      escapeValue: false // React already escapes values
    },

    react: {
      useSuspense: false
    }
  });

export default i18n;