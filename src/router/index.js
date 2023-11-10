import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Manage.vue"),
    redirect: "/login",
    children: [
      { path: "home", name: "Home", meta: { breadcrumb: "首页" }, component: () => import("../views/Home.vue"),},
      { path: "user", name: "User", meta: { breadcrumb: "用户管理" }, component: () => import("../views/User.vue"),},
    ],
  },
  { path: "/login", name: "login", component: () => import("../views/Login.vue"),},
  { path: "/register", name: "register", component: () => import("../views/Register.vue"),},
  { path: "/about", name: "about", component: () => import("../views/AboutView.vue"),},
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
