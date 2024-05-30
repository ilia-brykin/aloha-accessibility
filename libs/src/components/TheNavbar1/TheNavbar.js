import AIcon from "../AIcon/AIcon.vue";
import ATranslation from "../ATranslation/ATranslation.vue";
import TheLanguageSelect from "../TheLanguageSelect/TheLanguageSelect.vue";

import {
  EventBus,
} from "../../functions/event-bus";

export default {
  name: "TheNavbar",
  components: {
    AIcon,
    ATranslation,
    TheLanguageSelect,
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
      isPlaying: false,
    };
  },
  computed: {
    togglePlayIcon() {
      return this.isPlaying ? "Pause" : "Play";
    },

    togglePlayText() {
      return this.isPlaying ? "Pause" : "Play";
    },
  },
  methods: {
    updateLanguage(language) {
      this.$emit("update:modelValue", language);
    },

    resetAll() {
      EventBus.$emit("resetAll");
    },

    togglePlay() {
      // TODO: OBSERVER
      this.isPlaying = !this.isPlaying;
    },
  },
};
