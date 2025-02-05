import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { store } from './redux/store';

const language = store.getState().language.lng;

i18n
    .use(Backend)
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        lng: language,
        debug: true,
        backend: {
            loadPath: '/locales/{{lng}}/translation.json'
        },
        interpolation: {
            escapeValue: false,
        }
    });

store.subscribe(() => {
    const newLanguage = store.getState().language.lng;
    i18n.changeLanguage(newLanguage);
});

export default i18n;