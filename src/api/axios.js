import axios from 'axios';
import store from '../store/index';
// //引入进度条
import nprogress from 'nprogress';
//引入相关进度条的样式
import "nprogress/nprogress.css";
import qs from 'qs';
let requests = axios.create({
  //基础路径,发请求URL携带api【发现:真实服务器接口都携带/api】
  // baseURL: "",
  //超时的设置
  timeout: 20000
});
//请求拦截器，请求前做一些配置，事情
requests.interceptors.request.use(config => {
  config.headers["Content-Type"] = "application/x-www-form-urlencoded"
  config.data = qs.stringify(config.data)
  nprogress.start();
  //token[公共参数]
  if (store.state.token) {
    config.headers.token = store.state.token;
  }
  config
  return config;
})
//响应拦截器，后端响应后做一些事情
requests.interceptors.response.use((res) => {
  nprogress.done();
  return res; //res.data
}, (err) => {
  //温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
  alert(err.message);
  //终止Promise链
  return Promise.reject("请求失败");
});

export default requests