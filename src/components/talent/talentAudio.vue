<template>
  <div class="talent-audio">
    <p class="title">音频</p>
    <aplayer :music="music" :list="list" :autoplay='false' :listFolded='false'/>
  </div>
</template>
<script>
// @ is an alias to /src

import aplayer from 'vue-aplayer';

export default {
  name: 'talentAudio',
  data() {
    return {
      music: {
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: require('@/assets/images/04.mp3'),
        pic: require('@/assets/images/job.jpg')
      },
      list: [{
        title: '文爱',
        artist: 'CG',
        src: require('@/assets/images/CG - 文爱.mp3'),
        pic: require('@/assets/images/telent.jpg')
      }, {
        title: 'secret base~君がくれたもの~',
        artist: 'Silent Siren',
        src: require('@/assets/images/04.mp3'),
        pic: require('@/assets/images/company1.jpg')
      }, {
        title: '文爱',
        artist: 'CG',
        src: require('@/assets/images/CG - 文爱.mp3'),
        pic: require('@/assets/images/company.jpg')
      }]
    };
  },
  components: {
    aplayer
  }
};
</script>
<style lang='less' scoped>
.talent-audio {
  width: 1280px;
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  .title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
  }
}
</style>
