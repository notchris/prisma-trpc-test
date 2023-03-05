import { createApp } from "vue";
import "./assets/global.css";
import "./assets/style.css";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";

// Create application
createApp(App).use(router).use(store).mount("#app");
