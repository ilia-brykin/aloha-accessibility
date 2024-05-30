import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

import NotFound from "../views/NotFound.vue";
import PageStart from "../views/PageStart/PageStart.vue";
import PageHeadings from "../views/PageHeadings/PageHeadings.vue";
import PageLists from "../views/PageLists/PageLists.vue";

const ROUTES = [
  {
    path: "/404",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/",
    name: "PageStart",
    component: PageStart,
  },
  {
    path: "/headings/",
    name: "PageHeadings",
    component: PageHeadings,
  },
  {
    path: "/lists/",
    name: "PageLists",
    component: PageLists,
  },
  {
    // If the routing configuration '*' reports an error, replace it with '/: catchAll(. *)'
    // caught Error: Catch all routes ("*") must now be defined using a param with a custom regexp
    path: "/:catchAll(.*)", // Special attention should be paid to the bottom
    redirect: "/404",
  }
];

const ROUTER = createRouter({
  history: createWebHashHistory(),
  routes: ROUTES,
});

export default ROUTER;
