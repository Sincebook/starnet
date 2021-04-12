<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业信息</div>
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
    <div class="info" v-if="companyInfo.status === 2">
      <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" class="demo-ruleForm">
        <!--公司logo-->
        <el-form-item label="公司Logo：" class="logo" prop="logo">
          <!-- <el-image class="companyLogo" fit="cover" :src="companyInfo.logo">
          </el-image> -->
          <el-upload
            class="avatar-uploader"
            :http-request="upload"
            action=""
            :show-file-list="false"
            :on-change='changeUpload'
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
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
          <!--公司照片-->
        <el-form-item label="公司照片：" prop="image" style="width:300px;height:100px">
          <el-upload
            class="avatar-uploader"
            :http-request="upload1"
            action=""
            :show-file-list="false"
            :on-change='changeUpload1'
          >
          <img v-if="imageUrl1" :src="imageUrl1" class="companyIdcard" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
          <el-dialog title="图片剪裁" :visible.sync="dialogVisible1" append-to-body>
            <div class="cropper-content">
              <div class="cropper" style="text-align:center">
                <vueCropper
                  ref="cropper"
                  :img="option.img1"
                  :outputSize="option.size"
                  :outputType="option.outputType"
                  :info="true"
                  :full="option.full"
                  :canMove="option.canMove"
                  :canMoveBox="option.canMoveBox"
                  :original="option.original"
                  :autoCrop="option.autoCrop"
                  :fixed="option.fixed"
                  :fixedNumber="option.fixedNumber1"
                  :centerBox="option.centerBox"
                  :infoTrue="option.infoTrue"
                  :fixedBox="option.fixedBox"
                ></vueCropper>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="finish1" :loading="loading1">确认</el-button>
            </div>
          </el-dialog>
          <!-- <el-image class="companyIdcard" fit="cover" :src="companyInfo.image">
          </el-image -->
        </el-form-item>
        <el-form-item label="机构代码：">
          <span>{{ companyInfo.organizationCode }}</span>
        </el-form-item>
        <el-form-item label="公司名称：">
          <span>{{ companyInfo.name }}</span>
        </el-form-item>
        <el-form-item label="成立时间：">
          <span>{{ companyInfo.createTime }}</span>
        </el-form-item>
        <el-form-item label="企业性质：">
          <span>{{ companyInfo.type }}</span>
        </el-form-item>
        <el-form-item label="公司类型：">
          <span>{{ companyInfo.category }}</span>
        </el-form-item>
        <el-form-item label="法人代表：">
          <span>{{ companyInfo.legalPerson }}</span>
        </el-form-item>
        <el-form-item label="企业地点：">
          <span>{{ companyInfo.area }}</span>
        </el-form-item>
        <el-form-item label="经营范围：">
          <span>{{ companyInfo.managementRange }}</span>
        </el-form-item>
        <!--代表作-->
        <el-form-item label="代表作：" prop="opus" style="width:90%">
          <el-input
              maxlength="100"
              :show-word-limit="true"
              v-model="ruleForm.opus"
              placeholder="请输入公司代表作"
              type="textarea"
              :rows="2"
            ></el-input>
          <!-- <span>{{ companyInfo.opus }}</span> -->
        </el-form-item>
        <!--公司简历-->
        <el-form-item label="公司简介：" prop="description">
            <el-input
              maxlength="500"
              :show-word-limit="true"
              v-model="ruleForm.description"
              placeholder="请输入公司简介"
              type="textarea"
              :rows="9"
            ></el-input>
          <!-- <div class="textarea">{{ companyInfo.description }}</div> -->
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="submit" :disabled="flag2" @click="submitForm()"
              >保存</el-button
            >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { companyInfo, modifyCompanyinfo } from '../../ajax/index';
import { VueCropper } from 'vue-cropper';
import { mapState } from 'vuex';
export default {
  components: {
    VueCropper
  },
  props: ['companyInfo'],
  data() {
    return {
      option: {
        img: '', // 裁剪图片的地址
        img1: '',
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: true, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        fixedNumber1: [270, 120], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      dialogVisible: false,
      dialogVisible1: false,
      fileinfor: '',
      imageUrl: '',
      loading: false,
      flag: false,
      fileinfor1: '',
      imageUrl1: '',
      loading1: false,
      flag1: false,
      status: 1,
      flag2: false,
    ruleForm: {
      logo: '', // 公司logo
      opus: '', // 公司代表作
      description: '', // 公司描述
      image: '' // 公司照片
    },
    rules: {
      logo: [
        { required: true, message: '公司Logo不能为空', trigger: 'change' }
      ],
      description: [
          { required: true, message: '公司简介不能为空', trigger: 'blur' }
      ],
      image: [
          { required: true, message: '公司图片不能为空', trigger: 'change' }
      ]
    }
  };
},
  methods: {
    async upload(content) {
      this.ruleForm.logo = content.file;
    },
    async upload1(content) {
      this.ruleForm.image = content.file;
    },
    goCelebrity() {
      this.$emit('goCelebrity');
    },
    changeUpload(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
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
          let file = new window.File([data], this.fileinfor.name, { type: 'image/jpeg' });
          this.imageUrl = window.URL.createObjectURL(data);
          this.ruleForm.logo = file;
          console.log(this.ruleForm.logo);
        });
        this.dialogVisible = false;
      },
    changeUpload1(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
        return false;
      }
      this.fileinfor1 = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img1 = URL.createObjectURL(file.raw);
        this.dialogVisible1 = true;
      });
      },
      finish1() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor1.name, { type: 'image/jpeg' });
          this.imageUrl1 = window.URL.createObjectURL(data);
          this.ruleForm.image = file;
          console.log(this.ruleForm.image);
        });
        this.dialogVisible1 = false;
      },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag2 = true;
          console.log(this.ruleForm.logo);
          console.log(this.ruleForm.image);
          console.log(this.ruleForm.opus);
          console.log(this.ruleForm.description);
          modifyCompanyinfo(this.ruleForm).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
            } else {
              this.$message.error(res.errMsg);
            }
            this.flag2 = false;
          }).catch(err => {
            this.flag2 = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    }
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.userinfo
    })
  },
  watch: {
    userinfo: function (newVal, oldVal) {
      this.status = newVal.status;
      console.log(this.status);
    },
    deep: true
  },
  created() {
    this.status = this.userinfo.user.status;
    console.log(this.userinfo.user.id);
    if (this.userinfo.user.status !== 1) {
      companyInfo({
        id: this.userinfo.user.id
      }).then(res => {
        if (res.code === '0') {
        this.imageUrl = (res.data.logo === null ? '' : res.data.logo);
        this.ruleForm.opus = (res.data.opus === null ? '' : res.data.opus);
        this.ruleForm.description = (res.data.description === null ? '' : res.data.description);
        this.imageUrl1 = (res.data.image === null ? '' : res.data.image);
        this.ruleForm.image = res.data.image;
        this.ruleForm.logo = res.data.logo;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
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
  }
  .demo-ruleForm {
    display: flex;
    flex-wrap: wrap;
    padding-top: 25px;
    margin-bottom: 25px;
    border: 1px dashed rgba(153, 153, 153, 0.5);
    border-radius: 5px;
  }
  .desc {
    display: flex;
    margin-bottom: 25px;
    width: 100%;
    .companyImg {
      width: 135px;
      height: 135px;
      border-radius: 5px;
    }
  }
  .el-form-item {
    width: 50%;
    margin-bottom: 10px;
    &:first-child {
      margin-bottom: 0;
    }
    &:last-child {
      margin-top: 10px;
    }
    &:nth-last-child(2) {
      width: 90%;
    }
    .companyLogo {
      height: 54px;
      width: 54px;
      border-radius: 5px;
    }
    .textarea {
      line-height: 28px;
      padding: 8px 14px;
      border: 1px dashed rgba(153, 153, 153, 0.5);
      border-radius: 5px;
      // height: 135px;
      text-overflow: -o-ellipsis-lastline;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 7;
      line-clamp: 7;
      -webkit-box-orient: vertical;
    }
    .companyIdcard {
      height: 108px;
      width: 156px;
      border-radius: 5px;
    }
    span {
      word-wrap: break-word;
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
  /deep/.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
/deep/ .avatar-uploader {
    height: 54px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 108px;
    height: 108px;
    line-height: 108px;
    text-align: center;
}
.avatar {
    width:  100px;
    height: 100px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
}
.companyIdcard {
    height: 108px;
    width: 156px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
}
}
  .cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
  }
  .submit {
    margin-top: 50px;
  }
</style>
