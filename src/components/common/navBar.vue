<template>
  <div
    id="nav"
    :class="$route.path === '/home' || $route.path === '/vip' ? 'newNav' : ''"
    class="nav"
    v-if="
      $route.path !== '/bindPhone' &&
      $route.path !== '/bindWbPhone' &&
      $route.path !== '/sign'
    "
  >
    <div class="left">
      <router-link to="/home"
        ><img :src="logoImg" alt="绘星" class="nav-icon"
      /></router-link>
      <span><router-link to="/home">首页</router-link></span>
      <span><router-link to="/talent">人才目录</router-link></span>
      <span><router-link to="/company">公司目录</router-link></span>
      <span><router-link to="/job">工作职位</router-link></span>
      <span><router-link to="/">学院</router-link></span>
      <span><router-link to="/">活动</router-link></span>
      <span><router-link to="/">更多</router-link></span>
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
      <router-link v-if="!$store.state.isLogin" to="/sign"
        ><span class="login">登录</span></router-link
      >
      <router-link v-if="!$store.state.isLogin" to="/sign"
        ><span class="register">注册</span></router-link
      >
      <div class="header_part" v-else>
        <el-dropdown>
          <span class="el-dropdown-link">
            <router-link
              :to="
                $store.state.userinfo.user.type > 3
                  ? '/corporateCenter'
                  : '/personalcenter'
              "
            >
              <el-avatar
                class="login_header"
                :src="$store.state.userinfo.user.head"
                fit="cover"
                ><img
                  src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
              /></el-avatar>
            </router-link>
          </span>
          <el-dropdown-menu slot="dropdown">
            <router-link
              :to="
                $store.state.userinfo.user.type > 3
                  ? '/corporateCenter'
                  : '/personalcenter'
              "
            >
              <el-dropdown-item>{{
                $store.state.userinfo.user.type > 3 ? "企业中心" : "个人中心"
              }}</el-dropdown-item>
            </router-link>
            <router-link to="/protocol/useIt">
              <el-dropdown-item>帮助</el-dropdown-item>
            </router-link>
            <el-dropdown-item @click.native="getOut">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
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
      isSearch: false,
      i: 0
    };
  },
  created() {
    this.getMyLoginInfo();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScorll, true);
  },
  methods: {
    getMyLoginInfo() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('isLogin', true);
          this.$store.commit('userinfo', res.data);
        }
      }).catch(err => {
        return err;
      });
    },
    search(e) {
      let target = e.target;
      let value = target.parentNode.firstChild.firstChild.value;
      if (value !== '') {
        this.isSearch = true;
        this.$router.replace({ name: 'search', query: { value: value } }, onComplete => { },
          onAbort => { });
        target.parentNode.firstChild.firstChild.value = '';
      }
    },
    enterSearch(e) {
      this.$router.replace({ name: 'search', query: { value: e.target.value } }, onComplete => { },
        onAbort => { });
      e.target.value = '';
    },
    getOut() {
      getOutLogin().then(res => {
        if (res.code === '0') {
          this.$message({
            message: '已退出登录',
            type: 'success'
          });
          this.$router.push('/home');
          this.$store.commit('isLogin', false);
          this.$store.commit('userinfo', {});
        }
      });
    },
    // 滚动事件
    handleScorll() {
      // 页面滚动距顶部距离
      let ele = document.getElementById('nav');
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop ||
        document.body.scrollTop;
      let scroll = scrollTop - this.i;
      this.i = scrollTop;
      if (scrollTop > 300) {
        if (scroll < 0) {
          ele.classList.remove('downNav', 'newNav');
          ele.classList.add('upNav', 'transtion');
        } else {
          ele.classList.remove('upNav', 'newNav');
          if (this.$route.path === '/home' || this.$route.path === '/vip') {
            ele.classList.add('downNav');
          } else {
            ele.classList.add('downNav', 'transtion');
          }
        }
      } else {
        ele.classList.remove('upNav', 'downNav', 'transtion');
        if (this.$route.path === '/home' || this.$route.path === '/vip') {
          ele.classList.add('newNav');
        }
      }
    }
  }
};
</script>
<style lang='less' scoped>
a {
  color: rgba(255, 255, 255, 0.75);
  transition: color 0.25s;
  &:hover {
    color: #fff;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.upNav {
  transform: translateY(0px);
}
.downNav {
  transform: translateY(-64px);
}
.transtion {
  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1),
    -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);
}
.nav {
  position: sticky;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  min-width: 1280px;
  height: 64px;
  font-size: 16px;
  background-color: rgb(51, 51, 51);
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    flex: 5;
    justify-self: start;
    display: flex;
    height: 30px;
    align-items: center;
    span {
      margin: 0 25px;
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
    .login_header {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
    /deep/.el-avatar > img {
      width: 35px;
      height: 35px;
    }
  }
}
.newNav {
  position: absolute;
  top: 0;
  background: rgba(0, 0, 0, 0);
}
.nav-icon {
  overflow: hidden;
  height: 55px;
}
</style>
