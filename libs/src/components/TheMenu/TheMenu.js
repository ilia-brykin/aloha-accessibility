import ATranslation from "../ATranslation/ATranslation.vue";

export default {
  name: "TheMenu",
  components: {
    ATranslation,
  },
  props: {
    menuItems: {
      type: Array,
      required: true,
    },
    menuItemActiveId: {
      type: String,
      required: true,
    },
  },
  emits: [
    "change-menu-item",
  ],
  data() {
    return {

    };
  },
  methods: {
    changeMenuItem(menuItemActiveId) {
      this.$emit("change-menu-item", { menuItemActiveId });
    },
  },
};
