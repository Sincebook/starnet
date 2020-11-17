<template>
  <div class="test">
    <svg class="icon icon-qq2" aria-hidden="true">
      <use xlink:href="#icon-qq2"></use>
    </svg>
    <div class="hiko">
      <p data-aos="zoom-out">{{ test.hitokoto }}--{{ test.from_who }}</p>
    </div>
    <swiper data-aos="fade-up" class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.id"
        >
        <img :src="item.pic"></swiper-slide
      >
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapState } from 'vuex';
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
        { id: 1, pic: '//ftp.qnets.cn/img/bg1.jpg' },
        { id: 2, pic: '//ftp.qnets.cn/img/bg2.jpg' },
        { id: 3, pic: '//ftp.qnets.cn/img/bg3.jpg' },
        { id: 4, pic: '//ftp.qnets.cn/img/bg4.jpg' },
        { id: 5, pic: '//ftp.qnets.cn/img/bg5.jpg' }
      ]
    };
  },
  mounted() {
    this.$store.dispatch('getTest');// 测试api的使用
  },
  computed: {
    ...mapState({
      test: (state) => state.test
    })
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  }
};
</script>

<style lang="less" scoped>
.icon-qq2 {
  width: 28px;
  height: 28px;
}
.hiko {
  overflow: hidden;
  height: 126px;
  p {
    margin: 50px 0;
    font-size: 20px;
  }
}

.swiper-container {
  width: 700px;
  height: 350px;
  background: pink;
  .swiper-slide {
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
