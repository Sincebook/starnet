<template>
  <div class="talent-detail">
    <talent-header :info="info" :lifeList="lifeList"></talent-header>
    <talent-nav></talent-nav>
    <talent-resume
      id="desc"
      :info="info"
      :offheight="offheight"
    ></talent-resume>
    <talent-img id="photo"></talent-img>
    <talent-video id="video"></talent-video>
    <talent-audio id="audio"></talent-audio>
    <talent-work id="work"></talent-work>
    <talent-msg id="msg"></talent-msg>
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
import TalentHeader from './talentHeader.vue';
import TalentNav from './talentNav.vue';
import TalentImg from './talentImg.vue';
import TalentResume from './talentResume.vue';
import TalentVideo from './talentVideo.vue';
import TalentAudio from './talentAudio.vue';
import talentWork from './talentWork.vue';
import talentMsg from './talentMsg.vue';
import { userinfoById, getMyinfo, jobNews } from '@/ajax';
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
      offheight: '',
      lifeList: []
    };
  },
  components: {
    TalentHeader,
    TalentNav,
    TalentResume,
    TalentImg,
    TalentVideo,
    TalentAudio,
    talentWork,
    talentMsg
  },
  beforeDestroy() {
    clearInterval(this.time);
  },
  created() {
    userinfoById({ id: this.$route.params.id }).then(res => {
      if (res.code === '0') {
        this.info = res.data;
        let res1 = [];
        if (this.info.image) {
          res1.push(this.info.image);
        }
        if (this.info.image1) {
          res1.push(this.info.image1);
        }
        if (this.info.image2) {
          res1.push(this.info.image2);
        }
        if (this.info.image3) {
          res1.push(this.info.image3);
        }
        for (let i = 0; i < 4; i++) {
          if (res1.length < 4) {
            res1.push(res1[0]);
          }
        }
        this.lifeList = res1;
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
