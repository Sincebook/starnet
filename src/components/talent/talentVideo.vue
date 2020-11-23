<template>
  <div class="talent-video">
    <p class="title">视频</p>
    <div class="video-list">
      <videos
        v-for="(item, index) in srcs"
        :key="item + index"
        :src="item"
        class="videos"
      ></videos>
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
      srcs: ['https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm']
    };
  },
  components: {
    Videos,
    Pagination
  }
};
</script>
<style lang='less' scoped>
.talent-video {
  width: 1280px;
  background-color: #fff;
  margin: 40px auto 0 auto;
  padding: 20px;
  text-align: center;
  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .videos {
    display: inline-block;
    margin: 20px;
    width: 580px;
  }
}
</style>
