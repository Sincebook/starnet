<template>
  <div class="talent-detail">
    <talent-header :info="info"></talent-header>
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
import { userinfoById } from '@/ajax';
export default {
  data() {
    return {
      info: [],
      offheight: ''
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
  created() {
    userinfoById({ id: this.$route.params.id }).then(res => {
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
