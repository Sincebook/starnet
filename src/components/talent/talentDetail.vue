<template>
  <div class="talent-detail">
    <talent-header></talent-header>
    <div class="nav">
      <div class="container">
        <span>个人简介</span>
        <span>照片</span>
        <span>视频</span>
        <span>音频</span>
        <span>工作经历</span>
        <span>留言</span>
      </div>
    </div>
    <talent-resume></talent-resume>
    <talent-img></talent-img>
    <talent-video></talent-video>
    <talent-audio></talent-audio>
    <work-record></work-record>
    <div class="critism">
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
    }
  }
  .critism{
      padding: 20px;
      background-color: #fff;
  }
}
</style>
