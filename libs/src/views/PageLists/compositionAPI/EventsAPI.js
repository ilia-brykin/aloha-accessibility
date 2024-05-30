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

  const isListsVisible = ref(false);
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

  const textForBtnToggle = computed(() => {
    return isListsVisible.value ?
      "_LISTS_HIDE_" :
      "_LISTS_SHOW_";
  });

  const toggleLists = ({ statusStop } = {}) => {
    const STATUS_STOP = isUndefined(statusStop) ?
      !!isListsVisible.value :
      statusStop;
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: traverse,
        args: [TAGS, "a11y_lists", STATUS_STOP],
      }
    );
    isListsVisible.value = !STATUS_STOP;
  };

  return {
    textForBtnToggle,
    toggleLists,
  };
}
