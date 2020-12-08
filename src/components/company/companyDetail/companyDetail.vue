<template>
  <div class="companyDetail">
    <company-brief :userid="userid" v-if="userid"></company-brief>
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
    <company-image id="comImage" v-if="images" :imgs="images"></company-image>
    <company-video
      id="comVideo"
      :videos="comvideos"
      v-if="comvideos"
    ></company-video>
    <company-perform
      id="comPerform"
      :userid="userid"
      v-if="userid"
    ></company-perform>
    <company-mark id="comMark"></company-mark>
  </div>
</template>
<script>
// @ is an alias to /src
import CompanyBrief from './companyBrief.vue';
import CompanyIntro from './companyIntro.vue';
import CompanyImage from './companyImage.vue';
import CompanyVideo from './companyVideo.vue';
import CompanyPerform from './companyPerform.vue';
import CompanyMark from './companyMark.vue';
import {
  getComInfoById,
  getComVideoByUserId,
  getComPhotosByUserId
  // attentionByStarId,
  // sendMessageToId
} from '@/ajax';

export default {
  name: 'XXX',
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
        show: ''
      },
      comInformation: {
        description: ''
      },
      userid: '',
      comvideos: '',
      images: ''
    };
  },
  created() {
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
    CompanyMark

  },
  methods: {
    getCompanyInfo() {
      getComInfoById({ id: this.$route.params.id }).then(res => {
        // console.log(res);
        this.userid = res.data.userid;
        this.getCompanyVideo();
        this.getComPhotos();
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
      });
    },
    getCompanyVideo() {
      // console.log(this.userid);
      getComVideoByUserId({ userid: this.userid, page: 1 }).then(res => {
        // console.log(res);
        this.comvideos = res.data.companyVideos;
      });
    },
    getComPhotos() {
      getComPhotosByUserId({ type: 1, userid: this.userid, page: 1 }).then(res => {
        this.images = res.data.datas;
      });
    },
    changeHash(id) {
      // console.log(id);
      document.querySelector('#' + id).scrollIntoView(true);
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
</style>
