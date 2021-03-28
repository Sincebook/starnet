<template>
  <div class="home">
    <swiper class="swiper-container" :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.id">
        <div
          class="bgImg"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        ></div>
        <div
          class="bgImg-cover"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        ></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <hot-actor></hot-actor>
    <hot-job></hot-job>
    <hot-company></hot-company>
    <create-cv></create-cv>
    <safe-card></safe-card>
    <join-us></join-us>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import hotActor from '../components/home/hotActor';
import hotCompany from '../components/home/hotCompany';
import hotJob from '../components/home/hotJob';
import createCv from '../components/home/createCv';
import safeCard from '../components/home/safe';
import joinUs from '../components/home/joinUs';
import { getbanner } from '../ajax/index';
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
    joinUs,
    hotCompany
  },
  directives: {
    swiper: directive
  },
  created() {
    getbanner({
      type: '1'
    }).then(res => {
      if (res.code === '0') {
        this.banners = res.data;
      }
    });
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
.bg-box {
  width: 100%;
  height: 460px;
}
.swiper-container {
  background-color: #000;
  --swiper-theme-color: rgb(255, 255, 255); /* 设置Swiper风格 */
  --swiper-navigation-color: rgba(255, 0, 0, 0.5); /* 单独设置按钮颜色 */
  --swiper-navigation-size: 5vw; /* 设置按钮大小 */
  --swiper-navigation-size: 30px;
  width: 100%;
  height: 460px;
  .swiper-slide {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    .bgImg {
      position: relative;
      z-index: 2;
      width: 1140px;
      height: 396px;
      margin: 0 auto;
      transform: translateY(64px);
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
    .bgImg-cover {
      position: absolute;
      top: 0;
      left: 0;
      // z-index: 1;
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
      filter: blur(20px);
      transform: scale(1.5);
    }
  }
}
.swiper-pagination-switch {
  color: red;
  background-color: red;
}
.homeIcon {
  color: #000;
}
</style>
