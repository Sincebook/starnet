<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业认证</div>
    </div>
    <div class="info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <div class="desc">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess2"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.companyImg"
              :src="ruleForm.companyImg"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <el-input
            resize="none"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="ruleForm.desc"
            placeholder="请输入公司简介和代表作品"
          ></el-input>
        </div>

        <el-form-item label="公司Logo" prop="companyLogo">
          <el-upload
            class="avatar-uploader logo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.companyLogo"
              :src="ruleForm.companyLogo"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
        ></el-form-item>
        <el-form-item label="组织机构码" prop="id">
          <el-input
            v-model="ruleForm.id"
            placeholder="请输入组织机构代码"
          ></el-input>
        </el-form-item>
        <el-form-item label="公司名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请输入公司名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="成立时间" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="请选择成立时间"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="公司类别" prop="kind">
          <el-select v-model="ruleForm.kind" placeholder="请选择类别">
            <el-option
              v-for="item in kindList"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="法人代表" prop="representative">
          <el-input
            v-model="ruleForm.representative"
            placeholder="请输入法人代表"
          ></el-input>
        </el-form-item>
        <el-form-item label="企业地点" prop="home">
          <el-cascader
            clearable
            v-model="ruleForm.home"
            :props="{ label: 'value' }"
            :options="homeList.home"
            placeholder="请选择地点"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="经营范围" prop="range">
          <el-input
            v-model="ruleForm.range"
            placeholder="请输入经营范围"
          ></el-input>
        </el-form-item>
        <el-form-item label="营业执照" prop="companyIdcard">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess1"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="ruleForm.companyIdcard"
              :src="ruleForm.companyIdcard"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload
        ></el-form-item>
        <el-form-item>
          <span class="state">未认证</span>
          <el-button type="primary" @click="submitForm()">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import home from './home.json';
export default {
  data() {
    return {
      ruleForm: {
        companyLogo: '//ftp.qnets.cn/img/bg3.jpg',
        companyImg: '',
        companyIdcard: '//ftp.qnets.cn/img/bg1.jpg',
        id: '',
        name: '森思',
        birthday: '',
        kind: '',
        representative: '邓奎',
        home: [],
        range: '',
        desc: ''
      },
      homeList: [],
      rules: {
        id: [
          { required: true, message: '组织机构代码不能为空', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '时间不能为空', trigger: 'blur' }
        ],
        kind: [
          { required: true, message: '种类不能为空', trigger: 'blur' }
        ],
        representative: [
          { required: true, message: '法人代表不能为空', trigger: 'blur' }
        ],
        home: [
          { required: true, message: '地点不能为空', trigger: 'blur' }
        ],
        range: [
          { required: true, message: '经营范围不能为空', trigger: 'blur' }
        ],
        companyIdcard: [
          { required: true, message: '营业执照不能为空', trigger: 'blur' }
        ],
        companyLogo: [
          { required: true, message: '公司Logo不能为空', trigger: 'blur' }
        ]
      },
      kindList: [{
        value: '传媒'
      }, {
        value: '互联网'
      }, {
        value: '设计院'
      }, {
        value: '视野'
      }]
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.ruleForm.companyLogo = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess1(res, file) {
      this.ruleForm.companyIdcard = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess2(res, file) {
      this.ruleForm.companyImg = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
  },
  mounted() {
    this.homeList = home;
  }
};
</script>

<style lang="less" scoped>
.info-box {
  .info {
    padding: 25px 50px;
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 25px;
  }
  .desc {
    display: flex;
    margin-bottom: 25px;
    width: 100%;
    .el-textarea {
      flex: 1;
      margin-left: 25px;
    }
    /deep/ .avatar-uploader {
      height: 135px;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 135px;
      height: 135px;
      line-height: 135px;
      text-align: center;
    }
    .avatar {
      width: 135px;
      height: 135px;
      display: block;
      cursor: pointer;
    }
  }
  .el-form-item {
    width: 50%;
    .el-input,
    .el-select,
    .el-cascader {
      width: 100%;
    }
    .logo {
      height: 54px;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 54px;
        height: 54px;
        line-height: 54px;
        text-align: center;
      }
      .avatar {
        width: 54px;
        height: 54px;
        display: block;
        cursor: pointer;
      }
    }
    &:nth-last-child(2) {
      width: 100%;
    }
    &:last-child {
      width: 100%;
      position: relative;
      .state {
        position: absolute;
        right: 90px;
        display: block;
        text-align: center;
        padding: 0 15px;
        height: 40px;
        background: #8c939d;
        color: #fff;
        border-radius: 4px;
      }
      .state1 {
        background: #ff9933;
      }
      .state2 {
        background: #339933;
      }
      .state3 {
        background: #ff3300;
      }
      .el-button {
        position: absolute;
        right: 0;
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
}
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
/deep/ .avatar-uploader {
  height: 110px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 162px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 162px;
  height: 108px;
  display: block;
  cursor: pointer;
}
</style>
