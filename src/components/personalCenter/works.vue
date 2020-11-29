<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的作品</div>
    </div>
    <div class="info">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我的照片" name="first">
          <div class="list">
            <el-image v-for="item in 16" :key="item" :src="src"></el-image>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的视频" name="second"
          ><div class="list">
            <video-card
              @playing="playing"
              v-for="(item, index) in videoList"
              :key="item.id"
              :item="item"
              :index="index"
            ></video-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的音频" name="third"
          ><div class="list">
            <audio-card
              @playing="playing1"
              v-for="(item, index) in audioList"
              :key="item.id"
              :item="item"
              :index="index"
            ></audio-card></div
        ></el-tab-pane>
      </el-tabs>
      <el-button class="upload" size="mini" type="primary">上传作品</el-button>
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
  </div>
</template>

<script>
import videoCard from './videoCard';
import audioCard from './audioCard';
export default {
  data() {
    return {
      activeName: 'first',
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      currentPage1: 1,
      videoElement: [],
      audioElement: [],
      videoIndex: 0,
      audioIndex: 0,
      videoList: [
        { id: 0, src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4', isPlay: false },
        { id: 1, src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4', isPlay: false },
        { id: 2, src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4', isPlay: false },
        { id: 3, src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4', isPlay: false },
        { id: 4, src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218114723HDu3hhxqIT.mp4', isPlay: false }
      ],
      audioList: [
        { id: 0, src: 'https://music.163.com/song/media/outer/url?id=33894312.mp3', isPlay: false },
        { id: 1, src: 'https://music.163.com/song/media/outer/url?id=405998841.mp3', isPlay: false },
        { id: 2, src: 'https://music.163.com/song/media/outer/url?id=33894312.mp3', isPlay: false },
        { id: 3, src: 'https://music.163.com/song/media/outer/url?id=405998841.mp3', isPlay: false },
        { id: 4, src: 'https://music.163.com/song/media/outer/url?id=33894312.mp3', isPlay: false }
      ]
    };
  },
  mounted() {
    this.videoElement = document.getElementsByTagName('video');
    this.audioElement = document.getElementsByTagName('audio');
  },
  methods: {
    handleClick() {
      this.currentPage1 = 1;
      if (this.activeName !== 'second') {
        this.videoList[this.videoIndex].isPlay = false;
        this.videoElement[this.videoIndex].pause();
      }
      if (this.activeName !== 'third') {
        this.audioList[this.audioIndex].isPlay = false;
        this.audioElement[this.audioIndex].pause();
      }
      console.log(this.activeName);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    playing(index) {
      if (this.videoIndex === index && this.videoList[index].isPlay === true) {
        this.videoList[index].isPlay = false;
        this.videoElement[index].pause();
        return;
      }
      const videoElement = this.videoElement;
      if (videoElement && videoElement.length > 0) {
        for (let i = 0; i < videoElement.length; i++) {
          if (i === index) {
            this.videoIndex = i;
            this.videoList[i].isPlay = true;
            this.videoElement[i].play();
          } else {
            this.videoList[i].isPlay = false;
            this.videoElement[i].pause();
          }
        }
      }
    },
    playing1(index) {
      if (this.audioIndex === index && this.audioList[index].isPlay === true) {
        this.audioList[index].isPlay = false;
        this.audioElement[index].pause();
        return;
      }
      const audioElement = this.audioElement;
      if (audioElement && audioElement.length > 0) {
        for (let i = 0; i < audioElement.length; i++) {
          if (i === index) {
            this.audioIndex = i;
            this.audioList[i].isPlay = true;
            this.audioElement[i].play();
          } else {
            this.audioList[i].isPlay = false;
            this.audioElement[i].pause();
          }
        }
      }
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
    /deep/.video,
    /deep/video {
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
    /deep/.audio,
    /deep/audio {
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
</style>
