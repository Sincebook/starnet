<template>
  <div class="job-detail">
    <detail-header :job="jobHeader"></detail-header>
    <detail-location :info='jobInfo'></detail-location>
    <actor v-for="item in roles" :key="item.id" :item="item"></actor>
    <additionalactor></additionalactor>
  </div>
</template>
<script>
// @ is an alias to /src
import detailHeader from './detailHeader';
import detailLocation from './detailLocation';
import actor from './actor.vue';
import Additionalactor from './additionalactor.vue';
export default {
  name: 'jobDetail',
  data() {
    return {
      jobHeader: { title: '陈导电影公开选角', company: '华谊兄弟有限公司', headerImg: '//ftp.qnets.cn/img/bg1.jpg', bgImg: '//ftp.qnets.cn/img/bg4.jpg', fans: '4236' },
      roles: [{ id: 1, name: '玛丽', info: '雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤', sexAge: '女性，28到40岁' }, { id: 2, name: '宋凯', info: '暖男，脚踏实地，有能力，专一', sexAge: '男性，28到35岁' }],
      jobInfo: { location: '上海', age: '18-40岁', count: 5, ask: '拥有表演专业职称，丰富的表演经验', payment: '有/面议', period: '15到20天', start: '2020-11-12', end: '2020-12-12', desc: '现代都市女性的职场发展史，该角色设置将为魅力四射，自信的表演者，他们可以有才艺技能，适应能力强', sex: '男演员或女演员', other1: '具有有效期内护照，可以接受出国拍摄要求', other2: '勤奋的角色，健康的水平，有趣的精神和脚踏实地是必不可少的' }
    };
  },
  components: {
    detailHeader,
    detailLocation,
    actor,
    Additionalactor
  }
};
</script>
<style lang='less' scoped>
.job-detail {
}
</style>
