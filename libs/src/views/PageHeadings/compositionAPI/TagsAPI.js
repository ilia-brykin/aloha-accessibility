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
      name: "H1",
      color: "#ff0000",
      insertInParent: false,
    },
    {
      name: "H2",
      color: "#713939",
      insertInParent: false,
    },
    {
      name: "H3",
      color: "#00aa00",
      insertInParent: false,
    },
    {
      name: "H4",
      color: "#054164",
      insertInParent: false,
    },
    {
      name: "H5",
      color: "#7F0A7F",
      insertInParent: false,
    },
    {
      name: "H6",
      color: "#01D901",
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
