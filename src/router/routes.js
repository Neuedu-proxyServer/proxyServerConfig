import Login from "@/pages/Login.vue"
import Home from '@/pages/Home.vue';
// import Config from "@/pages/Config/Config.vue"
export default [{
  path: "/",
  redirect: "/login",
  component: Login
}, {
  path: "/login",
  name: "login",
  component: Login
}, {
  path: "/home",
  name: "home",
  component: Home,
  // children: [{
  //   path: "config",
  //   name: "config",
  //   component: Config
  // }]
}]