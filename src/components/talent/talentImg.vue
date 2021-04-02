<template>
  <div v-if="talentNav.isHave" class="talent-img">
    <h4 class="headtitle">照 片</h4>
    <div class="list">
      <div v-for="item in list.datas"
        :key="'img' + item.id">
      <el-image
        class="itemImg"
        :src="item.path"
        :title="item.description"
        fit="cover"
        :preview-src-list="srcList"
      ></el-image>
      <div style="text-align:center;">
         <b >{{item.description}}</b>
      </div>
      </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getUserImg } from '@/ajax';
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      userid: this.$route.params.userid
    };
  },
  created() {
    this.getUserImg(this.currentPage);
  },
  methods: {
    handleCurrentChange(val) {
      this.getUserImg(val);
    },
    getUserImg(page) {
      getUserImg({ type: 1, page: this.currentPage, num: 8, userid: this.userid }).then(res => {
        if (res.code === '0') {
          this.$store.commit('talentNavPhoto', true);
          this.list = res.data;
        } else {
          this.$store.commit('talentNavPhoto', false);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  computed: {
    ...mapState({
      talentNav: (state) => state.talentNav[1]
    }),
    srcList() {
      return this.list.datas.map(item => {
        return item.path;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.talent-img {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0 20px;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    padding-bottom: 20px;
    color: #333;
  }
  .list {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 0 15px 10px 15px;
    .itemImg {
      width: 240px;
      height: 350px;
      margin: 15px;
      display: block;
      transition: all 0.25s;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
      &:hover {
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
    }
  }
  .footer-page {
    text-align: center;
  }
}
</style>
