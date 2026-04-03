// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en/translation.json';
import zh from './locales/zh/translation.json';
import pt from './locales/pt/translation.json';
import vi from './locales/vi/translation.json';
import tr from './locales/tr/translation.json';
import id from './locales/id/translation.json';
import ja from './locales/ja/translation.json';
import ko from './locales/ko/translation.json';

const SUPPORTED = ['en','zh','pt','vi','tr','id','ja','ko'];

// ?lang=vi in the URL takes priority, then localStorage, then 'en'
const urlLang = new URLSearchParams(window.location.search).get('lang');
const initialLang = SUPPORTED.includes(urlLang)
  ? urlLang
  : (localStorage.getItem('dunkpoge_lang') || 'en');

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      zh: { translation: zh },
      pt: { translation: pt },
      vi: { translation: vi },
      tr: { translation: tr },
      id: { translation: id },
      ja: { translation: ja },
      ko: { translation: ko }
    },
    lng: initialLang,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

i18n.on('languageChanged', (lng) => {
  localStorage.setItem('dunkpoge_lang', lng);
});

export default i18n;
