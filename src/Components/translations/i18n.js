import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import { TRANSLATIONS_en } from "./en/translation";
import { TRANSLATIONS_ar } from "./arab/translation";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: TRANSLATIONS_en,
      },
      ar: {
        translation: TRANSLATIONS_ar,
      },
    },
  });
