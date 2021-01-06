<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业信息</div>
    </div>
    <div class="info notAllow" v-if="userinfo.user.status === 1">
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
    <div class="info" v-if="companyInfo.status === 2">
      <el-form ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="公司Logo：" class="logo">
          <el-image class="companyLogo" fit="cover" :src="companyInfo.logo">
          </el-image
        ></el-form-item>
        <el-form-item label="组织机构码：">
          <span>{{ companyInfo.organizationCode }}</span>
        </el-form-item>
        <el-form-item label="公司名称：">
          <span>{{ companyInfo.name }}</span>
        </el-form-item>
        <el-form-item label="成立时间：">
          <span>{{ companyInfo.createTime }}</span>
        </el-form-item>
        <el-form-item label="企业性质：">
          <span>{{ companyInfo.type }}</span>
        </el-form-item>
        <el-form-item label="公司类型：">
          <span>{{ companyInfo.category }}</span>
        </el-form-item>
        <el-form-item label="法人代表：">
          <span>{{ companyInfo.legalPerson }}</span>
        </el-form-item>
        <el-form-item label="企业地点：">
          <span>{{ companyInfo.area }}</span>
        </el-form-item>
        <el-form-item label="经营范围：">
          <span>{{ companyInfo.managementRange }}</span>
        </el-form-item>
        <el-form-item label="代表作：">
          <span>{{ companyInfo.opus }}</span>
        </el-form-item>
        <el-form-item label="公司简介：">
          <div class="textarea">{{ companyInfo.description }}</div>
        </el-form-item>
        <el-form-item label="公司照片：">
          <el-image class="companyIdcard" fit="cover" :src="companyInfo.image">
          </el-image
        ></el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  props: ['companyInfo'],
  methods: {
    goCelebrity() {
      this.$emit('goCelebrity');
    }
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.userinfo
    })
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
    span {
      word-wrap: break-word;
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
