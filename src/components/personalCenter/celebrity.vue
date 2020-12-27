<template>
  <div class="info-box">
    <div class="title">
      <div class="name">实名认证</div>
    </div>
    <div class="info" v-if="info.status === 2">
      <el-alert :closable="false" title="您已认证成功" type="success" show-icon>
      </el-alert>
    </div>
    <div class="info" v-else>
      <el-alert
        :closable="false"
        title="一个账号只可以和一个实名信息绑定，无法解绑或更换"
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
import {
  celebrity
} from '../../ajax/index';
export default {
  props: ['info'],
  data() {
    return {
      flag: false,
      ruleForm: {
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
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          celebrity(this.ruleForm).then(res => {
            if (res.code === '0') {
              this.flag = false;
              this.$message({
                message: '认证成功',
                type: 'success'
              });
              this.info.status = 2;
              this.$emit('change');
            } else {
              this.$message.error(res.errMsg);
              this.flag = false;
            }
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
      this.imageUrl = '';
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
</style>
