import {
  computed,
  ref,
} from "vue";

export default function ToggleAPI() {
  const isAdditionalInfoVisible = ref(false);

  const toggleAdditionalInfo = () => {
    isAdditionalInfoVisible.value = !isAdditionalInfoVisible.value;
  };

  const textButtonAdditionalInfoVisible = computed(() => {
    return isAdditionalInfoVisible.value ?
      "_BTN_HIDE_ADDITIONAL_INFO_" :
      "_BTN_SHOW_ADDITIONAL_INFO_";
  });

  return {
    isAdditionalInfoVisible,
    textButtonAdditionalInfoVisible,
    toggleAdditionalInfo,
  };
}
