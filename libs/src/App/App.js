import {
  computed,
  defineComponent,
  provide,
} from "vue";

import ATranslation from "aloha-vue/src/ATranslation/ATranslation";
import TheMenu from "../components/TheMenu/TheMenu.vue";
import TheNavbar from "../components/TheNavbar/TheNavbar.vue";

import ChromeTabAPI from "./compositionAPI/ChromeTabAPI";
import ConsoleLogAPI from "./compositionAPI/ConsoleLogAPI";

export default defineComponent({
  components: {
    ATranslation,
    TheMenu,
    TheNavbar,
  },
  setup() {
    const {
      consoleLog,
    } = ConsoleLogAPI();

    const {
      chromeTab,
      loading,
      setChromeTab,
    } = ChromeTabAPI();

    provide("consoleLog", consoleLog);
    provide("chromeTab", computed(() => chromeTab.value));
    provide("chromeTabId", computed(() => chromeTab.value?.id));

    setChromeTab();

    return {
      chromeTab,
      loading,
    };
  },
});
