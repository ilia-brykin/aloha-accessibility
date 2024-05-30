import ATranslation from "aloha-vue/src/ATranslation/ATranslation";
import AElement from "aloha-vue/src/AElement/AElement";

import EventsAPI from "./compositionAPI/EventsAPI";

export default {
  name: "PageHeadings",
  components: {
    AElement,
    ATranslation,
  },
  setup() {
    const {
      checkHeadings,
      textForBtnToggleHeadings,
      toggleHeadings,
    } = EventsAPI();

    return {
      checkHeadings,
      textForBtnToggleHeadings,
      toggleHeadings,
    };
  },
};
