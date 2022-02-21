import ATranslation from "../../components/ATranslation/ATranslation.vue";

import {
  traverse,
} from "../../functions/utils";
import {
  EventBus,
} from "../../functions/event-bus";
import {
  isUndefined,
} from "lodash-es";

const TAGS = [
  {
    name: "UL",
    color: "#ff0000",
    insertInParent: true,
  },
  {
    name: "OL",
    color: "#713939",
    insertInParent: true,
  },
  {
    name: "DL",
    color: "#00aa00",
    insertInParent: true,
  },
  {
    name: "LI",
    color: "#054164",
    insertInParent: false,
  },
  {
    name: "DT",
    color: "#054164",
    insertInParent: false,
  },
  {
    name: "DD",
    color: "#054164",
    insertInParent: false,
  },
];

export default {
  name: "ViewLists",
  components: {
    ATranslation,
  },
  inject: [
    "tabId",
    "consoleLog",
    "getStorageValue",
    "setStorageValue",
  ],
  data() {
    return {
      isListsVisible: false,
      links: [
        {
          href: "https://www.w3.org/WAI/WCAG21/Techniques/html/H48.html",
          label: "WCAG21 H48",
          title: "Using ol, ul and dl for lists or groups of links",
        },
        {
          href: "https://webtest.bitv-test.de/index.php?a=di&iid=247&s=n",
          label: "BITV 9.1.3.1b",
          title: "Barrierefreie-Informationstechnik-Verordnung. Prüfschritt 9.1.3.1b",
        },
      ],
    };
  },
  computed: {
    textForBtnToggle() {
      return this.isListsVisible ? "_LISTS_HIDE_" : "_LISTS_SHOW_";
    },
  },
  created() {
    this.checkGlobalVariables();
    this.initEventBus();
  },
  methods: {
    checkGlobalVariables() {
      this.getStorageValue({ name: "isListsVisible" }).then(
        isListsVisible => {
          this.isListsVisible = !!isListsVisible;
          this.consoleLog("isListsVisible", isListsVisible);
        }
      );
    },

    initEventBus() {
      EventBus.$on("resetAll", this.resetAll);
    },

    resetAll() {
      this.toggleLists({ statusStop: true });
    },

    toggleLists({ statusStop } = {}) {
      const STATUS_STOP = isUndefined(statusStop) ? !!this.isListsVisible : statusStop;
      chrome.scripting.executeScript(
        {
          target: {
            tabId: this.tabId,
            allFrames: true,
          },
          function: traverse,
          args: [TAGS, "a11y_lists", STATUS_STOP],
        }
      );
      this.isListsVisible = !STATUS_STOP;
      this.setStorageValue({
        name: "isListsVisible",
        value: !!this.isListsVisible,
      });
    },
  },
};
