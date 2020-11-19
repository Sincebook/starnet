<template>
  <div class="vip">
    <div
      class="back-img"
      :style="{ backgroundImage: 'url(' + pic + ')' }"
    ></div>
    <become-vip></become-vip>
  </div>
</template>

<script>
import becomeVip from '../components/vip/becomeVip';
export default {
  data() {
    return {
      pic: '//ftp.qnets.cn/since/bg.png'
    };
  },
  components: {
    becomeVip
  }
};
</script>

<style lang="less" scoped>
.back-img {
  width: 100%;
  height: 500px;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
}
</style>
