<template>
  <div v-if="companyNav.isHave" class="company-job">
    <h4 class="headtitle">在招职位</h4>
    <div class="list">
        <div class="item" v-for="(item, index) in list.jobs" :key="'job' + item.id + index">
            <job-card :item="item"></job-card>
        </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="6"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import JobCard from '../common/jobCard';
import { findCompanyJob } from '@/ajax';
import { mapState } from 'vuex';
export default {
  data() {
    return {
       list: [],
       currentPage: 1
    };
  },
  created() {
    this.findCompanyJob1();
  },
  methods: {
    handleCurrentChange() {
      this.findCompanyJob1();
    },
    findCompanyJob1() {
      findCompanyJob({ page: this.currentPage, num: 6, userid: this.$route.params.userid }).then(res => {
        if (res.data.jobs.length !== 0) {
          this.$store.commit('companyNavJob', true);
          this.list = res.data;
        } else {
          this.$store.commit('companyNavJob', false);
        }
      }).catch(err => {
          return err;
      });
    }
  },
  computed: {
    ...mapState({
      companyNav: (state) => state.companyNav[5]
    })
  },
  components: {
    JobCard
  }
};
</script>

<style lang="less" scoped>
.company-job {
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
    .item{
        margin: 15px;
    }
    /deep/.job-card{
        width: 330px;
    }
   }
   .footer-page {
    text-align: center;
   }
}
</style>
