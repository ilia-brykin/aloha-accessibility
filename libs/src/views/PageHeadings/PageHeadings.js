import ATranslation from "aloha-vue/src/ATranslation/ATranslation";
import AElement from "aloha-vue/src/AElement/AElement";

import EventsAPI from "./compositionAPI/EventsAPI";

export default {
  name: "ViewHeadings",
  components: {
    AElement,
    ATranslation,
  },
  setup() {
    const {
      checkHeadings,
      textForBtnToggleHeadings,
      toggleHeadings,
    } = EventsAPI();

    return {
      checkHeadings,
      textForBtnToggleHeadings,
      toggleHeadings,
    };
  },
  data() {
    return {
      links: [
        {
          href: "https://www.w3.org/WAI/WCAG21/Techniques/html/H42",
          label: "WCAG21 H42",
          title: "Using h1-h6 to identify headings",
        },
        {
          href: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
          label: "WCAG21 1.3.1",
          title: "Success Criterion 1.3.1: Info and Relationships",
        },
        {
          href: "https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html",
          label: "BITV 9.1.3.1a",
          title: "Barrierefreie-Informationstechnik-Verordnung. Prüfschritt 9.1.3.1a",
        },
      ],
    };
  },
};
