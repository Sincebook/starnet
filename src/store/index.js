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
    }, // 用户登录后信息存放
    talentNav: [{
      id: 'desc',
      title: '个人简介',
      isHave: true
    }, {
      id: 'photo',
      title: '照片',
      isHave: false
    }, {
      id: 'video',
      title: '视频',
      isHave: false
    }, {
      id: 'audio',
      title: '音频',
      isHave: false
    }, {
      id: 'work',
      title: '工作经历',
      isHave: false
    }, {
      id: 'msg',
      title: '留言',
      isHave: true
    }], // 人才页面nav
    companyNav: [{
      id: 'desc',
      title: '公司简介',
      isHave: true
    }, {
      id: 'photo',
      title: '照片',
      isHave: false
    }, {
      id: 'video',
      title: '视频',
      isHave: false
    }, {
      id: 'audio',
      title: '音频',
      isHave: false
    }, {
      id: 'work',
      title: '企业荣誉',
      isHave: false
    }, {
      id: 'msg',
      title: '留言',
      isHave: true
    }] // 公司页面nav
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
    },
    talentNavPhoto(state, photo) {
      state.talentNav[1].isHave = photo;
    },
    talentNavVideo(state, video) {
      state.talentNav[2].isHave = video;
    },
    talentNavAudio(state, audio) {
      state.talentNav[3].isHave = audio;
    },
    talentNavWork(state, work) {
      state.talentNav[4].isHave = work;
    },
    companyNavPhoto(state, photo) {
      state.companyNav[1].isHave = photo;
    },
    companyNavVideo(state, video) {
      state.companyNav[2].isHave = video;
    },
    companyNavAudio(state, audio) {
      state.companyNav[3].isHave = audio;
    },
    companyNavWork(state, work) {
      state.companyNav[4].isHave = work;
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
