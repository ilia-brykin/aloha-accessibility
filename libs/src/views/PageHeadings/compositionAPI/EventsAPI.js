import {
  computed,
  inject,
} from "vue";

import {
  traverse,
} from "../../../functions/utils";
import {
  isUndefined,
} from "lodash-es";

export default function EventsAPI({
  tagsWithModel = computed(() => []),
}) {
  const chromeTabId = inject("chromeTabId");

  const toggleHeadings = ({ statusStop } = {}) => {
    const statusShow = isUndefined(statusStop) ?
      true :
      !statusStop;
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: traverse,
        args: [{ tags: tagsWithModel.value, className: "a11y_heading", statusShow }],
      }
    );
  };

  const resetHeadings = () => {
    toggleHeadings({ statusStop: true });
  };

  const checkHeadings = async() => {
    const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript(
      {
        target: {
          tabId: TAB.id,
          allFrames: true,
        },
        function: _checkHeadings,
        args: [tagsWithModel.value, "a11y_heading",],
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
    resetHeadings,
    toggleHeadings,
  };
}
