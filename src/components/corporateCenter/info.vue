<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业信息</div>
    </div>
    <div class="info notAllow" v-if="!isAllow">
      <el-alert
        title="您还没有进行企业认证"
        type="warning"
        :closable="false"
        center
        description="请前往企业认证页面进行认证或点击下方按钮进行跳转"
        show-icon
      >
      </el-alert>
      <div class="btn">
        <el-button type="primary" @click="goCelebrity">前往认证</el-button>
      </div>
    </div>
    <div class="info" v-else>
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司Logo：" class="logo">
          <el-image class="companyLogo" fit="cover" :src="ruleForm.companyLogo">
          </el-image
        ></el-form-item>
        <el-form-item label="组织机构码：">
          <span>{{ ruleForm.id }}</span>
        </el-form-item>
        <el-form-item label="公司名称：">
          <span>{{ ruleForm.name }}</span>
        </el-form-item>
        <el-form-item label="成立时间：">
          <span>{{ ruleForm.birthday }}</span>
        </el-form-item>
        <el-form-item label="公司类别：">
          <span>{{ ruleForm.kind }}</span>
        </el-form-item>
        <el-form-item label="法人代表：">
          <span>{{ ruleForm.representative }}</span>
        </el-form-item>
        <el-form-item label="企业地点：">
          <span>{{ ruleForm.home }}</span>
        </el-form-item>
        <el-form-item label="经营范围：">
          <span>{{ ruleForm.range }}</span>
        </el-form-item>
        <el-form-item label="经营范围：">
          <div class="textarea">{{ ruleForm.desc }}</div>
        </el-form-item>
        <el-form-item label="营业执照：">
          <el-image
            class="companyIdcard"
            fit="cover"
            :src="ruleForm.companyIdcard"
          >
          </el-image
        ></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAllow: true,
      ruleForm: {
        companyLogo: '//ftp.qnets.cn/img/bg3.jpg',
        companyImg: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        companyIdcard: '//ftp.qnets.cn/img/bg1.jpg',
        id: '123123124',
        name: '森思',
        birthday: '2019年1月2日',
        kind: '互联网',
        representative: '邓奎',
        home: [],
        range: '无',
        desc: '案件卡刷公交卡上课'
      }
    };
  },
  methods: {
    goCelebrity() {
      this.$emit('goCelebrity');
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  .notAllow {
    .btn {
      margin-top: 25px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .info {
    padding: 25px 50px;
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
    &:nth-last-child(2) {
      width: 90%;
    }
    .companyLogo {
      height: 54px;
      width: 54px;
      border-radius: 5px;
    }
    .textarea {
      line-height: 28px;
      padding: 8px 14px;
      border: 1px dashed rgba(153, 153, 153, 0.5);
      border-radius: 5px;
      // height: 135px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      line-clamp: 7;
      -webkit-box-orient: vertical;
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
}
</style>
