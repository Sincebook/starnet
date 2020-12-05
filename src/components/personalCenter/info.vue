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
          <el-form-item>
            <el-button type="primary" :disabled="!flag" @click="submitForm()"
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
  mineInfoDetail,
  extraInfoDetail
} from '../../ajax/index';
export default {
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        avatarImg: '',
        nick: ''
      },
      rules: {
        nick: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        avatarImg: [
          { required: true, message: '头像不能为空', trigger: 'change' }
        ]
      },
      flag: true,
      timer: null
    };
  },
  methods: {
    async upload(content) {
      this.ruleForm.avatarImg = content.file;
    },
    submitForm() {
      // 通过 节流函数 实现3s只执行一次
      if (this.flag) {
        // 逻辑代码
        this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            extraInfoDetail(this.ruleForm).then(item => {
              if (item.code === '0') {
                return true;
              } else {
                this.$message.error(item.errMsg);
              }
            });
          } else {
            return false;
          }
        });
        this.flag = false;
        this.timer = setTimeout(() => {
          this.flag = true;
        }, 3000);
      }
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
    mineInfoDetail().then(res => {
      if (res.code === '0') {
        this.ruleForm.avatarImg = (res.data.image === null ? '' : res.data.image);
        this.ruleForm.nick = (res.data.nickname === null ? '' : res.data.nickname);
        this.ruleForm.sex = (res.data.sex === null ? '' : res.data.sex);
        this.ruleForm.nation = (res.data.nation === null ? '' : res.data.nation);
        this.ruleForm.country = (res.data.country === null ? '' : res.data.country);
        this.ruleForm.home = (res.data.country === null ? [] : res.data.home);
      }
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
