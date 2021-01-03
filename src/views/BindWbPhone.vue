<template>
  <div class="sign-box" :style="{ backgroundImage: 'url(' + signBg + ')' }">
    <div class="sign">
      <el-tabs v-model="activeName">
        <el-tab-pane label="绑定手机号" name="first">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            class="demo-ruleForm"
          >
            <el-form-item prop="type">
              <el-select v-model="ruleForm.type" placeholder="请选择用户类型">
                <el-option
                  v-for="item in typeList"
                  :key="item.id"
                  :value="item.id"
                  :label="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="phoneNum">
              <el-input
                @input="
                  ruleForm.phoneNum = ruleForm.phoneNum.replace(/\D/g, '')
                "
                type="text"
                maxlength="11"
                v-model="ruleForm.phoneNum"
                placeholder="请输入手机号"
              >
                <template slot="suffix">
                  <div
                    class="send-btn"
                    :style="isCode ? 'pointer-events:none' : ''"
                    @click="getCodes()"
                  >
                    {{ isCode ? count : "获取验证码" }}
                  </div></template
                ></el-input
              >
            </el-form-item>
            <el-form-item prop="code">
              <el-input
                @input="ruleForm.code = ruleForm.code.replace(/\D/g, '')"
                type="text"
                v-model="ruleForm.code"
                placeholder="请输入验证码"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button style="width: 100%" type="primary" @click="bind()"
                >绑定</el-button
              >
            </el-form-item>
            <div class="tips">
              绑定即同意<el-link :underline="false" type="primary"
                >《绘星使用协议》</el-link
              >&<el-link :underline="false" type="primary"
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
import {
  getBindCode,
  bindPhone
} from '../ajax/index';
export default {
  data() {
    return {
      typeList: [
        { id: 0, value: '已注册用户' },
        { id: 1, value: '个人用户' },
        { id: 4, value: '企业用户' }
      ],
      ruleForm: {
        phoneNum: '',
        code: '',
        type: ''
      },
      rules: {
        phoneNum: [
          { required: true, validator: this.checkPhone, trigger: 'blur' }
        ],
        type: [
          { required: true, message: '注册类型不能为空', trigger: 'change' }
        ],
        code: [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      },
      activeName: 'first',
      isCode: false,
      count: '',
      timer: null
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
    getCodes() {
      const reg = /^1[3|4|5|6|7|8|9]\d{9}$/;
      if (reg.test(this.ruleForm.phoneNum)) {
        getBindCode({
          phoneNum: this.ruleForm.phoneNum
        }).then(res => {
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
        }).catch(err => {
          return err;
        });
      }
    },
    bind() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          bindPhone(this.ruleForm).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '绑定成功，正在跳转...',
                type: 'success'
              });
              setTimeout(() => {
                this.$router.push('/home');
              }, 1500);
            } else {
              this.$message.error(res.errMsg);
            }
          }).catch(err => {
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
    }
  }
};
</script>

<style lang="less" scoped>
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
    width: 400px;
    height: 370px;
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
        .icon-qq {
          font-size: 30px;
          color: #66bde7;
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
