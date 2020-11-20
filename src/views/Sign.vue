<template>
  <div class="sign-box" :style="{ backgroundImage: 'url(' + signBg + ')' }">
    <div class="sign">asfs</div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('getSignBg');
  },
  computed: {
    ...mapState({
      signBg: (state) => state.signBg
    })
  }
};
</script>

<style lang="less" scoped>
.sign-box {
  position: relative;
  overflow: hidden;
  z-index: 1;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .sign {
    position: absolute;
    width: 418px;
    height: 316px;
    top: 200px;
    right: 300px;
    background-color: #fff;
  }
}
</style>
