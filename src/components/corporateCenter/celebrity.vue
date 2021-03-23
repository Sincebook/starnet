<template>
  <div class="info-box">
    <div class="title">
      <div class="name">企业认证</div>
    </div>
    <div class="info" v-if="userinfo.user.status === 2">
      <el-alert :closable="false" title="您已认证成功" type="success" show-icon>
      </el-alert>
    </div>
    <div class="info" v-if="userinfo.user.status === 1 && companyInfo.status === 1">
      <el-alert :closable="false" title="正在审核中" type="warning" show-icon>
      </el-alert>
    </div>
    <div class="info" v-if="userinfo.user.status === 1 && (companyInfo.status === 0 ||companyInfo.status === 3) ">
      <div   v-if="companyInfo.status === 0">
      <el-alert
        :closable="false"
        title="一个账号只可以和一个企业信息绑定，无法解绑或更换"
        type="warning"
        show-icon
      >
      </el-alert>
      </div>
      <div v-else>
      <el-alert
        :closable="false"
        title="您已被拒审,恶意提交将被封禁账号,请重新认真填写您的信息"
        type="warning"
        show-icon
      >
      </el-alert>
      </div>
      <div class="info-content">
        <el-form
          :disabled="flag"
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="公司Logo" prop="logo">
            <el-upload
              class="avatar-uploader logo"
              action=""
              :http-request="uploadLogo"
              :show-file-list="false"
              :on-change='changeUpload'
            >
              <img v-if="logo" :src="logo" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
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
          <el-form-item label="组织机构码" prop="organizationCode">
            <el-input
              v-model="ruleForm.organizationCode"
              placeholder="请输入组织机构代码"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司名称" prop="name">
            <el-input
              v-model="ruleForm.name"
              placeholder="请输入公司名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="成立时间" prop="createTime">
            <el-date-picker
              v-model="ruleForm.createTime"
              type="date"
              placeholder="请选择成立时间"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd HH:mm:ss"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item label="企业性质" prop="type">
            <el-select v-model="ruleForm.type" placeholder="请选择企业性质">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="公司类型" prop="category">
            <el-select v-model="ruleForm.category" placeholder="请选择公司类型">
              <el-option
                v-for="item in categoryList"
                :key="item.value"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="法人代表" prop="legalPerson">
            <el-input
              v-model="ruleForm.legalPerson"
              placeholder="请输入法人代表"
            ></el-input>
          </el-form-item>
          <el-form-item label="企业地点" prop="area">
            <el-cascader
              clearable
              v-model="ruleForm.area"
              :props="{ label: 'value' }"
              :options="homeList.home"
              placeholder="请选择地点"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="经营范围" prop="managementRange">
            <el-input
              v-model="ruleForm.managementRange"
              placeholder="请输入经营范围"
            ></el-input>
          </el-form-item>
          <el-form-item label="代表作" prop="opus">
            <el-input
              v-model="ruleForm.opus"
              placeholder="请输入代表作"
            ></el-input>
          </el-form-item>
          <el-form-item label="公司简介" prop="description">
            <el-input
              resize="none"
              type="textarea"
              :show-word-limit="true"
              maxlength="500"
              :autosize="{ minRows: 6, maxRows: 6 }"
              v-model="ruleForm.description"
              placeholder="请输入公司简介"
            ></el-input>
          </el-form-item>
          <el-form-item label="营业执照" prop="businessLicense">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadBusinessLicense"
              :show-file-list="false"
              :on-change='changeUpload1'
            >
              <img
                v-if="businessLicense"
                :src="businessLicense"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-dialog title="图片剪裁" :visible.sync="dialogVisible1" append-to-body>
               <div class="cropper-content">
               <div class="cropper" style="text-align:center">
               <vueCropper
                  ref="cropper"
                  :img="option1.img"
                  :outputSize="option1.size"
                  :outputType="option1.outputType"
                  :info="true"
                  :full="option1.full"
                  :canMove="option1.canMove"
                  :canMoveBox="option1.canMoveBox"
                  :original="option1.original"
                  :autoCrop="option1.autoCrop"
                  :fixed="option1.fixed"
                  :fixedNumber="option1.fixedNumber"
                  :centerBox="option1.centerBox"
                  :infoTrue="option1.infoTrue"
                  :fixedBox="option1.fixedBox"
                ></vueCropper>
            </div>
          </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="finish1" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
          </el-form-item>
          <el-form-item label="公司照片" prop="image">
            <el-upload
              class="avatar-uploader"
              action=""
              :http-request="uploadImage"
              :show-file-list="false"
              :on-change='changeUpload2'
            >
              <img v-if="image" :src="image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
           <el-dialog title="图片剪裁" :visible.sync="dialogVisible2" append-to-body>
               <div class="cropper-content">
               <div class="cropper" style="text-align:center">
               <vueCropper
                  ref="cropper"
                  :img="option2.img"
                  :outputSize="option2.size"
                  :outputType="option2.outputType"
                  :info="true"
                  :full="option2.full"
                  :canMove="option2.canMove"
                  :canMoveBox="option2.canMoveBox"
                  :original="option2.original"
                  :autoCrop="option2.autoCrop"
                  :fixed="option2.fixed"
                  :fixedNumber="option2.fixedNumber"
                  :centerBox="option2.centerBox"
                  :infoTrue="option2.infoTrue"
                  :fixedBox="option2.fixedBox"
                ></vueCropper>
            </div>
          </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="finish2" :loading="loading">确认</el-button>
      </div>
    </el-dialog>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import home from './home.json';
import {
  celebrityCompany
} from '../../ajax/index';
export default {
  props: ['companyInfo'],
  data() {
    return {
      fileinfor: '',
      fileinfor1: '',
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
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
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      option1: {
        img: '', // 裁剪图片的地址
        info: true, // 裁剪框的大小信息
        outputSize: 0.8, // 裁剪生成图片的质量
        outputType: 'jpeg', // 裁剪生成图片的格式
        canScale: true, // 图片是否允许滚轮缩放
        autoCrop: true, // 是否默认生成截图框
        // autoCropWidth: 300, // 默认生成截图框宽度
        // autoCropHeight: 200, // 默认生成截图框高度
        fixedBox: false, // 固定截图框大小 不允许改变
        fixed: false, // 是否开启截图框宽高固定比例
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      option2: {
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
        fixedNumber: [270, 120], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false,
      logo: '',
      image: '',
      businessLicense: '',
      ruleForm: {
        logo: '',
        image: '',
        businessLicense: '',
        organizationCode: '',
        name: '',
        createTime: '',
        type: '',
        category: '',
        legalPerson: '',
        area: '',
        managementRange: '',
        description: '',
        opus: ''
      },
      homeList: [],
      rules: {
        name: [
          { required: true, message: '公司名称不能为空', trigger: 'blur' }
        ],
        image: [
          { required: true, message: '公司图片不能为空', trigger: 'change' }
        ],
        logo: [
          { required: true, message: '公司Logo不能为空', trigger: 'change' }
        ],
        businessLicense: [
          { required: true, message: '营业执照不能为空', trigger: 'change' }
        ],
        createTime: [
          { required: true, message: '成立时间不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '企业性质不能为空', trigger: 'change' }
        ],
        area: [
          { required: true, message: '地点不能为空', trigger: 'change' }
        ],
        category: [
          { required: true, message: '公司类型不能为空', trigger: 'change' }
        ],
        legalPerson: [
          { required: true, message: '法人代表不能为空', trigger: 'blur' }
        ],
        organizationCode: [
          { required: true, message: '组织机构代码不能为空', trigger: 'blur' }
        ],
        managementRange: [
          { required: true, message: '经营范围不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '公司简介不能为空', trigger: 'blur' }
        ]
      },
      typeList: [{
        value: '无限公司'
      }, {
        value: '有限责任公司'
      }, {
        value: '两合公司'
      }, {
        value: '股份有限公司'
      }, {
        value: '股份两合公司'
      }],
      categoryList: [{
        value: '影视公司'
      }, {
        value: '经纪公司'
      }, {
        value: '模特公司'
      }, {
        value: '直播工会'
      }, {
        value: '配音公司'
      }, {
        value: '航飞公司'
      }, {
        value: '配乐公司'
      }, {
        value: '唱片公司'
      }, {
        value: '动画公司'
      }, {
        value: '租赁公司'
      }, {
        value: '调色公司'
      }],
      flag: false
    };
  },
  methods: {
    async uploadLogo(content) {
      this.ruleForm.logo = content.file;
    },
    async uploadBusinessLicense(content) {
      this.ruleForm.businessLicense = content.file;
    },
    async uploadImage(content) {
      this.ruleForm.image = content.file;
    },
    changeUpload(file, fileList) {
      console.log(file);
      const isJPG = file.raw.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
        return false;
      }
      this.fileinfor = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        console.log('11111111');
        this.option.img = URL.createObjectURL(file.raw);
        console.log(file.raw);
        console.log(this.option.img);
        this.dialogVisible = true;
      });
      },
    changeUpload1(file, fileList) {
      console.log(file);
      const isJPG = file.raw.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
        return false;
      }
      this.fileinfor1 = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option1.img = URL.createObjectURL(file.raw);
        console.log(this.option1.img);
        this.dialogVisible1 = true;
      });
      },
    changeUpload2(file, fileList) {
      console.log(file);
      const isJPG = file.raw.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 4MB!');
        return false;
      }
      this.fileinfor1 = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option2.img = URL.createObjectURL(file.raw);
        this.dialogVisible2 = true;
      });
      },
      finish() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor.name, { type: 'image/jpeg' });
          this.logo = window.URL.createObjectURL(data);
          this.ruleForm.logo = file;
        });
        this.dialogVisible = false;
      },
      finish1() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor1.name, { type: 'image/jpeg' });
          this.businessLicense = window.URL.createObjectURL(data);
          this.ruleForm.businessLicense = file;
        });
        this.dialogVisible1 = false;
      },
      finish2() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor1.name, { type: 'image/jpeg' });
          this.image = window.URL.createObjectURL(data);
          this.ruleForm.image = file;
        });
        this.dialogVisible2 = false;
      },
    handleLogoSuccess(res, file) {
      this.logo = URL.createObjectURL(file.raw);
    },
    handleBusinessLicenseSuccess(res, file) {
      this.businessLicense = URL.createObjectURL(file.raw);
    },
    handleImageSuccess(res, file) {
      this.image = URL.createObjectURL(file.raw);
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 4;
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG/PNG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 4MB!');
      }
      return isJPG && isLt2M;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          celebrityCompany(this.ruleForm).then(res => {
            if (res.code === '0') {
              console.log(res);
              this.$message({
                message: '提交成功',
                type: 'success'
              });
              setTimeout(() => {
                  window.location.reload();
                }, 1500);
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
    resetForm() {
      this.$refs.ruleForm.resetFields();
      this.logo = '';
      this.businessLicense = '';
      this.image = '';
    }
  },
  mounted() {
    this.homeList = home;
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
  .info {
    padding: 25px 50px;
    .el-alert {
      margin: 0 0 25px;
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
    .el-textarea {
      width: 100%;
    }
    .logo {
      height: 54px;
      .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 54px;
        height: 54px;
        line-height: 54px;
        text-align: center;
      }
      .avatar {
        width: 54px;
        height: 54px;
        display: block;
        cursor: pointer;
      }
    }
    &:nth-last-child(4) {
      width: 100%;
    }
    &:last-child {
      width: 100%;
      text-align: right;
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
/deep/ .avatar-uploader {
  height: 110px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 162px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 162px;
  height: 108px;
  display: block;
  cursor: pointer;
}
// 截图
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
</style>
