import Vue from 'vue';
import Vuex from 'vuex';
import {
  getSignBg
} from '../ajax/index.js';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    signBg: '' // 登录注册页面背景图
  },
  mutations: {
    test(state, test) {
      state.test = test;
    },
    signBg(state, signBg) {
      state.signBg = signBg;
    }
  },
  actions: {
    getSignBg({
      commit
    }) {
      getSignBg().then(res => {
        commit('signBg', res.data.login);
      }).catch(err => {
        return err;
      });
    }
  }
});
