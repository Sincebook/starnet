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
              v-for="item in list.companyVideos"
              :key="item.id"
              :item="item"
              @deleteWorks="deleteVideo(item.id)"
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
        @click="dialogVisible1 = true"
        type="primary"
        >上传作品</el-button
      >
    </div>
    <div class="footer-page">
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
      <video ref="video" controls :src="selectVideo.video"></video>
    </el-dialog>
    <el-dialog
      :destroy-on-close="true"
      title="上传作品"
      :visible.sync="dialogVisible1"
      width="500px"
    >
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="70px"
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
        <el-form-item
          v-if="ruleForm.type === 2"
          label="详情"
          prop="description"
        >
          <el-input
            v-model="ruleForm.description"
            placeholder="请输入详情"
          ></el-input>
        </el-form-item>
        <el-form-item label="文件" prop="file">
          <el-upload
            class="upload-demo"
            ref="upload"
            :http-request="upload"
            action=""
            :limit="1"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <div slot="tip" class="el-upload__tip">
              {{
                ruleForm.type === 1
                  ? "只能上传jpg/png文件，且不超过500kb"
                  : ruleForm.type === 2
                  ? "只能上传mp4/ogg/avi/wmv/rmvb文件，且不超过100m"
                  : ruleForm.type === 3
                  ? "只能上传mp3文件，且不超过20m"
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
import videoCard from '../corporateCenter/videoCard.vue';
import audioCard from '../personalCenter/audioCard.vue';
import {
  mineOpus,
  CompanyVideo,
  addOpus,
  addCompanyVideo,
  deleteOpus,
  deleteCompanyVideo
} from '../../ajax/index';
import { formatDate } from '../../assets/js/date.js';
export default {
  data() {
    return {
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
      selectVideo: [],
      flag: false,
      formFlag: false,
      ruleForm: {
        title: '',
        type: '',
        description: '',
        file: ''
      },
      rules: {
        title: [
          { required: true, message: '标题不能为空', trigger: 'blur' }
        ],
        description: [
          { required: true, message: '详情不能为空', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '类型不能为空', trigger: 'change' }
        ],
        file: [
          { required: true, message: '文件不能为空', trigger: 'blur' }
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
    handleCurrentChange(val) {
      if (this.activeName === '1') {
        this.getOpus(val);
      } else if (this.activeName === '2') {
        this.getVideo(val);
      } else {
        this.getOpus(val);
      }
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
    getVideo(page) {
      CompanyVideo({ num: this.nums, page: page }).then(res => {
        if (res.code === '0' && res.data.allpage !== 0) {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error('暂无视频');
        }
      }).catch(err => {
        this.isHave = false;
        this.$message.error(err);
        return err;
      });
    },
    handleClick(value) {
      this.list = [];
      this.isHave = true;
      this.flag = false;
      this.currentPage = 1;
      if (value.paneName !== '2') {
        this.getOpus(this.currentPage);
      } else {
        this.getVideo(this.currentPage);
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
        return err;
      });
    },
    // 删除公司视频
    deleteVideo(id) {
      deleteCompanyVideo({
        id: id
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '删除成功',
            type: 'success'
          });
          if (this.list.companyVideos.length === 1 && this.currentPage !== 1) {
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
          if (this.ruleForm.type !== 2) {
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
              } else {
                this.$message.error(res.errMsg);
              }
              this.formFlag = false;
            }).catch(err => {
              this.formFlag = false;
              this.$message.error(err);
              return err;
            });
          } else {
            addCompanyVideo({
              time: new Date().getTime(),
              title: this.ruleForm.title,
              description: this.ruleForm.description,
              video: this.ruleForm.file
            }).then(res => {
              if (res.code === '0') {
                this.$message({
                  message: '上传成功',
                  type: 'success'
                });
                this.handleCurrentChange(1);
                this.$refs.ruleForm.resetFields();
                this.dialogVisible1 = false;
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
        }
      });
    },
    async upload(content) {
      this.ruleForm.file = content.file;
    },
    beforeUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;
      const isVIDEO = file.type === 'video/mp4' || file.type === 'video/ogg' || file.type === 'video/avi' || file.type === 'video/wmv' || file.type === 'video/rmvb';
      const isLt100M = file.size / 1024 / 1024 < 100;
      const isAUDIO = file.type === 'audio/mp3' || file.type === 'audio/mpeg';
      const isLt20M = file.size / 1024 / 1024 < 20;
      if (this.ruleForm.type === '') {
        this.$message.error('请选择上传类型');
        return false;
      } else if (this.ruleForm.type === 1) {
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      } else if (this.ruleForm.type === 2) {
        if (!isVIDEO) {
          this.$message.error('上传视频只能是 MP4/OGG/AVI/WMV/RMVB 格式!');
        }
        if (!isLt100M) {
          this.$message.error('上传视频大小不能超过 50MB!');
        }
        return isVIDEO && isLt100M;
      } else if (this.ruleForm.type === 3) {
        if (!isAUDIO) {
          this.$message.error('上传音频只能是 MP3 格式!');
        }
        if (!isLt20M) {
          this.$message.error('上传音频大小不能超过 20MB!');
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
    audioCard
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
.el-form-item {
  &:last-child {
    text-align: right;
    margin: 0;
  }
}
</style>
