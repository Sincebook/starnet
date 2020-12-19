<template>
  <div class="info-box">
    <div class="title">
      <div class="name">在招职位</div>
    </div>
    <div class="info notAllow" v-if="info.status === 1">
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
    <div class="info" v-else>
      <div class="tabber">
        <div :class="{ active: active == 0 }" @click="active = 0">发布职位</div>
        <div
          :class="{ active: active == 1 }"
          @click="changePage(1), (active = 1)"
        >
          已发布
        </div>
      </div>
      <div class="content" v-if="active == 0">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          :disabled="flag"
        >
          <el-form-item label="项目标题" prop="title">
            <el-input
              maxlength="10"
              v-model="ruleForm.title"
              placeholder="请输入项目标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位类型" prop="job">
            <el-input
              v-model="ruleForm.job"
              placeholder="请输入职位类型"
            ></el-input>
          </el-form-item>
          <el-form-item label="时间" prop="time">
            <el-date-picker
              v-model="ruleForm.time"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="年龄要求" prop="age">
            <el-input
              v-model="ruleForm.age"
              placeholder="请输入年龄要求"
            ></el-input>
          </el-form-item>
          <el-form-item label="性别要求" prop="sex">
            <el-input
              v-model="ruleForm.sex"
              placeholder="请输入性别要求"
            ></el-input>
          </el-form-item>
          <el-form-item label="面试地点" prop="place">
            <el-input
              v-model="ruleForm.place"
              placeholder="请输入面试地点"
            ></el-input>
          </el-form-item>
          <el-form-item label="职位要求" prop="jobneed">
            <el-input
              v-model="ruleForm.jobneed"
              placeholder="请输入职位要求"
            ></el-input>
          </el-form-item>
          <el-form-item label="工作周期" prop="worktime">
            <el-input
              v-model="ruleForm.worktime"
              placeholder="请输入工作周期"
            ></el-input>
          </el-form-item>
          <el-form-item label="薪酬" prop="money">
            <el-input
              v-model="ruleForm.money"
              placeholder="请输入薪酬"
            ></el-input>
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
          <el-form-item>
            <el-button type="primary" @click="submitForm">添加</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-divider></el-divider>
        <div class="recommend">
          <h4>项目介绍：</h4>
          <div class="flex-warp">
            <div style="width: 50%">
              <el-input
                v-model="projectItem.proTitle"
                placeholder="请输入项目名称"
              ></el-input>
              <el-input
                resize="none"
                type="textarea"
                :show-word-limit="true"
                maxlength="500"
                :autosize="{ minRows: 5, maxRows: 5 }"
                v-model="projectItem.proDesc"
                placeholder="请输入项目介绍"
              ></el-input>
            </div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="projectItem.proImg"
                :src="projectItem.proImg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="recommend">
          <h4>详情：</h4>
          <div class="flex-warp">
            <div style="width: 50%">
              <el-input
                resize="none"
                type="textarea"
                :show-word-limit="true"
                maxlength="500"
                :autosize="{ minRows: 5, maxRows: 5 }"
                v-model="projectItem.detail"
                placeholder="请输入详情介绍"
              ></el-input>
            </div>
          </div>
        </div>
        <el-divider></el-divider>
        <div class="recommend">
          <h4>添加职位：</h4>
          <div class="flex-warp">
            <div style="width: 50%">
              <el-select v-model="jobItem.id" placeholder="请选择职位">
                <el-option
                  v-for="item in jobList"
                  :key="item.value"
                  :value="item.id"
                  :label="item.value"
                >
                </el-option>
              </el-select>
              <el-input
                resize="none"
                type="textarea"
                :show-word-limit="true"
                maxlength="300"
                :autosize="{ minRows: 5, maxRows: 5 }"
                v-model="jobItem.desc"
                placeholder="请输入职位介绍"
              ></el-input>
            </div>
            <el-upload
              class="avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="jobItem.img" :src="jobItem.img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <div class="add-job-btn">
              <el-button type="primary" @click="addJob">添加职位</el-button>
            </div>
          </div>
        </div>
        <el-divider></el-divider> -->
        <div class="submit-box">
          <el-button type="primary" @click="submit">发布项目</el-button>
        </div>
      </div>
      <div class="content" v-else>
        <div class="list">
          <div class="item-box" v-for="item in 6" :key="item">
            <div class="item">
              <el-image class="user-img" :src="bgImg" fit="cover"></el-image>
              <div class="user-info">
                <div class="user-name">玛丽</div>
                <div class="content">女性，28到40岁</div>
                <div class="content oneLine">
                  雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤
                </div>
              </div>
              <div class="user-btn">
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  @click="openDialog(item), (dialogVisible = true)"
                  >查看详情</el-button
                >
                <el-button type="danger" size="mini" plain>删除</el-button>
              </div>
            </div>
            <el-divider></el-divider>
          </div>
        </div>
        <div class="footer-page">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page.sync="currentPage1"
            :page-size="7"
            layout="total, prev, pager, next"
            :total="123"
          >
          </el-pagination>
        </div>
        <el-dialog title="详情" :visible.sync="dialogVisible" width="600px">
          <div>啊沙发沙发的空间看到</div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">关闭</el-button>
          </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
import { companyJob } from '../../ajax/index';
export default {
  props: ['info'],
  data() {
    return {
      ruleForm: {
        title: '',
        image: '',
        job: '',
        age: '',
        sex: '',
        jobneed: '',
        place: '',
        money: '',
        worktime: '',
        begintime: '',
        endtime: ''
      },
      rules: {},
      active: 0, // 0 发布职位  1 已发布
      bgImg: '//ftp.qnets.cn/img/bg3.jpg',
      replay: '',
      replayTitle: '',
      dialogVisible: false,
      projectItem: {
        name: '',
        proTitle: '',
        proImg: '',
        proDesc: '',
        detail: ''
      },
      proId: undefined, // 选择的 项目id
      projectList: [{
        id: 1,
        value: '传媒'
      }, {
        id: 2,
        value: '互联网'
      }, {
        id: 3,
        value: '设计院'
      }, {
        id: 4,
        value: '视野'
      }],
      jobItem: {
        id: '',
        img: '',
        desc: ''
      },
      jobList: [{
        id: 1,
        value: '男一号'
      }, {
        id: 2,
        value: '女二号'
      }, {
        id: 3,
        value: '妹'
      }, {
        id: 4,
        value: '死人'
      }],
      currentPage1: 1
    };
  },
  methods: {
    changePage() {
    },
    goCelebrity() {
      this.$emit('goCelebrity');
    },
    addHonor() {
      console.log('add');
    },
    deleteHonor() {
      console.log('delete');
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 新建项目
    addNewProject() {
      console.log('新建项目');
    },
    // 删除项目
    deleteProject() {
      console.log('删除项目');
    },
    // 发布项目
    submit() {
      console.log('发布项目');
    },
    // 添加职位
    addJob() {
      console.log('添加职位');
    },
    handleAvatarSuccess(res, file) {
      this.projectItem.proImg = URL.createObjectURL(file.raw);
    },
    handleAvatarSuccess1(res, file) {
      this.jobItem.img = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    // 查看详情
    openDialog(item) {
      this.replayTitle = item;
      this.replay = '';
    }
  },
  created() {
    companyJob().then(res => {
      console.log(res);
    }).catch(err => {
      return err;
    });
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
    .flex-warp {
      display: flex;
      justify-content: space-between;
    }
    .tabber {
      display: flex;
      justify-content: center;
      div {
        padding: 0 10px;
        height: 30px;
        cursor: pointer;
        line-height: 30px;
        text-align: center;
        margin: 0 5px;
      }
      .active {
        color: #409eff;
        &::after {
          content: "";
          display: block;
          height: 2px;
          background: #409eff;
        }
      }
    }
    .list {
      margin-top: 20px;
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
          background-color: #ccc;
          background-repeat: no-repeat;
          background-position: center center;
          background-size: cover;
        }
        .user-info {
          flex: 1;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            margin-top: 5px;
          }
        }
        .user-name {
          font-size: 15px;
          font-weight: 600;
          margin-right: 10px;
        }
      }
    }
    .footer-page {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      bottom: 20px;
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 25px;
  }
  .el-form-item {
    width: 50%;
    .el-input,
    .el-select,
    .el-cascader,
    .el-date-editor,
    .el-textarea {
      width: 100%;
    }
    /deep/.el-date-editor {
      justify-content: space-between;
      .el-range-separator {
        width: 8% !important;
      }
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

/deep/.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.el-divider {
  margin: 15px 0;
}
</style>
