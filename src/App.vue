<template>
  <div>
    <nav-bar></nav-bar>
    <router-view class="body"></router-view>
    <footer-bar></footer-bar>
    <el-dialog
      v-if="(jobNews = 1)"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose1"
    >
      <span>您有一封新消息，快去查看吧～</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jobNewsTo()" class="celebrity"
          >前往查看</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import NavBar from './components/common/navBar.vue';
import FooterBar from './components/common/footerBar';
import { jobNews } from '@/ajax/index.js';
export default {
  data() {
    return {
      flag: true,
      jobNews: 0,
      time: null,
      dialogVisible1: false
    };
  },
  components: {
    NavBar,
    FooterBar
  },
  mounted() {
      this.time = setInterval(() => {
        if (this.$route.path === '/corporateRecruit') {
          return;
        }
        if (this.$store.state.userinfo.user.type && this.$store.state.userinfo.user.type < 4) {
          clearInterval(this.time);
          return;
        }
        if (this.flag) {
          this.isjobNews();
        }
      }, 5000);
  },
  methods: {
    handleClose1(done) {
      this.flag = true;
      done();
    },
    jobNewsTo() {
      clearInterval(this.time);
      this.dialogVisible1 = false;
      this.$router.push('/corporateRecruit');
    },
    isjobNews() {
      jobNews({
        userid: this.$store.state.userinfo.user.id
      }).then((res) => {
        if (res.code === '0') {
          this.flag = false;
          this.jobNews = 1;
          this.dialogVisible1 = true;
        } else {
          console.log('没有新投递哦！');
          // this.jobNews = 0;
        }
      });
    }
  }
};
</script>
<style lang='less'>
.body {
  // min-height: calc(100vh - 199px);
  min-height: 100vh;
}
</style>
