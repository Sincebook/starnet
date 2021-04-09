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
        <!--密码登录-->
        <el-tab-pane label="密码登录" name="first">
          <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" class="demo-ruleForm">
            <div class="content">
            <el-form-item prop="phone">
              <el-input
                @input="ruleForm1.phone = ruleForm1.phone.replace(/\D/g, '')"
                type="text"
                maxlength="11"
                v-model="ruleForm1.phone"
                placeholder="请输入手机号">
                </el-input>
            </el-form-item>
            <el-form-item style="margin-bottom:  15px " prop="password" >
              <el-input type="password" v-model="ruleForm1.password"  placeholder="请输入密码" maxlength="16" minlength="8"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button class="loginbt" style="width: 100% " type="primary" @click="passwordUser()"
                >登录</el-button
              ></el-form-item>
             <div class="others-btn">
              <div class="btn" @click="wbLogin()">
                <svg class="icon icon-weibo" aria-hidden="true">
                  <use xlink:href="#icon-weibo"></use></svg
                >微博登录
              </div>
              <div class="btn" @click="emailLogin()">
                <svg t="1616829517386" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4466" width="200" height="200"><path d="M983.899806 785.385782V224.886223h0.180631l-0.180631-4.696419c-0.180632-5.238314-0.722526-10.476627-1.806315-15.714941-2.890104-25.469042-21.675781-44.977245-45.519139-47.686717H122.287529c-11.741048 0-23.482096 1.625684-34.861881 5.238314-30.346093 10.295996-50.757453 40.100194-50.576821 74.058917v534.849885c-0.361263 21.314518 5.780208 42.087141 17.701887 59.789028l0.361263 0.722526 5.418946 3.973893c18.243782 21.856412 44.977245 34.319986 73.517022 34.500618H904.421944c37.751984 0 70.265655-27.094726 79.477862-66.291763l0.180631-0.541894c0.361263-5.96084 0.361263-11.741048-0.180631-17.701888zM390.16405 547.494091l55.453872 49.854295 43.893456 40.100194c5.418945 5.96084 13.005468 9.57347 21.133886 9.57347 7.947786 0 15.534309-3.431999 21.133886-9.57347l101.153642-91.941436 272.753572 263.721997H126.622685L390.16405 547.494091z m120.119951 30.346092L111.449638 216.03528H115.604163c214.409596-0.903158 703.559711-2.890104 793.875463-0.361263l-399.195625 362.166166z m165.458458-69.72376l251.619686-227.956959v474.518963L675.742459 508.116423z m-328.568707 0.180631L93.205856 760.278003V278.895043l253.967896 229.402011z" fill="#d81e06" p-id="4467"></path></svg>
                邮箱登录
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
        <!--验证码登录-->
        <el-tab-pane label="验证码登录" name="second">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
            ><div class="content">
            <el-form-item prop="phone">
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
                    {{ isCode2 ? count2 + "S" : "获取验证码" }}
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
            ><el-form-item>
              <el-button class="loginbt" style="width: 100% " type="primary" @click="loginUser()"
                >登录</el-button
              ></el-form-item>
            <div class="others-btn">
              <div class="btn" @click="wbLogin()">
                <svg class="icon icon-weibo" aria-hidden="true">
                  <use xlink:href="#icon-weibo"></use></svg
                >微博登录
              </div>
              <div class="btn" @click="emailLogin()">
                <svg t="1616829517386" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4466" width="200" height="200"><path d="M983.899806 785.385782V224.886223h0.180631l-0.180631-4.696419c-0.180632-5.238314-0.722526-10.476627-1.806315-15.714941-2.890104-25.469042-21.675781-44.977245-45.519139-47.686717H122.287529c-11.741048 0-23.482096 1.625684-34.861881 5.238314-30.346093 10.295996-50.757453 40.100194-50.576821 74.058917v534.849885c-0.361263 21.314518 5.780208 42.087141 17.701887 59.789028l0.361263 0.722526 5.418946 3.973893c18.243782 21.856412 44.977245 34.319986 73.517022 34.500618H904.421944c37.751984 0 70.265655-27.094726 79.477862-66.291763l0.180631-0.541894c0.361263-5.96084 0.361263-11.741048-0.180631-17.701888zM390.16405 547.494091l55.453872 49.854295 43.893456 40.100194c5.418945 5.96084 13.005468 9.57347 21.133886 9.57347 7.947786 0 15.534309-3.431999 21.133886-9.57347l101.153642-91.941436 272.753572 263.721997H126.622685L390.16405 547.494091z m120.119951 30.346092L111.449638 216.03528H115.604163c214.409596-0.903158 703.559711-2.890104 793.875463-0.361263l-399.195625 362.166166z m165.458458-69.72376l251.619686-227.956959v474.518963L675.742459 508.116423z m-328.568707 0.180631L93.205856 760.278003V278.895043l253.967896 229.402011z" fill="#d81e06" p-id="4467"></path></svg>
                邮箱登录
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
import { getCode, loginUser, passwordUser, wxLogin, wbLogin, getMyinfo } from '../ajax/index';
export default {
  data() {
    return {
      logoImg: '//ftp.qnets.cn/since/logo.png',
      rememberPwd: false,
      ruleForm: {
        phone: '',
        code: ''
      },
      ruleForm1: {
        phone: '',
        password: ''
      },
      rules: {
        phone: [
          { required: true, validator: this.checkPhone, trigger: 'blur' }
        ],
        code: [{ required: true, message: '验证码不能为空', trigger: 'blur' }],
        password: [{ required: true, validator: this.checkPassword, trigger: 'blur' }]
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
      if (id === '2' && reg.test(this.ruleForm.phone)) {
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
    passwordUser() {
      console.log(this.ruleForm);
     this.$refs.ruleForm1.validate((valid) => {
       console.log(valid);
        if (valid) {
          passwordUser(this.ruleForm1)
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
    loginUser() {
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
    emailLogin() {
      this.$router.push({ path: '/email' });
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
      display: -webkit-box;      /* OLD - iOS 6-, Safari 3.1-6 */
      display: -moz-box;         /* OLD - Firefox 19- (buggy but mostly works) */
      display: -ms-flexbox;      /* TWEENER - IE 10 */
      display: -webkit-flex;     /* NEW - Chrome */
      align-items: center;
      justify-content: space-between;
      &::before,&::after {
        content: "";
        display: block;
      }
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
        .icon {
          font-size: 15px;
          margin-left:8px ;
          margin-right: 5px;
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
