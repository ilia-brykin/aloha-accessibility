import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

const ROUTES = [
  {
    path: "/404",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "NotFound" */ "../views/NotFound.vue"),
  },
  {
    path: "/",
    name: "PageStart",
    component: () => import(/* webpackChunkName: "PageFindSteps" */ "../views/PageStart/PageStart.vue"),
  },
  // {
  //   path: "/search/",
  //   name: "PageAdditionalSearch",
  //   component: () => import(/* webpackChunkName: "PageAdditionalSearch" */ "../views/PageAdditionalSearch/PageAdditionalSearch.vue"),
  // },
  // {
  //   path: "/test/",
  //   name: "PageTest",
  //   component: () => import(/* webpackChunkName: "PageTest" */ "../views/PageTest/PageTest.vue"),
  // },
  {
    path: "/headings/",
    name: "PageHeadings",
    component: () => import(/* webpackChunkName: "PageHeadings" */ "../views/PageHeadings/PageHeadings.vue"),
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
