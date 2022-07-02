import Vue from "vue";
import App from "./App.vue";
import {
  router
} from './router/index';
import store from '@/store/index.js';
import Antd from 'ant-design-vue';
import ElementUI from 'element-ui';
import Vant from 'vant';
import 'vant/lib/index.css';
import 'element-ui/lib/theme-chalk/index.css';
import 'ant-design-vue/dist/antd.css';
import '../static/common.less';
import '../static/base.css';
Vue.use(Antd);
Vue.use(ElementUI);
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");