import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Company from '../views/Company.vue';
import Job from '../views/Job.vue';
import Sign from '../views/Sign.vue';
import Talent from '../views/Talent.vue';
import Vip from '../views/Vip.vue';
import BindPhone from '../views/BindPhone.vue';
import PersonalCenter from '../views/PersonalCenter.vue';
import CorporateCenter from '../views/CorporateCenter.vue';
import companyDetail from '../components/company/companyDetail/companyDetail.vue';
import jobDetail from '../components/job/jobDetail.vue';
import talentDetail from '../components/talent/talentDetail.vue';
import search from '../views/search.vue';
Vue.use(VueRouter);

const routes = [{
  path: '/',
  redirect: '/home'
}, {
  path: '/home',
  name: 'Home',
  component: Home,
  meta: {
    title: '绘星网'
  }
},
{
  path: '/about',
  name: 'About',
  component: About,
  meta: {
    title: '关于'
  }
},
{
  path: '/company',
  name: 'Company',
  component: Company,
  meta: {
    title: '公司目录'
  }
},
{
  path: '/job',
  name: 'Job',
  component: Job,
  meta: {
    title: '项目目录'
  }
},
{
  path: '/sign',
  name: 'Sign',
  component: Sign,
  meta: {
    title: '登录'
  }
},
{
  path: '/bindPhone',
  name: 'BindPhone',
  component: BindPhone,
  meta: {
    title: '绑定手机号'
  }
},
{
  path: '/talent',
  name: 'Talent',
  component: Talent,
  meta: {
    title: '人才目录'
  }
},
{
  path: '/vip',
  name: 'Vip',
  component: Vip,
  meta: {
    title: 'VIP'
  }
},
{
  path: '/personalcenter',
  name: 'PersonalCenter',
  component: PersonalCenter,
  meta: {
    title: '个人中心'
  }
},
{
  path: '/corporateCenter',
  name: 'CorporateCenter',
  component: CorporateCenter
},
{
  path: '/companyDetail/:id',
  name: 'companyDetail',
  component: companyDetail,
  meta: {
    title: '企业详情'
  }
},
{
  path: '/jobDetail/:id',
  name: 'jobDetail',
  component: jobDetail,
  meta: {
    title: '项目详情'
  }
},
{
  path: '/talentDetail/:id',
  name: 'talentDetail',
  component: talentDetail,
  meta: {
    title: '人才详情'
  }
},
{
  path: '/search',
  name: 'search',
  component: search,
  meta: {
    title: '搜索结果'
  }
}
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  routes
});

export default router;
