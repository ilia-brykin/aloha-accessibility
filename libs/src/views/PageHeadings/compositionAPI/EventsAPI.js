import {
  computed,
  inject,
  ref,
} from "vue";

import {
  traverseDocument,
} from "../../../functions/utils";
import {
  utilsHeading,
} from "../utils/utils";
import {
  isUndefined,
} from "lodash-es";

export default function EventsAPI({
  elementsWithModel = computed(() => []),
}) {
  const chromeTabId = inject("chromeTabId");

  const allHeadings = ref([]);

  const toggleHeadings = ({ shouldShowTags } = {}) => {
    const _shouldShowTags = isUndefined(shouldShowTags) ?
      true :
      !shouldShowTags;
    chrome.scripting.executeScript(
      {
        target: {
          tabId: chromeTabId.value,
          allFrames: true,
        },
        function: traverseDocument,
        args: [{ elements: elementsWithModel.value, className: "a11y_heading", shouldShowTags: _shouldShowTags }],
      }
    );
  };

  const resetHeadings = () => {
    toggleHeadings({ shouldShowTags: false });
  };

  const getHeadings = async() => {
    const [TAB] = await chrome.tabs.query({ active: true, currentWindow: true });

    return new Promise((resolve, reject) => {
      chrome.runtime.onMessage.addListener(function listener(message) {
        if (message.type === "HEADINGS_COLLECTED") {
          chrome.runtime.onMessage.removeListener(listener);
          resolve(message.result);
        } else if (message.type === "HEADINGS_ANALYZED") {
          chrome.runtime.onMessage.removeListener(listener);
          resolve(message.result);
        }
      });

      chrome.scripting.executeScript(
        {
          target: { tabId: TAB.id, allFrames: true },
          function: utilsHeading,
          args: [{ collect: true }]
        },
        () => {
          if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
          }
        }
      );
    });
  };

  const onGetHeadings = () => {
    getHeadings().then(result => {
      allHeadings.value = result;
      console.log(result);
    }).catch(error => {
      console.error(error);
    });
  };

  return {
    allHeadings,
    onGetHeadings,
    resetHeadings,
    toggleHeadings,
  };
}
