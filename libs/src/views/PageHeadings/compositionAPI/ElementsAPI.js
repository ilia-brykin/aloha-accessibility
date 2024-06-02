import {
  computed,
  ref,
} from "vue";

import {
  filter,
} from "lodash-es";

export default function ElementsAPI() {
  const model = ref({
    tags: [],
    roleHeading: [],
  });
  const tags = [
    {
      name: "H1",
      color: "#ff0000",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "H2",
      color: "#713939",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "H3",
      color: "#00aa00",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "H4",
      color: "#054164",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "H5",
      color: "#7F0A7F",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "H6",
      color: "#01D901",
      insertInParent: false,
      type: "tag",
    },
  ];

  const elementsRoleHeading = [
    {
      name: "role: heading, aria-level: 1",
      color: "#ff0000",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="1"]`,
    },
    {
      name: "role: heading, aria-level: 2",
      color: "#713939",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="2"]`,
    },
    {
      name: "role: heading, aria-level: 3",
      color: "#00aa00",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="3"]`,
    },
    {
      name: "role: heading, aria-level: 4",
      color: "#054164",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="4"]`,
    },
    {
      name: "role: heading, aria-level: 5",
      color: "#7F0A7F",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="5"]`,
    },
    {
      name: "role: heading, aria-level: 6",
      color: "#01D901",
      insertInParent: false,
      type: "attribute",
      selector: `[role="heading"][aria-level="6"]`,
    },
  ];

  const tagsWithModel = computed(() => {
    if (!model.value.tags.length) {
      return [];
    }

    return filter(tags, tag => {
      return model.value.tags.indexOf(tag.name) !== -1;
    });
  });

  const elementsRoleHeadingWithModel = computed(() => {
    if (!model.value.roleHeading.length) {
      return [];
    }

    return filter(elementsRoleHeading, element => {
      return model.value.roleHeading.indexOf(element.name) !== -1;
    });
  });

  const elementsWithModel = computed(() => {
    return [
      ...tagsWithModel.value,
      ...elementsRoleHeadingWithModel.value,
    ];
  });

  return {
    elementsRoleHeading,
    elementsWithModel,
    model,
    tags,
  };
}
