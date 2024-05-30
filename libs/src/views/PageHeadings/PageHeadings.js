import ATranslation from "aloha-vue/src/ATranslation/ATranslation";

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
    name: "H1",
    color: "#ff0000",
    insertInParent: false,
  },
  {
    name: "H2",
    color: "#713939",
    insertInParent: false,
  },
  {
    name: "H3",
    color: "#00aa00",
    insertInParent: false,
  },
  {
    name: "H4",
    color: "#054164",
    insertInParent: false,
  },
  {
    name: "H5",
    color: "#7F0A7F",
    insertInParent: false,
  },
  {
    name: "H6",
    color: "#01D901",
    insertInParent: false,
  },
];

export default {
  name: "ViewHeadings",
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
      isHeadingsVisible: false,
      links: [
        {
          href: "https://www.w3.org/WAI/WCAG21/Techniques/html/H42",
          label: "WCAG21 H42",
          title: "Using h1-h6 to identify headings",
        },
        {
          href: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
          label: "WCAG21 1.3.1",
          title: "Success Criterion 1.3.1: Info and Relationships",
        },
        {
          href: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
          label: "BITV 9.1.3.1a",
          title: "Barrierefreie-Informationstechnik-Verordnung. Prüfschritt 9.1.3.1a",
        },
      ],
    };
  },
  computed: {
    textForBtnToggleHeadings() {
      return this.isHeadingsVisible ? "_HEADINGS_HIDE_" : "_HEADINGS_SHOW_";
    },
  },
  created() {
    this.checkGlobalVariables();
    this.initEventBus();
  },
  methods: {
    checkGlobalVariables() {
      this.getStorageValue({ name: "isHeadingsVisible" }).then(
        isHeadingsVisible => {
          this.isHeadingsVisible = !!isHeadingsVisible;
          this.consoleLog("isHeadingsVisible", isHeadingsVisible);
        }
      );
    },

    initEventBus() {
      EventBus.$on("resetAll", this.resetAll);
    },

    resetAll() {
      this.toggleHeadings({ statusStop: true });
    },

    toggleHeadings({ statusStop } = {}) {
      const STATUS_STOP = isUndefined(statusStop) ? !!this.isHeadingsVisible : statusStop;
      chrome.scripting.executeScript(
        {
          target: {
            tabId: this.tabId,
            allFrames: true,
          },
          function: traverse,
          args: [TAGS, "a11y_heading", STATUS_STOP],
        }
      );
      this.isHeadingsVisible = !STATUS_STOP;
      this.setStorageValue({
        name: "isHeadingsVisible",
        value: !!this.isHeadingsVisible,
      });
    },

    async checkHeadings() {
      const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript(
        {
          target: {
            tabId: TAB.id,
            allFrames: true,
          },
          function: checkHeadings,
          args: [TAGS, "a11y_heading", !!this.isHeadingsVisible],
        }
      );
    },
  },
};

function checkHeadings() {
  checkHeadingsInWindow(window);

  function checkHeadingsInWindow(currentWindow = window) {
    try {
      findAllHeadings(currentWindow);
      // TODO: frames
      // for (let i = 0; i < currentWindow.frames.length; i++) {
      //   checkHeadingsInWindow(currentWindow.frames[i]);
      // }
    } catch (e) {
      console.warn(e);
    }
  }

  function findAllHeadings(currentWindow) {
    const HEADINGS = currentWindow.document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const HEADINGS_VISIBLE = [];
    // tagName
    HEADINGS.forEach(element => {
      if (isElementVisible(element)) {
        HEADINGS_VISIBLE.push(element);
      }
    });
    console.log("HEADINGS_VISIBLE", HEADINGS_VISIBLE);
    console.log("length", HEADINGS_VISIBLE.length);
  }

  function isElementVisible(element) {
    return element.offsetWidth > 0 && element.offsetHeight > 0;
  }
}
