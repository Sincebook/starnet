<template>
  <div>
    <nav-bar></nav-bar>
    <router-view class="body"></router-view>
    <footer-bar></footer-bar>
  </div>
</template>
<script>
// @ is an alias to /src
import NavBar from './components/common/navBar.vue';
import FooterBar from './components/common/footerBar';
export default {
  data() {
    return {};
  },
  components: {
    NavBar,
    FooterBar
  }
};
</script>
<style lang='less'>
.body {
  // min-height: calc(100vh - 199px);
  min-height: 100vh;
}
</style>
