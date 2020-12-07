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
    <talent-resume id="resume" :data="resume"></talent-resume>
    <talent-img id="talentImg" :userid="userid" v-if="userid"></talent-img>
    <talent-video
      id="talentVideo"
      :userid="userid"
      v-if="userid"
    ></talent-video>
    <talent-audio
      id="talentAudio"
      :userid="userid"
      v-if="userid"
    ></talent-audio>
    <work-record id="wortRecord" :userid="userid" v-if="userid"></work-record>
    <div class="critism" id="criticism" v-if="critism">
      <criticism
        v-for="item in critismFive"
        :key="item.name + item.id"
        :item="item"
      ></criticism>
      <div
        style="
          background-color: #fff;
          width: 960px;
          margin: 0 auto;
          text-align: center;
        "
        v-if="critism.length"
      >
        <span style="cursor: pointer" @click="showMoreCritism"
         >查看更多...</span
        >
      </div>
      <criticism-input
        v-if="userid"
        :userid="userid"
        @resetCritism="resetCritism"
      ></criticism-input>
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
import { userinfoById, getAllMomes } from '@/ajax';
export default {
  name: 'talentDetail',
  data() {
    return {
      userid: '',
      resume: '',
      critism: '',
      critismFive: ''
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
  created() {
    this.userinfo();
  },
  methods: {
    // 锚点
    changeHash(id) {
      // console.log(id);
      document.querySelector('#' + id).scrollIntoView(true);
    },
    // 简介
    userinfo() {
      console.log(this.$route.params);
      userinfoById({ id: this.$route.params.id }).then(res => {
        // console.log(res);
        this.userid = res.data.userid;
        this.resume = res.data;
        this.getMomes();
      });
    },
    // 获取留言
    getMomes() {
      getAllMomes({ toid: this.userid }).then(res => {
        // console.log(res);
        this.critism = res.data;
        this.critismFive = this.critism.slice(0, 5);
      });
    },
    // 刷新留言列表
    resetCritism() {
      this.getMomes();
    },
    showMoreCritism() {
      this.critismFive = this.critism;
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
