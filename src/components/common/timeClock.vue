<template>
  <div>
    <el-dialog
      v-if=" jobNews = 1"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>你有新的投递 ，快去查看吧～</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jobNewsTo()" class="celebrity">立即查看</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getMyinfo, jobNews } from '@/ajax';
export default {
  data() {
    return {
      jobNews: 0,
      type: 0,
      id: 0,
      dialogVisible: true,
      flag: true
    };
  },
  methods: {
    handleClose(done) {
        this.flag = true;
        done();
        // this.timeCLock();
    },
    jobNewsTo() {
      this.$router.push('/corporateRecruit');
    },
    isjobNews() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.type = res.data.user.type;
          this.id = res.data.user.id;
           if (this.type === 6 || this.type === 5 || this.type === 4) {
            jobNews({
              userid: this.id
            }).then(res => {
              if (res.code === '0') {
                this.flag = false;
                this.jobNews = 1;
                this.dialogVisible = true;
              } else {
                console.log('没有新投递');
                // this.jobNews = 0;
              }
            });
          }
        } else {
        }
      });
    },
    timeCLock() {
       setInterval(() => {
         if (this.flag) {
          this.isjobNews();
         }
      }, 2000);
    }
  },
  mounted() {
    this.timeCLock();
  }
};
</script>
<style lang="less" scoped>
.celebrity {
  margin-right: 33%;
  text-align: center;
}
</style>
