import i18n from "./i18n/index";
import {
  de,
  ru,
} from "aloha-vue/src/i18n/allLanguages";

export const mainTranslation = {
  de: {
    ...de,
    ...i18n.de,
  },
  ru: {
    ...ru,
    ...i18n.ru,
  },
};
