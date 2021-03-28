import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Company from '../views/Company.vue';
import Job from '../views/Job.vue';
import Sign from '../views/Sign.vue';
import Email from '../views/Email.vue';
import Talent from '../views/Talent.vue';
import Vip from '../views/Vip.vue';
import BindPhone from '../views/BindPhone.vue';
import BindWbPhone from '../views/BindWbPhone.vue';
import PersonalCenter from '../views/PersonalCenter.vue';
import PersonalNews from '../views/PersonalNews.vue';
import CorporateCenter from '../views/CorporateCenter.vue';
import CorporateNews from '../views/CorporateNews.vue';
import companyDetail from '../components/company/companyDetail.vue';
import jobDetail from '../components/job/jobDetail.vue';
import talentDetail from '../components/talent/talentDetail.vue';
import search from '../views/search.vue';
import Login from '../views/Login.vue';
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
    path: '/email',
    name: 'email',
    component: Email,
    meta: {
      title: '邮箱登录'
    }

  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '注册'
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
    path: '/bindWbPhone',
    name: 'BindWbPhone',
    component: BindWbPhone,
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
    path: '/personalnews',
    name: 'PersonalNews',
    component: PersonalNews
  },
  {
    path: '/corporateCenter',
    name: 'CorporateCenter',
    component: CorporateCenter
  },
  {
    path: '/corporateNews',
    name: 'CorporateNews',
    component: CorporateNews
  },
  {
    path: '/companyDetail/:id/:userid',
    name: 'companyDetail',
    component: companyDetail,
    meta: {
      title: '企业详情'
    }
  },
  {
    path: '/jobDetail/:id/:userid',
    name: 'jobDetail',
    component: jobDetail,
    meta: {
      title: '项目详情'
    }
  },
  {
    path: '/talentDetail/:id/:userid',
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
  },
  {
    path: '/protocol',
    name: 'protocol',
    component: () => import('../components/protocol/index.vue'),
    meta: {
      title: '关于'
    },
    redirect: '/protocol/about',
    children: [{
        path: '/protocol/about',
        name: 'protocolAbout',
        component: () => import('../components/protocol/about.vue')
      },
      {
        path: '/protocol/useIt',
        name: 'protocolUseIt',
        meta: {
          title: '使用帮助'
        },
        component: () => import('../components/protocol/useIt.vue')
      },
      {
        path: '/protocol/userProtocol',
        name: 'userProtocol',
        meta: {
          title: '用户协议'
        },
        component: () => import('../components/protocol/userProtocol.vue')
      },
      {
        path: '/protocol/security',
        name: 'security',
        meta: {
          title: '信任与安全'
        },
        component: () => import('../components/protocol/security.vue')
      },
      {
        path: '/protocol/privacy',
        name: 'privacy',
        meta: {
          title: '隐私条款'
        },
        component: () => import('../components/protocol/privacy.vue')
      },
      {
        path: '/protocol/joinUs',
        name: 'joinUs',
        meta: {
          title: '加入我们'
        },
        component: () => import('../components/protocol/joinUs.vue')
      }
    ]
  }
];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  routes
});
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
});
export default router;
