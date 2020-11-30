<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的简历</div>
    </div>
    <div class="info">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="爱称" prop="nickname">
          <el-input
            v-model="ruleForm.nickname"
            placeholder="请输入爱称"
          ></el-input>
        </el-form-item>
        <el-form-item label="身高" prop="hight">
          <el-input
            type="number"
            v-model="ruleForm.hight"
            placeholder="请输入身高"
          ></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input
            type="number"
            v-model="ruleForm.weight"
            placeholder="请输入体重"
          ></el-input>
        </el-form-item>
        <el-form-item label="眼睛颜色" prop="eyeColor">
          <el-input
            v-model="ruleForm.eyeColor"
            placeholder="请输入眼睛颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="皮肤颜色" prop="skinColor">
          <el-input
            v-model="ruleForm.skinColor"
            placeholder="请输入皮肤颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="头发颜色" prop="hairColor">
          <el-input
            v-model="ruleForm.hairColor"
            placeholder="请输入头发颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="头发类型" prop="hairType">
          <el-input
            v-model="ruleForm.hairType"
            placeholder="请输入头发类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthday">
          <el-date-picker
            v-model="ruleForm.birthday"
            type="date"
            placeholder="请选择出生日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="timestamp"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职业" prop="job">
          <el-input v-model="ruleForm.job" placeholder="请输入职业"></el-input>
        </el-form-item>
        <el-form-item label="经济公司" prop="company">
          <el-input
            v-model="ruleForm.company"
            placeholder="请输入经济公司"
          ></el-input>
        </el-form-item>
        <el-form-item label="代表作" prop="works">
          <el-input
            v-model="ruleForm.works"
            placeholder="请输入代表作"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="desc">
          <el-input
            resize="none"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="ruleForm.desc"
            placeholder="请输入个人描述"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        nickname: '',
        hight: '',
        weight: '',
        eyeColor: '',
        skinColor: '',
        hairColor: '',
        hairType: '',
        birthday: '',
        job: '',
        company: '',
        works: '',
        desc: ''
      },
      rules: {
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '爱称不能为空', trigger: 'blur' }
        ],
        hight: [
          { required: true, message: '身高不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '体重不能为空', trigger: 'blur' }
        ],
        eyeColor: [
          { required: true, message: '眼睛颜色不能为空', trigger: 'blur' }
        ],
        skinColor: [
          { required: true, message: '皮肤颜色不能为空', trigger: 'blur' }
        ],
        hairColor: [
          { required: true, message: '头发颜色不能为空', trigger: 'blur' }
        ],
        hairType: [
          { required: true, message: '头发类型不能为空', trigger: 'blur' }
        ],
        birthday: [
          { required: true, message: '出生日期不能为空', trigger: 'blur' }
        ],
        job: [
          { required: true, message: '职业不能为空', trigger: 'blur' }
        ],
        company: [
          { required: true, message: '经济公司不能为空', trigger: 'blur' }
        ],
        works: [
          { required: true, message: '代表作不能为空', trigger: 'blur' }
        ],
        desc: [
          { required: true, message: '个人描述不能为空', trigger: 'blur' }
        ]
      },
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
    }
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
  .el-form-item {
    width: 50%;
    .el-input,
    .el-select,
    .el-cascader,
    .el-textarea {
      width: 100%;
    }
    &:nth-last-child(2) {
      width: 100%;
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
