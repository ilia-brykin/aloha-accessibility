import {
  computed,
  toRef,
} from "vue";

export default function StylesAPI(props) {
  const header = toRef(props, "header");

  const stylesLocal = computed(() => {
    return {
      paddingLeft: `${ (header.value.level - 1) * 10 }px`,
    };
  });

  return {
    stylesLocal,
  };
}
