<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的作品</div>
    </div>
    <div class="info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的照片" name="1">
          <el-alert
            v-if="!isHave"
            title="暂无照片"
            type="warning"
            :closable="false"
            show-icon
          >
          </el-alert>
          <div v-else class="list">
            <div class="img-item" v-for="item in list.datas" :key="item.id">
              <el-image
                :preview-src-list="imgList"
                :src="item.path"
                fit="cover"
              ></el-image>
              <div class="content">
                <div class="titles twoLine">{{ item.description }}</div>
                <el-button
                  type="danger"
                  size="small"
                  @click="deleteWorks(item.id)"
                  plain
                  >删除</el-button
                >
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的视频" name="2">
          <el-alert
            v-if="!isHave"
            title="暂无视频"
            type="warning"
            :closable="false"
            show-icon
          >
          </el-alert>
          <div v-else class="list">
            <video-card
              @play="playVideo(item)"
              v-for="item in list.datas"
              :key="item.id"
              :item="item"
              @deleteWorks="deleteWorks(item.id)"
            ></video-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的音频" name="3">
          <el-alert
            v-if="!isHave"
            title="暂无音频"
            type="warning"
            :closable="false"
            show-icon
          >
          </el-alert>
          <audio-card
            v-else
            @deleteWorks="deleteWorks"
            :flag="flag"
            :item="audioList"
          ></audio-card>
        </el-tab-pane>
      </el-tabs>
      <el-button
        class="upload"
        size="mini"
        @click="dialogVisible1 = true , changeOptions()"
        type="primary"
        >上传作品</el-button
      >
    </div>
    <div v-if="activeName !== '3'" class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <el-dialog
      :destroy-on-close="true"
      :before-close="handleClose"
      :title="selectVideo.description"
      :visible.sync="dialogVisible"
      width="800px"
    >
      <video ref="video" controls :src="selectVideo.path"></video>
    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      title="上传作品"
      :visible.sync="dialogVisible1"
      width="600px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        :disabled="formFlag"
      >
        <el-form-item label="类型" prop="type">
          <el-select v-model="ruleForm.type" placeholder="请选择类型">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :value="item.id"
              :label="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="标题" prop="title">
          <el-input
            v-model="ruleForm.title"
            placeholder="请输入标题"
          ></el-input>
        </el-form-item>
        <el-form-item label="封面" prop="coverFile" v-if="ruleForm.type === 2">
          <el-upload
            class="avatar-uploader"
            :http-request="upload"
            action=""
            :show-file-list="false"
            :on-change='changeUpload'
            :on-remove="handleRemove"
          >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
          <el-dialog title="图片剪裁" :visible.sync="dialogVisible2" append-to-body>
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
                  :fixedNumber="option.fixedNumber1"
                  :centerBox="option.centerBox"
                  :infoTrue="option.infoTrue"
                  :fixedBox="option.fixedBox"
                ></vueCropper>
              </div>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="finish" :loading="loading">确认</el-button>
            </div>
          </el-dialog>
          <!-- <ImgCutter
              v-on:cutDown="cutDownCover"
              class="img-cut"
              :crossOrigin="true"
              crossOriginHeader="*"
              rate="2:1.1"
              toolBgc="none"
              :showChooseBtn="true"
              :lockScroll="true"
              :cutWidth="480"
              :cutHeight="240"
              :sizeChange="true"
              :moveAble="true"
              :imgMove="true"
              :originalGraph="false"
              :smallToUpload="true"
              :saveCutPosition="true"
              :scaleAble="true"
              :previewMode="true"
            >
            <el-button slot="open" size="small" type="primary"
              >选取封面图片</el-button
            >
          </ImgCutter> -->
          <div class="el-upload__tip">
            只能上传jpg/png文件，且不超过20MB
          </div>
        </el-form-item>
        <el-form-item label="文件" prop="file" v-if="ruleForm.type === 1">
          <el-upload
            class="avatar-uploader"
            :http-request="upload"
            action=""
            :show-file-list="false"
            :on-change='changeUpload1'
            :on-remove="handleRemove"
          >
          <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i> </el-upload>
          <el-dialog title="图片剪裁" :visible.sync="dialogVisible3" append-to-body>
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
              <el-button @click="dialogVisible3 = false">取 消</el-button>
              <el-button type="primary" @click="finish1" :loading="loading1">确认</el-button>
            </div>
          </el-dialog>
          <div class="el-upload__tip">
            只能上传jpg/png文件，且不超过20MB
          </div>
        </el-form-item>
        <el-form-item label="文件" prop="file" v-if="ruleForm.type !== 1">
          <el-upload
            class="upload-demo"
            ref="upload"
            :http-request="upload"
            action=""
            :limit="1"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" class="btn" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              {{
                ruleForm.type === 1
                  ? "只能上传jpg/png文件，且不超过20MB"
                  : ruleForm.type === 2
                  ? "只能上传mp4/ogg/avi/wmv/rmvb/mov文件，且不超过1G"
                  : ruleForm.type === 3
                  ? "只能上传mp3文件，且不超过50MB"
                  : ""
              }}
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button
            style="margin-left: 10px"
            size="small"
            type="success"
            @click="submitUpload"
            >确定</el-button
          >
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper';
import ImgCutter from 'vue-img-cutter';
import videoCard from './videoCard';
import audioCard from './audioCard';
import { formatDate } from '../../assets/js/date.js';
import {
  mineOpus,
  addOpus,
  deleteOpus,
  addOpusCover
} from '../../ajax/index';
export default {
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
        fixedNumber: [1.1, 1.5], // 截图框的宽高比例
        fixedNumber1: [1.5, 1], // 截图框的宽高比例
        full: true, // 是否输出原图比例的截图
        canMoveBox: true, // 截图框能否拖动
        original: false, // 上传图片按照原始比例渲染
        centerBox: false, // 截图框是否被限制在图片里面
        infoTrue: true // true 为展示真实输出图片宽高 false 展示看到的截图框宽高
      },
      isHave: true,
      activeName: '1',
      currentPage: 1,
      nums: 8,
      allpage: 1,
      audioList: [], // 音频存放
      list: [], // 视频 照片存放
      imgList: [], // 照片放大
      dialogVisible: false,
      dialogVisible1: false,
      dialogVisible2: false,
      dialogVisible3: false,
      fileinfor: '',
      imageUrl: '',
      loading: false,
      fileinfor1: '',
      imageUrl1: '',
      loading1: false,
      selectVideo: [],
      flag: false,
      formFlag: false,
      ruleForm: {
        title: '',
        type: 1,
        coverFile: '',
        file: ''
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        file: [
          { required: true, message: '文件不能为空', trigger: 'blur' }
        ],
        coverFile: [
          { required: true, message: '封面不能为空', trigger: 'blur' }
        ]
      },
      typeList: [{
        id: 1,
        value: '图片'
      }, {
        id: 2,
        value: '视频'
      }, {
        id: 3,
        value: '音频'
      }]
    };
  },
  created() {
    this.getOpus(this.currentPage);
  },
  methods: {
    changeOptions() {
      if (this.number === 1) {
        this.ruleForm.type = 1;
      } else if (this.number === 2) {
        this.ruleForm.type = 2;
      } else if (this.number === 3) {
        this.ruleForm.type = 3;
      }
    },
    cutDown(obj) {
      this.ruleForm.file = obj.file;
    },
    cutDownCover(obj) {
      this.ruleForm.coverFile = obj.file;
    },
    handleCurrentChange(val) {
      this.getOpus(val);
    },
    getOpus(page) {
      mineOpus({ num: this.nums, type: this.activeName, page: page }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          if (this.activeName === '2') {
            this.list = res.data;
          } else if (this.activeName === '3') {
            let time;
            this.audioList = res.data.map(item => {
              time = formatDate(new Date(Number(item.uptime)), 'yyyy-MM-dd');
              return {
                id: item.id,
                title: item.description,
                artist: time,
                src: item.path
              };
            });
            this.flag = true;
          } else {
            this.list = res.data;
            this.imgList = res.data.datas.map(item => {
              return item.path;
            });
          }
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
    handleClick(value) {
      this.isHave = true;
      if (value.paneName !== '3') {
        this.flag = false;
      }
      this.currentPage = 1;
      this.getOpus(this.currentPage);
      if (value.paneName === '1') {
        this.number = 1;
      } else if (value.paneName === '2') {
        this.number = 2;
      } else if (value.paneName === '3') {
        this.number = 3;
      }
    },
    handleClose(done) {
      this.$refs.video.pause();
      done();
    },
    playVideo(item) {
      this.selectVideo = item;
      this.dialogVisible = true;
    },
    // 删除作品
    deleteWorks(id) {
      deleteOpus({
        id: id
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          if (this.list.datas.length === 1 && this.currentPage !== 1) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    },
    submitUpload() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.formFlag = true;
          if (this.ruleForm.type === 2) {
            addOpusCover({
              type: this.ruleForm.type,
              description: this.ruleForm.title,
              image: this.ruleForm.coverFile,
              file: this.ruleForm.file
            }).then(res => {
              if (res.code === '0') {
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
                this.handleCurrentChange(1);
                this.$refs.ruleForm.resetFields();
                this.dialogVisible1 = false;
                this.imageUrl = '';
              } else {
                this.$message.error(res.errMsg);
              }
              this.formFlag = false;
            }).catch(err => {
              this.formFlag = false;
              this.$message.error(err);
              return err;
            });
            return;
          }
          addOpus({
            type: this.ruleForm.type,
            description: this.ruleForm.title,
            file: this.ruleForm.file
          }).then(res => {
            if (res.code === '0') {
              this.$message({
                message: '上传成功',
                type: 'success'
              });
              this.handleCurrentChange(1);
              this.$refs.ruleForm.resetFields();
              this.dialogVisible1 = false;
              this.imageUrl1 = '';
            } else {
              this.$message.error(res.errMsg);
            }
            this.formFlag = false;
          }).catch(err => {
            this.formFlag = false;
            this.$message.error(err);
            return err;
          });
        }
      });
    },
    async upload(content) {
      this.ruleForm.file = content.file;
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
        this.dialogVisible2 = true;
      });
    },
    finish() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor.name, { type: 'image/jpeg' });
          this.imageUrl = window.URL.createObjectURL(data);
          this.ruleForm.coverFile = file;
        });
        this.dialogVisible2 = false;
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
        this.dialogVisible3 = true;
      });
    },
    finish1() {
        this.$refs.cropper.getCropBlob((data) => {
          let file = new window.File([data], this.fileinfor1.name, { type: 'image/jpeg' });
          this.imageUrl1 = window.URL.createObjectURL(data);
          this.ruleForm.file = file;
        });
        this.dialogVisible3 = false;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg' || 'image/png';
      const isLt2M = file.size / 1024 / 1024 < 20;
      const isVIDEO = file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/avi' || file.type === 'video/wmv' || file.type === 'video/rmvb' || file.type === 'video/mov';
      const isLt100M = file.size / 1024 / 1024 < 1000;
      const isAUDIO = file.type === 'audio/mp3' || file.type === 'audio/mpeg';
      const isLt20M = file.size / 1024 / 1024 < 50;
      if (this.ruleForm.type === '') {
        this.$message.error('请选择上传类型');
        return false;
      } else if (this.ruleForm.type === 1) {
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG/png 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
      } else if (this.ruleForm.type === 2) {
        if (!isVIDEO) {
          this.$message.error('上传视频只能是 MP4/OGG/AVI/WMV/RMVB/MOV 格式!');
        }
        if (!isLt100M) {
          this.$message.error('上传视频大小不能超过 1G!');
        }
        return isVIDEO && isLt100M;
      } else if (this.ruleForm.type === 3) {
        if (!isAUDIO) {
          this.$message.error('上传音频只能是 MP3 格式!');
        }
        if (!isLt20M) {
          this.$message.error('上传音频大小不能超过 50MB!');
        }
        return isAUDIO && isLt20M;
      }
    },
    handleRemove() {
      this.ruleForm.file = '';
    }
  },
  components: {
    videoCard,
    audioCard,
    ImgCutter,
    VueCropper
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .info {
    position: relative;
    margin: 25px 50px;
    .upload {
      position: absolute;
      top: 6px;
      right: 0;
    }
    .list {
      display: flex;
      flex-wrap: wrap;
      .img-item {
        width: 425px;
        margin: 7.5px;
        display: flex;
        background-color: rgba(245, 245, 245, 1);
        .content {
          margin: 15px;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        &:nth-child(2n + 1) {
          margin-left: 0;
        }
        &:nth-child(2n + 2) {
          margin-right: 0;
        }
      }
      .el-image {
        width: 260px;
        height: 160px;
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
  .footer-page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
}
.img-cut {
  display: inline-block;
}
video {
  width: 760px;
  height: 430px;
  border: none;
  outline: none;
}
/deep/.el-tabs__content {
  position: inherit;
}
/deep/.el-dialog__body {
  padding: 15px 20px 17px;
}
.el-upload__tip {
  display: inline-block;
  margin: 0;
  margin-left: 10px;
}
.btn {
  width: 80px !important;
  height: 32px !important;
}
.el-form-item {
  &:last-child {
    text-align: right;
    margin: 0;
  }
}
.cropper-content {
    .cropper {
        width: auto;
        height: 300px;
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
    height: 80px;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width:  60px;
    height: 75px;
    line-height: 80px;
    text-align: center;
}
.avatar {
    width:  60px;
    height: 75px;
    border-radius: 5px;
    display: block;
    cursor: pointer;
}
</style>
