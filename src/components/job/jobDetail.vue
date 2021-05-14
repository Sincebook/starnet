<template>
  <div class="job-detail">
    <job-header :info="info" :info1="info1"></job-header>
    <job-nav :info="info"></job-nav>
    <job-resume :info="info"></job-resume>
    <job-works v-if="isLogin" id="works" :roleList="roleList"></job-works>
    <el-dialog
      v-if="jobNews = 1 "
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose1">
      <span>您有的投递，快去查看吧～</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jobNewsTo()" class="celebrity">前往查看</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import jobHeader from './jobHeader.vue';
import jobNav from './jobNav.vue';
import jobResume from './jobResume.vue';
import jobWorks from './jobWorks.vue';
import { getJobById, getAllRoles, fingComInfo, getMyinfo, jobNews } from '@/ajax';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      time: '',
      jobNews: 0,
      type: 0,
      id: 0,
      dialogVisible1: false,
      flag: true,
      info: [],
      info1: [],
      roleList: []
    };
  },
  goCelebrity() {
      this.tabChange(3, 'celebrity');
  },
  created() {
    this.getJob();
    this.getRoles();
    this.time = setInterval(() => {
         if (this.flag) {
          this.isjobNews();
         }
      }, 2000);
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
    },
    handleClose1(done) {
        this.flag = true;
        done();
        // this.timeCLock();
    },
    jobNewsTo() {
      this.dialogVisible1 = false;
      this.$router.push('/corporateRecruit');
    },
    isjobNews() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.type = res.data.user.type;
          this.id = res.data.user.id;
           if (this.type === 6 || this.type === 5 || this.type === 4) {
            jobNews({
              userid: this.id
            }).then(res => {
              if (res.code === '0') {
                this.flag = false;
                this.jobNews = 1;
                this.dialogVisible1 = true;
              } else {
                console.log('没有新投递');
                // this.jobNews = 0;
              }
            });
          }
        } else {
        }
      });
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin
    })
  },
  components: {
    jobHeader,
    jobNav,
    jobResume,
    jobWorks
  }
};
</script>
