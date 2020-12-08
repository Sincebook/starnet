<template>
  <div class="company">
    <sub-bar :companyType="companyType" :nameArr="nameArr"></sub-bar>
    <select-type :type="'company'"></select-type>
    <div class="company-list" v-if="cards">
      <company-card
        v-for="item in cards"
        :key="item.id"
        :item="item"
      ></company-card>
    </div>
    <pagination
      :allPages="allpages"
      v-if="allpages"
      @getProjects="changePage"
    ></pagination>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
import CompanyCard from '../components/common/companyCard.vue';
import pagination from '../components/common/pagination';
import { findByUptime } from '@/ajax/index.js';
export default {
  name: 'Company',
  data() {
    return {
      companyType: ['影视公司', '经纪公司', '模特公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '这是多余'],
      nameArr: ['公司分类', 'Company', 'classification'],
      id: 1,
      cards: null,
      allpages: null
    };
  },
  created() {
    this.changePage(1);
  },
  components: {
    SubBar,
    SelectType,
    CompanyCard,
    pagination
  },
  computed: {
  },
  methods: {
    changePage(page) {
      findByUptime({ page }).then(res => {
      console.log(res);
      this.cards = res.data.companyInfoVOs;
      this.allpages = res.data.allpage;
      // console.log(this.cards);
    });
    }
  }
};
</script>
<style lang='less' scoped>
.company {
  .company-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1280px;
    margin: 50px auto;
    /deep/ .company-card {
      width: 280px;
      margin: 20px;
    }
  }
}
</style>
