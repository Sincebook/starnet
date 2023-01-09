<template>
  <div class="nav" id="nav">
    <div class =" container" >
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
  data() {
    return {
       i: 0
    };
  },
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
.upNav {
  transform: translateY(0px);
}
.downNav {
  transform: translateY(-64px);
}
.transtion {
  transition: transform 0.3s cubic-bezier(0.35, 0, 0.25, 1),
    -webkit-transform 0.3s cubic-bezier(0.35, 0, 0.25, 1);
}
.nav {
  position: sticky;
  z-index: 999;
  top: 0;
  .container {
    background-color: #c9cbca;
    margin: 0 auto;
    height: 64px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    a {
    margin: 0 40px;
    font-size: 16px;
    color: #333;
    }
  }
}
</style>
