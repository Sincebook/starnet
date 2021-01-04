<template>
  <div class="sign-box" :style="{ backgroundImage: 'url(' + signBg + ')' }">
    <div class="logo">
      <img
        @click="$router.push('/home')"
        :src="logoImg"
        alt="绘星"
        class="nav-icon"
      />
      <h1 class="desc">绘星让演艺梦想扬帆起航</h1>
    </div>

    <div class="sign">
      <el-tabs v-model="activeName">
        <el-tab-pane label="登录" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            ><el-form-item prop="phone">
              <el-input
                @input="ruleForm.phone = ruleForm.phone.replace(/\D/g, '')"
                type="text"
                maxlength="11"
                v-model="ruleForm.phone"
                placeholder="请输入手机号"
              >
                <template slot="suffix">
                  <div
                    class="send-btn"
                    :style="isCode2 ? 'pointer-events:none' : ''"
                    @click="getCodes('2')"
                  >
                    {{ isCode2 ? count2 : "获取验证码" }}
                  </div></template
                ></el-input
              ></el-form-item
            ><el-form-item prop="code" style="margin-bottom: 15px">
              <el-input
                @input="ruleForm.code = ruleForm.code.replace(/\D/g, '')"
                type="text"
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input> </el-form-item
            ><el-checkbox style="margin-bottom: 15px" v-model="rememberPwd"
              >记住密码</el-checkbox
            ><el-form-item>
              <el-button style="width: 100%" type="primary" @click="login()"
                >登录</el-button
              >
            </el-form-item>
            <div class="tips">
              登录即同意<el-link
                href="#/protocol/userProtocol"
                :underline="false"
                type="primary"
                >《绘星使用协议》</el-link
              >&<el-link
                href="#/protocol/privacy"
                :underline="false"
                type="primary"
                >《隐私协议》</el-link
              >
            </div>
            <div class="others-btn">
              <div class="btn" @click="wbLogin()">
                <svg class="icon icon-weibo" aria-hidden="true">
                  <use xlink:href="#icon-weibo"></use></svg
                >微博登录
              </div>
              <div class="btn" @click="wxLogin()">
                <svg class="icon icon-weixin" aria-hidden="true">
                  <use xlink:href="#icon-weixin1"></use></svg
                >微信登录
              </div>
            </div>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册" name="second">
          <el-form
            :model="ruleForm1"
            :rules="rules"
            ref="ruleForm1"
            class="demo-ruleForm"
          >
            <el-form-item prop="type">
              <el-select v-model="ruleForm1.type" placeholder="请选择注册类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="phone">
              <el-input
                @input="ruleForm1.phone = ruleForm1.phone.replace(/\D/g, '')"
                type="text"
                maxlength="11"
                v-model="ruleForm1.phone"
                placeholder="请输入手机号"
              >
                <template slot="suffix">
                  <div
                    class="send-btn"
                    :style="isCode1 ? 'pointer-events:none' : ''"
                    @click="getCodes('1')"
                  >
                    {{ isCode1 ? count1 : "获取验证码" }}
                  </div></template
                ></el-input
              >
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                @input="ruleForm1.code = ruleForm1.code.replace(/\D/g, '')"
                type="text"
                v-model="ruleForm1.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="register()"
                >注册</el-button
              >
            </el-form-item>
            <div class="tips">
              注册即同意<el-link
                href="#/protocol/userProtocol"
                :underline="false"
                type="primary"
                >《绘星使用协议》</el-link
              >&<el-link
                href="#/protocol/privacy"
                :underline="false"
                type="primary"
                >《隐私协议》</el-link
              >
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { getCode, registerUser, loginUser, wxLogin, wbLogin } from '../ajax/index';
export default {
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      rememberPwd: false,
      typeList: [
        { id: 1, value: '个人用户' },
        { id: 4, value: '企业用户' }
      ],
      ruleForm: {
        phone: '',
        code: ''
      },
      ruleForm1: {
        phone: '',
        code: '',
        type: ''
      },
      rules: {
        phone: [
          { required: true, validator: this.checkPhone, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '注册类型不能为空', trigger: 'change' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }]
      },
      activeName: 'first',
      isCode1: false,
      count1: '',
      timer1: null,
      isCode2: false,
      count2: '',
      timer2: null
    };
  },
  mounted() {
    this.$store.dispatch('getSignBg');
  },
  computed: {
    ...mapState({
      signBg: (state) => state.signBg
    })
  },
  methods: {
    getCodes(id) {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (id === '1' && reg.test(this.ruleForm1.phone)) {
        getCode({
          type: id,
          phone: this.ruleForm1.phone
        }).then((res) => {
          if (res.code === '0') {
            if (!this.timer1) {
              this.count1 = 60;
              this.isCode1 = true;
              this.timer1 = setInterval(() => {
                if (this.count1 > 0 && this.count1 <= 60) {
                  this.count1--;
                } else {
                  this.isCode1 = false;
                  clearInterval(this.timer1);
                  this.timer1 = null;
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
        });
      } else if (id === '2' && reg.test(this.ruleForm.phone)) {
        getCode({
          type: id,
          phone: this.ruleForm.phone
        })
          .then((res) => {
            if (res.code === '0') {
              if (!this.timer2) {
                this.count2 = 60;
                this.isCode2 = true;
                this.timer2 = setInterval(() => {
                  if (this.count2 > 0 && this.count2 <= 60) {
                    this.count2--;
                  } else {
                    this.isCode2 = false;
                    clearInterval(this.timer2);
                    this.timer2 = null;
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
    login() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          loginUser(this.ruleForm)
            .then((res) => {
              if (res.code === '0') {
                this.$message({
                  message: '登录成功，正在跳转...',
                  type: 'success'
                });
                setTimeout(() => {
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
    register() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          registerUser(this.ruleForm1)
            .then((res) => {
              if (res.code === '0') {
                this.$message({
                  message: '注册成功，正在跳转...',
                  type: 'success'
                });
                setTimeout(() => {
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
    checkPhone(rule, value, callback) {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (!value) {
        return callback(new Error('手机号不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('手机号格式不正确'));
      } else {
        callback();
      }
    },
    wxLogin() {
      wxLogin()
        .then((res) => {
          if (res.code === '0') {
            window.location.href = res.data;
          } else {
            this.$message.error(res.errMsg);
          }
        })
        .catch((err) => {
          return err;
        });
    },
    wbLogin() {
      wbLogin()
        .then((res) => {
          if (res.code === '0') {
            window.location.href = res.data;
          } else {
            this.$message.error(res.errMsg);
          }
        })
        .catch((err) => {
          return err;
        });
    }
  }
};
</script>

<style lang="less" scoped>
.logo {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  top: 220px;
  text-align: center;
  .desc {
    margin: 25px 0;
    color: #fff;
    letter-spacing: 20px;
    text-indent: 20px;
    font-size: 16px;
    line-height: 1.5;
    font-variant: small-caps;
    text-shadow: 0 0 1px #0000003d;
    font-weight: 300;
  }
  .nav-icon {
    cursor: pointer;
    height: 40px;
  }
}
.sign-box {
  position: relative;
  overflow: hidden;
  z-index: 1;
  height: 100vh;
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  .sign {
    position: absolute;
    width: 360px;
    height: 370px;
    border-radius: 4px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
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
    .el-select {
      width: 100%;
    }
    .tips {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 18px;
    }
    .others-btn {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        &:hover {
          color: #409eff;
        }
        .icon-weibo {
          font-size: 30px;
          color: #eb241b;
          margin-right: 5px;
        }
        .icon-weixin {
          font-size: 28px;
          margin-right: 10px;
          color: #97dc73;
        }
      }
    }
  }
}
/deep/.el-tabs__header {
  margin: 10px 15px 25px;
}
/deep/.el-tabs__nav {
  float: none;
  width: 100%;
  display: flex;
}
/deep/.el-tabs__item {
  flex: 1;
  padding: 0;
  text-align: center;
  font-size: 16px;
}
/deep/.el-tabs__content {
  margin: 0 15px;
}
</style>
