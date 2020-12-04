<template>
  <div class="audio">
    <aplayer
      :music="music"
      :list="list"
      :autoplay="false"
      :listFolded="false"
    />
  </div>
</template>

<script>
import aplayer from 'vue-aplayer';
export default {
  props: ['item'],
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

<style lang="less" scoped>
</style>
