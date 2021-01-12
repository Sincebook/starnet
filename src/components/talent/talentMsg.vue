<template>
  <div class="talent-msg">
    <h4 class="headtitle">留 言</h4>
    <div class="nav">
      <div class="container">
        <div class="left">留言</div>
        <div class="right">
          <div class="sort">
            <el-dropdown
              trigger="click"
              placement="bottom"
              @command="handleCommand"
            >
              <span class="el-dropdown-link">
                {{ "排序(" + sort + ")" }}
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in sortType"
                  :key="item.id"
                  :command="item.name"
                  >{{ item.name }}</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <div class="deafult-none" v-if="isHave === false">
      暂无留言,赶快第一个留言吧~
    </div>
    <div v-else class="list">
      <criticism
        v-for="item in list"
        :key="item.name + item.id"
        :item="item"
      ></criticism>
      <div v-if="msgList.length > 5" style="text-align: right">
        <span class="openList" @click="isAll = !isAll">{{
          isAll ? "收起" : "展开更多"
        }}</span>
      </div>
    </div>
    <div class="textarea">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="0"
        :disabled="!isLogin"
      >
        <el-form-item prop="msgValue">
          <el-input
            maxlength="150"
            :show-word-limit="true"
            resize="none"
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }"
            v-model="ruleForm.msgValue"
            placeholder="请输入您的留言~"
          ></el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 0; text-align: right">
          <el-button type="primary" @click="submitForm">发表</el-button>
        </el-form-item></el-form
      >
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Criticism from '../common/criticism.vue';
import { getAllMomes, addMemos } from '@/ajax';
export default {
  data() {
    return {
      isHave: false,
      isAll: false,
      msgList: [],
      sortType: [{
        id: 1, name: '正序'
      }, {
        id: 2, name: '倒序'
      }],
      sort: '正序',
      ruleForm: {
        msgValue: ''
      },
      rules: {
        msgValue: [
          { required: true, message: '留言不能为空', trigger: 'blur' }
        ]
      }
    };
  },
  created() {
    this.getMsg();
  },
  methods: {
    // 获取留言
    getMsg() {
      getAllMomes({ toid: this.$route.query.userid }).then(res => {
        if (res.code === '0' && res.data.length !== 0) {
          this.isHave = true;
          this.msgList = res.data.reverse();
        } else {
          this.isHave = false;
        }
      }).catch(err => {
        return err;
      });
    },
    handleCommand(command) {
      if (this.sort !== command) {
        this.sort = command;
        this.msgList = this.msgList.reverse();
      }
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          addMemos({ toid: this.$route.query.userid, word: this.ruleForm.msgValue }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '发表成功',
                type: 'success'
              });
              this.$refs.ruleForm.resetFields();
              this.getMsg();
            } else {
              this.$message.error(res.errMsg);
            }
          }).catch(err => {
            return err;
          });
        }
      });
    }
  },
  components: {
    Criticism
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin
    }),
    list() {
      if (!this.isAll) {
        return this.msgList.slice(0, 5);
      } else {
        return this.msgList;
      }
    }
  }
};
</script>
<style lang='less' scoped>
.talent-msg {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    color: #333;
  }
  .deafult-none {
    text-align: center;
    font-size: 30px;
    margin: 30px;
  }
  .textarea {
    margin: 0 30px;
    /deep/.el-textarea__inner {
      padding: 5px 8px;
    }
  }
  .list {
    padding: 30px;
    .openList {
      cursor: pointer;
      color: #909399;
      transition: color 0.25s;
      &:hover {
        color: #333;
      }
    }
  }
  .nav {
    margin-top: 30px;
    background-color: #c9cbca;
    width: 100%;
    font-size: 16px;
    .container {
      margin: 0 auto;
      height: 60px;
      width: 1050px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .right .sort {
      margin-left: 100px;
      .el-dropdown {
        cursor: pointer;
        color: var(--fontColor);
        font-size: 16px;
      }
    }
  }
}
</style>
