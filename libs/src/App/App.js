import ATranslation from "aloha-vue/src/ATranslation/ATranslation";
import TheMenu from "../components/TheMenu/TheMenu.vue";
import TheNavbar from "../components/TheNavbar/TheNavbar.vue";

import {
  computed,
  defineComponent,
} from "vue";
import {
  get,
  keyBy,
} from "lodash-es";

export default defineComponent({
  components: {
    ATranslation,
    TheMenu,
    TheNavbar,
  },
  provide() {
    return {
      language: computed(() => this.language),
      tab: computed(() => this.tab),
      tabId: computed(() => this.tabId),
      consoleLog: this.consoleLog,
      getStorageValue: this.getStorageValue,
      setStorageValue: this.setStorageValue,
    };
  },
  data() {
    return {
      language: "en",
      tab: {},
      loading: true,
      menuItems: [
        {
          id: "headings",
          label: "_HEADINGS_H1_H6_",
          title: "_HEADINGS_H1_H6_TITLE_",
          component: "ViewHeadings",
        },
        {
          id: "lists",
          label: "_LISTS_OL_UL_DL_",
          title: "_LISTS_OL_UL_DL_TITLE_",
          component: "ViewLists",
        },
        {
          id: "blockquote",
          label: "_BLOCKQUOTES_",
          title: "_BLOCKQUOTES_TITLE_",
          component: "ViewBlockquotes",
        },
      ],
      menuItemActiveId: "headings",
    };
  },
  computed: {
    tabId() {
      return this.tab.id;
    },

    componentContent() {
      return this.menuItemActive.component;
    },

    menuItemActive() {
      return this.menuItemsKeyById[this.menuItemActiveId];
    },

    menuItemsKeyById() {
      return keyBy(this.menuItems, "id");
    },
  },
  created() {
    this.setChromeTab();
  },
  methods: {
    async setChromeTab() {
      const CHROME_TABS = get(chrome, "tabs");
      if (!CHROME_TABS) {
        this.loading = false;
        return;
      }
      const [TAB] = await CHROME_TABS.query({ active: true, currentWindow: true });
      this.tab = TAB;
      this.loading = false;
    },

    consoleLog(...arg) {
      if (chrome && chrome.runtime) {
        chrome.runtime.sendMessage(arg);
      } else {
        console.log(...arg);
      }
    },

    async getStorageValue({ name = "" }) {
      const CHROME_STORAGE_SYNC = get(chrome, "storage.sync");
      if (!CHROME_STORAGE_SYNC) {
        return;
      }
      const TEXT_GET = this.getNameWithTabId({ name });
      const ARG = await CHROME_STORAGE_SYNC.get(TEXT_GET);
      return ARG[TEXT_GET];
    },

    setStorageValue({ name = "", value }) {
      const CHROME_STORAGE_SYNC = get(chrome, "storage.sync");
      if (!CHROME_STORAGE_SYNC) {
        return;
      }
      const TEXT_GET = this.getNameWithTabId({ name });
      CHROME_STORAGE_SYNC.set({ [TEXT_GET]: value });
    },

    getNameWithTabId({ name }) {
      return `tab${ this.tabId }_${ name }`;
    },

    changeMenuItem({ menuItemActiveId }) {
      this.menuItemActiveId = menuItemActiveId;
    },
  },
});
