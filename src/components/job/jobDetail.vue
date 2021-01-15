<template>
  <div class="job-detail">
    <job-header :info="info" :info1="info1"></job-header>
    <job-nav :info="info"></job-nav>
    <job-resume :info="info"></job-resume>
    <job-works id="works" :roleList="roleList"></job-works>
  </div>
</template>
<script>
import jobHeader from './jobHeader.vue';
import jobNav from './jobNav.vue';
import jobResume from './jobResume.vue';
import jobWorks from './jobWorks.vue';
import { getJobById, getAllRoles, fingComInfo } from '@/ajax';
export default {
  data() {
    return {
      info: [],
      info1: [],
      roleList: []
    };
  },
  created() {
    this.getJob();
    this.getRoles();
  },
  methods: {
    // 获取工作详情
    getJob() {
      getJobById({ id: this.$route.params.id }).then(res => {
        if (res.code === '0') {
          this.info = res.data;
          this.fingComInfo(res.data.companyInfoId);
        }
      }).catch(err => {
        return err;
      });
    },
    // 获取所有角色
    getRoles() {
      getAllRoles({ jobid: this.$route.params.id }).then(res => {
        if (res.code === '0') {
          this.roleList = res.data;
        }
      }).catch(err => {
        return err;
      });
    },
    // 用来获取头像和粉丝数
    fingComInfo(id) {
      fingComInfo({ id: id }).then(res => {
        if (res.code === '0') {
          this.info1 = res.data;
        }
      }).catch(err => {
        return err;
      });
    }
  },
  components: {
    jobHeader,
    jobNav,
    jobResume,
    jobWorks
  }
};
</script>
