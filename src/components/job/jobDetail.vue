<template>
  <div class="job-detail">
    <detail-header
      :job1="jobInfo"
      :id="this.$route.params.id"
      v-if="jobInfo"
    ></detail-header>
    <detail-location :info="jobInfo" v-if="jobInfo"></detail-location>
    <actor v-for="item in roles" :key="item.id" :item="item"></actor>
    <!-- <additionalactor></additionalactor> -->
  </div>
</template>
<script>
// @ is an alias to /src
import detailHeader from './detailHeader';
import detailLocation from './detailLocation';
import actor from './actor.vue';
// import Additionalactor from './additionalactor.vue';
import { getJobById, getAllRoles } from '@/ajax';
export default {
  name: 'jobDetail',
  data() {
    return {
      roles: [{ id: 1, name: '玛丽', info: '雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤', sexAge: '女性，28到40岁', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606300826203&di=3e273223d26888f1d2b50283bc60e04e&imgtype=0&src=http%3A%2F%2Fimage13.m1905.cn%2Fuploadfile%2F2015%2F0410%2F20150410105758266279.jpg' }, { id: 2, name: '宋凯', info: '暖男，脚踏实地，有能力，专一，长相刚毅', sexAge: '男性，28到35岁', src: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1606300415221&di=be2c9538f4aa53696f54f6bdee0f07b2&imgtype=0&src=http%3A%2F%2Fimage20.it168.com%2F201008_500x375%2F203%2Fcb1404f1e9adbc92.jpg' }],
      jobInfo: '',
      userid: ''
    };
  },
  created() {
    this.getJob();
    this.getRoles();
  },
  methods: {
    // 获取工作详情
    getJob() {
      // console.log(this.$route.params.id);
      getJobById({ id: this.$route.params.id }).then(res => {
        this.jobInfo = res.data;
        // console.log(res);
      });
    },
    // 获取所有角色
    getRoles() {
      getAllRoles({ jobid: this.$route.params.id }).then(res => {
        // console.log(res);
        this.roles = res.data;
      });
    }
  },
  components: {
    detailHeader,
    detailLocation,
    actor
    // Additionalactor
  }
};
</script>
<style lang='less' scoped>
.job-detail {
}
</style>
