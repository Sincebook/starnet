<template>
  <div v-if="$route.path !== '/sign' && $route.path !== '/bindPhone' && $route.path !== '/bindWbPhone' && $route.path !== '/login'  && $route.path !== '/email'">
    <div class="footer-nav">
      <div>
        <p>
          <img
            src="//ftp.qnets.cn/since/logo.png"
            alt="绘星"
            class="nav-icon"
          />
        </p>
        <p>年轻的力量</p>
        <p>专注于传媒招聘</p>
        <p style="margin: 10px 0">扫一扫，关注我们</p>
        <p>
          <img
            src="//ftp.qnets.cn/since/since.jpg"
            alt=""
            width="100px"
            height="100px"
          />
        </p>
      </div>
      <div class="left">
        <p class="title">关于</p>
        <router-link to="/protocol/about">
        <p style="color:#fff;">关于我们</p></router-link>
        <router-link to="/protocol/useIt"><p style="color:#fff;">用法指南</p></router-link>
        <router-link to="/protocol/joinUs"> <p style="color:#fff;">加入我们</p></router-link>
        <router-link to="/protocol/userProtocol"><p style="colosr:#fff;">用户协议</p></router-link>
      </div>
      <div class="center">
        <p class="title">使用帮助</p>
        <router-link to="/protocol/privacy"><p style="color:#fff;">隐私条款</p></router-link>
        <router-link to="/protocol/security"><p style="color:#fff;">信任与安全</p></router-link>
        <p style="color:#fff;">社区</p>
        <p style="color:#fff;">更多</p>
      </div>
      <div class="right">
        <p class="title">联系我们</p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianhua"></use>
          </svg>
          +0777-1233333
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjian"></use>
          </svg>
          xinghui@163.com
        </p>
        <p>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-weizhi"></use>
          </svg>
          杭州市西湖路3栋75号
        </p>
      </div>
    </div>
    <div class="footer-fixed">
      <div style="width:1180px;padding:10px">
          <a>Copyright © 2020.杭州绘星网络科技有限公司 All rights reserved.</a>
        <ul style="float:right">
						<i class="sprite bg2"></i>
						<a style="color:white" href="http://www.beian.miit.gov.cn">豫ICP备18010577号</a>
				</ul>
      </div>
      <!-- <p>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-diqiu_jiantou_earth_arrow"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-ie"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weizhi"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </p> -->
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'NavBar',
  data() {
    return {

    };
  },
  components: {

  }
};
</script>
<style lang='less' scoped>
.left,
.center,
.right
{
  color:#fff;
}
.nav-icon{
  width: 100px;
}
.newFoot {
  display: none;
}
.footer-nav {
  padding: 40px 240px;
  background-color: rgb(51, 51, 51);
  color: #eee;
  display: flex;
  justify-content: space-around;
  p {
    margin: 10px 0;
  }
  .icon {
    font-size: 18px;
  }
  .title {
    font-size: 18px;
    font-weight: 500;
  }
}
.footer-fixed {
  padding: 10px 240px;
  background-color: rgb(34, 33, 33);
  color: #eee;
  display: flex;
  justify-content: center;
  p {
    margin: 10px 0;
  }
  .icon {
    font-size: 18px;
  }
}
.sprite {
    display: inline-block;
    background-image: url(http://s1.hdslb.com/bfs/seed/jinkela/footer-v2/images/hz_icon.png);
    background-repeat: no-repeat;
    vertical-align: middle;
    margin-right: 3px;
}
.bg2 {
    width: 18px;
    height: 20px;
    background-position: -41px 0px;
}
</style>
