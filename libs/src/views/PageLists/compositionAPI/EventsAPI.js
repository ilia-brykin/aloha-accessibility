import {
  computed,
  inject,
} from "vue";

import {
  traverseDocument,
} from "../../../functions/utils";
import {
  isUndefined,
} from "lodash-es";

export default function EventsAPI({
  tagsWithModel = computed(() => []),
}) {
  const chromeTabId = inject("chromeTabId");

  const toggleLists = ({ statusStop } = {}) => {
    const shouldShowTags = isUndefined(statusStop) ?
      true :
      !statusStop;
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: traverseDocument,
        args: [{ elements: tagsWithModel.value, className: "a11y_lists", shouldShowTags }],
      }
    );
  };

  const resetLists = () => {
    toggleLists({ statusStop: true });
  };

  return {
    resetLists,
    toggleLists,
  };
}
