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
import { getComInfoById } from '@/ajax';
export default {
  data() {
    return {
      info: [],
      offheight: ''
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
  }
};
</script>
