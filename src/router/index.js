import Vue from 'vue';
import VueRouter from 'vue-router';
import Test from '../views/Test.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Company from '../views/Company.vue';
import Job from '../views/Job.vue';
import Sign from '../views/Sign.vue';
import Talent from '../views/Talent.vue';
import Vip from '../views/Vip.vue';
import companyDetail from '../components/company/companyDetail/companyDetail.vue';
import jobDetail from '../components/job/jobDetail.vue';
import talentDetail from '../components/talent/talentDetail.vue';

Vue.use(VueRouter);

const routes = [{
    path: '/',
    name: 'Test',
    component: Test
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/company',
    name: 'Company',
    component: Company
  },
  {
    path: '/job',
    name: 'Job',
    component: Job
  },
  {
    path: '/sign',
    name: 'Sign',
    component: Sign
  },
  {
    path: '/talent',
    name: 'Talent',
    component: Talent
  },
  {
    path: '/vip',
    name: 'Vip',
    component: Vip
  }, {
    path: '/companyDetail/:id',
    name: 'companyDetail',
    component: companyDetail
  },
  {
    path: '/jobDetail/:id',
    name: 'jobDetail',
    component: jobDetail
  },
  {
    path: '/talentDetail/:id',
    name: 'talentDetail',
    component: talentDetail
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
  // }
];

const router = new VueRouter({
  routes
});

export default router;
