<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业认证</div>
    </div>
    <div class="info" v-if="info.status === 2">
      <el-alert :closable="false" title="您已认证成功" type="success" show-icon>
      </el-alert>
    </div>
    <div class="info" v-if="info.status === 1 && companyInfo.status === 1">
      <el-alert :closable="false" title="正在审核中" type="warning" show-icon>
      </el-alert>
    </div>
    <div class="info" v-if="info.status === 1 && companyInfo.status === ''">
      <el-alert
        :closable="false"
        title="一个账号只可以和一个企业信息绑定，无法解绑或更换"
        type="warning"
        show-icon
      >
      </el-alert>
      <div class="info-content">
        <el-form
          :disabled="flag"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司Logo" prop="logo">
            <el-upload
              class="avatar-uploader logo"
              action=""
              :http-request="uploadLogo"
              :show-file-list="false"
              :on-success="handleLogoSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="logo" :src="logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="组织机构码" prop="organizationCode">
            <el-input
              v-model="ruleForm.organizationCode"
              placeholder="请输入组织机构代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="createTime">
            <el-date-picker
              v-model="ruleForm.createTime"
              type="date"
              placeholder="请选择成立时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="企业性质" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择企业性质">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司类型" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择公司类型">
              <el-option
                v-for="item in categoryList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人代表" prop="legalPerson">
            <el-input
              v-model="ruleForm.legalPerson"
              placeholder="请输入法人代表"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业地点" prop="area">
            <el-cascader
              clearable
              v-model="ruleForm.area"
              :props="{ label: 'value' }"
              :options="homeList.home"
              placeholder="请选择地点"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="经营范围" prop="managementRange">
            <el-input
              v-model="ruleForm.managementRange"
              placeholder="请输入经营范围"
            ></el-input>
          </el-form-item>
          <el-form-item label="代表作" prop="opus">
            <el-input
              v-model="ruleForm.opus"
              placeholder="请输入代表作"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司简介" prop="description">
            <el-input
              resize="none"
              type="textarea"
              :show-word-limit="true"
              maxlength="500"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.description"
              placeholder="请输入公司简介"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="businessLicense">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadBusinessLicense"
              :show-file-list="false"
              :on-success="handleBusinessLicenseSuccess"
              :before-upload="beforeUpload"
            >
              <img
                v-if="businessLicense"
                :src="businessLicense"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="公司照片" prop="image">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadImage"
              :show-file-list="false"
              :on-success="handleImageSuccess"
              :before-upload="beforeUpload"
            >
              <img v-if="image" :src="image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import home from './home.json';
import {
  celebrityCompany
} from '../../ajax/index';
export default {
  props: ['info', 'companyInfo'],
  data() {
    return {
      logo: '',
      image: '',
      businessLicense: '',
      ruleForm: {
        logo: '',
        image: '',
        businessLicense: '',
        organizationCode: '',
        name: '',
        createTime: '',
        type: '',
        category: '',
        legalPerson: '',
        area: '',
        managementRange: '',
        description: '',
        opus: ''
      },
      homeList: [],
      rules: {
        name: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '公司图片不能为空', trigger: 'change' }
        ],
        logo: [
          { required: true, message: '公司Logo不能为空', trigger: 'change' }
        ],
        businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'change' }
        ],
        createTime: [
          { required: true, message: '成立时间不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '企业性质不能为空', trigger: 'change' }
        ],
        area: [
          { required: true, message: '地点不能为空', trigger: 'change' }
        ],
        category: [
          { required: true, message: '公司类型不能为空', trigger: 'change' }
        ],
        legalPerson: [
          { required: true, message: '法人代表不能为空', trigger: 'blur' }
        ],
        organizationCode: [
          { required: true, message: '组织机构代码不能为空', trigger: 'blur' }
        ],
        managementRange: [
          { required: true, message: '经营范围不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '公司简介不能为空', trigger: 'blur' }
        ]
      },
      typeList: [{
        value: '无限公司'
      }, {
        value: '有限责任公司'
      }, {
        value: '两合公司'
      }, {
        value: '股份有限公司'
      }, {
        value: '股份两合公司'
      }],
      categoryList: [{
        value: '影视公司'
      }, {
        value: '经纪公司'
      }, {
        value: '模特公司'
      }, {
        value: '直播工会'
      }, {
        value: '配音公司'
      }, {
        value: '航飞公司'
      }, {
        value: '配乐公司'
      }, {
        value: '唱片公司'
      }, {
        value: '动画公司'
      }, {
        value: '租赁公司'
      }, {
        value: '调色公司'
      }],
      flag: false
    };
  },
  methods: {
    async uploadLogo(content) {
      this.ruleForm.logo = content.file;
    },
    async uploadBusinessLicense(content) {
      this.ruleForm.businessLicense = content.file;
    },
    async uploadImage(content) {
      this.ruleForm.image = content.file;
    },
    handleLogoSuccess(res, file) {
      this.logo = URL.createObjectURL(file.raw);
    },
    handleBusinessLicenseSuccess(res, file) {
      this.businessLicense = URL.createObjectURL(file.raw);
    },
    handleImageSuccess(res, file) {
      this.image = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 4MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          celebrityCompany(this.ruleForm).then(res => {
            if (res.code === '0') {
              console.log(res);
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag = false;
          }).catch(err => {
            this.flag = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.logo = '';
      this.businessLicense = '';
      this.image = '';
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
    .el-alert {
      margin: 0 0 25px;
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 25px;
  }
  .el-form-item {
    width: 50%;
    .el-input,
    .el-select,
    .el-cascader,
    .el-textarea {
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
    &:nth-last-child(4) {
      width: 100%;
    }
    &:last-child {
      width: 100%;
      text-align: right;
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
