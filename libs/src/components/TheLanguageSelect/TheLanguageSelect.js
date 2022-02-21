import ATranslation from "../ATranslation/ATranslation.vue";

import {
  get,
} from "lodash-es";

export default {
  name: "TheLanguageSelect",
  components: {
    ATranslation,
  },
  props: {
    modelValue: {
      type: String,
      required: true,
    },
  },
  emits: [
    "update:modelValue",
  ],
  data() {
    return {
      languages: [
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
        {
          label: "Hrvatski",
          value: "hr",
        },
      ],
    };
  },
  created() {
    this.checkGlobalVariables();
  },
  methods: {
    checkGlobalVariables() {
      const CHROME_STORAGE_SYNC = get(chrome, "storage.sync");
      if (!CHROME_STORAGE_SYNC) {
        return;
      }
      CHROME_STORAGE_SYNC.get("language", ({ language }) => {
        this.$emit("update:modelValue", language || "en");
      });
    },

    changeSelect($event) {
      const VALUE = $event.target.value;
      this.$emit("update:modelValue", VALUE);
      const CHROME_STORAGE_SYNC = get(chrome, "storage.sync");
      if (!CHROME_STORAGE_SYNC) {
        return;
      }
      CHROME_STORAGE_SYNC.set({ language: VALUE });
    },
  },
};
