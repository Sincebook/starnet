<template>
  <div>
    <sub-bar :companyType="companyType" :nameArr="nameArr"></sub-bar>
    <select-type></select-type>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
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
    SelectType
  }
};
</script>
<style lang='less'>
</style>
