import {
  ref,
} from "vue";

import {
  setLanguage,
} from "aloha-vue/src/ATranslation/compositionAPI/ATranslationAPI";

export const modelLanguage = ref("en");

export default function LanguagesAPI() {
  const languages = [
    {
      label: "Deutsch",
      value: "de",
    },
    {
      label: "English",
      value: "en",
    },
    {
      label: "Русский",
      value: "ru",
    },
  ];

  const changeLanguage = () => {
    setTimeout(() => {
      localStorage.setItem("language", modelLanguage.value);
      setLanguage(modelLanguage.value);
    });
  };

  return {
    changeLanguage,
    languages,
    modelLanguage,
  };
}

export function setLanguageFromLocalStorage() {
  modelLanguage.value = localStorage.getItem("language") || "en";
}

