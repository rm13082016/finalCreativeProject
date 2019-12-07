import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Student from "../views/Student.vue";
import Ta from "../views/Ta.vue";
import Admin from "../views/Admin.vue";
import About from "../views/About.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/student",
    name: "student",
    component: Student
  },
  {
    path: "/ta",
    name: "ta",
    component: Ta
  },
  {
    path: "/admin",
    name: "admin",
    component: Admin
  },
  {
    path: "/about",
    name: "about",
    component: About
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
