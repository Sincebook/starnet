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
        <!--邮箱登录-->
        <el-tab-pane label="邮箱登录" name="first">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <div class="content">
            <!--输入邮箱-->
            <el-form-item prop="email">
              <el-input
                type="text"
                v-model="ruleForm.email"
                placeholder="请输入邮箱">
                </el-input>
            </el-form-item>
            <!--输入密码-->
            <el-form-item style="margin-bottom:  15px " prop="password" >
              <el-input type="password" v-model="ruleForm.password"  placeholder="请输入密码" maxlength="16" minlength="8"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginbt" style="width: 100% " type="primary" @click="emailLogin()"
                >登录</el-button
              ></el-form-item>
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
            </div>
            <div class="zcdiv">
            <el-button type="text" class="zc" @click="toLogin">没有账号？注册</el-button>
            </div>
        </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { emailLogin, wxLogin, wbLogin, getMyinfo } from '../ajax/index';
export default {
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      ruleForm: {
        email: '',
        password: ''
      },
      rules: {
        email: [
          { required: true, validator: this.checkEmail, trigger: 'blur' }
        ],
        password: [
          { required: true, validator: this.checkPassword, trigger: 'blur' }]
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
    emailLogin() {
      console.log('11111111111111');
      console.log(this.ruleForm);
      this.$refs.ruleForm.validate((valid) => {
        console.log('22222222222222222222');
        console.log(valid);
        if (valid) {
          emailLogin(this.ruleForm)
            .then((res) => {
              if (res.code === '0') {
                this.$message({
                  message: '登录成功，正在跳转...',
                  type: 'success'
                });
                setTimeout(() => {
                  this.getUserinfo();
                  this.$router.push('/home');
                }, 1500);
              } else {
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
    checkEmail(rule, value, callback) {
      const verify = /^\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
      if (value === '') {
        return callback(new Error('邮箱不能为空'));
      } else if (!verify.test(value)) {
        return callback(new Error('邮箱格式错误，请重新输入'));
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
    },
    getUserinfo() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('isLogin', true);
          this.$store.commit('userinfo', res.data);
        }
      });
    },
    toLogin() {
      this.$router.push('/login');
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
      margin-top:5px;
      margin-left: 35%;
      color:gray;
      &:hover {
        color: #409eff;
      }
    }
}
.loginbt{
  margin-top: 10px;
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
    height: 350px;
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
      margin-bottom: 10px;
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
          font-size: 18px;
          color: #eb241b;
          margin-right: 5px;
        }
        .icon-weixin {
          margin-left: 160px;
          font-size: 20px;
          margin-right: 8px;
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
