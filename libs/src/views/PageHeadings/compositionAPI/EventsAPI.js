import {
  computed,
  inject,
  ref,
} from "vue";

import {
  traverseDocument,
} from "../../../functions/utils";
import {
  onUtilsHeading,
} from "../utils/utils";
import {
  isUndefined,
} from "lodash-es";

export default function EventsAPI({
  elementsWithModel = computed(() => []),
}) {
  const chromeTabId = inject("chromeTabId");

  const allHeadings = ref([]);
  const warnings = ref(undefined);

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

  const onGetHeadings = () => {
    onUtilsHeading({ collect: true }).then(result => {
      allHeadings.value = result;
    }).catch(error => {
      console.error(error);
    });
  };

  const onAnalyzeHeadings = () => {
    onUtilsHeading({ analyze: true }).then(result => {
      warnings.value = result.warnings;
      allHeadings.value = result.headings;
    }).catch(error => {
      console.error(error);
    });
  };

  return {
    allHeadings,
    onAnalyzeHeadings,
    onGetHeadings,
    resetHeadings,
    toggleHeadings,
    warnings,
  };
}
