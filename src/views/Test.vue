<template>
  <div class="test">
    <svg class="icon icon-qq2" aria-hidden="true">
      <use xlink:href="#icon-qq2"></use>
    </svg>
    <div class="hiko">
      <p data-aos="zoom-out">{{ test.hitokoto }}--{{ test.from_who }}</p>
    </div>
    <swiper data-aos="fade-up" class="swiper" :options="swiperOption">
      <swiper-slide v-for="item in banners" :key="item.id">
        <img :src="item.pic"
      /></swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
    <div class="testing">
      <job-card
        :item="obj"
        @deatil="detail"
        @recommend="recommend"
        @collect="collect"
        @share="share"
      ></job-card>
      <div>--------</div>
      <company-card></company-card>
      <div>--------</div>
      <actor-card></actor-card>
    </div>
    <div class="cricism">
      <criticism></criticism>
      <criticismInput @submit="submit"></criticismInput>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import { mapState } from 'vuex';
import jobCard from '../components/common/jobCard';
import companyCard from '../components/common/companyCard';
import actorCard from '../components/common/actorCard';
import criticism from '../components/common/criticism';
import criticismInput from '../components/common/criticismInput';

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
      ],
      obj: {
        id: 1,
        bg: '//ftp.qnets.cn/img/2.jpg',
        title: '邓导电影公开选角',
        name: '河南森思软件科技有限公司',
        loaction: '郑州',
        age: '18-25岁',
        sex: '女',
        require: '拥有表演专业职称，丰富的表演经验',
        money: '有/面议',
        duration: '6个月',
        stratTime: '2020-11-17',
        endTime: '2020-12-12'
      }
    };
  },
  methods: {
    share() {
      console.log('share');
    },
    collect() {
      console.log('collect');
    },
    detail() {
      console.log('detail');
    },
    recommend() {
      console.log('recommend');
    },
    submit() {
      console.log('submit');
    }
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
    SwiperSlide,
    jobCard,
    companyCard,
    actorCard,
    criticism,
    criticismInput
  },
  directives: {
    swiper: directive
  }
};
</script>

<style lang="less" scoped>
.test {
  margin-bottom: 200px;
}
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
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.testing {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cricism {
  width: 600px;
  margin: 0 auto;
}
</style>
