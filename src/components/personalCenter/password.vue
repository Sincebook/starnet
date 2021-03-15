<template>
  <div class="info-box">
    <div class="title">
      <div class="name">修改密码</div>
    </div>
    <div class="info" >
      <div class="info-content">
        <el-form
          :disabled="flag"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="旧密码" prop="oldpassword">
            <el-input
              v-model="ruleForm.oldpassword"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input
              v-model="ruleForm.newpassword"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkpassword">
            <el-input
              v-model="ruleForm.checkpassword"
              placeholder="确认新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePassword()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword, getMyinfo } from '../../ajax/index';
export default {
  data() {
    // 此处为发送表单之前验证
      var validatePass = (rule, value, callback) => {
          const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
          if (value === '') {
              callback(new Error('请输入密码'));
          } else if (value === this.ruleForm.oldpass) {
              callback(new Error('新密码不能与旧密码相同!'));
          } else if (!reg.test(value)) {
              callback(new Error('新密码格式不正确'));
          } else if (this.ruleForm.checkpass !== '') {
              this.$refs.ruleForm.validateField('checkpass');
          }
            callback();
          };
      var validatePass1 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm.newpassword) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

    return {
      flag: false,
      ruleForm: {
        oldpassword: '',
        newpassword: '',
        checkpassword: ''
      },
      rules: {
        oldpassword: [
          { required: true, message: '请输入原密码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: validatePass, trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    changePassword() {
      console.log('111111111111111');
     this.$refs.ruleForm.validate((valid) => {
       console.log('22222222222222222222');
       console.log(valid);
        if (valid) {
          console.log('333333333333333333333');
          changePassword(this.ruleForm)
            .then((res) => {
              console.log('44444444444444444');
              if (res.code === '0') {
                this.$message({
                  message: '密码修改成功',
                  type: 'success'
                });
                setTimeout(() => {
                  this.getUserinfo();
                  this.$router.push('/home');
                }, 1500);
              } else {
                console.log('密码或账号不正确');
                console.log(res.errMsg);
                this.$message.error(res.errMsg);
              }
            })
            .catch((err) => {
              return err;
            });
        } else {
          return false;
        }
      });
    },
    getUserinfo() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('isLogin', true);
          this.$store.commit('userinfo', res.data);
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
