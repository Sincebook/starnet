<template>
  <div class="w_location">
    <p style="font-size: 24px; font-weight: 600; margin-bottom: 10px">
      工作详情
    </p>
    <!-- 内容部分 -->
    <div class="content">
      <p>面试地点：{{ info.place }}</p>
      <p>年龄要求：{{ info.age }}</p>
      <!-- <p>招聘人数：{{ info.count }}人</p> -->
      <!-- <p>职位要求：{{ info.jobneed }}</p> -->
      <p>薪酬：{{ info.money }}</p>
      <p>拍摄周期：{{ info.worktime }}</p>
      <p>发布日期：{{ info.begintime }}</p>
      <p>截止日期：{{ info.endtime }}</p>
      <p class="blue_color">申请条件</p>
      <!-- <p>
        {{ info.desc }}
      </p> -->
      <p>{{ info.sex }}</p>
      <p>{{ info.jobneed }}</p>
      <!-- <p>{{ info.other2 }}</p> -->
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  props: ['info'],
  name: 'XXX',
  data() {
    return {

    };
  },
  created() {
    this.info.begintime = this.$formatDate(this.info.begintime);
    this.info.endtime = this.$formatDate(this.info.endtime);
  },
  components: {

  }
};
</script>
<style lang='less' scoped>
.w_location {
  width: 960px;
  padding: 30px 20px 40px 40px;
  margin: 20px auto 0 auto;
  background-color: #ffffff;
  .content {
    p {
      height: 30px;
      line-height: 32px;
      font-size: 14px;
      color: #606060;
    }
    .blue_color {
      font-size: 15px;
      font-weight: 700;
      color: #333;
    }
  }
}
</style>
