import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index";
import { createPinia } from "pinia";
import piniaPlugins from "pinia-plugin-persistedstate";
import "./mock/role";
createApp(App).use(router).use(createPinia().use(piniaPlugins)).mount("#app");
