import Vue from "vue";
import Vuex from "vuex";
import {
  reqUserLogin,
  reqUserLogout
} from '../api/index.js';
import {
  setToken,
  getToken,
  removeToken
} from '../utils/token';
Vue.use(Vuex);
const actions = {
  async userLogin({
    commit
  }, password) {
    let res = await reqUserLogin(password)
    if (res.code == 200) {
      //拿token
      commit('USERLOGIN', res.data.token)
      setToken(res.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error("登入失败"))
    }
  },
  async userLogout({
    commit
  }) {
    let res = await reqUserLogout()
    if (res.code == 200) {
      commit('USERLOGOUT')
      return 'ok'
    } else {
      return Promise.reject('退出失败')
    }
  }
}
const mutations = {
  USERLOGIN(state, token) {
    state.token = token
  },
  USERLOGOUT(state) {
    state.token = ''
    removeToken()
  },

}
const state = {
  token: getToken()
}
const getters = {};
export default new Vuex.Store({
  state,
  actions,
  mutations,
  getters
});