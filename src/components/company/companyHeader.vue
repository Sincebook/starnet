<template>
  <div class="company-header">
    <div class="bgImg" :style="{ backgroundImage: `url(${info.image})` }"></div>
    <div class="infos">
      <el-avatar class="logo" :src="info.logo"></el-avatar>
      <h4 class="name">{{ info.name }}</h4>
      <div class="btns">
        <div class="btn msg" @click="openDialog">私信</div>
        <div v-if="!isFollow" class="btn flw" @click="follow">关注</div>
        <div v-else class="btn flw_s" @click="cancelFlw">已关注</div>
        <div class="btn font">粉丝数 {{ funs | setNum }}</div>
        <div class="btn font">成交量 {{ info.oknum | setNum }}</div>
      </div>
      <div class="share">
        <span>分享</span>
        <svg @click="share" class="icon" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </div>
    </div>
    <!-- 私信对接弹窗 -->
    <el-dialog
      custom-class="dialog"
      append-to-body
      :before-close="handleClose"
      :title="'私信@' + info.name"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <el-input
        maxlength="300"
        show-word-limit
        resize="none"
        type="textarea"
        :autosize="{ minRows: 5, maxRows: 5 }"
        placeholder="请输入内容"
        v-model="replayMsg"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="replay(info.userid)">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addMsg, noWatch, watchIt, isFun, getFuns } from '@/ajax';
export default {
  props: ['info'],
  data() {
    return {
      isFollow: false, // 是否关注
      replayMsg: '', // 私信的内容
      funs: '', // 粉丝数
      suss: '', // 成交量
      dialogVisible: false,
      userid: this.$route.params.userid
    };
  },
  created() {
    this.isFun(this.userid);
    this.getFuns(this.userid);
  },
  methods: {
    openDialog() {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (Number(this.userid) === Number(this.userinfo.user.id)) {
        this.$message.error('不能私信自己');
      } else {
        this.dialogVisible = true;
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.replayMsg = '';
    },
    // 发送消息
    replay(id) {
      addMsg({ toid: id, word: this.replayMsg }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '私信成功',
            type: 'success'
          });
          this.handleClose();
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    },
    // 关注
    follow() {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (Number(this.userid) === Number(this.userinfo.user.id)) {
        this.$message.error('不能关注自己');
      } else {
        watchIt({ starid: this.info.userid, name: this.info.name, image: this.info.image }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '关注成功',
              type: 'success'
            });
            this.isFollow = true;
          } else {
            this.$message.error('关注失败');
          }
        }).catch(err => {
          return err;
        });
      }
    },
    // 取消关注
    cancelFlw() {
      noWatch({ starid: this.info.userid }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '已取消关注',
            type: 'success'
          });
          this.isFollow = false;
        } else {
          this.$message.error('取消失败');
        }
      }).catch(err => {
        return err;
      });
    },
    // 判断该用户是否关注了该公司
    isFun(userid) {
      isFun({ starid: userid }).then(res => {
        if (res.data) {
          this.isFollow = true;
        }
      }).catch(err => {
        return err;
      });
    },
    // 获取用户粉丝
    getFuns(userid) {
      getFuns({ userid: userid }).then(res => {
        if (res.code === '0') {
          this.funs = res.data;
        }
      }).catch(err => {
        return err;
      });
    },
    // 微博分享
    share() {
      let url = window.location.origin + '/%23/companyDetail/' + this.$route.params.id + '/' + this.userid;
      window.open('http://v.t.sina.com.cn/share/share.php?title=绘星网分享---公司：' + this.info.name + '&url=' + url + '&content=utf-8&pic=' + this.info.image, 'newwindow', 'height:400,width:400,top:100,left:100');
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
.company-header {
  width: 100%;
  height: 100%;
  .bgImg {
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    width: 100%;
    height: 340px;
  }
  .infos {
    width: 1110px;
    margin: 0 auto;
    text-align: center;
    position: relative;
    .logo {
      position: absolute;
      left: 50%;
      transform: translate(-50%, -65px);
      width: 123px;
      height: 123px;
      border-radius: 50%;
      object-fit: cover;
      border: 3px solid #fff;
    }
    /deep/.el-avatar > img {
      width: 100%;
      height: 100%s;
    }
    .name {
      font-size: 24px;
      padding-top: 75px;
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 25px 0 40px;
    }
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
    .font {
      cursor: auto;
      width: auto;
      color: #909399;
    }
    .msg {
      color: #909399;
      background: #f4f4f5;
      border: 1px solid #d3d4d6;
      &:hover {
        background: #909399;
        color: #fff;
        border-color: #909399;
      }
    }
    .flw {
      color: #409eff;
      background: #ecf5ff;
      border: 1px solid #b3d8ff;
      &:hover {
        background: #409eff;
        color: #fff;
        border-color: #409eff;
      }
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
    .share {
      position: absolute;
      top: 0;
      right: 0;
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
}
/deep/.el-dialog__body {
  padding: 5px 20px 10px;
}
/deep/.el-dialog {
  margin-top: 0 !important;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
