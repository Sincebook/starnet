<template>
  <div class="job">
    <sub-bar
      :companyType="companyType"
      :nameArr="nameArr"
      @typeSearch="searchType"
    ></sub-bar>
    <select-type
      :type="'job'"
      @lasted="lasted"
      @hot="hot"
      @nameSearch="nameSearch"
      @newType="typeToPage"
    ></select-type>
    <div class="job-list" v-if="cards">
      <div v-if="!cards.length" style="margin: 50px auto">暂无数据...</div>
      <job-card
        v-for="(item, index) in cards"
        :key="index + item.id"
        :item="item"
      ></job-card>
    </div>
    <pagination :allPages="allpages" @getProjects="changePage"></pagination>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
import JobCard from '../components/common/jobCard.vue';
import pagination from '../components/common/pagination';
import { findHotJob, findJobUptime, findJobByName, findJobByThree, findJobByType } from '@/ajax';
export default {
  name: 'Job',
  data() {
    return {
      cards: [{ title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }, { title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }, { title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }, { title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }, { title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }, { title: '--/--', jobneed: '...', age: '--/--', collect: 0, id: 1, image: '', job: '--/--', launch: '--/--', money: '$$', place: '--/--', sex: '--/--', type: '1', uptime: '--/--', userid: '1', worktime: '--/--' }],
      allpages: null,
      select: 'uptime',
      params: null,
      name: '', // 为单类型选择后存储的类型名
      companyType: ['演员', '主播', '模特', '童星', '曲艺', '舞蹈', '配音', '导演', '编剧', '剪辑师', '摄影师', '化妆师', '航拍师', '调色师', '合成师', '导演助理', '摄影助理', '摄影指导', '创意策划', '美术', '美术指导', '特效师', '分镜师', '制片助理', '录音师', '配乐师', '跟焦师', '2D动画师', '3D动画师', '服装', '道具', '替身', '造型师', '混音师', '武术指导', '其他'],
      nameArr: ['工作分类', 'Job', 'classification']
    };
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changePage(page) {
      // 分页为最新项目
      if (this.select === 'uptime') {
        // 加上时间戳现在请不到数据
        // let timestamp = Date.parse(new Date()) - 24 * 60 * 60 * 7;
        findJobUptime({ page: page }).then(res => {
          // console.log(res);
          if (res.code === '0') {
            this.cards = res.data.jobs;
            this.allpages = res.data.allpage;
          } else {
            this.$message({
              message: res.errMsg,
              type: 'error'
            });
          }
        });
        return;
      }
      // 分页为类型选择
      if (this.select === 'type') {
        this.typeToPage(this.params, page);
        return;
      }
      // 分页为单个类型选择
      if (this.select === 'searchType') {
        this.searchType(this.name, page);
      }
      this.hot(page);
    },
    // 根据单个类别搜索项目
    searchType(name) {
      findJobByType({ job: name, page: 1 }).then(res => {
        if (res.code === '0') {
          this.name = name;
          this.select = 'searchType';
          this.cards = res.data.jobs;
          this.allpages = res.data.allpage;
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    },
    // 根据类型搜索项目
    typeToPage(obj, page) {
      this.select = 'type';
      if (!page) {
        page = 1;
      }
      obj.page = page;
      this.params = obj;
      // console.log(this.params);
      findJobByThree(this.params).then(res => {
        if (res.code === '0') {
          this.cards = res.data.jobs;
          this.allpages = res.data.allpage;
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    },
    // 根据名字搜索项目
    nameSearch(name) {
      findJobByName({ title: name, page: 1 }).then(res => {
        if (res.code === '0') {
          this.cards = res.data.jobs;
          this.allpages = res.data.allpage;
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    },
    lasted() {
      this.changePage(1);
    },
    hot(page) {
      if (!page) { page = 1; }
      findHotJob({ page: page }).then(res => {
        if (res.code === '0') {
          // console.log(res);
          this.cards = res.data.jobs;
          this.allpages = res.data.allpages;// 最热只有一页
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    }
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
    width: 1180px;
    margin: 10px auto;
    /deep/ .job-card {
      width: 240px;
      height: 380px;
      margin: 5px;
    }
  }
}
</style>
