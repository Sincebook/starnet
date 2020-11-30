<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的收藏</div>
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
              <div class="user-name">韦小宝</div>
              <div class="content">
                <span>面试地点：上海</span> <span>年龄要求：18-40岁</span>
              </div>
              <div class="content oneLine">
                现代都市女性的职场发展史，该角色设置将为魅力四射，自信的表演者，他们可以有才艺技能，适应能力强
                男演员或女演员 具有有效期内护照，可以接受出国拍摄要求
                勤奋的角色，健康的水平，有趣的精神和脚踏实地是必不可少的
              </div>
            </div>
            <div class="user-btn">
              <el-button type="primary" size="mini" plain @click="detail()"
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: '//ftp.qnets.cn/img/bg3.jpg',
      currentPage1: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    detail() {
      // todo跳转到详情页
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
            span {
              margin-right: 15px;
            }
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
