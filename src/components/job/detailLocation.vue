<template>
  <div class="w_location">
    <!-- 内容部分 -->
    <div class="content">
      <p>面试地点：{{ info.location }}</p>
      <p>年龄要求：{{ info.age }}</p>
      <p>招聘人数：{{ info.count }}人</p>
      <p>职位要求：{{ info.ask }}</p>
      <p>薪酬：{{ info.payment }}</p>
      <p>拍摄周期：{{ info.period }}</p>
      <p>发布日期：{{ info.start }}</p>
      <p>截止日期：{{ info.end }}</p>
      <p class="blue_color">职业演员可以申请</p>
      <p>
        {{ info.desc }}
      </p>
      <p>{{ info.sex }}</p>
      <p>{{ info.other1 }}</p>
      <p>{{ info.other2 }}</p>
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
  components: {

  }
};
</script>
<style lang='less' scoped>
.w_location {
  width: 1280px;
  padding: 50px 20px 50px 40px;
  margin: 20px auto 0 auto;
  background-color: #ffffff;
  .content {
    p {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      color: #606060;
    }
    .blue_color {
      color: #2f678f;
    }
  }
}
</style>
