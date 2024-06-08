import {
  onBeforeUnmount,
} from "vue";

import ACheckbox from "aloha-vue/src/ui/ACheckbox/ACheckbox";
import AElement from "aloha-vue/src/AElement/AElement";
import ATabs from "aloha-vue/src/ATabs/ATabs";
import ATranslation from "aloha-vue/src/ATranslation/ATranslation";
import PageHeadingsLinks from "./PageHeadingsLinks/PageHeadingsLinks.vue";
import PageHeadingsListItem from "./PageHeadingsListItem/PageHeadingsListItem.vue";

import ElementsAPI from "./compositionAPI/ElementsAPI";
import EventsAPI from "./compositionAPI/EventsAPI";
import TabsAPI from "./compositionAPI/TabsAPI";
import ToggleAPI from "./compositionAPI/ToggleAPI";

export default {
  name: "PageHeadings",
  components: {
    ACheckbox,
    AElement,
    ATabs,
    ATranslation,
    PageHeadingsLinks,
    PageHeadingsListItem,
  },
  setup() {
    const {
      elementsRoleHeading,
      elementsWithModel,
      model,
      tags,
    } = ElementsAPI();
    
    const {
      allHeadings,
      onGetHeadings,
      resetHeadings,
      toggleHeadings,
    } = EventsAPI({
      elementsWithModel,
    });

    const {
      dataTabs,
    } = TabsAPI();

    const {
      isAdditionalInfoVisible,
      textButtonAdditionalInfoVisible,
      toggleAdditionalInfo,
    } = ToggleAPI();

    onBeforeUnmount(() => {
      resetHeadings();
    });

    return {
      allHeadings,
      dataTabs,
      elementsRoleHeading,
      elementsWithModel,
      isAdditionalInfoVisible,
      model,
      onGetHeadings,
      tags,
      textButtonAdditionalInfoVisible,
      toggleAdditionalInfo,
      toggleHeadings,
    };
  },
};
