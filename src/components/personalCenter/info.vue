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
        >
          <el-form-item label="头像" prop="avatarImg">
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
  mineInfo
} from '../../ajax/index';
export default {
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        avatarImg: '',
        nick: ''
      },
      phone: '',
      rules: {
        nick: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        avatarImg: [
          { required: true, message: '头像不能为空', trigger: 'change' }
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
          // this.flag = true;
          // extraInfoDetail(this.ruleForm).then(item => {
          //   if (item.code === '0') {
          //     this.flag = false;
          //     return true;
          //   } else {
          //     this.$message.error(item.errMsg);
          //     this.flag = false;
          //   }
          // });
        } else {
          return false;
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
    }
  },
  created() {
    mineInfo().then(res => {
      if (res.code === '0') {
        this.ruleForm.nick = res.data.user.name;
        this.phone = res.data.user.phone;
        this.imageUrl = res.data.user.head;
      } else {
        this.$message.error(res.errMsg);
      }
    }).catch(err => {
      return err;
    });
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
