<template>
  <div class="company-card" @click="goPush(item.id, item.userid)">
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
        <div v-if="!isFollow" class="btn flw" @click.stop="follow(item)">
          关注
        </div>
        <div v-else class="btn flw_s" @click.stop="cancelFlw(item)">已关注</div>
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
        <el-button type="primary" @click="replay(selectItem.userid)"
          >确 定</el-button
        >
        <el-button @click="handleClose">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { watchIt, noWatch, addMsg, isFun } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      isFollow: false, // 是否关注
      replayMsg: '', // 私信的内容
      selectItem: {},
      dialogVisible: false
    };
  },
  mounted() {
    if (this.isLogin) {
      this.isFun();
    }
  },
  methods: {
    // 关注
    follow(item) {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (Number(item.userid) === Number(this.userinfo.user.id)) {
        this.$message.error('不能关注自己');
      } else {
        watchIt({ starid: item.userid, name: item.name, image: item.image }).then(res => {
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
    cancelFlw(item) {
      noWatch({ starid: item.userid }).then(res => {
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
    isFun() {
      isFun({ starid: this.item.userid }).then(res => {
        if (res.data) {
          this.isFollow = true;
        }
      }).catch(err => {
        return err;
      });
    },
    goPush(id, userid) {
      this.$router.push('/companyDetail/' + id + '/' + userid);
    },
    openDialog(item) {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (Number(item.userid) === Number(this.userinfo.user.id)) {
        this.$message.error('不能私信自己');
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
    box-shadow: -8px -8px 16px -10px rgba(0, 0, 0, 0.3),
      8px 8px 16px -10px rgba(0, 0, 0, 0.3);
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
      display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;      /* TWEENER - IE 10 */
      display: -webkit-flex;     /* NEW - Chrome */
      align-items: center;
      justify-content: space-between;
      &::before,&::after {
        content: "";
        display: block;
      }
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
