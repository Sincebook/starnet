<template>
  <div class="home">
    <svg class="icon icon-qq2" aria-hidden="true">
      <use xlink:href="#icon-qq2"></use>
    </svg>
    <p data-aos="fade-up">{{ test.hitokoto }}--{{ test.from_who }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('getTest');// 测试api的使用
  },
  computed: {
    ...mapState({
      test: (state) => state.test
    })
  }
};
</script>

<style lang="less" scoped>
.icon-qq2 {
  width: 28px;
  height: 28px;
}
p {
  margin-top: 50px;
  font-size: 20px;
}
</style>
