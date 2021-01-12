<template>
  <div v-if="talentNav.isHave" class="talent-audio">
    <h4 class="headtitle">音 频</h4>
    <div class="activeAudio">
      <svg class="icon" @click="play" aria-hidden="true">
        <use :xlink:href="!isPlay ? '#icon-play' : '#icon-pause'"></use>
      </svg>
      <el-slider
        @change="onChange"
        v-model="progress"
        :show-tooltip="false"
      ></el-slider>
      <h5 class="audioTitle">{{ selectAudio.description }}</h5>
      <audio
        ref="audio"
        @canplay="canplay"
        @ended="ended"
        @timeupdate="timeupdate"
        :src="selectAudio.path"
      ></audio>
    </div>
    <div class="list">
      <div
        @click="clickAudio(item, index)"
        :class="index === selectIndex ? 'active' : ''"
        v-for="(item, index) in list"
        :key="'audio' + index"
        class="audioItem"
      >
        <span class="number">{{ numss(index) }}</span>
        <span class="btn">
          <svg
            v-show="index === selectIndex"
            class="icon"
            @click.stop="play"
            aria-hidden="true"
          >
            <use :xlink:href="!isPlay ? '#icon-play' : '#icon-pause'"></use>
          </svg>
        </span>
        <span class="title">{{ item.description }}</span>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getUserImg } from '@/ajax';
export default {
  data() {
    return {
      isPlay: false, // audio是否播放
      list: [], // 所有audio
      selectAudio: {}, // 选中的audio
      selectIndex: 0, // 选中的audio index
      duration: 0, // audio总时长
      progress: 0, // audio进度
      currentTime: 0 // 当前位置
    };
  },
  created() {
    this.getUserAudio();
  },
  methods: {
    getUserAudio() {
      getUserImg({ type: 3, page: this.currentPage, userid: this.$route.query.userid }).then(res => {
        if (res.code === '0') {
          this.$store.commit('talentNavAudio', true);
          this.list = res.data;
          this.selectAudio = res.data[0];
        } else {
          this.$store.commit('talentNavAudio', false);
        }
      }).catch(err => {
        return err;
      });
    },
    numss(index) {
      if (index + 1 < 10) {
        return '0' + (index + 1);
      } else {
        return index + 1;
      }
    },
    play() {
      if (this.isPlay) {
        this.toPause();
      } else {
        this.toPlay();
      }
    },
    toPlay() {
      this.isPlay = true;
      this.$refs.audio.play();
    },
    toPause() {
      this.isPlay = false;
      this.$refs.audio.pause();
    },
    canplay() {
      this.duration = this.$refs.audio.duration;
    },
    timeupdate() {
      this.currentTime = this.$refs.audio.currentTime;
      this.progress = (this.currentTime / this.duration) * 100;
    },
    onChange(val) {
      this.currentTime = (val / 100) * this.duration;
      this.$refs.audio.currentTime = this.currentTime;
    },
    ended() {
      this.isPlay = false;
    },
    clickAudio(item, index) {
      this.isPlay = false;
      this.selectAudio = item;
      this.selectIndex = index;
    }
  },
  computed: {
    ...mapState({
      talentNav: (state) => state.talentNav[3]
    })
  }
};
</script>
<style lang='less' scoped>
.talent-audio {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    padding-bottom: 20px;
    color: #333;
  }
  .activeAudio {
    margin: 0 30px;
    display: flex;
    align-items: center;
    .audioTitle {
      margin-left: 20px;
      color: #0097d0;
      font-size: 18px;
      font-weight: normal;
    }
    .icon {
      cursor: pointer;
      margin: 0 20px 0 8px;
      font-size: 22px;
      color: #b3b3b3;
    }
    .el-slider {
      width: 30%;
      /deep/.el-slider__runway,
      /deep/.el-slider__bar {
        height: 4px;
      }
      /deep/.el-slider__button-wrapper {
        top: -10px;
        width: 24px;
        height: 24px;
        cursor: pointer;
      }
      /deep/.el-slider__button {
        width: 14px;
        height: 14px;
        cursor: pointer;
      }
    }
  }
  .list {
    margin: 30px 30px 0;
    .audioItem {
      height: 40px;
      font-size: 16px;
      line-height: 40px;
      cursor: pointer;
      border-top: 1px solid #eee;
      transition: all 0.25s;
      .number {
        margin-left: 10px;
      }
      .btn {
        display: inline-block;
        width: 16px;
        margin: 0 10px;
      }
      .title {
        color: #0097d0;
      }
      &:hover {
        background-color: #eee;
      }
    }
    .active {
      background-color: #eee;
      .title {
        color: #333;
      }
    }
  }
}
</style>
