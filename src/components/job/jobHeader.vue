<template>
  <div class="job-header">
    <div class="left">
      <div class="header">
        <div class="titleBox">
          <h4 class="title oneLine">{{ info.title }}</h4>
          <div v-if="info.type !== 1" class="recommend">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            编辑推荐
          </div>
        </div>
        <div class="desc fiveLine">{{ info.description }}</div>
      </div>
      <div class="userinfo">
        <a>
        <div class="infos" @click="goCompany(info1.id)">
          <el-avatar class="logo" :src="info1.logo"></el-avatar>
          <span class="name">{{ info1.name }}</span>
        </div>
        </a>
        <div class="btns">
          <div class="btn msg" @click="openDialog">私信</div>
          <div v-if="!isFollow" class="btn flw" @click="follow">关注</div>
          <div v-else class="btn flw_s" @click="cancelFlw">已关注</div>
          <div class="btn font">粉丝数 {{ info1.funs | setNum }}</div>
        </div>
      </div>
    </div>
    <div class="right">
      <div
        class="bgImg"
        :style="{ backgroundImage: `url(${info.image})` }"
      ></div>
    </div>
    <!-- 私信对接弹窗 -->
    <el-dialog
      custom-class="dialog"
      append-to-body
      :before-close="handleClose"
      :title="'私信@' + info.launch"
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
        <el-button type="primary" @click="replay(info1.id)">确 定</el-button>
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addMsg, noWatch, watchIt, isFun } from '@/ajax';
export default {
  props: ['info', 'info1'],
  data() {
    return {
      isFollow: false, // 是否关注
      replayMsg: '', // 私信的内容
      dialogVisible: false,
      userid: this.$route.params.userid
    };
  },
  created() {
    this.isFun(this.userid);
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
    goCompany(id) {
      window.location.href = '../../../#/companyDetail/' + id + '/' + this.$route.params.userid;
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
        watchIt({ starid: this.userid, name: this.info1.name, image: this.info1.head }).then(res => {
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
      noWatch({ starid: this.userid }).then(res => {
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
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    }),
    srcList() {
      let res = [];
      res.push(this.info.image);
      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.job-header {
  width: 1150px;
  margin: 50px auto;
  display: flex;
  .left,
  .right {
    margin: 0 20px;
    flex: 1;
  }
  .left {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .titleBox {
      width: 100%;
      display: flex;
    }
    .desc {
      font-size: 16px;
      color: #909399;
      margin: 10px 0;
    }
    .recommend {
      height: 55px;
      display: flex;
      align-items: center;
      font-size: 15px;
      .icon {
        font-size: 24px;
      }
    }
    .title {
      max-width: 380px;
      margin-right: 20px;
      color: #0097d0;
      font-size: 32px;
      letter-spacing: 5px;
      color: #0097d0;
    }
    .infos {
      display: flex;
      align-items: center;
      .logo {
        width: 50px;
        height: 50px;
        object-fit: cover;
      }
      .name {
        margin-left: 15px;
        font-size: 18px;
      }
      /deep/.el-avatar > img {
        width: 100%;
        height: 100%s;
      }
    }
    .btns {
      display: flex;
      align-items: center;
      margin: 25px 0 0 0;
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
    }
  }
  .right {
    .bgImg {
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      width: 100%;
      height: 300px;
    }
  }
}
</style>
