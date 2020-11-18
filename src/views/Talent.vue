<template>
  <div class="talent">
    <sub-bar :nameArr="nameArr" :companyType="talentType"></sub-bar>
  </div>
</template>

<script>
import subBar from '../components/common/subBar';
export default {
  data() {
    return {
      nameArr: ['人才分类', 'Talent', 'classification'],
      talentType: ['影视公司', '经纪公司', '模特公司', '租赁公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '租赁公司']
    };
  },
  components: {
    subBar
  }
};
</script>

<style lang="less" scoped>
</style>
