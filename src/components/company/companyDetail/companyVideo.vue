<template>
  <div class="com-video">
    <p class="video">视&nbsp;频</p>
    <video-card v-for="item in 6" :key="item" class="videos"></video-card>
    <pagination allPages="20" class="videoPag"></pagination>
  </div>
</template>
<script>
import VideoCard from './videoCard.vue';
import Pagination from '../../common/pagination.vue';

// @ is an alias to /src
export default {
  name: 'companyVideo',
  data() {
    return {
      srcs: ['https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm', 'https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm']

    };
  },
  components: {
    VideoCard,
    Pagination

  }
};
</script>
<style lang='less' scoped>
.com-video{
    background-color: white;
    width: 960px;
    margin: 45px auto;
}
.video{
  padding-top:20px;
  // padding-bottom:5px;
  font-size:18px;
  font-weight:800;
  text-align: center;
  height: 55px;
}
.com-video{
  width: 960px;
  margin:0 auto;
}
.videos{
    margin: 20px 10px;
    display: inline-block;
    width: 300px;
  }
  .videoPag{
    margin-bottom: 40px ;
    height:90px;

  }
</style>
