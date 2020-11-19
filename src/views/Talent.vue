<template>
  <div class="talent">
    <sub-bar :nameArr="nameArr" :companyType="talentType"></sub-bar>
    <select-type :type="'talent'"></select-type>
    <div class="talent-list">
      <actor-card v-for="item in 16" :key="item"></actor-card>
    </div>
    <pagination allPages="123"></pagination>
  </div>
</template>

<script>
import subBar from '../components/common/subBar';
import SelectType from '../components/common/selectType';
import actorCard from '../components/common/actorCard';
import pagination from '../components/common/pagination';
export default {
  data() {
    return {
      nameArr: ['人才分类', 'Talent', 'classification'],
      talentType: ['租赁公司', '租赁公司', '经纪公司', '模特公司', '租赁公司', '租赁公司']
    };
  },
  components: {
    subBar,
    SelectType,
    actorCard,
    pagination
  }
};
</script>

<style lang="less" scoped>
.talent-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1280px;
  margin: 50px auto;
  /deep/ .actor-card {
    margin: 20px;
  }
}
</style>
