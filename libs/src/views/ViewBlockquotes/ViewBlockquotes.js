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
    name: "BLOCKQUOTE",
    color: "#ff0000",
    insertInParent: true,
  },
];

export default {
  name: "ViewBlockquotes",
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
      isBlockquotesVisible: false,
      links: [
        {
          href: "https://webtest.bitv-test.de/index.php?a=di&iid=248&s=n",
          label: "BITV 9.1.3.1c",
          title: "Barrierefreie-Informationstechnik-Verordnung. HTML-Strukturelemente für Zitate. Prüfschritt 9.1.3.1c",
        },
      ],
    };
  },
  computed: {
    textForBtnToggle() {
      return this.isBlockquotesVisible ? "_BLOCKQUOTES_HIDE_" : "_BLOCKQUOTES_SHOW_";
    },
  },
  created() {
    this.checkGlobalVariables();
    this.initEventBus();
  },
  methods: {
    checkGlobalVariables() {
      this.getStorageValue({ name: "isBlockquotesVisible" }).then(
        isBlockquotesVisible => {
          this.isBlockquotesVisible = !!isBlockquotesVisible;
          this.consoleLog("isBlockquotesVisible", isBlockquotesVisible);
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
      const STATUS_STOP = isUndefined(statusStop) ? !!this.isBlockquotesVisible : statusStop;
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
      this.isBlockquotesVisible = !STATUS_STOP;
      this.setStorageValue({
        name: "isBlockquotesVisible",
        value: !!this.isBlockquotesVisible,
      });
    },
  },
};
