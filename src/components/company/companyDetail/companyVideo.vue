<template>
  <div class="com-video">
    <video-card v-for="item in 6" :key="item" class="videos"></video-card>
  </div>
</template>
<script>
import VideoCard from './videoCard.vue';
// @ is an alias to /src
export default {
  name: 'companyVideo',
  data() {
    return {

    };
  },
  components: {
    VideoCard

  }
};
</script>
<style lang='less' scoped>
.com-video{
  width: 960px;
  margin:0 auto;
  background-color: #fff;
  .videos{
    margin: 20px 10px;
    display: inline-block;
    width: 300px;
  }
}
</style>
