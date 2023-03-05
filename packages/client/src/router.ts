import { createRouter, createWebHistory } from "vue-router";

// View components
import Editor from "./views/Editor.vue";

// Router
const router = createRouter({
  history: createWebHistory(),
  routes: [{ path: "/", component: Editor }],
});

export default router;
