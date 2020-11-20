<template>
  <div class="job-detail">
    <detail-header :job="jobHeader"></detail-header>
    <detail-location></detail-location>
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
      roles: [{ id: 1, name: '玛丽', info: '雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤', sexAge: '女性，28到40岁' }, { id: 2, name: '宋凯', info: '暖男，脚踏实地，有能力，专一', sexAge: '男性，28到35岁' }]
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
