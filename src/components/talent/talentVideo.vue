<template>
  <div class="talent-video">
    <p class="title">视频</p>
    <div class="video-list">
      <div
        v-for="(item, index) in srcs"
        :key="item + index"
        class="videos"
        @click="changePlayer"
      >
        <videos :src="item" :videoId="'page' + index"></videos>
      </div>
    </div>
    <pagination allPages="20" style="margin-bottom: 0"></pagination>
  </div>
</template>
<script>
import Pagination from '../common/pagination.vue';
import Videos from './videos.vue';
// @ is an alias to /src
export default {
  name: 'talentVideo',
  data() {
    return {
      srcs: ['https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4', 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4', 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4', 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4'],
      lastTarget: null
    };
  },
  methods: {
    changePlayer(e) {
      if (!this.lastTarget) {
        this.lastTarget = e.target;
      } else {
        this.lastTarget.pause();
        this.lastTarget = e.target;
      }
    }
  },
  components: {
    Videos,
    Pagination
  }
};
</script>
<style lang='less' scoped>
.talent-video {
  width: 960px;
  background-color: #fff;
  margin: 40px auto 0 auto;
  padding: 20px;
  text-align: center;
  .title {
    margin: 0px  auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .videos {
    display: inline-block;
    margin: 20px;
    width: 420px;
  }
}
</style>
