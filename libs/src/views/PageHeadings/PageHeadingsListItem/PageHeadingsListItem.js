import AElement from "aloha-vue/src/AElement/AElement";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import AFiltersAPI from "aloha-vue/src/compositionAPI/AFiltersAPI";
import EventsAPI from "./compositionAPI/EventsAPI";
import StylesAPI from "./compositionAPI/StylesAPI";

export default {
  name: "PageHeadingsListItem",
  components: {
    AElement,
    ATranslation,
  },
  props: {
    header: {
      type: Object,
      required: true,
    },
    isAdditionalVisible: {
      type: Boolean,
      required: false,
    },
  },
  setup(props) {
    const {
      stylesLocal,
    } = StylesAPI(props);

    const {
      onHighlightElement,
    } = EventsAPI(props);

    const {
      filterBoolean,
    } = AFiltersAPI();

    return {
      filterBoolean,
      onHighlightElement,
      stylesLocal,
    };
  },
};
