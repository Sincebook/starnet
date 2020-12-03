<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业荣誉</div>
    </div>
    <div class="info notAllow">
      <el-input
        resize="none"
        type="textarea"
        :autosize="{ minRows: 6, maxRows: 6 }"
        v-model="desc"
        placeholder="请输入需要添加的公司荣誉"
      ></el-input>
      <div class="btn">
        <el-date-picker
          class="time-input"
          v-model="time"
          type="date"
          placeholder="请选择时间"
          format="yyyy 年 MM 月 dd 日"
          value-format="timestamp"
        >
        </el-date-picker>
        <el-button type="primary" @click="addHonor">添加</el-button>
      </div>
    </div>
    <div class="title">
      <div class="name">已编辑公司荣誉</div>
    </div>
    <div class="info">
      <div class="list">
        <div class="item-box" v-for="item in 5" :key="item">
          <div class="item">
            <div class="user-info">
              <div class="content twoLine">
                现代都市女性的职场发展史，该角色设置将为魅力四射，自信的表演者，他们可以有才艺技能，适应能力强
                男演员或女演员 具有有效期内护照，可以接受出国拍摄要求
                勤奋的角色，健康的水平，有趣的精神和脚踏实地是必不可少的勤奋的角色，健康的水平，有趣的精神和脚踏实地是必不可少的勤奋的角色，健康的水平，有趣的精神和脚踏实地是必不可少的
              </div>
            </div>
            <div class="user-btn">
              <el-button type="danger" size="mini" plain @click="deleteHonor"
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
      desc: '',
      time: '',
      currentPage1: 1
    };
  },
  methods: {
    addHonor() {
      console.log('add');
    },
    deleteHonor() {
      console.log('delete');
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .notAllow {
    .btn {
      margin-top: 25px;
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
  .info {
    padding: 25px 50px;
    .list {
      .item {
        height: 43px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-info {
          flex: 1;
          margin-right: 20px;
          .content {
            margin-top: 5px;
          }
        }
      }
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    padding-top: 25px;
    margin-bottom: 25px;
    border: 1px dashed rgba(153, 153, 153, 0.5);
    border-radius: 5px;
  }
  .desc {
    display: flex;
    margin-bottom: 25px;
    width: 100%;
    .companyImg {
      width: 135px;
      height: 135px;
      border-radius: 5px;
    }
    .textarea {
      flex: 1;
      border: 1px dashed rgba(153, 153, 153, 0.5);
      border-radius: 5px;
      height: 135px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      line-clamp: 7;
      -webkit-box-orient: vertical;
      margin-left: 25px;
    }
  }
  .el-form-item {
    width: 50%;
    margin-bottom: 10px;
    &:first-child {
      margin-bottom: 0;
    }
    &:last-child {
      margin-top: 10px;
    }
    .companyLogo {
      height: 54px;
      width: 54px;
      border-radius: 5px;
    }
    .companyIdcard {
      height: 108px;
      width: 156px;
      border-radius: 5px;
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
