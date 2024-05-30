import {
  onBeforeUnmount,
} from "vue";

import ACheckbox from "aloha-vue/src/ui/ACheckbox/ACheckbox";
import AElement from "aloha-vue/src/AElement/AElement";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import EventsAPI from "./compositionAPI/EventsAPI";
import TagsAPI from "./compositionAPI/TagsAPI";

export default {
  name: "PageLists",
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
      resetLists,
      toggleLists,
    } = EventsAPI({
      tagsWithModel,
    });

    onBeforeUnmount(() => {
      resetLists();
    });

    return {
      toggleLists,
      modelTags,
      tags,
      tagsWithModel,
    };
  },
};
