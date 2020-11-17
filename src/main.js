import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos'; // aos动画库
import './assets/iconfont/iconfont.js'; // icon图标
import './assets/css/variable.less'; // 全局css变量
import './assets/css/media.less'; // 适配移动端css样式
import './assets/css/global.less'; // 全局样式
import 'aos/dist/aos.css'; // aos动画库样式
Vue.config.roductionTip = false;

AOS.init(); // aos动画初始化

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
