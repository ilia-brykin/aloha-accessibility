import {
  onBeforeUnmount,
} from "vue";

import ACheckbox from "aloha-vue/src/ui/ACheckbox/ACheckbox";
import AElement from "aloha-vue/src/AElement/AElement";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import ElementsAPI from "./compositionAPI/ElementsAPI";
import EventsAPI from "./compositionAPI/EventsAPI";

export default {
  name: "PageHeadings",
  components: {
    ACheckbox,
    AElement,
    ATranslation,
  },
  setup() {
    const {
      elementsRoleHeading,
      elementsWithModel,
      model,
      tags,
    } = ElementsAPI();
    
    const {
      checkHeadings,
      resetHeadings,
      toggleHeadings,
    } = EventsAPI({
      elementsWithModel,
    });

    onBeforeUnmount(() => {
      resetHeadings();
    });

    return {
      checkHeadings,
      elementsRoleHeading,
      elementsWithModel,
      model,
      tags,
      toggleHeadings,
    };
  },
};
