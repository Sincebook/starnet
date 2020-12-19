<template>
  <div class="talent-header" ref="bgImg"></div>
</template>
<script>
import { getUserBg } from '@/ajax';
export default {
  props: ['userid'],
  data() {
    return {
      bg: ''
    };
  },
  created() {
    this.getBg();
  },
  methods: {
    getBg() {
      getUserBg({
        userid: this.userid
      }).then(res => {
        if (res.code === '0') {
          this.$refs.bgImg.style.backgroundImage = 'url(' + res.data.image + ')';
        } else {
          this.$refs.bgImg.style.backgroundImage = 'url(//ftp.qnets.cn/since/telent.jpg)';
        }
        // console.log(res);
      });
    }
  }
};
</script>
<style lang='less' scoped>
.talent-header {
  height: 400px;
  background-image: url(//ftp.qnets.cn/since/telent.jpg);
  background-position: center;
  margin: 0 auto;
}
</style>
