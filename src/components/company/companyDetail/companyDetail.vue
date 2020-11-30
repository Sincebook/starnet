<template>
  <div class="companyDetail">
    <company-brief></company-brief>
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
    <company-image id="comImage"></company-image>
    <company-video id="comVideo"></company-video>
    <company-perform id="comPerform"></company-perform>
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
import { getCompanyInfoById } from '@/ajax';
export default {
  props: ['companyId'],
  name: 'XXX',
  data() {
    return {
      company: {
        time: '2004年9月1日',
        person: '2004年9月1日',
        money: '2004年9月1日',
        city: '2004年9月1日',
        form: '2004年9月1日',
        chairman: '2004年9月1日',
        property: '2004年9月1日',
        director: '2004年9月1日',
        slogan: '2004年9月1日',
        code: '2004年9月1日',
        type: '2004年9月1日',
        range: '2004年9月1日',
        tv: '2004年9月1日',
        stock: '2004年9月1日'
      },
      comInformation: {
        content: '华谊兄弟传媒股份有限公司是中国大陆一家知名综合性民营娱乐集团，由王中军、王中磊兄弟在1994年创立，1998年投资著名导演冯小刚的影片《没完没了》、姜文导演的影片《鬼子来了》正式进入电影行业。因每年投资冯小刚的贺岁片而声名鹊起，随后全面进入传媒产业，投资及运营电影、电视剧、艺人经纪、唱片、娱乐营销等领域，在这些领域都取得了不错的成绩，并且在2005年成立华谊兄弟传媒集团。2009年9月27日，证监会创业板发行审核委员会公告，华谊兄弟传媒股份有限公司（首发）获得通过，这意味着华谊兄弟成为了首家获准公开发行股票的娱乐公司; 也迈出了其境内上市至关重要的一步。2017年5月11日，华谊兄弟传媒集团入选第九届全国“文化企业30强”。 [1] 2019年7月8日，中共华谊兄弟传媒股份有限公司委员会正式成立。'

      }
    };
  },
  created() {
    this.getCompanyInfo();
    // console.log(this);
    // console.log(this.$route.params.id);
  },
  mounted() {

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
      getCompanyInfoById({ id: this.companyId }).then(res => {
        console.log(res);
      });
    },
    changeHash(id) {
      console.log(id);
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
