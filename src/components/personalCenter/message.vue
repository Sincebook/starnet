<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的私信</div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item-box" v-for="item in 7" :key="item">
          <div class="item">
            <div
              class="user-img"
              :style="{ backgroundImage: 'url(' + bgImg + ')' }"
            ></div>
            <div class="user-info">
              <span class="user-name">百事可乐</span>
              <span class="user-vip">普通会员</span>
              <div class="content twoLine">asdasd</div>
            </div>
            <div class="user-btn">
              <el-button
                type="primary"
                size="mini"
                plain
                @click="openDialog(item), (dialogVisible = true)"
                >回复</el-button
              >
              <el-button type="danger" size="mini" plain>删除</el-button>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="7"
        layout="total, prev, pager, next"
        :total="123"
      >
      </el-pagination>
    </div>
    <el-dialog title="回复" :visible.sync="dialogVisible" width="600px">
      <span>{{ replayTitle }}</span>
      <el-input
        resize="none"
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 8 }"
        placeholder="请输入内容"
        v-model="replay"
      >
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false"
          >确 定</el-button
        >
        <el-button @click="dialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: '//ftp.qnets.cn/img/bg3.jpg',
      currentPage1: 1,
      replay: '',
      replayTitle: '',
      dialogVisible: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openDialog(item) {
      this.replayTitle = item;
      this.replay = '';
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
          width: 50px;
          height: 50px;
          border-radius: 25px;
          background-color: #ccc;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .user-info {
          flex: 1;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            margin-top: 5px;
            height: 38px;
          }
        }
        .user-name {
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
}
</style>
