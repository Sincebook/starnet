<template>
  <div class="job-resume">
    <h4 class="headtitle">工作详情</h4>
    <p><span>面试地点：</span>{{ info.place }}</p>
    <p><span>年龄要求：</span>{{ info.age }}</p>
    <p><span>性别要求：</span>{{ info.sex }}</p>
    <p><span>薪酬：</span>{{ info.money }}</p>
    <p><span>拍摄周期：</span>{{ info.worktime }}</p>
    <p><span>发布日期：</span>{{ Number(info.begintime) | formatDate }}</p>
    <p><span>截至日期：</span>{{ Number(info.endtime) | formatDate }}</p>
    <h4 class="tips">申请条件</h4>
    <p>{{ info.jobneed }}</p>
  </div>
</template>

<script>
import { formatDate } from '../../assets/js/date.js';
export default {
  props: ['info'],
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
};
</script>

<style lang="less" scoped>
.job-resume {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 50px;
  position: relative;
  .headtitle {
    padding: 10px 0;
    font-size: 26px;
    color: #333;
  }
  p {
    padding: 10px 0;
    font-size: 16px;
    span {
      color: #909399;
    }
  }
  .tips {
    font-size: 18px;
    padding: 10px 0;
  }
}
</style>
