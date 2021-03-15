<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的私信</div>
    </div>
    <div class="info">
      <el-alert
        v-if="!isHave"
        title="暂无私信"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <div v-else class="list">
        <div class="item-box" v-for="item in list.datas" :key="item.id">
          <div class="item">
            <el-image class="user-img" :src="item.image" fit="cover"></el-image>
            <div class="user-info">
              <div class="head">
                <span class="user-name">{{ item.name }}</span>
                <span class="user-vip">{{
                  Number(item.uptime) | formatDate
                }}</span>
              </div>
              <div class="content twoLine">{{ item.message }}</div>
            </div>
            <div class="user-btn">
              <el-button
                type="primary"
                size="mini"
                plain
                @click="openDialog(item), (dialogVisible = true)"
                >回复</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="deteleMsg(item.id)"
                plain
                >删除</el-button
              >
            </div>
          </div>
          <el-divider></el-divider>
        </div>
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
    <el-dialog
      :before-close="handleClose"
      :title="'回复@' + selectItem.name"
      :visible.sync="dialogVisible"
      width="600px"
    >
      <div class="message">{{ "消息：" + selectItem.message }}</div>
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
import {
  mineMessage,
  replayMessage,
  deteleMessage
} from '../../ajax/index';
import { formatDate } from '../../assets/js/date.js';
export default {
  data() {
    return {
      isHave: true,
      currentPage: 1,
      nums: 6,
      list: [],
      selectItem: {},
      replayMsg: '',
      dialogVisible: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      mineMessage({ page: val, num: this.nums }).then(res => {
        if (res.code === '0' && res.data.datas.length !== 0) {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
    },
    openDialog(item) {
      this.selectItem = item;
    },
    handleClose() {
      this.dialogVisible = false;
      this.replayMsg = '';
    },
    // 回复消息
    replay(id) {
      replayMessage({
        toid: id,
        word: this.replayMsg
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '消息回复成功',
            type: 'success'
          });
          this.handleClose();
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    },
    // 删除消息
    deteleMsg(id) {
      deteleMessage({
        id: id
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '消息删除成功',
            type: 'success'
          });
          if (this.list.datas.length === 1 && this.currentPage !== 1) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    }
  },
  created() {
    mineMessage({ page: this.currentPage, num: this.nums }).then(res => {
      if (res.code === '0' && res.data.datas.length !== 0) {
        this.isHave = true;
        this.list = res.data;
      } else {
        this.isHave = false;
        this.$message.error('暂无私信');
      }
    }).catch(err => {
      this.isHave = false;
      this.$message.error(err);
      return err;
    });
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .info {
    padding: 25px 50px 0;
    .list {
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 80px;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .content {
            margin-top: 3px;
            height: 57px;
            -webkit-line-clamp: 3;
            line-clamp: 3;
          }
        }
        .user-name {
          height: 20px;
          font-size: 15px;
          font-weight: 600;
          margin-right: 10px;
        }
      }
    }
  }
  .title {
    font-size: 16px;
    padding: 0px 50px;
    background: #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  .footer-page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
  .message {
    margin-bottom: 18px;
    font-size: 16px;
  }
}
/deep/.el-dialog__body {
  padding: 5px 20px 10px;
}
</style>
