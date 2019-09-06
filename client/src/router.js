import Vue from "vue";
import Router from "vue-router";
import SignUp from "./views/SignUp.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "signup",
      component: SignUp
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/Login.vue")
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("./views/Profile.vue"),
      beforeEnter (to, from , next) {
        if (localStorage.getItem("jwt_token")) {
          next()
        } else {
          next("/");
        }
      }
    }
  ]
});
