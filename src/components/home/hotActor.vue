<template>
  <div class="hot-actor">
    <h2>热点人才 Hot talents</h2>
    <div class="list">
      <actor-card data-aos="fade-up" v-for="item in 8" :key="item"></actor-card>
    </div>
    <div class="more">更多</div>
  </div>
</template>

<script>
import actorCard from '../common/actorCard';
export default {
  data() {
    return {
    };
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
  padding: 80px 0 40px 0;
  h2 {
    margin-bottom: 40px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1280px;
    margin: 0 auto;
    /deep/ .actor-card {
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
