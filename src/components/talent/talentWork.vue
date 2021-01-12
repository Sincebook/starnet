<template>
  <div v-if="talentNav.isHave" class="talent-work">
    <h4 class="headtitle">工作经历</h4>
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
          <p class="desc">{{ item1.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getUserWork } from '@/ajax';
export default {
  data() {
    return {
      list: []
    };
  },
  created() {
    getUserWork({ userid: this.$route.query.userid }).then(res => {
      console.log(res);
      if (res.code === '0') {
        this.$store.commit('talentNavWork', true);
        this.list = res.data;
      } else {
        this.$store.commit('talentNavWork', false);
      }
    }).catch(err => {
      return err;
    });
  },
  computed: {
    ...mapState({
      talentNav: (state) => state.talentNav[4]
    }),
    workList() {
      let obj = {};
      this.list.forEach(item => {
        if (obj[item.title]) {
          obj[item.title].push(item);
        } else {
          obj[item.title] = [];
          obj[item.title].push(item);
        }
      });
      return obj;
    }
  }
};
</script>
<style lang='less' scoped>
.talent-work {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0;
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
