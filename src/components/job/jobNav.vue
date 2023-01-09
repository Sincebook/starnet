<template>
  <div class="job-nav">
    <div class="container">
      <div class="left">
        <p class="tips">火热进行中，请尽快申请合适的职位</p>
        <div class="btns">
          <div class="btn flw_s" @click="goPush">立即申请</div>
          <div class="btn coll" v-if="!isColl" @click="collectJob">收藏</div>
          <div class="btn coll" v-else @click="cancelCollect">已收藏</div>
        </div>
      </div>
      <div class="right">
        <div class="share">
          <span>分享</span>
          <svg @click="share" class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { isStar, starJob, noStarJob } from '@/ajax';
export default {
  props: ['info'],
  data() {
    return {
      isColl: false
    };
  },
  created() {
    this.isCollect();
  },
  methods: {
    // 微博分享
    share() {
      let url = window.location.origin + '/%23/jobDetail/' + this.$route.params.id + '/' + this.$route.params.userid;
      window.open('http://v.t.sina.com.cn/share/share.php?title=绘星网分享---工作：' + this.info.title + '&url=' + url + '&content=utf-8&pic=' + this.info.image, 'newwindow', 'height:400,width:400,top:100,left:100');
    },
    // 判断该用户是否收藏了该工作
    isCollect() {
      isStar({ jobid: this.$route.params.id }).then(res => {
        if (res.code === '0') {
          this.isColl = true;
        }
      }).catch(err => {
        return err;
      });
    },
    // 收藏工作
    collectJob() {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (Number(this.$route.params.userid) === Number(this.userinfo.user.id)) {
        this.$message.error('不能收藏自己发布的职位');
      } else {
        starJob({ jobid: this.$route.params.id }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '收藏成功',
              type: 'success'
            });
            this.isColl = true;
          } else {
            this.$message.error('收藏失败');
          }
        }).catch(err => {
          return err;
        });
      }
    },
    // 取消收藏
    cancelCollect() {
      noStarJob({ jobid: this.$route.params.id }).then(res => {
        console.log(res);
        if (res.code === '0') {
          this.$message({
            message: '取消成功',
            type: 'success'
          });
          this.isColl = false;
        } else {
          this.$message.error('取消失败');
        }
      }).catch(err => {
        return err;
      });
    },
    // 锚点跳转
    goPush() {
      document.querySelector('#works').scrollIntoView(true);
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    })
  }
};
</script>

<style lang="less" scoped>
.job-nav {
  background-color: #c9cbca;
  .container {
    margin: 0 auto;
    height: 60px;
    width: 1140px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .left {
    display: flex;
    align-items: center;
  }
  .right {
    .share {
      margin-right: 15px;
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        color: #909399;
      }
      .icon {
        cursor: pointer;
        margin-left: 10px;
        font-size: 20px;
      }
    }
  }
  .tips {
    margin: 0 20px 0 15px;
    font-size: 16px;
    color: #0097d0;
  }
  .btns {
    display: flex;
    align-items: center;
    .btn {
      cursor: pointer;
      margin-right: 20px;
      width: 68px;
      height: 34px;
      border-radius: 4px;
      font-size: 14px;
      transition: all 0.25s;
      display: flex;
      align-items: center;
      justify-content: center;
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
    .coll {
      color: #f56c6c;
      background: #fef0f0;
      border: 1px solid #fbc4c4;
      &:hover {
        background: #f56c6c;
        color: #fff;
        border-color: #f56c6c;
      }
    }
  }
}
</style>
