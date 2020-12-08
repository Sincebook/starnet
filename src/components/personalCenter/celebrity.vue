<template>
  <div class="info-box">
    <div class="title">
      <div class="name">实名认证</div>
    </div>
    <div class="info">
      <el-alert
        :closable="false"
        title="一个账号只可以和一个实名信息绑定，无法解绑或更换"
        type="warning"
      >
      </el-alert>
      <div class="info-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="真实姓名" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入真实姓名"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份证号" prop="idcard">
            <el-input
              v-model="ruleForm.idcard"
              placeholder="请输入身份证号"
            ></el-input>
          </el-form-item>
          <el-form-item label="证件照" prop="imageFile">
            <el-upload
              class="avatar-uploader"
              :http-request="upload"
              action=""
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i> </el-upload
          ></el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="flag" @click="submitForm()"
              >提交</el-button
            >
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {
  celebrity
} from '../../ajax/index';
export default {
  data() {
    return {
      flag: false,
      imageUrl: '',
      ruleForm: {
        imageFile: '',
        name: '',
        idcard: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        idcard: [
          { required: true, validator: this.checkIdNum, trigger: 'blur' }
        ],
        imageFile: [
          { required: true, message: '证件图不能为空', trigger: 'change' }
        ]
      }
    };
  },
  methods: {
    async upload(content) {
      this.ruleForm.imageFile = content.file;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          celebrity(this.ruleForm).then(item => {
            if (item.code === '0') {
              this.flag = false;
              return true;
            } else {
              this.$message.error(item.errMsg);
              this.flag = false;
            }
          }).catch(err => {
            return err;
          });
        } else {
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.imageUrl = '';
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
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
    },
    checkIdNum(rule, value, callback) {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!value) {
        return callback(new Error('证件号码不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('证件号码不正确'));
      } else {
        callback();
      }
    }
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
  .el-input {
    width: 50%;
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
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
  cursor: pointer;
}
</style>
