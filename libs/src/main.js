import App from "./App/App.vue";
import { createApp } from "vue";

const APP = createApp(App);
APP.config.unwrapInjectedRef = true;
APP.mount("#app");
