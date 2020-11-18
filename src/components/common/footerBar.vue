<template>
  <div>
    <div class="footer-nav">
      <div class="left">
        <p class="title">关于</p>
        <p>关于我们</p>
        <p>成功故事</p>
        <p>加入我们</p>
        <p>用户协议</p>
      </div>
      <div class="center">
        <p class="title">使用帮助</p>
        <p>隐私条款</p>
        <p>信任与安全</p>
        <p>社区</p>
        <p>更多</p>
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
      <p>版权星绘保留所有权</p>

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
  name: 'XXX',
  data() {
    return {

    };
  },
  components: {

  }
};
</script>
<style lang='less' scoped>
.footer-nav {
  padding: 0 100px;
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
  .left {
  }
  .center {
  }
  .right {
  }
}
.footer-fixed {
  //   padding: 0 50px;
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
</style>
