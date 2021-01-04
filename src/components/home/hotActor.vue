<template>
  <div class="hot-actor">
    <div class="title">
      <span class="zh">热点人才</span>
      <span class="en">Hot talents</span>
    </div>
    <div class="list">
      <actor-card
        data-aos="fade-up"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></actor-card>
    </div>
    <div class="more" @click="go">更多</div>
  </div>
</template>

<script>
import actorCard from '../common/actorCard';
import { findHotTalents } from '../../ajax/index';
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    getHotJobs() {
      findHotTalents().then(res => {
        if (res.code === '0') {
          this.list = res.data;
        }
      });
    },
    go() {
      this.$router.push('/talent');
    }
  },
  created() {
    this.getHotJobs();
  },
  components: {
    actorCard
  }
};
</script>

<style lang="less" scoped>
.hot-actor {
  background-color: #ffffff;
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
    width: 1160px;
    height: 668px;
    margin: 0 auto;
    /deep/ .actor-card {
      margin: 10px 10px;
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
