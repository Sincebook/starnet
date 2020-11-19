<template>
  <div class="company">
    <sub-bar :companyType="companyType" :nameArr="nameArr"></sub-bar>
    <select-type></select-type>
    <div class="company-list">
      <company-card v-for="item in 16" :key="item"></company-card>
    </div>
    <pagination allPages="123"></pagination>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
import CompanyCard from '../components/common/companyCard.vue';
import pagination from '../components/common/pagination';
export default {
  name: 'Company',
  data() {
    return {
      companyType: ['影视公司', '经纪公司', '模特公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '这是多余'],
      nameArr: ['公司分类', 'Company', 'classification']
    };
  },
  components: {
    SubBar,
    SelectType,
    CompanyCard,
    pagination
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
