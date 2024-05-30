import {
  computed,
  inject,
  ref,
} from "vue";

import {
  traverse,
} from "../../../functions/utils";
import {
  isUndefined,
} from "lodash-es";

export default function EventsAPI() {
  const chromeTabId = inject("chromeTabId");

  const isHeadingsVisible = ref(false);

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

  const toggleHeadings = ({ statusStop } = {}) => {
    const STATUS_STOP = isUndefined(statusStop) ?
      !!isHeadingsVisible.value :
      statusStop;
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: traverse,
        args: [TAGS, "a11y_heading", STATUS_STOP],
      }
    );
    isHeadingsVisible.value = !STATUS_STOP;
  };

  const textForBtnToggleHeadings = computed(() => {
    return isHeadingsVisible.value ?
      "_HEADINGS_HIDE_" :
      "_HEADINGS_SHOW_";
  });

  const checkHeadings = async() => {
    const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: {
          tabId: TAB.id,
          allFrames: true,
        },
        function: _checkHeadings,
        args: [TAGS, "a11y_heading", !!isHeadingsVisible.value],
      }
    );
  };

  function _checkHeadings() {
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

  return {
    checkHeadings,
    textForBtnToggleHeadings,
    toggleHeadings,
  };
}
