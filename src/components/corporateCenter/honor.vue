<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业荣誉</div>
    </div>
    <div class="info notAllow" v-if="userinfo.user.status === 1">
      <el-alert
        title="您还没有进行企业认证"
        type="warning"
        :closable="false"
        center
        description="请前往企业认证页面进行认证或点击下方按钮进行跳转"
        show-icon
      >
      </el-alert>
      <div class="btn">
        <el-button type="primary" @click="goCelebrity">前往认证</el-button>
      </div>
    </div>
    <div v-else>
      <div class="info notAllow">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="60px"
          class="demo-ruleForm"
          :disabled="flag"
        >
          <el-form-item label="标题" prop="title">
            <el-input
              maxlength="10"
              v-model="ruleForm.title"
              placeholder="请输入标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-date-picker
              class="time-input"
              v-model="ruleForm.time"
              type="date"
              placeholder="请选择时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="类型" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择类型">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
          </el-form-item>
          <el-form-item label="详情" prop="description">
            <el-input
              maxlength="150"
              :show-word-limit="true"
              resize="none"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.description"
              placeholder="请输入需要添加的公司荣誉"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="title">
        <div class="name">已编辑公司荣誉</div>
      </div>
      <div class="info">
        <el-alert
          v-if="!isHave"
          title="暂无荣誉"
          type="warning"
          :closable="false"
          show-icon
        ></el-alert>
        <div v-else class="list">
          <div class="item-box" v-for="item in list" :key="item.id">
            <div class="item">
              <div class="user-info">
                <div class="content flexwrap">
                  {{ item.title }} <span>{{ item.type }}</span>
                </div>
                <div
                  class="content"
                  v-html="'详情：' + item.description.replace(/\n/g, '<br>')"
                ></div>
                <div class="content" style="text-align: right">
                  {{ item.time }}
                </div>
              </div>
              <div class="user-btn">
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click="deleteHonor(item.id)"
                  >删除</el-button
                >
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  addGrade,
  getGrade,
  deleteGrade
} from '../../ajax/index';
export default {
  props: ['info'],
  data() {
    return {
      isHave: true,
      ruleForm: {
        title: '',
        time: '',
        type: '',
        description: ''
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        time: [
          { required: true, message: '时间不能为空', trigger: 'change' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '描述不能为空', trigger: 'blur' }
        ]
      },
      typeList: [
        {
          value: '企业荣誉'
        }, {
          value: '战略合作'
        }, {
          value: '公司业绩'
        }, {
          value: '授权证书'
        }, {
          value: '品牌形象'
        }
      ],
      flag: false,
      list: []
    };
  },
  methods: {
    goCelebrity() {
      this.$emit('goCelebrity');
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          addGrade(this.ruleForm).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '添加成功',
                type: 'success'
              });
              this.$refs.ruleForm.resetFields();
              this.getHonor();
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag = false;
          }).catch(err => {
            this.flag = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    },
    getHonor() {
      getGrade({ userid: this.userinfo.user.id }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
    },
    deleteHonor(id) {
      deleteGrade({
        id: id
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          this.getHonor();
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    }
  },
  created() {
    if (this.userinfo.status !== 1) {
      this.getHonor();
    }
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.userinfo
    })
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .notAllow {
    .btn {
      margin-top: 25px;
      width: 100%;
      display: flex;
      justify-content: center;
    }
  }
  .info {
    padding: 25px 50px;
    .list {
      .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .user-info {
          flex: 1;
          margin-right: 20px;
          .content {
            margin-top: 5px;
            &:first-child {
              margin-top: 0;
            }
          }
          .flexwrap {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
        }
      }
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
  }
  /deep/.el-form-item {
    width: 30%;
    margin-bottom: 20px;
    .el-input {
      width: 100%;
    }
    &:nth-last-child(2) {
      width: 10%;
      text-align: right;
    }
    &:nth-last-child(2) .el-form-item__content {
      margin-left: 0 !important;
    }
    &:last-child {
      width: 100%;
      margin: 0;
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
