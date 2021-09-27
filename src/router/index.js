import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import AddEmps from "../views/AddEmps.vue";
import EditEmps from "../views/EditEmps.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/add",
    name: "AddEmps",
    component: AddEmps,
  },
  {
    path: "/edit/:id",
    name: "EditEmps",
    component: EditEmps,
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
