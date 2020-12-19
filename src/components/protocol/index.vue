<template>
  <div class="protocol">
    <!-- 整个 -->
    <!-- <h1 class="titl">关于</h1> -->
    <div class="w">
      <!-- 导航栏start -->
      <div class="tab">
        <ul>
          <router-link to="/protocol/about"> <li>关于我们</li></router-link>
          <router-link to="/protocol/useIt">
            <li>使用帮助</li>
          </router-link>
          <router-link to="/protocol/userProtocol"> <li>用户协议</li></router-link>
          <router-link to="/protocol/security"> <li>信任与安全</li></router-link>
          <router-link to="/protocol/privacy"> <li>隐私条款</li></router-link>
          <router-link to="/protocol/joinUs"> <li>加入我们</li></router-link>
        </ul>
      </div>
      <!-- 导航栏end -->
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'protocolIndex',
  data() {
    return {

    };
  },
  components: {

  }
};
</script>
<style lang='less' scoped>
.protocol {
  width: 960px;
  margin: 0 auto;
}
a {
  text-decoration: none;
  color: #333333;
}

.w {
  width: 960px;
  margin: 0 auto;
  background-color: #ffffff;
  /* height: 500px; */
}

li {
  list-style: none;
}

.tab {
  width: 100%;
  height: 50px;
  background-color: #777777;
}

.tab ul {
  width: 860px;
  margin: 0 50px;
}

.tab ul li {
  float: left;
  width: 143.33px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  /* border: 1px solid #000; */
  list-style: none;
}

.tab ul li a {
  font-size: 1.2em;
}

.tab ul li:hover {
  background-color: #ffffff;
  cursor: pointer;
}
/* 导航栏结束 */

.content {
  display: inline-block;
  margin: 0 50px 30px 50px;
}

.content h3 {
  color: #666666;
  font-size: 2em;
  text-align: center;
  margin: 30px 0;
}

.content p {
  color: #666666;
  font-size: 1em;
  line-height: 1.5em;
}
</style>
