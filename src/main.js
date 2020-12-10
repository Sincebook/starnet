import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos'; // aos动画库
import Viewer from 'v-viewer'; // 点击放大图片
import 'viewerjs/dist/viewer.css';
import './assets/iconfont/iconfont.js'; // icon图标
import './assets/css/variable.less'; // 全局css变量
import './assets/css/media.less'; // 适配移动端css样式
import './assets/css/global.less'; // 全局样式
import 'aos/dist/aos.css'; // aos动画库样式
import * as filters from './assets/js/filter.js'; // 导入全局过滤器
import ElementUI from 'element-ui';
Vue.use(ElementUI);
Vue.config.roductionTip = false;
Vue.use(Viewer);
Viewer.setDefaults({
  Options: {
    inline: true,
    button: true,
    navbar: true,
    title: true,
    toolbar: true,
    tooltip: true,
    movable: true,
    zoomable: true,
    rotatable: true,
    scalable: true,
    transition: true,
    fullscreen: true,
    keyboard: true,
    url: 'data-source'
  }
});
AOS.init(); // aos动画初始化
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
Vue.prototype.$message = function (msg) {
  ElementUI.Message({
    ...msg,
    duration: 1000
  });
};
Vue.prototype.$message.error = function (msg) {
  return ElementUI.Message.error({
    message: msg,
    duration: 1000
  });
};
Vue.prototype.$message.warnning = function (msg) {
  return ElementUI.Message.error({
    message: msg,
    duration: 1000
  });
};
Vue.prototype.$message.success = function (msg) {
  return ElementUI.Message.success({
    message: msg,
    duration: 1000
  });
};
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  next();
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
