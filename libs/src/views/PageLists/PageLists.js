import AElement from "aloha-vue/src/AElement/AElement";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import EventsAPI from "./compositionAPI/EventsAPI";

export default {
  name: "PageLists",
  components: {
    AElement,
    ATranslation,
  },
  setup() {
    const {
      textForBtnToggle,
      toggleLists,
    } = EventsAPI();

    return {
      textForBtnToggle,
      toggleLists,
    };
  },
};
