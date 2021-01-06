<template>
  <div class="hot-job">
    <div class="title">
      <span class="zh">热点职位</span>
      <span class="en">Hot work</span>
    </div>
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
          this.list = res.data.jobs.slice(0, 8);
        }
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
   padding: 30px 0;
  .title {
    margin-bottom: 10px;
    .zh {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .en {
      color: #333333;
      font-size: 24px;
      padding-left: 10px;
      font-weight: 300;
    }
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    height: 880px;
    width: 1160px;
    margin: 0 auto;
    overflow: hidden;
    /deep/ .job-card {
      margin: 10px;
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
