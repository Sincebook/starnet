<template>
  <div class="job-works">
    <h4 class="headtitle">职位申请</h4>
    <div v-if="isShow">
      <job-actor
        v-for="item in roleList"
        :item="item"
        :key="'role' + item.id"
      ></job-actor>
    </div>
    <div class="no-job" v-else>
      暂无职位
    </div>
  </div>
</template>

<script>
import jobActor from './jobActor.vue';
export default {
  props: ['roleList'],
  computed: {
    isShow() {
      if (this.roleList.length) {
        return true;
      } else {
        return false;
      }
    }
  },
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
  .no-job {
    font-size: 20px;
    color: #333;
  }
}
</style>
