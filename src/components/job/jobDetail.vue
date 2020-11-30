<template>
  <div class="job-detail">
    <detail-header :job="jobHeader"></detail-header>
    <detail-location :info="jobInfo"></detail-location>
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
      jobHeader: { title: '陈导电影公开选角', company: '华谊兄弟有限公司', headerImg: '//ftp.qnets.cn/img/bg1.jpg', bgImg: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606307947213&di=6298f114a0f7e09c83d8194e226140ac&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F47082f4ac3e9c0319c9125b8da7e4fd5116e547132191-KEnzHi_fw658', fans: '4236' },
      roles: [{ id: 1, name: '玛丽', info: '雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤', sexAge: '女性，28到40岁', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606300826203&di=3e273223d26888f1d2b50283bc60e04e&imgtype=0&src=http%3A%2F%2Fimage13.m1905.cn%2Fuploadfile%2F2015%2F0410%2F20150410105758266279.jpg' }, { id: 2, name: '宋凯', info: '暖男，脚踏实地，有能力，专一，长相刚毅', sexAge: '男性，28到35岁', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606300415221&di=be2c9538f4aa53696f54f6bdee0f07b2&imgtype=0&src=http%3A%2F%2Fimage20.it168.com%2F201008_500x375%2F203%2Fcb1404f1e9adbc92.jpg' }],
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
