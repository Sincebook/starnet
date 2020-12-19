<template>
  <div class="hot-job">
    <h2>热点职位 Hot work</h2>
    <div class="list">
      <job-card
        data-aos="fade-up"
        v-for="item in list"
        :item="item"
        :key="item.id"
      ></job-card>
    </div>
    <div class="more" @click="go">更多</div>
  </div>
</template>

<script>
import jobCard from '../common/jobCard';
import { findHotJobs } from '../../ajax/index';
export default {
  data() {
    return {
      obj: {
        page: 1
      },
      list: []
    };
  },
  methods: {
    getHotJobs() {
      findHotJobs(this.obj).then(res => {
        if (res.code === '0') {
          this.list = res.data.jobs.slice(0, 6);
        }
        console.log(res);
      });
    },
    go() {
      this.$router.push('/job');
    }
  },
  created() {
    this.getHotJobs();
  },
  components: {
    jobCard
  }
};
</script>

<style lang="less" scoped>
.hot-job {
  background-color: #f5f5f5;
  width: 100%;
  padding: 40px 0;
  h2 {
    margin-bottom: 20px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 920px;
    width: 1280px;
    margin: 0 auto;
    overflow: hidden;
    /deep/ .job-card {
      margin: 20px;
    }
  }
  .more {
    display: inline-block;
    margin: 15px 0;
    font-size: 16px;
    padding: 5px;
    color: #999;
    cursor: pointer;
    transition: all 0.25s;
    &:hover {
      color: #222;
    }
  }
}
</style>
