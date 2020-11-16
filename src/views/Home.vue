<template>
  <div class="home">
    {{test.hitokoto}}--{{test.from_who}}
  </div>
</template>

<script>
// 测试api的使用
// import { mapState } from 'vuex'
import { mapState } from 'vuex';
export default {
  mounted() {
    this.$store.dispatch('getTest');
  },
  computed: {
    ...mapState({
      test: (state) => state.test
    })
  }
};
</script>
