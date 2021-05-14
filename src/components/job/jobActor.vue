<template>
  <div>
    <div class="job-actor">
      <!-- <div class="left">
        <el-image class="img" :src="item.image" fit="cover"></el-image>
      </div> -->
      <div class="right">
        <div class="name">{{ item.name }}</div>
        <div class="info">
          <span>性别要求：{{ item.sex }}</span>
          <span>年龄要求：{{ item.age }}</span>
          <span>薪酬待遇：{{ item.money }}</span>
          <span>招聘人数：{{ item.nums }}</span>
        </div>
        <a>工作内容:</a>
        <div class="desc">{{ item.description }}</div>
        <div class="btns">
          <div
            v-if="!isApply"
            class="btn flw_s"
            @click="apply(item.jobid, item.id)"
          >
            立即申请
          </div>
          <div v-else class="btn flw_s">已申请</div>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { applyJob, isApply, getMyinfo } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      isCelebrity: 1,
      isApply: false
    };
  },
  created() {
    this.isApplys();
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    })
  },
  methods: {
    apply(jobid, id) {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (this.userinfo.user.type >= 4) {
        this.$message.error('企业用户不能申请职位');
      } else if (this.isCelebrity === 0) {
        this.$confirm('你还没有认证，快去认证吧～', '提示', {
          confirmButtonText: '立即认证',
          center: true,
          showCancelButton: true,
          type: 'warning'
        }).then(() => {
          this.$router.push('/personalcelebrity');
        });
        console.log('111111111111111111111111111');
      } else {
        applyJob({ jobid: jobid, roleid: id }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '申请成功',
              type: 'success'
            });
            this.isApply = true;
          }
        }).catch(err => {
          return err;
        });
      }
    },
    isApplys() {
      isApply({ jobid: this.item.jobid, roleid: this.item.id }).then(res => {
        if (res.code === '0') {
          this.isApply = true;
        }
        console.log(res);
      }).catch(err => {
        return err;
      });
    },
    isDialog() {
      getMyinfo().then(res => {
        if (res.code === '0' && res.data.user.status === 2) {
          console.log(res.code);
          console.log(res.data.user.status);
          this.isCelebrity = 1;
        } else {
          this.isCelebrity = 0;
          console.log(res.data.user.status);
        };
      });
    }
  },
  mounted() {
    this.isDialog();
  }
};
</script>

<style lang="less" scoped>
.job-actor {
  display: flex;
  .left {
    width: 180px;
    margin-right: 20px;
    // .img {
    //   display: block;
    //   width: 180px;
    //   height: 240px;
    // }
  }
  .right {
    flex: 1;
    font-size: 16px;
    .name {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    .desc {
      min-height: 50px;
    }
    .desc,
    .info {
      margin-bottom: 10px;
    }
    .info span {
      margin-right: 20px;
    }
    .btns {
      .btn {
        // cursor: pointer;
        margin-right: 20px;
        width: 68px;
        height: 34px;
        border-radius: 4px;
        font-size: 14px;
        transition: all 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
        float:right;
      }
      .flw_s {
        color: #67c23a;
        background: #f0f9eb;
        border: 1px solid #c2e7b0;
        &:hover {
          background: #67c23a;
          color: #fff;
          border-color: #67c23a;
        }
      }
    }
  }
}
</style>
