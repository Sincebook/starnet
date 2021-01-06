<template>
  <div class="company-card" @click="goPush(item.id)">
    <div class="company-head">
      <el-image class="bgImg" :src="item.image" fit="cover"></el-image>
    </div>
    <div class="company-content">
      <div class="img">
        <div class="outer"></div>
        <el-image class="aimg" :src="item.logo" fit="cover"></el-image>
      </div>
      <h2 class="name">{{ item.name }}</h2>
      <div class="desc">累计达成合作{{ item.oknum }}单</div>
      <div class="btn-box">
        <div class="btn msg" @click.stop="openDialog(item)">私信</div>
        <div
          class="btn"
          :class="two === '关注' ? 'flw' : 'flw_s'"
          @click.stop="watchIt"
        >
          {{ two }}
        </div>
      </div>
    </div>
    <!-- 私信对接弹窗 -->
    <el-dialog
      custom-class="dialog"
      append-to-body
      :before-close="handleClose"
      :title="'私信@' + selectItem.name"
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
        <el-button type="primary" @click="replay(selectItem.userid)"
          >确 定</el-button
        >
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { watchIt, noWatch, addMsg, isFun } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      two: '关注',
      selectItem: {},
      replayMsg: '',
      dialogVisible: false
    };
  },
  mounted() {
    if (this.$store.state.isLogin) {
      this.isFun();
    }
  },
  methods: {
    watchIt() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
        return;
      }
      if (this.two === '已关注') {
        this.two = '关注';
        noWatch({ starid: this.item.userid }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '已取消关注',
              type: 'success'
            });
          }
        }, reason => {
          this.$message({
            message: reason,
            type: 'error'
          });
        });
      } else {
        this.two = '已关注';
        watchIt({ starid: this.item.userid, name: this.item.name, image: this.item.image }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '关注成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '取消失败',
              type: 'error'
            });
          }
        });
      }
    },
    // 判断该用户是否关注了该明星
    isFun() {
      isFun({ starid: this.item.userid }).then(res => {
        if (res.data) {
          this.two = '已关注';
        }
      });
    },
    goPush(id) {
      this.$router.push('/companyDetail/' + id);
    },
    openDialog(item) {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
      } else {
        this.selectItem = item;
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
    }
  }
};
</script>

<style lang="less" scoped>
.company-card {
  cursor: pointer;
  text-align: center;
  user-select: none;
  position: relative;
  width: 270px;
  background-color: var(--cardBgColor);
  height: 310px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  &:hover {
    .company-head .bgImg {
      transform: scale(1.1);
    }
  }
  .company-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .company-content {
    width: 100%;
    padding: 120px 0 20px 0;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .img {
      height: 60px;
      background: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      .outer {
        position: absolute;
        top: 72px;
        background-color: #fff;
        width: 96px;
        height: 96px;
        border-radius: 50%;
      }
      .aimg {
        position: absolute;
        top: 75px;
        background-color: #fff;
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .name {
      width: 180px;
      display: inline-block;
      cursor: pointer;
      color: #333;
      font-weight: 600;
      margin-bottom: 10px;
      transition: all 0.25s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .desc {
      width: 100%;
      color: var(--fontColor);
      margin-bottom: 20px;
      font-size: 13px;
    }
    .btn-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .btn {
        width: 68px;
        height: 34px;
        border-radius: 4px;
        font-size: 14px;
        transition: all 0.25s;
        display: flex;
        align-items: center;
        justify-content: center;
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
