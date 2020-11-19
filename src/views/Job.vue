<template>
  <div class="job">
    <sub-bar :companyType="companyType" :nameArr="nameArr"></sub-bar>
    <select-type></select-type>
    <div class="job-list">
      <job-card v-for="item in 16" :key="item" :item='obj'></job-card>
    </div>
    <pagination allPages="123"></pagination>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
import JobCard from '../components/common/jobCard.vue';
import pagination from '../components/common/pagination';
export default {
  name: 'Job',
  data() {
    return {
      companyType: ['演员', '模特', '主播', '导演', '编剧', '制片', '舞蹈', '摄影', '配音', '化妆', '其他'],
      nameArr: ['工作分类', 'Job', 'classification'],
      obj: {
        id: 1,
        bg: '//ftp.qnets.cn/img/2.jpg',
        title: '邓导电影公开选角',
        name: '河南森思软件科技有限公司',
        loaction: '郑州',
        age: '18-25岁',
        sex: '女',
        require: '拥有表演专业职称，丰富的表演经验',
        money: '有/面议',
        duration: '6个月',
        stratTime: '2020-11-17',
        endTime: '2020-12-12'
      }
    };
  },
  components: {
    SubBar,
    SelectType,
    JobCard,
    pagination
  }
};
</script>
<style lang='less' scoped>
.job {
  .job-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1280px;
    margin: 50px auto;
    /deep/ .job-card {
      width: 280px;
      margin: 20px;
    }
  }
}
</style>
