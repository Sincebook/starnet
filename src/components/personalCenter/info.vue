<template>
  <div class="info-box">
    <div class="title">
      <div class="name">个人资料</div>
    </div>
    <div class="info">
      <div class="info-content">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          :disabled="flag"
        >
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :http-request="upload"
              action=""
              :show-file-list="false"
              :on-change='changeUpload'
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i
                v-else
                class="el-icon-plus avatar-uploader-icon"
              ></i> </el-upload>
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
          <el-form-item label="昵称" prop="nick" class="nick">
            <el-input
              v-model="ruleForm.nick"
              placeholder="请输入昵称"
            ></el-input>
          </el-form-item>
          <el-form-item label="手机号" class="phone">
            <el-input disabled v-model="phone"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="flag" @click="submitForm()"
              >保存</el-button
            >
            <el-button @click="resetForm()">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  extraInfo
} from '../../ajax/index';
export default {
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
        fixedNumber: [1, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      loading: false,
      imageUrl: '',
      ruleForm: {
        avatarImg: {},
        nick: ''
      },
      phone: '',
      rules: {
        nick: [
          { required: true, validator: this.checkNick, trigger: 'blur' }
        ]
      },
      flag: false
    };
  },
  computed: {
    ...mapState({
      userinfo: (state) => state.userinfo
    })
  },
  watch: {
    userinfo: {
      deep: true,
      immediate: true,
      handler(newVal, oldVal) {
        this.ruleForm.nick = newVal.user.name;
        this.phone = newVal.user.phone;
        this.imageUrl = newVal.user.head;
      }
    }
  },
  methods: {
    async upload(content) {
      this.ruleForm.avatarImg = content.file;
    },
    submitForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.flag = true;
          extraInfo({
            name: this.ruleForm.nick,
            head: this.ruleForm.avatarImg
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '修改成功',
                type: 'success'
              });
              this.$emit('change');
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
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是JPG/png格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 20MB!');
      }
      return isJPG && isLt2M;
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
    checkNick(rule, value, callback) {
      const reg = /^[\w\u4e00-\u9fa5]+$/gi;
      if (!value) {
        return callback(new Error('昵称不能为空'));
      } else if (!reg.test(value)) {
        return callback(new Error('只允许设置中文、英文、数字、下划线'));
      } else if (value.length < 2 || value.length > 6) {
        return callback(new Error('长度在 2 到 6 个字符'));
      } else {
        callback();
      }
    },
    cutDown(obj) {
      this.imageUrl = obj.dataURL;
      this.ruleForm.avatarImg = obj.file;
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  .info {
    padding: 25px 50px;
  }
  .el-input,
  .el-select,
  .el-cascader,
  .el-textarea {
    width: 50%;
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
  width: 100px;
  font-size: 5px;
  margin-top: 5px;
}
.avatar-uploader-icon {
  font-size: 24px;
  color: #8c939d;
  width: 200px;
  height: 108px;
  line-height: 108px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
  cursor: pointer;
}
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
    }
}
</style>
