<template>
  <div class="job-works">
    <h4 class="headtitle">职位申请</h4>
    <job-actor
      v-for="item in roleList"
      :item="item"
      :key="'role' + item.id"
    ></job-actor>
  </div>
</template>

<script>
import jobActor from './jobActor.vue';
export default {
  props: ['roleList'],
  components: {
    jobActor
  }
};
</script>

<style lang="less" scoped>
.job-works {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 50px;
  position: relative;
  .headtitle {
    padding: 10px 0 20px 0;
    font-size: 26px;
    color: #333;
  }
}
</style>
