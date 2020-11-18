<template>
  <div
    class="nav"
    :class="$route.path === '/home' || $route.path === '/vip' ? 'newNav' : ''"
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
      <router-link to="/sign"><span class="login">登录</span></router-link>
      <router-link to="/sign"><span class="register">注册</span></router-link>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'NavBar',
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png'
    };
  }
};
</script>
<style lang='less'>
a {
  color: #fff;
}
.newNav {
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  background-color: transparent !important;
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
