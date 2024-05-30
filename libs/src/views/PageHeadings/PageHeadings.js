import {
  onBeforeUnmount,
} from "vue";

import ACheckbox from "aloha-vue/src/ui/ACheckbox/ACheckbox";
import AElement from "aloha-vue/src/AElement/AElement";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import EventsAPI from "./compositionAPI/EventsAPI";
import TagsAPI from "./compositionAPI/TagsAPI";

export default {
  name: "PageHeadings",
  components: {
    ACheckbox,
    AElement,
    ATranslation,
  },
  setup() {
    const {
      modelTags,
      tags,
      tagsWithModel,
    } = TagsAPI();
    
    const {
      checkHeadings,
      resetHeadings,
      toggleHeadings,
    } = EventsAPI({
      tagsWithModel,
    });

    onBeforeUnmount(() => {
      resetHeadings();
    });

    return {
      checkHeadings,
      modelTags,
      tags,
      tagsWithModel,
      toggleHeadings,
    };
  },
};
