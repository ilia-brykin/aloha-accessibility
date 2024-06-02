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
      type: "tag",
    },
    {
      name: "OL",
      color: "#713939",
      insertInParent: true,
      type: "tag",
    },
    {
      name: "DL",
      color: "#00aa00",
      insertInParent: true,
      type: "tag",
    },
    {
      name: "LI",
      color: "#054164",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "DT",
      color: "#054164",
      insertInParent: false,
      type: "tag",
    },
    {
      name: "DD",
      color: "#054164",
      insertInParent: false,
      type: "tag",
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
