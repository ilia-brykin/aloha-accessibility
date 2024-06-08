import {
  inject,
  toRef,
} from "vue";

import {
  highlightElement,
} from "../../../../functions/utils";

export default function EventsAPI(props) {
  const header = toRef(props, "header");

  const chromeTabId = inject("chromeTabId");

  const onHighlightElement = () => {
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: highlightElement,
        args: [header.value.uniqueSelector],
      }
    );
  };

  return {
    onHighlightElement,
  };
}
