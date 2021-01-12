<template>
  <div class="com-mark">
    <p class="leave">留言</p>
    <div class="leavemessages">
      <span class="mg">留言</span>
      <span class="recent">最近留言</span>
      <span class="sort"
        >排序
        <svg class="icon icon-zhankai" aria-hidden="true">
          <use xlink:href="#icon-zhankai"></use>
        </svg>
      </span>
    </div>
    <div class="critism" id="criticism" style>
      <criticism v-for="item in 2" :key="item.id"></criticism>
    </div>
  </div>
</template>
<script>
import Criticism from '../../common/criticism.vue';
export default {
  components: { Criticism }
};
</script>
<style lang="less" scoped>
.com-mark {
  margin: auto;
  width: 960px;
  background-color: white;
}
.leave {
  font-weight: bold;
  font-size: 18px;
  padding: 40px 0;
  text-align: center;
}
.leavemessages {
  padding-left: 30px;
  font-size: 16px;
  height: 30px;
  padding-top: 5px;
  font-weight: bold;
  color: #2d6496;
  position: relative;
  .mg {
    position: absolute;
    left: 20px;
  }
  .recent {
    position: absolute;
    right: 120px;
  }
  .sort {
    display: inline-block;
    width: 70px;
    position: absolute;
    right: 0px;
  }
}
</style>
