<template>
  <div class="talentHeader">
    <div class="left">
      <div class="list">
        <el-image
          v-for="item in list"
          :key="'img' + item.path"
          class="img"
          :src="item.path"
          :preview-src-list="srcList"
          fit="cover"
        ></el-image>
      </div>
    </div>
    <div class="right">
      <div class="content">
        <div class="infos">
          <span class="name">{{ info.name }}</span>
          <span class="nickname">{{ info.nickname }}</span>
        </div>
        <div class="btns">
          <div class="btn msg" @click="openDialog">私信</div>
          <div v-if="!isFollow" class="btn flw" @click="follow">关注</div>
          <div v-else class="btn flw_s" @click="cancelFlw">已关注</div>
          <div class="btn font">粉丝数 {{ funs | setNum }}</div>
        </div>
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
import { getUserLifeImg, getFuns, addMsg, isFun, watchIt, noWatch } from '@/ajax';
export default {
  props: ['info'],
  data() {
    return {
      list: [],
      isFollow: false,
      replayMsg: '',
      funs: '',
      dialogVisible: false
    };
  },
  created() {
    getUserLifeImg({ userid: this.$route.params.id, type: 4, page: 1 }).then(res => {
      if (res.code === '0') {
        this.list = res.data.datas.slice(0, 4);
      }
    });
    if (this.$store.state.isLogin) {
      this.isFun(this.$route.query.userid);
    }
    this.getFuns(this.$route.query.userid);
  },
  methods: {
    openDialog() {
      if (!this.$store.state.isLogin) {
        this.$message.error('请先登录');
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
      if (!this.$store.state.isLogin) {
        this.$message.error('请先登录');
      } else {
        watchIt({ starid: this.$route.query.userid, name: this.info.name, image: this.info.image }).then(res => {
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
      noWatch({ starid: this.$route.query.userid }).then(res => {
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
    // 判断该用户是否关注了该明星
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
    }
  },
  computed: {
    srcList() {
      let res = this.list.map(item => {
        return item.path;
      });
      return res;
    }
  }
};
</script>
<style lang='less' scoped>
.talentHeader {
  height: 620px;
  width: 1200px;
  margin: 0 auto;
  display: flex;
  .left,
  .right {
    flex: 1;
    margin: 40px;
  }
  .left {
    margin-right: 20px;
    .list {
      display: flex;
      flex-wrap: wrap;
    }
    .img {
      display: block;
      margin: 5px;
      width: 260px;
      height: 260px;
    }
  }
  .right {
    margin-left: 20px;
    position: relative;
    .content {
      position: absolute;
      margin-left: 10px;
      top: 50%;
      transform: translateY(-50%);
    }
    .infos {
      &::after {
        content: "";
        display: block;
        width: 200px;
        height: 2px;
        background-image: linear-gradient(to right, #cccccc, #f5f5f5);
      }
    }
    .btns {
      display: flex;
      align-items: center;
      margin-top: 20px;
    }
    .name {
      letter-spacing: 10px;
      color: #0097d0;
      font-size: 32px;
    }
    .nickname {
      margin-left: 10px;
      font-size: 14px;
      color: #999;
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
