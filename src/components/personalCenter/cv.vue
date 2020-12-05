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
        <el-form-item label="身高" prop="height">
          <el-input
            type="number"
            v-model="ruleForm.height"
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
import nation from './nation.json';
import home from './home.json';
import country from './country.json';
import {
  mineInfoDetail
} from '../../ajax/index';
export default {
  data() {
    return {
      ruleForm: {
        name: '',
        nickname: '',
        height: '',
        weight: '',
        country: '',
        nation: '',
        sex: '',
        home: [],
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
        height: [
          { required: true, message: '身高不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '体重不能为空', trigger: 'blur' }
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
    }
  },
  created() {
    mineInfoDetail().then(res => {
      if (res.code === '0') {
        this.ruleForm.name = (res.data.name === null ? '' : res.data.name);
        this.ruleForm.nickname = (res.data.nickname === null ? '' : res.data.nickname);
        this.ruleForm.height = (res.data.height === null ? '' : res.data.height);
        this.ruleForm.weight = (res.data.weight === null ? '' : res.data.weight);
        this.ruleForm.country = (res.data.country === null ? '' : res.data.country);
        this.ruleForm.nation = (res.data.nation === null ? '' : res.data.nation);
        this.ruleForm.sex = (res.data.sex === null ? '' : res.data.sex);
        this.ruleForm.home = (res.data.country === null ? [] : res.data.home);
        this.ruleForm.eyeColor = (res.data.eyeColour === null ? '' : res.data.eyeColour);
        this.ruleForm.skinColor = (res.data.skinColour === null ? '' : res.data.skinColour);
        this.ruleForm.hairColor = (res.data.hairColour === null ? '' : res.data.hairColour);
        this.ruleForm.hairType = (res.data.hairType === null ? '' : res.data.hairType);
        this.ruleForm.birthday = (res.data.birthTime === null ? '' : res.data.birthTime);
        this.ruleForm.job = (res.data.vocation === null ? '' : res.data.vocation);
        this.ruleForm.company = (res.data.company === null ? '' : res.data.company);
        this.ruleForm.works = (res.data.representativeWork === null ? '' : res.data.representativeWork);
        this.ruleForm.desc = (res.data.selfEvaluation === null ? '' : res.data.selfEvaluation);
      }
    });
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
