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
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :disabled="disabled"
            >
              <img
                v-if="ruleForm.imageUrl"
                :src="ruleForm.imageUrl"
                class="avatar"
              />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i> </el-upload
          ></el-form-item>
          <el-form-item label="昵称" prop="nick">
            <el-input v-model="ruleForm.nick"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="ruleForm.sex" placeholder="请选择性别">
              <el-option
                v-for="item in sexList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="民族" prop="nation">
            <el-select v-model="ruleForm.nation" placeholder="请选择民族">
              <el-option
                v-for="item in nationList.nation"
                :key="item.id"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="国籍" prop="country">
            <el-select v-model="ruleForm.country" placeholder="请选择国籍">
              <el-option
                v-for="item in countryList.country"
                :key="item.en"
                :value="item.cn"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="居住地" prop="home">
            <el-cascader
              clearable
              v-model="ruleForm.home"
              :props="{ label: 'value' }"
              :options="homeList.home"
              placeholder="请选择居住地"
            ></el-cascader>
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
import nation from './nation.json';
import home from './home.json';
import country from './country.json';
export default {
  data() {
    return {
      ruleForm: {
        imageUrl: '//ftp.qnets.cn/img/bg3.jpg',
        nick: '空帆船',
        country: '',
        nation: '',
        sex: '',
        home: []
      },
      rules: {
        nick: [
          { required: true, message: '昵称不能为空', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        country: [
          { required: true, message: '国籍不能为空', trigger: 'blur' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'blur' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'blur' }
        ],
        home: [
          { required: true, message: '居住地不能为空', trigger: 'blur' }
        ]
      },
      homeList: [],
      countryList: [],
      nationList: [],
      sexList: [{
        value: '男'
      }, {
        value: '女'
      }],
      disabled: false
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
  mounted() {
    this.nationList = nation;
    this.homeList = home;
    this.countryList = country;
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
