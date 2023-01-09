<template>
  <div class="info-box">
    <div class="title">
      <div class="name">修改密码
        <span style="padding:0px 10px">|</span>
        <el-link type="primary" @click="active = !active">{{ active ? '验证码修改': '旧密码修改' }}</el-link>
      </div>
    </div>
    <div class="info" >
      <div class="info-content" v-show="active">
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
              type=password
              v-model="ruleForm.oldpassword"
              placeholder="请输入旧密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input
              type=password
              v-model="ruleForm.newpassword"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkpassword">
            <el-input
              type=password
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
      <div class="info-content" v-show="!active">
        <el-form
          :disabled="flag"
          :model="ruleForm1"
          :rules="rules1"
          ref="ruleForm1"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="手机号" class="phone">
            <el-input disabled :value="phone">
              <template slot="suffix">
                  <div
                    class="send-btn"
                    :style="isCode ? 'pointer-events:none' : ''"
                    @click="getCodes"
                  >
                    {{ isCode ? count + "S" : "获取验证码" }}
                  </div>
                </template>
            </el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              type=password
              v-model="ruleForm1.code"
              placeholder="请输入验证码"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newpassword">
            <el-input
              type=password
              v-model="ruleForm1.newpassword"
              placeholder="请输入新密码"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认新密码" prop="checkpassword">
            <el-input
              type=password
              v-model="ruleForm1.checkpassword"
              placeholder="确认新密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="changePasswordBycode()">提交</el-button>
            <el-button @click="resetForm1()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCode, changePassword, getMyinfo, changePasswordBycode } from '../../ajax/index';
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
      var validatePassBycode = (rule, value, callback) => {
        const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if (!reg.test(value)) {
          callback(new Error('新密码格式不正确'));
        }
        callback();
      };
      var validatePass1Bycode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.ruleForm1.newpassword) {
          callback(new Error('两次输入密码不一致'));
        } else {
          callback();
        }
      };

    return {
      flag: false,
      active: true,
      isCode: false,
      count: '',
      timer: null,
      ruleForm: {
        oldpassword: '',
        newpassword: '',
        checkpassword: ''
      },
      ruleForm1: {
        code: '',
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
      },
      rules1: {
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ],
        newpassword: [
          { required: true, message: '请设置新密码', trigger: 'blur' },
          { validator: validatePassBycode, trigger: 'blur' }
        ],
        checkpassword: [
          { required: true, message: '请确认新密码', trigger: 'blur' },
          { validator: validatePass1Bycode, trigger: 'blur' }
        ]
      }
    };
  },
  methods: {
    changePassword() {
     this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          changePassword(this.ruleForm)
            .then((res) => {
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
    changePasswordBycode() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          changePasswordBycode({
            code: this.ruleForm1.code,
            password: this.ruleForm1.newpassword
          })
            .then((res) => {
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
    getCodes() {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (reg.test(this.phone)) {
        getCode({
          type: '3',
          phone: this.phone
        })
          .then((res) => {
            if (res.code === '0') {
              if (!this.timer) {
                this.count = 60;
                this.isCode = true;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= 60) {
                    this.count--;
                  } else {
                    this.isCode = false;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000);
              }
              this.$message({
                message: '验证码已发送',
                type: 'success'
              });
            } else {
              this.$message.error(res.errMsg);
            }
          })
          .catch((err) => {
            return err;
          });
      }
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    resetForm1() {
      this.$refs.ruleForm1.resetFields();
    }
  },
  computed: {
    ...mapState({
      phone: (state) => state.userinfo.user.phone
    })
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
    .name{
      display: flex;
      align-items: center;
    }
  }
  .send-btn {
      margin-top: 6px;
      background: #ecf5ff;
      height: 28px;
      border-radius: 3px;
      color: #409eff;
      border: 1px solid #b3d8ff;
      font-size: 12px;
      padding: 7px;
      display: inline-block;
      line-height: 1;
      transition: 0.1s;
      user-select: none;
      cursor: pointer;
      &:hover {
        background: #409eff;
        color: #fff;
        border-color: #409eff;
      }
      &:active {
        border-color: #3a8ee6;
        background: #3a8ee6;
      }
    }
}
</style>
