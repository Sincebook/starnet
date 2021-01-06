import Vue from 'vue';
import Vuex from 'vuex';
import {
  getSignBg
} from '../ajax/index.js';
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    signBg: '', // 登录注册页面背景图
    isLogin: false, // 是否登录的标识
    userinfo: {
      user: {
        head: null,
        name: null,
        status: 1,
        phone: '',
        funs: 0
      },
      collectNum: 0,
      likeNum: 0
    } // 用户登录后信息存放
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
    },
    userinfo(state, userinfo) {
      state.userinfo = userinfo;
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
