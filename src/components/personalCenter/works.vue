<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的作品</div>
    </div>
    <div class="info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的照片" name="1">
          <div class="list">
            <el-image v-for="item in 7" :key="item" :src="src"></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的视频" name="2"
          ><div class="list">
            <video-card
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
      imgList: []
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
          }
        }
      });
    },
    handleClick() {
      this.getOpus();
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
    }
    .el-image {
      width: 205px;
      height: 135px;
      margin: 7.5px;
      &:nth-child(4n + 1) {
        margin-left: 0;
      }
      &:nth-child(4n + 4) {
        margin-right: 0;
      }
    }
    /deep/.video {
      width: 425px;
      margin: 7.5px;
      &:nth-child(2n + 1) {
        margin-left: 0;
      }
      &:nth-child(2n + 2) {
        margin-right: 0;
      }
    }
    /deep/.vcp-container {
      width: 260px;
      height: 160px;
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
