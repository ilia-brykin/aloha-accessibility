import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

import AFiltersAPI from "aloha-vue/src/compositionAPI/AFiltersAPI";
import StylesAPI from "./compositionAPI/StylesAPI";

export default {
  name: "PageHeadingsListItem",
  components: {
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
      filterBoolean,
    } = AFiltersAPI();

    return {
      filterBoolean,
      stylesLocal,
    };
  },
};
