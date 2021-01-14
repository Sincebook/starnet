<template>
  <div class="nav">
    <div class="container">
      <a
        href="javascript:void(0)"
        @click="push(item.id)"
        v-show="item.isHave"
        v-for="item in companyNav"
        :key="item.id + 'a'"
        >{{ item.title }}</a
      >
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    // 锚点跳转
    push(id) {
      document.querySelector('#' + id).scrollIntoView(true);
    }
  },
  computed: {
    ...mapState({
      companyNav: (state) => state.companyNav
    })
  }
};
</script>

<style lang="less" scoped>
.nav {
  background-color: #c9cbca;
  .container {
    margin: 0 auto;
    height: 60px;
    width: 1140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  a {
    margin: 0 40px;
    font-size: 16px;
    color: #333;
  }
}
</style>
