import {
  ref,
} from "vue";

import {
  get,
} from "lodash-es";

export default function ChromeTabAPI() {
  const chromeTab = ref(undefined);
  const loading = ref(true);

  const setChromeTab = async() => {
    const CHROME_TABS = get(chrome, "tabs");
    if (!CHROME_TABS) {
      loading.value = false;
      return;
    }

    const [TAB] = await CHROME_TABS.query({ active: true, currentWindow: true });
    chromeTab.value = TAB;
    loading.value = false;
  };

  return {
    chromeTab,
    loading,
    setChromeTab,
  };
}
