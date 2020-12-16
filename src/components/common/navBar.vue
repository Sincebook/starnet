<template>
  <div
    class="nav"
    :class="
      $route.path === '/home' ||
      $route.path === '/vip' ||
      $route.path === '/sign'
        ? 'newNav'
        : ''
    "
    v-if="$route.path !== '/bindPhone'"
  >
    <div class="left">
      <span><img :src="logoImg" alt="绘星" class="nav-icon" /></span>
      <router-link to="/home"><span>首页</span></router-link>
      <router-link to="/talent"><span>人才目录</span></router-link>
      <router-link to="/company"><span>公司目录</span></router-link>
      <router-link to="/job"><span>工作职位</span></router-link>
      <router-link to="/"><span>学院</span></router-link>
      <router-link to="/"><span>活动</span></router-link>
      <router-link to="/"><span>更多</span></router-link>
    </div>
    <div class="right">
      <div class="search bar1">
        <form>
          <input type="text" autocomplete="off" name="search" />
        </form>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-search"></use>
        </svg>
      </div>
      <router-link to="/vip"><span class="vip">VIP会员</span></router-link>
      <router-link to="/sign" v-if="!userHeader"
        ><span class="login">登录</span></router-link
      >
      <span class="header_part">
        <el-dropdown>
          <span class="el-dropdown-link">
            <router-link to="/personalcenter">
              <img
                class="login_header"
                :src="userHeader"
                v-if="userHeader"
                alt=""
              />
            </router-link>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/personalcenter">
              <el-dropdown-item>个人/企业中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item>帮助</el-dropdown-item>
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </span>
      <!-- <span v-if="userHeader">{{userName}}</span> -->
      <router-link to="/sign" v-if="!userHeader"
        ><span class="register">注册</span></router-link
      >
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { getMyinfo } from '@/ajax';
export default {
  name: 'NavBar',
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      userHeader: '',
      userName: ''
    };
  },
  created() {
    this.getMyLoginInfo();
  },
  methods: {
    getMyLoginInfo() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.userHeader = res.data.user.head;
          this.userName = res.data.user.name;
        }
        // console.log(res);
      });
    }
  }
};
</script>
<style lang='less' scoped>
a {
  color: #fff;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}

.newNav {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent !important;
}
.header_part {
  position: relative;
  right: -20px;
}
.login_header {
  width: 30px;
  height: 30px;
  border-radius: 50px;
  cursor: pointer;
}
.nav {
  min-width: 1280px;
  display: flex;
  height: 64px;
  font-size: 16px;
  background-color: rgb(51, 51, 51);
  color: #fff;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 5;
    justify-self: start;
    display: flex;
    align-items: center;
    span {
      padding: 0 25px;
    }
  }
  .right {
    flex: 3;
    justify-self: flex-end;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .icon {
      line-height: 64px;
      font-size: 30px;
      cursor: pointer;
    }
    .search {
      padding-right: 0;
      display: flex;
      .icon {
        margin-left: 10px;
      }
    }
    .bar1 input {
      height: 28px;
      line-height: 29px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.25);
      color: #fff;
    }
    form {
      position: relative;
      width: 200px;
      margin: 0 auto;
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 0 13px;
    }
    .vip {
      color: goldenrod;
    }
  }
}
.nav-icon {
  height: 25px;
}
</style>
