import de from "./de.json";
import en from "./en.json";
import ru from "./ru.json";
import PageHeadingsI18n from "../views/PageHeadings/i18n/index";

export default {
  de: {
    ...de,
    ...PageHeadingsI18n.de,
  },
  en: {
    ...en,
    ...PageHeadingsI18n.en,
  },
  ru: {
    ...ru,
    ...PageHeadingsI18n.ru,
  },
};
