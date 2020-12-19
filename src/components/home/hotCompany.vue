<template>
  <div class="hot-actor">
    <h2>热点公司 Hot Companys</h2>
    <div class="list">
      <company-card
        data-aos="fade-up"
        v-for="(item, index) in list"
        :key="index"
        :item="item"
      ></company-card>
    </div>
    <div class="more" @click="go">更多</div>
  </div>
</template>

<script>
import companyCard from '../common/companyCard';
import { findHotCompanys } from '../../ajax/index';
export default {
  data() {
    return {
      list: []
    };
  },
  methods: {
    findHotCompanys() {
      findHotCompanys().then(res => {
        if (res.code === '0') {
          this.list = res.data;
        }
      });
    },
    go() {
      this.$router.push('/company');
    }
  },
  created() {
    this.findHotCompanys();
  },
  components: {
    companyCard
  }
};
</script>

<style lang="less" scoped>
.hot-actor {
  background-color: #ffffff;
  width: 100%;
  padding: 40px 0;
  h2 {
    margin-bottom: 20px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1280px;
    height: 800px;
    margin: 0 auto;
    /deep/ .company-card {
      margin: 20px;
      .btn-box {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .btn {
          width: 40%;
          height: 40px;
          border-radius: 4px;
          font-size: 16px;
          transition: all 0.25s;
          cursor: pointer;
          color: gray;
          display: flex;
          align-items: center;
          justify-content: center;
          &:first-child {
            border: 2px solid #208b4e;
            &:hover {
              background-color: #208b4e;
              color: #fff;
            }
          }
          &:last-child {
            border: 2px solid #222;
            &:hover {
              background-color: #222;
              color: #fff;
            }
          }
        }
      }
      .desc {
        margin-bottom: 30px;
      }
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
