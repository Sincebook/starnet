<template>
  <div class="sign-box" :style="{ backgroundImage: 'url(' + signBg + ')' }">
    <div class="sign">
      <div class="logo">
        <img
          @click="$router.push('/home')"
          :src="logoImg"
          alt="绘星"
          class="nav-icon"
        />
        <h1 class="desc">让演艺梦想扬帆起航</h1>
      </div>
      <el-tabs v-model="activeName">
        <el-tab-pane label="注册" name="first">
          <el-form
            :model="ruleForm1"
            :rules="rules"
            ref="ruleForm1"
            class="demo-ruleForm"
          >
          <div class="content">
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
                    {{ isCode1 ? count1 + "S" : "获取验证码" }}
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
            <el-form-item style="margin-bottom:  15px " prop="password" >
              <el-input type="password" v-model="ruleForm1.password"  placeholder="密码 (密码为8-16的字母和数字)" maxlength="16" minlength="8"
              ></el-input>
            </el-form-item>
            <el-form-item class="register">
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
          </div>
            <div class="zcdiv">
            <el-button type="text" class="zc" @click="toSign">已有账号？登录</el-button>
            </div>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getCode, registerUser, getMyinfo } from '../ajax/index';
export default {
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      rememberPwd: false,
      typeList: [
        { id: 1, value: '个人用户' },
        { id: 4, value: '企业用户' }
      ],
      ruleForm1: {
        phone: '',
        code: '',
        type: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, validator: this.checkPhone, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '注册类型不能为空', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.checkPassword, trigger: 'blur' }
        ]
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
  created() {
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
      }
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
    checkPassword(rule, value, callback) {
      const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
      if (value === '') {
        return callback(new Error('密码不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('密码格式不正确'));
      }
        callback();
      },
    getUserinfo() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('isLogin', true);
          this.$store.commit('userinfo', res.data);
        }
      });
    },
    toSign() {
      this.$router.push('/sign');
    }
  }
};
</script>

<style lang="less" scoped>
.logo {
  position: absolute;
  width: 100%;
  top: -80px;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  .desc {
    margin: 10px 0;
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
    height: 80px;
  }
}
.content{
  margin: 0 15px;
}
.zcdiv{
    margin-top: 15px;
    width: 100%;
    height: 49px;
    background: #fafafa;
    border-top: 1px solid #F0F0F0;
    zoom: 1;
    font-size: 15px;
    .zc{
      margin-left: 35%;
      color:gray;
      &:hover {
        color: #409eff;
      }
    }
}
.register{
  margin-top: 26px;
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
    height: 480px;
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
</style>
