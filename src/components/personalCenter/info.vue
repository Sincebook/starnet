<template>
  <div class="info-box">
    <div class="title">
      <div class="name">个人资料</div>
    </div>
    <div class="info">
      <div class="info-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          :disabled="flag"
        >
          <el-form-item label="头像">
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
          <el-form-item label="昵称" prop="nick">
            <el-input
              v-model="ruleForm.nick"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input disabled v-model="phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="flag" @click="submitForm()"
              >保存</el-button
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
  extraInfo
} from '../../ajax/index';
export default {
  props: ['info'],
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        avatarImg: {},
        nick: ''
      },
      phone: '',
      rules: {
        nick: [
          { required: true, validator: this.checkNick, trigger: 'blur' }
        ]
      },
      flag: false
    };
  },
  methods: {
    async upload(content) {
      this.ruleForm.avatarImg = content.file;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          extraInfo({
            name: this.ruleForm.nick,
            head: this.ruleForm.avatarImg
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$emit('change');
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
    checkNick(rule, value, callback) {
      const reg = /^[\w\u4e00-\u9fa5]+$/gi;
      if (!value) {
        return callback(new Error('昵称不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('只允许设置中文、英文、数字、下划线'));
      } else if (value.length < 2 || value.length > 6) {
        return callback(new Error('长度在 2 到 6 个字符'));
      } else {
        callback();
      }
    }
  },
  watch: {
    info: function (newVal, oldVal) {
      this.ruleForm.nick = newVal.name;
      this.phone = newVal.phone;
      this.imageUrl = newVal.head;
    },
    deep: true
  },
  created() {
    this.ruleForm.nick = this.info.name;
    this.phone = this.info.phone;
    this.imageUrl = this.info.head;
  }
};
</script>

<style lang="less" scoped>
.info-box {
  .info {
    padding: 25px 50px;
  }
  .el-input,
  .el-select,
  .el-cascader,
  .el-textarea {
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
