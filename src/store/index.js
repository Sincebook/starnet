import Vue from 'vue';
import Vuex from 'vuex';
import {
  getOtherInfo,
  getSignBg,
  mineInfo
} from '../ajax/index.js';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    test: {}, // 测试
    signBg: '', // 登录注册页面背景图
    userInfo: [] // 用户个人信息Card
  },
  mutations: {
    test(state, test) {
      state.test = test;
    },
    signBg(state, signBg) {
      state.signBg = signBg;
    },
    mineInfo(state, userInfo) {
      state.userInfo = userInfo;
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
    },
    getMineInfo({
      commit
    }) {
      mineInfo().then(res => {
        commit('mineInfo', res);
      }).catch(err => {
        console.log(err);
      });
    }
  }
});
