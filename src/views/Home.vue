<template>
  <div class="home">
    <swiper class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.id">
        <div
          class="bgImg"
          :style="{ backgroundImage: 'url(' + item.pic + ')' }"
        ></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <hot-actor></hot-actor>
    <hot-job></hot-job>
    <create-cv></create-cv>
    <safe-card></safe-card>
    <join-us></join-us>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import hotActor from '../components/home/hotActor';
import hotJob from '../components/home/hotJob';
import createCv from '../components/home/createCv';
import safeCard from '../components/home/safe';
import joinUs from '../components/home/joinUs';
export default {
  data() {
    return {
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        loop: true,
        initialSlide: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      banners: [
        { id: 1, pic: '//ftp.qnets.cn/since/bg2.jpg' },
        { id: 2, pic: '//ftp.qnets.cn/since/bg3.jpg' },
        { id: 3, pic: '//ftp.qnets.cn/since/bg4.jpg' }
      ]
    };
  },
  components: {
    Swiper,
    SwiperSlide,
    hotActor,
    hotJob,
    createCv,
    safeCard,
    joinUs
  },
  directives: {
    swiper: directive
  }
};
</script>

<style lang="less" scoped>
.home {
  position: relative;
  text-align: center;
  width: 100%;
  margin: 0 auto;
}
.swiper-container {
  --swiper-theme-color: rgba(255, 255, 255, 0.5); /* 设置Swiper风格 */
  // --swiper-navigation-color: rgba(255, 255, 255, 0.5); /* 单独设置按钮颜色 */
  // --swiper-navigation-size: 5vw; /* 设置按钮大小 */
  width: 100%;
  height: 100vh; //805px
  .swiper-slide {
    width: 100%;
    height: 100%;
    .bgImg {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
}
</style>
