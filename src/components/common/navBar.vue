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
          <input
            type="text"
            autocomplete="off"
            name="search"
            @keydown.prevent.enter="enterSearch"
          />
        </form>
        <svg class="icon" aria-hidden="true" @click="search">
          <use xlink:href="#icon-search"></use>
        </svg>
      </div>
      <router-link to="/vip"><span class="vip">VIP会员</span></router-link>
      <router-link to="/sign" v-if="!userHeader"
        ><span class="login">登录</span></router-link
      >
      <span class="header_part" v-if="userHeader">
        <el-dropdown>
          <span class="el-dropdown-link">
            <router-link to="this.type > 3 ? '/corporateCenter' : '/personalcenter'">
              <img
                class="login_header"
                :src="userHeader"
                v-if="userHeader"
                alt=""
              />
            </router-link>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link
              :to="this.type > 3 ? '/corporateCenter' : '/personalcenter'"
            >
              <el-dropdown-item>{{
                this.type > 3 ? "企业中心" : "个人中心"
              }}</el-dropdown-item>
            </router-link>
            <router-link to="/protocol/useIt">
              <el-dropdown-item>帮助</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="getOut">退出登录</el-dropdown-item>
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
import { getMyinfo, getOutLogin } from '@/ajax';
export default {
  name: 'NavBar',
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      userHeader: '',
      userName: '',
      type: '',
      isSearch: false
    };
  },
  created() {
    this.getMyLoginInfo();
  },
  mounted() {
    if (!this.userHeader) {
      this.getMyLoginInfo();
    }
  },
  methods: {
    getMyLoginInfo() {
      // console.log('hhhh');
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('isLogin', true);
          this.userHeader = res.data.user.head;
          this.userName = res.data.user.name;
          this.type = res.data.user.type;
        }
        // console.log(res);
      });
    },
    search(e) {
      let target = e.target;
      // console.log(target.parentNode);
      let value = target.parentNode.firstChild.firstChild.value;
      if (value !== '') {
        // console.log(value === '');
        this.isSearch = true;
        this.$router.replace({ name: 'search', query: { value: value } }, onComplete => { },
          onAbort => { });
        target.parentNode.firstChild.firstChild.value = '';
      }
    },
    enterSearch(e) {
      // console.log(e.target.value);
      this.$router.replace({ name: 'search', query: { value: e.target.value } }, onComplete => { },
        onAbort => { });
      e.target.value = '';
    },
    getOut() {
      console.log('getout');
      getOutLogin().then(res => {
        console.log(res);
        if (res.code === '0') {
          this.$store.commit('isLogin', false);
          this.$message({
            message: '已退出登录',
            type: 'success'
          });
          this.userHeader = '';
        }
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
