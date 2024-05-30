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

  const toggleLists = ({ statusStop } = {}) => {
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
        args: [{ tags: tagsWithModel.value, className: "a11y_lists", statusShow }],
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
