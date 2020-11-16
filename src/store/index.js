import Vue from 'vue';
import Vuex from 'vuex';
import {
  getOtherInfo
} from '../ajax/index.js';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    test: {} // 测试
  },
  mutations: {
    test(state, test) {
      state.test = test;
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
    }
  }
});
