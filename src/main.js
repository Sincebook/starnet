import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import AOS from 'aos'; // aos动画库
import Viewer from 'v-viewer';// 点击放大图片
import 'viewerjs/dist/viewer.css';
import './assets/iconfont/iconfont.js'; // icon图标
import './assets/css/variable.less'; // 全局css变量
import './assets/css/media.less'; // 适配移动端css样式
import './assets/css/global.less'; // 全局样式
import 'aos/dist/aos.css'; // aos动画库样式
import * as filters from './assets/js/filter.js'; // 导入全局过滤器
import {
  Upload,
  Message,
  Select,
  Option,
  Input,
  Cascader,
  DatePicker,
  Form,
  FormItem,
  Button,
  Divider,
  Pagination,
  Dialog,
  Tabs,
  TabPane,
  Alert,
  Link,
  Image
} from 'element-ui';
Vue.config.roductionTip = false;
<<<<<<< HEAD
Vue.use(Upload);
Vue.use(Select);
Vue.use(Input);
Vue.use(Option);
Vue.use(Cascader);
Vue.use(DatePicker);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Button);
Vue.use(Divider);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Alert);
Vue.use(Link);
Vue.use(Image);
Vue.prototype.$message = Message;
=======
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
>>>>>>> 7c01dea063783d1d77eecb81a7458664fd22601a
AOS.init(); // aos动画初始化
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
