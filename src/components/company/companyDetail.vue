<template>
  <div class="company-detail">
    <company-header :info="info"></company-header>
    <company-nav></company-nav>
    <company-resume
      id="desc"
      :info="info"
      :offheight="offheight"
    ></company-resume>
    <company-img id="photo"></company-img>
    <company-video id="video"></company-video>
    <company-audio id="audio"></company-audio>
    <company-work id="work"></company-work>
    <company-job id="job"></company-job>
    <company-msg id="msg"></company-msg>
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
import companyHeader from './companyHeader.vue';
import companyNav from './companyNav.vue';
import companyResume from './companyResume.vue';
import companyImg from './companyImg.vue';
import companyVideo from './companyVideo.vue';
import companyAudio from './companyAudio.vue';
import companyWork from './companyWork.vue';
import companyJob from './companyJob.vue';
import companyMsg from './companyMsg.vue';
import { getComInfoById, getMyinfo, jobNews } from '@/ajax';
export default {
  data() {
    return {
      info: [],
      offheight: '',
      time: '',
      jobNews: 0,
      type: 0,
      id: 0,
      dialogVisible1: false,
      flag: true
    };
  },
  components: {
    companyHeader,
    companyNav,
    companyResume,
    companyImg,
    companyVideo,
    companyAudio,
    companyWork,
    companyJob,
    companyMsg
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  created() {
    getComInfoById({ id: this.$route.params.id }).then(res => {
      if (res.code === '0') {
        this.info = res.data;
        this.$nextTick(() => {
          this.offheight = document.getElementById('selfEvaluation').offsetHeight;
        });
      }
    }).catch(err => {
      return err;
    });
    this.time = setInterval(() => {
         if (this.flag) {
          this.isjobNews();
         }
      }, 2000);
  },
  methods: {
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
  }
};
</script>
