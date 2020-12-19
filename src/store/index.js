import Vue from 'vue';
import Vuex from 'vuex';
import {
  getSignBg
} from '../ajax/index.js';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    signBg: '', // 登录注册页面背景图
    isLogin: false // 是否登录的标识
  },
  mutations: {
    test(state, test) {
      state.test = test;
    },
    signBg(state, signBg) {
      state.signBg = signBg;
    },
    isLogin(state, flag) {
      state.isLogin = flag;
    }
  },
  actions: {
    getSignBg({
      commit
    }) {
      getSignBg().then(res => {
        commit('signBg', '//cn.bing.com' + res.images[0].url);
      }).catch(err => {
        return err;
      });
    }
  }
});
