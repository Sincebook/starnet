<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的简历</div>
    </div>
    <div class="info">
      <el-alert
        v-if="userinfo.user.status === 1"
        :closable="false"
        title="请前往实名认证，否则不能创建简历"
        type="warning"
        show-icon
      >
      </el-alert>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        :disabled="status === 1 || flag"
      >
        <el-form-item label="姓名" prop="name">
          <el-input
            v-model="ruleForm.name"
            :disabled="true"
            placeholder="请输入姓名"
          ></el-input>
        </el-form-item>
        <el-form-item label="爱称" prop="nickname">
          <el-input
            v-model="ruleForm.nickname"
            placeholder="请输入爱称"
          ></el-input>
        </el-form-item>
        <el-form-item label="身高" prop="height">
          <el-input
            type="number"
            v-model="ruleForm.height"
            placeholder="请输入身高"
          ></el-input>
        </el-form-item>
        <el-form-item label="体重" prop="weight">
          <el-input
            type="number"
            v-model="ruleForm.weight"
            placeholder="请输入体重"
          ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select v-model="ruleForm.sex" placeholder="请选择性别">
            <el-option
              v-for="item in sexList"
              :key="item.value"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="民族" prop="nation">
          <el-select v-model="ruleForm.nation" placeholder="请选择民族">
            <el-option
              v-for="item in nationList.nation"
              :key="item.id"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="国籍" prop="contry">
          <el-select v-model="ruleForm.contry" placeholder="请选择国籍">
            <el-option
              v-for="item in countryList.country"
              :key="item.en"
              :value="item.cn"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="居住地" prop="workArea">
          <el-cascader
            clearable
            v-model="ruleForm.workArea"
            :props="{ label: 'value' }"
            :options="homeList.home"
            placeholder="请选择居住地"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="眼睛颜色">
          <el-input
            v-model="ruleForm.eyeColour"
            placeholder="请输入眼睛颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="皮肤颜色">
          <el-input
            v-model="ruleForm.skinColour"
            placeholder="请输入皮肤颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="头发颜色">
          <el-input
            v-model="ruleForm.hairColour"
            placeholder="请输入头发颜色"
          ></el-input>
        </el-form-item>
        <el-form-item label="头发类型">
          <el-input
            v-model="ruleForm.hairType"
            placeholder="请输入头发类型"
          ></el-input>
        </el-form-item>
        <el-form-item label="出生日期" prop="birthTime">
          <el-date-picker
            v-model="ruleForm.birthTime"
            type="date"
            placeholder="请选择出生日期"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="职业" prop="vocation">
          <el-input
            v-model="ruleForm.vocation"
            placeholder="请输入职业"
          ></el-input>
        </el-form-item>
        <el-form-item label="经纪公司" prop="company">
          <el-input
            v-model="ruleForm.company"
            placeholder="请输入经纪公司"
          ></el-input>
        </el-form-item>
        <el-form-item label="代表作">
          <el-input
            v-model="ruleForm.representativeWork"
            placeholder="请输入代表作"
          ></el-input>
        </el-form-item>
        <el-form-item label="个人描述" prop="selfEvaluation">
          <el-input
            maxlength="300"
            :show-word-limit="true"
            resize="none"
            type="textarea"
            :autosize="{ minRows: 11, maxRows: 11 }"
            v-model="ruleForm.selfEvaluation"
            placeholder="请输入个人描述(不多于500字)"
          ></el-input>
        </el-form-item>
        <div class="ph">
        <div class="photo">
        <el-form-item label="生活照" prop="image">
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
        </div>
        <div class="photo1">
        <el-form-item  prop="image1">
          <el-upload
            class="avatar-uploader"
            :http-request="upload1"
            action=""
            :show-file-list="false"
            :on-change='changeUpload1'
          >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
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
                  :fixedNumber="option.fixedNumber"
                  :centerBox="option.centerBox"
                  :infoTrue="option.infoTrue"
                  :fixedBox="option.fixedBox"
                ></vueCropper>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="finish1" :loading="loading">确认</el-button>
            </div>
          </el-dialog>
        </el-form-item>
        </div>
        <div class="photo2">
        <el-form-item  prop="image2">
          <el-upload
            class="avatar-uploader"
            :http-request="upload2"
            action=""
            :show-file-list="false"
            :on-change='changeUpload2'
          >
          <img v-if="imageUrl2" :src="imageUrl2" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
          <el-dialog title="图片剪裁" :visible.sync="dialogVisible2" append-to-body>
            <div class="cropper-content">
              <div class="cropper" style="text-align:center">
                <vueCropper
                  ref="cropper"
                  :img="option.img2"
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
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="finish2" :loading="loading">确认</el-button>
            </div>
          </el-dialog>
        </el-form-item>
        </div>
        <div class="photo3">
        <el-form-item  prop="image3">
          <el-upload
            class="avatar-uploader"
            :http-request="upload3"
            action=""
            :show-file-list="false"
            :on-change='changeUpload3'
          >
          <img v-if="imageUrl3" :src="imageUrl3" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
          <el-dialog title="图片剪裁" :visible.sync="dialogVisible3" append-to-body>
            <div class="cropper-content">
              <div class="cropper" style="text-align:center">
                <vueCropper
                  ref="cropper"
                  :img="option.img3"
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
              <el-button @click="dialogVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="finish3" :loading="loading">确认</el-button>
            </div>
          </el-dialog>
        </el-form-item>
        </div>
        </div>
        <el-form-item>
          <el-button type="primary" @click="submitForm()">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import { mapState } from 'vuex';
import nation from './nation.json';
import home from './home.json';
import country from './country.json';
import {
  mineInfoDetail,
  extraInfoDetail // extraInfoDetail1
} from '../../ajax/index';
export default {
  components: {
    VueCropper
  },
  props: ['info'],
  data() {
    return {
       fileinfor: '',
       fileinfor1: '',
       fileinfor2: '',
       fileinfor3: '',
       dialogVisible: false,
       dialogVisible1: false,
       dialogVisible2: false,
       dialogVisible3: false,
      // 裁剪组件的基础配置option
      option: {
        img: '', // 裁剪图片的地址
        img1: '',
        img2: '',
        img3: '',
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
      loading: false,
      imageUrl: '',
      imageUrl1: '',
      imageUrl2: '',
      imageUrl3: '',
      ruleForm: {
        image: '',
        image1: '',
        image2: '',
        image3: '',
        name: '',
        nickname: '',
        height: '',
        weight: '',
        contry: '',
        nation: '',
        sex: '',
        workArea: [],
        eyeColour: '',
        skinColour: '',
        hairColour: '',
        hairType: '',
        birthTime: '',
        vocation: '',
        company: '',
        representativeWork: '',
        selfEvaluation: ''
      },
      rules: {
        image: [
          { required: true, message: '生活照不能为空', trigger: 'change' }
        ],
        image1: [
          { required: true, message: '生活照不能为空', trigger: 'change' }
        ],
        image2: [
          { required: true, message: '生活照不能为空', trigger: 'change' }
        ],
        image3: [
          { required: true, message: '生活照不能为空', trigger: 'change' }
        ],
        name: [
          { required: true, message: '姓名不能为空', trigger: 'blur' }
        ],
        nickname: [
          { required: true, message: '爱称不能为空', trigger: 'blur' }
        ],
        height: [
          { required: true, message: '身高不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '体重不能为空', trigger: 'blur' }
        ],
        contry: [
          { required: true, message: '国籍不能为空', trigger: 'change' }
        ],
        nation: [
          { required: true, message: '民族不能为空', trigger: 'change' }
        ],
        sex: [
          { required: true, message: '性别不能为空', trigger: 'change' }
        ],
        workArea: [
          { required: true, message: '居住地不能为空', trigger: 'change' }
        ],
        birthTime: [
          { required: true, message: '出生日期不能为空', trigger: 'change' }
        ],
        vocation: [
          { required: true, message: '职业不能为空', trigger: 'blur' }
        ],
        // company: [
        //   { required: true, message: '经济公司不能为空', trigger: 'blur' }
        // ],
        selfEvaluation: [
          { required: true, message: '个人描述不能为空', trigger: 'blur' }
        ]
      },
      homeList: [],
      countryList: [],
      nationList: [],
      sexList: [{
        value: '男'
      }, {
        value: '女'
      }],
      flag: false,
      status: 1
    };
  },
  methods: {
    async upload(content) {
      this.ruleForm.image = content.file;
    },
    async upload1(content) {
      this.ruleForm.image1 = content.file;
    },
    async upload2(content) {
      this.ruleForm.image2 = content.file;
    },
    async upload3(content) {
      this.ruleForm.image3 = content.file;
    },
    submitForm() {
      console.log(this.ruleForm.image);
      console.log(this.ruleForm.image1);
      console.log(this.ruleForm.image2);
      console.log(this.ruleForm.image3);
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          // if (this.ruleForm.image === '0' && this.ruleForm.image1 === '1' && this.ruleForm.image2 === '2' && this.ruleForm.image3 === '3') {
            extraInfoDetail(this.ruleForm).then(res => {
              if (res.code === '0') {
                this.$message({
                  message: '提交成功',
                  type: 'success'
                });
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
      // };
      });
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
          this.ruleForm.image = file;
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
          this.ruleForm.image1 = file;
        });
        this.dialogVisible1 = false;
      },
    changeUpload2(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
        return false;
      }
      this.fileinfor2 = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img2 = URL.createObjectURL(file.raw);
        this.dialogVisible2 = true;
      });
      },
      finish2() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor2.name, { type: 'image/jpeg' });
          this.imageUrl2 = window.URL.createObjectURL(data);
          this.ruleForm.image2 = file;
        });
        this.dialogVisible2 = false;
      },
    changeUpload3(file, fileList) {
      const isJPG = file.raw.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
        return false;
      }
      this.fileinfor3 = file;
      // 上传成功后将图片地址赋值给裁剪框显示图片
      this.$nextTick(() => {
        this.option.img3 = URL.createObjectURL(file.raw);
        this.dialogVisible3 = true;
      });
      },
      finish3() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor3.name, { type: 'image/jpeg' });
          this.imageUrl3 = window.URL.createObjectURL(data);
          this.ruleForm.image3 = file;
        });
        this.dialogVisible3 = false;
      }
  },
  created() {
    this.status = this.userinfo.user.status;
    if (this.userinfo.user.status !== 1) {
      mineInfoDetail().then(res => {
        if (res.code === '0') {
          this.imageUrl = (res.data.image === null ? '' : res.data.image);
          console.log(res.data.image);
          this.imageUrl1 = (res.data.image1 === null ? '' : res.data.image1);
          console.log(res.data.image1);
          this.imageUrl2 = (res.data.image2 === null ? '' : res.data.image2);
          console.log(res.data.image2);
          this.imageUrl3 = (res.data.image3 === null ? '' : res.data.image3);
          console.log(res.data.image3);
          this.ruleForm.image = '0';
          this.ruleForm.image1 = '1';
          this.ruleForm.image2 = '2';
          this.ruleForm.image3 = '3';
          this.ruleForm.name = (res.data.name === null ? '' : res.data.name);
          this.ruleForm.nickname = (res.data.nickname === null ? '' : res.data.nickname);
          this.ruleForm.height = (res.data.height === null ? '' : res.data.height);
          this.ruleForm.weight = (res.data.weight === null ? '' : res.data.weight);
          this.ruleForm.contry = (res.data.contry === null ? '' : res.data.contry);
          this.ruleForm.nation = (res.data.nation === null ? '' : res.data.nation);
          this.ruleForm.sex = (res.data.sex === null ? '' : res.data.sex);
          this.ruleForm.workArea = (res.data.workArea === null ? [] : res.data.workArea.split(','));
          this.ruleForm.eyeColour = (res.data.eyeColour === null ? '' : res.data.eyeColour);
          this.ruleForm.skinColour = (res.data.skinColour === null ? '' : res.data.skinColour);
          this.ruleForm.hairColour = (res.data.hairColour === null ? '' : res.data.hairColour);
          this.ruleForm.hairType = (res.data.hairType === null ? '' : res.data.hairType);
          this.ruleForm.birthTime = (res.data.birthTime === null ? '' : res.data.birthTime);
          this.ruleForm.vocation = (res.data.vocation === null ? '' : res.data.vocation);
          this.ruleForm.company = (res.data.company === null ? '' : res.data.company);
          this.ruleForm.representativeWork = (res.data.representativeWork === null ? '' : res.data.representativeWork);
          this.ruleForm.selfEvaluation = (res.data.selfEvaluation === null ? '' : res.data.selfEvaluation);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  mounted() {
    this.nationList = nation;
    this.homeList = home;
    this.countryList = country;
  },
  watch: {
    userinfo: function (newVal, oldVal) {
      this.status = newVal.status;
    },
    deep: true
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
      margin-bottom: 25px;
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
  width: 108px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 108px;
  height: 108px;
  display: block;
  cursor: pointer;
}
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
.ph {
  width: 250px;
}
.photo {
  width: 108px;
  float: left;
}
.photo1 {
  width: 108px;
  padding-left: 10px;
  float: left;
}
.photo2 {
  width: 108px;
  float: left;
  clear: both;
}
.photo3 {
  width:108px;
  float: left;
  padding-left: 10px;
}
</style>
