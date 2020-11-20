import Vue from 'vue';
import Vuex from 'vuex';
import {
  getOtherInfo,
  getSignBg
} from '../ajax/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: {}, // 测试
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
    getTest({
      commit
    }) {
      getOtherInfo().then(res => {
        commit('test', res);
        console.log(res);
      });
    },
    getSignBg({
      commit
    }) {
      getSignBg().then(res => {
        commit('signBg', '//cn.bing.com' + res.images[0].url);
      }).catch(err => {
        console.log(err);
      });
    }
  }
});
