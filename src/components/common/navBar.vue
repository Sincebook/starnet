<template>
  <div
    id="nav"
    :class="$route.path === '/home' || $route.path === '/vip' ? 'newNav' : ''"
    class="nav"
    v-if="
      $route.path !== '/bindPhone' &&
      $route.path !== '/bindWbPhone' &&
      $route.path !== '/sign'&&
      $route.path !== '/login'
    "
  >
    <div class="left">
      <router-link to="/home"
        ><img :src="logoImg" alt="绘星" class="nav-icon"
      /></router-link>
      <span>
        <router-link v-if='this.$route.path == "/home"' class="homeIcon" to="/home">首页</router-link>
         <router-link v-if='this.$route.path != "/home"'  to="/home">首页</router-link>
      </span>
      <span>
        <router-link to="/talent" v-if='this.$route.path == "/talent"' class="homeIcon">人才目录</router-link>
        <router-link to="/talent" v-if='this.$route.path != "/talent"'>人才目录</router-link>
      </span>
      <span>
        <router-link to="/company" v-if='this.$route.path == "/company"' class="homeIcon">公司目录</router-link>
        <router-link to="/company" v-if='this.$route.path != "/company"'>公司目录</router-link>
      </span>
      <span>
        <router-link to="/job" v-if='this.$route.path == "/job"' class="homeIcon">工作职位</router-link>
        <router-link to="/job" v-if='this.$route.path != "/job"' >工作职位</router-link>
       </span>
      <span><router-link to="/">学院</router-link></span>
      <span><router-link to="/">活动</router-link></span>
      <span><router-link to="/">更多</router-link></span>
    </div>
    <div class="right">
      <router-link to="/vip">
        <svg t="1616574064806" class="icon" viewBox="0 0 1365 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="22239" width="200" height="200"><path d="M1198.08 812.373333l88.746667-372.053333h3.413333c40.96 0 75.093333-34.133333 75.093333-78.506667 0-44.373333-34.133333-78.506667-75.093333-78.506666-40.96 0-75.093333 34.133333-75.093333 78.506666 0 23.893333 10.24 44.373333 23.893333 58.026667l-276.48 112.64-252.586667-378.88c27.306667-10.24 47.786667-40.96 47.786667-75.093333C757.76 34.133333 723.626667 0 682.666667 0c-40.96 0-75.093333 34.133333-75.093334 78.506667 0 34.133333 20.48 61.44 47.786667 75.093333L409.6 532.48l-279.893333-119.466667c10.24-13.653333 17.066667-30.72 17.066666-51.2 0-44.373333-34.133333-78.506667-75.093333-78.506666C34.133333 283.306667 0 317.44 0 361.813333 0 406.186667 34.133333 443.733333 75.093333 443.733333c6.826667 0 13.653333 0 20.48-3.413333l88.746667 372.053333 40.96 167.253334H1160.533333l37.546667-167.253334z" fill="#c19c5e" p-id="22240"></path><path d="M648.533333 593.92l-109.226666 314.026667h-75.093334l-109.226666-314.026667h71.68l68.266666 221.866667c3.413333 10.24 6.826667 20.48 6.826667 30.72 0-10.24 3.413333-20.48 6.826667-30.72l68.266666-221.866667H648.533333zM750.933333 593.92v314.026667h-68.266666v-314.026667h68.266666zM890.88 798.72v109.226667h-68.266667v-314.026667h109.226667c78.506667 0 116.053333 34.133333 116.053333 98.986667 0 30.72-10.24 58.026667-34.133333 78.506666-23.893333 20.48-54.613333 27.306667-88.746667 27.306667h-34.133333z m0-153.6v102.4h30.72c40.96 0 58.026667-17.066667 58.026667-51.2s-20.48-51.2-58.026667-51.2h-30.72z" fill="#FFFFFF" p-id="22241"></path></svg>
      </router-link>
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
      <router-link v-if="!$store.state.isLogin" to="/sign"
        ><span class="login">登录</span></router-link
      >
      <router-link v-if="!$store.state.isLogin" to="/login"
        ><span class="register">注册</span></router-link
      >
      <div class="header_part" v-else>
       <router-link  :to="
                $store.state.userinfo.user.type > 3
                  ? '/corporateCenter'
                  : '/personalcenter'
              " class="news" >
        <div v-if="status == 0">
          <svg  t="1616556207812" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2294"><path d="M893.056 502.016v281.92h-73.728V502.016c0-188.032-140.992-339.2-311.552-339.2-172.544 0-311.488 153.6-311.488 339.2v281.92H122.56V502.016c0-217.792 157.888-398.848 353.728-414.912V38.976C476.224 16 493.12 0 512.064 0c20.992 0 35.776 18.304 35.776 38.976v48.128c191.552 22.912 345.216 199.424 345.216 414.912z m84.224 323.2c0 22.912-16.896 41.216-37.888 41.216H69.952c-21.056 0-37.888-18.304-37.888-41.216 0-22.912 16.832-41.28 37.888-41.28h869.376c21.12 0 37.888 18.368 37.888 41.28h0.064z m-345.344 41.216c-6.016 43.776-53.76 80.96-107.52 80.96s-99.584-34.944-107.52-80.896h-69.76C353.024 953.92 430.656 1024 524.288 1024c93.568 0 171.264-70.016 177.28-157.568h-69.76z" fill="#515151" p-id="2295"></path></svg>
        </div>
        <div v-else>
          <svg t="1616556207812" class="icon1" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2294"><path d="M893.056 502.016v281.92h-73.728V502.016c0-188.032-140.992-339.2-311.552-339.2-172.544 0-311.488 153.6-311.488 339.2v281.92H122.56V502.016c0-217.792 157.888-398.848 353.728-414.912V38.976C476.224 16 493.12 0 512.064 0c20.992 0 35.776 18.304 35.776 38.976v48.128c191.552 22.912 345.216 199.424 345.216 414.912z m84.224 323.2c0 22.912-16.896 41.216-37.888 41.216H69.952c-21.056 0-37.888-18.304-37.888-41.216 0-22.912 16.832-41.28 37.888-41.28h869.376c21.12 0 37.888 18.368 37.888 41.28h0.064z m-345.344 41.216c-6.016 43.776-53.76 80.96-107.52 80.96s-99.584-34.944-107.52-80.896h-69.76C353.024 953.92 430.656 1024 524.288 1024c93.568 0 171.264-70.016 177.28-157.568h-69.76z" fill="#515151" p-id="2295"></path></svg>
          <svg t="1615811266498" class="icon2" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2227" width="10" height="10"><path d="M512 512m-286.423125 0a286.423125 286.423125 0 1 0 572.84718751 0 286.423125 286.423125 0 1 0-572.84718751 0Z" fill="#f43530" p-id="2228"></path></svg>
        </div>
       </router-link>
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
import { getMyinfo, getOutLogin, isNews } from '@/ajax';
export default {
  name: 'NavBar',
  data() {
    return {
      status: 0,
      logoImg: '//ftp.qnets.cn/since/logo.png',
      isSearch: false,
      i: 0
    };
  },
  created() {
    this.getMyLoginInfo();
    this.getRout();
  },
  mounted() {
    window.addEventListener('scroll', this.handleScorll, true);
    this.haveNews();
  },
  methods: {
    haveNews() {
      isNews().then(res => {
        if (res.data === 1) {
          this.status = 1;
          console.log('有新消息' + this.status);
        } else {
          this.status = 0;
          console.log('没有新消息' + this.status);
        }
      });
    },
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
    getRout() {
      if (this.$route.path === '/home') {
        document.getElementById('homeIcon').style.color = '#fff';
      };
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
    .news {
      float: left;
      padding-top: 8px;
      padding-right: 50px;
      .icon1 {
        width: 23px;
        height: 23px;
      }
    }
    .vip1 {
      color: goldenrod;
      padding-right: 40px;
      padding-top: 8px;
    }
    .login_header {
      width: 35px;
      height: 35px;
      cursor: pointer;
    }
    /deep/.el-avatar > img {
      width: 100%;
      height: 100%s;
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
.homeIcon {
  color: #fff
}
</style>
