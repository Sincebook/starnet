<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的作品</div>
    </div>
    <div class="info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的照片" name="1">
          <div class="list">
            <div class="img-item" v-for="item in imgList" :key="item.id">
              <el-image
                :preview-src-list="imgList1"
                :src="item.path"
                fit="cover"
              ></el-image>
              <div class="content">
                <div class="titles twoLine">{{ item.description }}</div>
                <el-button type="danger" size="small" plain>删除</el-button>
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的视频" name="2"
          ><div class="list">
            <video-card
              @play="playVideo"
              v-for="item in videoList"
              :key="item.id"
              :item="item"
            ></video-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的音频" name="3">
          <audio-card :item="audioList"></audio-card>
        </el-tab-pane>
      </el-tabs>
      <el-button class="upload" size="mini" type="primary">上传作品</el-button>
    </div>
    <el-dialog
      :destroy-on-close="true"
      :before-close="handleClose"
      :title="selectVideo.description"
      :visible.sync="dialogVisible"
      width="60%"
    >
      <video ref="video" controls :src="selectVideo.path"></video>
    </el-dialog>
  </div>
</template>

<script>
import videoCard from './videoCard';
import audioCard from './audioCard';
import {
  mineOpus
} from '../../ajax/index';
export default {
  data() {
    return {
      activeName: '1',
      currentPage: '1',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      videoList: [],
      audioList: [],
      imgList: [],
      imgList1: [],
      dialogVisible: false,
      selectVideo: []
    };
  },
  created() {
    this.getOpus();
  },
  methods: {
    getOpus() {
      mineOpus({ type: this.activeName, page: this.currentPage }).then(res => {
        if (res.code === '0') {
          if (this.activeName === '2') {
            this.videoList = res.data.datas;
          } else if (this.activeName === '3') {
            this.audioList = res.data.datas;
          } else {
            this.imgList = res.data.datas;
            this.imgList.forEach(item => {
              this.imgList1.push(item.path);
            });
          }
        }
      });
    },
    handleClick() {
      this.getOpus();
    },
    handleClose(done) {
      this.$refs.video.pause();
      done();
    },
    playVideo(item) {
      this.selectVideo = item;
      this.dialogVisible = true;
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
}

video {
  width: 100%;
  border: none;
  outline: none;
}
</style>
