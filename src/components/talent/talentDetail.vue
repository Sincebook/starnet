<template>
  <div class="talent-detail">
    <talent-header></talent-header>
    <div class="nav">
      <div class="container">
        <span @click="changeHash('resume')">个人简介</span>
        <span @click="changeHash('talentImg')">照片</span>
        <span @click="changeHash('talentVideo')">视频</span>
        <span @click="changeHash('talentAudio')">音频</span>
        <span @click="changeHash('wortRecord')">工作经历</span>
        <span @click="changeHash('criticism')">留言</span>
      </div>
    </div>
    <talent-resume id="resume"></talent-resume>
    <talent-img id="talentImg"></talent-img>
    <talent-video id="talentVideo"></talent-video>
    <talent-audio id="talentAudio"></talent-audio>
    <work-record id="wortRecord"></work-record>
    <div class="critism" id="criticism">
      <criticism v-for="item in 3" :key="item"></criticism>
      <criticism-input></criticism-input>
    </div>
  </div>
</template>
<script>
import Criticism from '../common/criticism.vue';
import CriticismInput from '../common/criticismInput.vue';
import TalentAudio from './talentAudio.vue';
// @ is an alias to /src
import TalentHeader from './talentHeader.vue';
import TalentImg from './talentImg.vue';
import TalentResume from './talentResume.vue';
import TalentVideo from './talentVideo.vue';
import workRecord from './workRecord.vue';
export default {
  name: 'talentDetail',
  data() {
    return {

    };
  },
  components: {
    TalentHeader,
    TalentResume,
    TalentImg,
    TalentVideo,
    TalentAudio,
    workRecord,
    Criticism,
    CriticismInput
  },
  methods: {
    changeHash(id) {
      console.log(id);
      document.querySelector('#' + id).scrollIntoView(true);
    }
  }
};
</script>
<style lang='less' scoped>
.talent-detail {
  background-color: #f5f5f5;
}
.nav {
  width: 100%;
  height: 50px;
  background-color: rgb(200, 200, 200);
  .container {
    margin: 0 auto;
    display: flex;
    justify-content: space-around;
    color: #2d6496;
    span {
      margin: 0 30px;
      cursor: pointer;
    }
  }
  .critism {
    padding: 20px;
    background-color: #fff;
  }
}
</style>
