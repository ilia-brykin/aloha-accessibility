import {
  computed,
  ref,
} from "vue";

import {
  filter,
} from "lodash-es";

export default function TagsAPI() {
  const modelTags = ref([]);
  const tags = [
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

  const tagsWithModel = computed(() => {
    if (!modelTags.value.length) {
      return [];
    }

    return filter(tags, tag => {
      return modelTags.value.indexOf(tag.name) !== -1;
    });
  });

  return {
    modelTags,
    tags,
    tagsWithModel,
  };
}
