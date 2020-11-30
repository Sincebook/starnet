<template>
  <div class="info-box">
    <div class="title">
      <div class="name">投递记录</div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item-box" v-for="item in 6" :key="item">
          <div class="item">
            <div
              class="user-img"
              :style="{ backgroundImage: 'url(' + bgImg + ')' }"
            ></div>
            <div class="user-info">
              <div class="user-name">玛丽</div>
              <div class="content">女性，28到40岁</div>
              <div class="content oneLine">
                雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤
              </div>
            </div>
            <div class="user-btn">
              <el-button
                type="primary"
                size="mini"
                plain
                @click="openDialog(item), (dialogVisible = true)"
                >查看详情</el-button
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
    <el-dialog title="详情" :visible.sync="dialogVisible" width="600px">
      <div>啊沙发沙发的空间看到</div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关闭</el-button>
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
          width: 80px;
          height: 80px;
          border-radius: 5px;
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
