<template>
  <div class="companyDetail">
    <company-brief
      :userid="userid"
      v-if="userid"
      :item="company"
      :id="this.$route.params.id"
    ></company-brief>
    <div class="companyNav">
      <div class="navcontent">
        <a @click="changeHash('comIntro')">公司简介</a>
        <a @click="changeHash('comImage')">图片</a>
        <a @click="changeHash('comVideo')">视频</a>
        <a @click="changeHash('comPerform')">公司业绩</a>
        <a @click="changeHash('comMark')">留言</a>
      </div>
    </div>
    <company-intro
      :com="company"
      :comInfor="comInformation"
      id="comIntro"
    ></company-intro>
    <company-image id="comImage" v-if="userid" :userid="userid"></company-image>
    <company-video id="comVideo" :userid="userid" v-if="userid"></company-video>
    <company-perform
      id="comPerform"
      :userid="userid"
      v-if="userid"
    ></company-perform>
    <!-- <company-mark id="comMark"></company-mark> -->
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
        <span
          style="cursor: pointer"
          @click="showMoreCritism"
          v-if="!isClickMore"
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
// @ is an alias to /src
import CompanyBrief from './companyBrief.vue';
import CompanyIntro from './companyIntro.vue';
import CompanyImage from './companyImage.vue';
import CompanyVideo from './companyVideo.vue';
import CompanyPerform from './companyPerform.vue';
import Criticism from '../../common/criticism.vue';
import CriticismInput from '../../common/criticismInput.vue';
// import CompanyMark from './companyMark.vue';
import {
  getComInfoById,
  getAllMomes
  // attentionByStarId,
  // sendMessageToId
} from '@/ajax';

export default {
  name: 'XXX',
  // props: ['name'],
  data() {
    return {
      company: {
        time: '',
        person: '',
        money: '',
        city: '',
        form: '',
        code: '',
        range: '',
        show: '',
        oknum: 0
      },
      comInformation: {
        description: ''
      },
      userid: '',
      comvideos: '',
      images: '',
      critism: '',
      critismFive: '',
      isClickMore: false
    };
  },
  created() {
    // console.log(this.name);
    this.getCompanyInfo();
    // console÷.log(this.userid);
    //  this.getCompanyVideo();
  },
  components: {
    CompanyBrief,
    CompanyIntro,
    CompanyImage,
    CompanyVideo,
    CompanyPerform,
    Criticism,
    CriticismInput
    // CompanyMark

  },
  methods: {
    getCompanyInfo() {
      getComInfoById({ id: this.$route.params.id }).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.userid = res.data.userid;
          this.getMomes();
          // this.getCompanyVideo();
          // this.getComPhotos();
          // this.getComGrade();
          this.company.time = res.data.createTime.substring(0, 10);
          this.company.person = res.data.legalPerson;
          this.company.money = res.data.capital;
          this.company.city = res.data.area;
          this.company.form = res.data.category;
          this.company.code = res.data.organizationCode;
          this.company.range = res.data.managementRange;
          this.company.show = res.data.opus;
          this.comInformation.description = res.data.description;
          this.company.oknum = res.data.oknum;
        }
      });
    },
    changeHash(id) {
      // console.log(id);
      if (document.querySelector('#' + id)) {
        document.querySelector('#' + id).scrollIntoView(true);
      }
    },
    // 获取留言
    getMomes() {
      getAllMomes({ toid: this.userid }).then(res => {
        // console.log(res);
        this.critism = res.data;
        if (!this.isClickMore) {
          this.critismFive = this.critism.slice(0, 5);
        } else {
          this.critismFive = res.data;
        }
      });
    },
    // 刷新留言列表
    resetCritism() {
      this.getMomes();
    },
    showMoreCritism() {
      if (this.critismFive.length === this.critism.length) return;
      this.critismFive = this.critism;
      this.isClickMore = true;
    }
  }
};
</script>

<style lang='less' scoped>
.companyDetail {
  background-color: #f5f5f5;
}
.companyNav {
  width: 100%;
  height: 60px;
  background-color: #c8c8c8;
}
.navcontent {
  width: 600px;
  height: 20px;
  padding-top: 20px;
  margin: 0 auto;
}
.navcontent a {
  display: inline-block;
  width: 56px;
  margin: 0 32px;
  color: #2d6496;
  font-weight: 800;
}
.critism {
  padding: 20px;
  background-color: #fff;
}
</style>
