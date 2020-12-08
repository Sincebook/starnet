<template>
  <div class="info-box">
    <div class="title">
      <div class="name">举报中心</div>
    </div>
    <div class="info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :disabled="flag"
      >
        <el-form-item label="证据" prop="image">
          <el-upload
            class="avatar-uploader"
            :http-request="upload"
            action=""
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeList"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="desc">
          <el-input
            resize="none"
            type="textarea"
            :show-word-limit="true"
            maxlength="150"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="ruleForm.desc"
            placeholder="请输入举报描述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="danger" @click="submitForm">举报</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  report
} from '../../ajax/index';
export default {
  data() {
    return {
      imageUrl: '',
      ruleForm: {
        image: '',
        desc: '',
        type: ''
      },
      rules: {
        desc: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '证据不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ]
      },
      typeList: [{
        value: '色情/违法等不良信息'
      }, {
        value: '欺诈骗钱行为'
      }, {
        value: '发布不当言论'
      }, {
        value: '其他违规行为'
      }],
      flag: false
    };
  },
  methods: {
    async upload(content) {
      this.ruleForm.image = content.file;
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
    // 举报
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          report({
            type: this.ruleForm.type,
            description: this.ruleForm.desc,
            image: this.ruleForm.image
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '举报成功',
                type: 'success'
              });
              this.$refs.ruleForm.resetFields();
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag = false;
          }).catch(err => {
            return err;
          });
        }
      });
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
    .el-textarea {
      width: 50%;
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
