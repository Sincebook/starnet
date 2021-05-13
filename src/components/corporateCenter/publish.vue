<template>
  <div class="info-box">
    <div class="title">
      <div class="name">发布职位</div>
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
    <div class="info" v-else>
      <div class="content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="90px"
          class="demo-ruleForm"
          :disabled="flag"
        >
          <el-form-item label="项目标题" prop="title">
            <el-input
              maxlength="30"
              v-model="ruleForm.title"
              placeholder="请输入项目标题"
            ></el-input>
          </el-form-item>
          <el-form-item label="截止日期" prop="endtime">
            <el-date-picker
              v-model="ruleForm.endtime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="项目照片" prop="image">
            <!--element上传图片按钮-->
            <el-upload
            :http-request="upload"
              class="avatar-uploader"
              action=""
              :show-file-list="false"
              :on-change='changeUpload'
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i> </el-upload>
               <!-- vueCropper 剪裁图片实现-->
            <el-dialog title="图片剪裁" :visible.sync="dialogVisible" append-to-body>
            <div class="cropper-content">
                <div class="cropper" style="text-align:center">
                <vueCropper
                    ref="cropper"
                    :img="option.img"
                    :outputSize="option.size"
                    :outputType="option.outputType"
                    :info="true"
                    :full="option.full"
                    :canMove="option.canMove"
                    :canMoveBox="option.canMoveBox"
                    :original="option.original"
                    :autoCrop="option.autoCrop"
                    :fixed="option.fixed"
                    :fixedNumber="option.fixedNumber"
                    :centerBox="option.centerBox"
                    :infoTrue="option.infoTrue"
                    :fixedBox="option.fixedBox"
                ></vueCropper>
                </div>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
            </el-dialog>
          </el-form-item>
          <el-form-item label="职位要求" prop="jobneed">
            <el-input
              maxlength="150"
              :show-word-limit="true"
              resize="none"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.jobneed"
              placeholder="请输入职位要求"
            ></el-input>
          </el-form-item>
          <el-form-item label="面试地点" prop="place">
            <el-input
              v-model="ruleForm.place"
              placeholder="请输入面试地点"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目周期" prop="worktime">
            <el-input
              v-model="ruleForm.worktime"
              placeholder="请输入项目周期"
            ></el-input>
          </el-form-item>
          <el-form-item label="项目详情" prop="description">
            <el-input
              maxlength="300"
              :show-word-limit="true"
              resize="none"
              type="textarea"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.description"
              placeholder="请输入项目详情"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="flag" type="primary" @click="submitForm">发布</el-button>
          </el-form-item>
        </el-form>
        <!--发布角色-->
        <div>
          <el-divider></el-divider>
          <div v-for="(role, index) in this.roles"  :key="'role'+index" >
            <el-form class="ruleForm2" label-width="100px">
              <el-form-item label="职位名称：">
                <span>{{ role.name }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span>{{ role.sex }}</span>
              </el-form-item>
              <el-form-item label="年龄：">
                <span>{{ role.age }}</span>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="detelerole(index)">移除</el-button>
              </el-form-item>
              <el-form-item label="招募人数：">
                <span>{{ role.nums }}</span>
              </el-form-item>
              <el-form-item label="薪资：">
                <span>{{ role.money }}</span>
              </el-form-item>
              <el-form-item label="职位详情：">
                <span>{{ role.description }}</span>
              </el-form-item>
            </el-form>
            <el-divider></el-divider>
          </div>
          <div class="warn">
              请在下方添加您所需要招募的项目职位（如：男女主角/配角群演/摄影师/灯光师等等）
          </div>
          <el-form
            :model="ruleForm1"
            :rules="rules1"
            ref="ruleForm1"
            label-width="90px"
            class="demo-ruleForm1"
            :disabled="flag"
          >
            <el-form-item label="职位名称" prop="name">
              <el-select
                v-model="ruleForm1.name"
                placeholder="请选择职位名称"
              >
                <el-option
                  v-for="item in jobType"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="性别" prop="sex">
              <el-select v-model="ruleForm1.sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sexList"
                  :key="item.value"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="年龄" prop="age">
              <el-input
                maxlength="10"
                v-model="ruleForm1.age"
                placeholder="请输入年龄 例如18-30"
              ></el-input>
            </el-form-item>
            <el-form-item label="招募人数" prop="nums">
              <el-input
                maxlength="10"
                v-model="ruleForm1.nums"
                placeholder="请输入招募人数"
              ></el-input>
            </el-form-item>
            <el-form-item label="薪资" prop="money">
              <el-input
                maxlength="10"
                v-model="ruleForm1.money"
                placeholder="请输入薪资"
              ></el-input>
            </el-form-item>
            <el-form-item label="职位详情" prop="description">
              <el-input
                maxlength="150"
                :show-word-limit="true"
                resize="none"
                type="textarea"
                :autosize="{ minRows: 6, maxRows: 6 }"
                v-model="ruleForm1.description"
                placeholder="请输入项目详情"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm1">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { addJob, getJobType } from '../../ajax/index';
import { formatDate } from '../../assets/js/date.js';
export default {
  props: ['info', 'companyInfo'],
  data() {
    return {
       fileinfor: '',
       dialogVisible: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [2.5, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      picsList: [], // 页面显示的数组
      // 防止重复提交
      loading: false,
      flag: false,
      imageUrl: '',
      imageData: '',
      ruleForm: {
        image: '',
        title: '',
        description: '',
        launch: '',
        place: '',
        jobneed: '',
        worktime: '',
        job: '',
        begintime: '',
        endtime: '',
        roles: []
      },
      roles: [],
      rules: {
        image: [
          { required: true, message: '项目照片不能为空', trigger: 'change' }
        ],
        title: [
          { required: true, message: '项目标题不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '项目详情不能为空', trigger: 'blur' }
        ],
        place: [
          { required: true, message: '面试地点不能为空', trigger: 'blur' }
        ],
        endtime: [
          { required: true, message: '截至日期不能为空', trigger: 'change' }
        ],
        worktime: [
          { required: true, message: '项目周期不能为空', trigger: 'blur' }
        ],
        jobneed: [
          { required: true, message: '职位要求不能为空', trigger: 'blur' }
        ]
      },
      ruleForm1: {
        name: '',
        sex: '',
        age: '',
        nums: '',
        money: '',
        description: ''
      },
      rules1: {
        name: [
          { required: true, message: '职位名字不能为空', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        age: [
          { required: true, message: '年龄不能为空', trigger: 'blur' }
        ],
        nums: [
          { required: true, message: '人数不能为空', trigger: 'blur' }
        ],
        money: [
          { required: true, message: '薪资不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '职位详情不能为空', trigger: 'blur' }
        ]
      },
      jobType: [],
      sexList: [{
        value: '男'
      }, {
        value: '女'
      }, {
        value: '不限'
      }]
    };
  },
  created() {
    getJobType().then(res => {
      if (res.code === '0') {
        this.jobType = res.data;
      }
    }).catch(err => {
      this.$message.error(err);
      return err;
    });
  },
  methods: {
    goCelebrity() {
      this.$emit('goCelebrity');
    },
    async upload(content) {
      this.ruleForm.image = content.file;
    },
    // 发布 项目/职位
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (this.roles.length === 0) {
            this.$message({
              message: '至少需要添加一个项目职位',
              type: 'error'
            });
            return;
          }
          this.ruleForm.launch = this.companyInfo.name;
          this.flag = true;
          this.ruleForm.begintime = new Date().getTime();
          let arr = [];
          this.roles.forEach(item => {
            arr.push(item.name);
          });
          this.ruleForm.job = arr.join(',');
          this.ruleForm.roles = JSON.stringify(this.roles);
          addJob(this.ruleForm).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '发布成功',
              type: 'success'
            });
            this.$refs.ruleForm.resetFields();
            this.imageUrl = '';
          } else {
            this.$message.error(res.errMsg);
          }
          this.flag = false;
      }).catch(err => {
          this.flag = false;
          this.$message.error(err);
          return err;
        }
      );
        }
      });
    },
    submitForm1() {
      this.$refs.ruleForm1.validate((valid) => {
        if (valid) {
          let item = {
            name: this.ruleForm1.name,
            sex: this.ruleForm1.sex,
            age: this.ruleForm1.age,
            nums: this.ruleForm1.nums,
            money: this.ruleForm1.money,
            description: this.ruleForm1.description
          };
          this.roles.push(item);
          this.$refs.ruleForm1.resetFields();
        }
      });
    },
    detelerole() {
    },
    changeUpload(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 20MB!');
        return false;
      }
      this.fileinfor = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img = URL.createObjectURL(file.raw);
        this.dialogVisible = true;
      });
    },
    finish() {
      this.$refs.cropper.getCropBlob((data) => {
      // data为base64格式地址
        // let arr = data.split(','); let mime = arr[0].match(/:(.*?);/)[1];
        // let bstr = atob(arr[1]); let n = bstr.length; let u8arr = new Uint8Array(n);
        // while (n--) {
        //   u8arr[n] = bstr.charCodeAt(n);
        // }
        // let bdata = new Blob([u8arr], { type: mime });
        // blob 转 file
        let file = new window.File([data], this.fileinfor.name, { type: 'image/jpeg' });
        this.imageUrl = window.URL.createObjectURL(data);
        this.ruleForm.image = file;
//         let fs = require('fs');
//         const path = Date.now() + '.jpg';
//         const base64 = data.replace(/^data:image\/\w+;base64,/, ''); // 去掉图片base64码前面部分data:image/png;base64
// // new Buffer 操作权限太大，v6.0后使用Buffer.from()创建构造函数
//         // eslint-disable-next-line node/no-deprecated-api
//         const dataBuffer = new Buffer(base64, 'base64'); // 把base64码转成buffer对象，
//         console.log(dataBuffer);
//         fs.writeFile(path, dataBuffer, function(err) { // 用fs写入文件
//           if (err) {
//             console.log(err);
//           } else {
//             console.log('写入成功！');
//           }
//         });
        // this.ruleForm.image = fs;
        // console.log(fs);
        console.log(file);
      });
      this.dialogVisible = false;
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
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
    .flex-warp {
      display: flex;
      justify-content: space-between;
    }
    .tabber {
      margin-bottom: 20px;
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
          width: 90px;
          height: 90px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 90px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            span {
              margin-right: 15px;
            }
          }
        }
        .user-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          span {
            transition: color 0.25s;
            cursor: pointer;
            &:hover {
              color: #409eff;
            }
          }
          .head {
            font-size: 15px;
            font-weight: 600;
            margin-right: 10px;
            cursor: pointer;
            transition: color 0.25s;
            &:hover {
              color: #409eff;
            }
          }
        }
        .user-btn {
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
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
  .info1 {
    .list {
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 80px;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .head1 {
            display: flex;
            align-items: center;
            .user-img {
              width: 30px;
              height: 30px;
              border-radius: 50%;
              margin-right: 10px;
            }
            div {
              display: flex;
              align-items: center;
              transition: color 0.25s;
              cursor: pointer;
              &:hover {
                color: #409eff;
              }
            }
          }
        }
        .user-name {
          height: 20px;
          margin-right: 10px;
        }
        .user-btn {
          height: 90px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 50%;
      .el-input,
      .el-select,
      .el-cascader,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      &:last-child {
        position: relative;
        /deep/.el-form-item__content{
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
  .ruleForm2{
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 25%;
      margin-bottom: 0;
      .el-input,
      .el-select,
      .el-cascader,
      .el-date-editor,
      .el-textarea {
        width: 100%;
      }
      &:last-child {
        span{
          word-break: break-all;
        }
      }
      &:nth-last-child(4) {
        text-align: right;
      }
      &:last-child {
        width: 100%;
      }
    }
  }
  .demo-ruleForm1 {
    display: flex;
    flex-wrap: wrap;
    .el-form-item {
      width: 33.333%;
      &:nth-last-child(2) {
        width: 66.667%;
      }
      &:last-child {
        position: relative;
        /deep/.el-form-item__content{
          position: absolute;
          right: 0;
          bottom: 0;
        }
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
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 342px;
    height: 138px;
    line-height: 138px;
    text-align: center;
  }
  .avatar {
    width: 342px;
    height: 138px;
    display: block;
    cursor: pointer;
  }
}
/deep/ .avatar-uploader {
  height: 140px;
}
.el-divider {
  margin: 15px 0;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
.warn {
  margin-bottom: 15px;
  font-size: 14px;
  color: #606266;
}
</style>
