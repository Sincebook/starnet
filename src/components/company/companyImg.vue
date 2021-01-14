<template>
  <div v-if="companyNav.isHave" class="company-img">
    <h4 class="headtitle">照 片</h4>
    <div class="list">
      <el-image
        class="itemImg"
        v-for="item in list.datas"
        :key="'img' + item.id"
        :src="item.path"
        fit="cover"
      ></el-image>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="9"
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
      getUserImg({ type: 1, page: this.currentPage, num: 9, userid: this.userid }).then(res => {
        if (res.code === '0') {
          this.$store.commit('companyNavPhoto', true);
          this.list = res.data;
        } else {
          this.$store.commit('companyNavPhoto', false);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  computed: {
    ...mapState({
      companyNav: (state) => state.companyNav[1]
    })
  }
};
</script>
<style lang='less' scoped>
.company-img {
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
      width: 330px;
      height: 210px;
      margin: 15px;
      display: block;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
  }
  .footer-page {
    text-align: center;
  }
}
</style>
