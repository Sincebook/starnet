<template>
  <div v-if="companyNav.isHave" class="company-work">
    <h4 class="headtitle">企业荣誉</h4>
    <div class="list">
      <div
        class="item"
        v-for="(item, index) in workList"
        :key="'workItem' + index"
      >
        <div class="nav">
          <span>{{ index }}</span>
        </div>
        <div
          class="content"
          v-for="(item1, index) in item"
          :key="'workItem1' + index"
        >
          <p class="desc">
            <span style="color: #0097d0"
              >{{ item1.time + "，" + item1.title }}：</span
            >{{ item1.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getGrade } from '@/ajax';
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    getGrade({ userid: this.$route.params.userid }).then(res => {
      if (res.code === '0') {
        this.$store.commit('companyNavWork', true);
        this.list = res.data;
      } else {
        this.$store.commit('companyNavWork', false);
      }
    }).catch(err => {
      return err;
    });
  },
  computed: {
    ...mapState({
      companyNav: (state) => state.companyNav[4]
    }),
    workList() {
      let obj = {};
      this.list.forEach(item => {
        if (obj[item.type]) {
          obj[item.type].push(item);
        } else {
          obj[item.type] = [];
          obj[item.type].push(item);
        }
      });
      return obj;
    }
  }
};
</script>
<style lang='less' scoped>
.company-work {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0 5px;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    color: #333;
  }
  .list {
    margin-top: 30px;
    .nav {
      background-color: #c9cbca;
      width: 100%;
      font-size: 16px;
      span {
        margin: 0 auto;
        height: 60px;
        width: 1050px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
    .content {
      margin: 0 30px;
    }
    .desc {
      font-size: 16px;
      margin: 20px 0;
      color: #909399;
    }
  }
}
</style>
