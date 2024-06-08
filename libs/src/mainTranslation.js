import i18n from "./i18n/index";
import {
  de,
  en,
  ru,
} from "aloha-vue/src/i18n/allLanguages";

export const mainTranslation = {
  de: {
    ...de,
    ...i18n.de,
  },
  en: {
    ...en,
    ...i18n.en,
  },
  ru: {
    ...ru,
    ...i18n.ru,
  },
};
