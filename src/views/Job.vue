<template>
  <div class="job">
    <sub-bar></sub-bar>
    <select-type
      :type="'job'"
      @lasted="lasted"
      @hot="hot"
      @nameSearch="nameSearch"
      @newType="typeToPage"
    ></select-type>
    <div class="job-list" v-if="cards">
      <div v-if="!cards.length" style="margin: 50px auto">暂无数据...</div>
      <job-card v-for="item in cards" :key="item.id" :item="item"></job-card>
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
import { findHotJob, findJobUptime, findJobByName, findJobByThree } from '@/ajax';
export default {
  name: 'Job',
  data() {
    return {
      cards: null,
      allpages: null,
      select: 'uptime',
      params: null
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
        findJobUptime({ page: 1 }).then(res => {
          // console.log(res);
          this.cards = res.data.jobs;
          this.allpages = res.data.allpage;
        });
        return;
      }
      // 分页为类型选择
      if (this.select === 'type') {
        this.typeToPage(this.params, page);
        return;
      }
      this.hot(page);
    },
    // 根据类型搜索项目
    typeToPage(obj, page) {
      this.select = 'type';
      if (!page) {
        page = 1;
      }
      obj.page = page;
      this.params = obj;
      console.log(this.params);
      findJobByThree(this.params).then(res => {
        this.cards = res.data.jobs;
        this.allpages = res.data.allpage;
      });
    },
    // 根据名字搜索项目
    nameSearch(name) {
      findJobByName({ title: name, page: 1 }).then(res => {
        this.cards = res.data.jobs;
        this.allpages = res.data.allpage;
      });
    },
    lasted() {
      this.changePage(1);
    },
    hot(page) {
      if (!page) { page = 1; }
      findHotJob({ page: page }).then(res => {
        console.log(res);
        this.cards = res.data.jobs;
        this.allpages = res.data.allpages;// 最热只有一页
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
    width: 920px;
    margin: 10px auto;
    /deep/ .job-card {
      width: 220px;
      height: 380px;
      margin: 5px;
    }
  }
}
</style>
