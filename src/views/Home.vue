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
      <div class="swiper-pagination" id="parent" slot="pagination"></div>
    </swiper>
    <hot-actor></hot-actor>
    <hot-job></hot-job>
    <hot-company></hot-company>
    <create-cv></create-cv>
    <safe-card></safe-card>
    <join-us></join-us>
    <el-dialog
      v-if=" isLogin == 1 && isCelebrity == 0"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>你还没有认证，快去认证吧～</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="celebrityTo()" class="celebrity">立即认证</el-button>
      </span>
    </el-dialog>
    <el-dialog
      v-if="jobNews = 1 "
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose1">
      <span>您有的投递，快去查看吧～</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="jobNewsTo()" class="celebrity">前往查看</el-button>
      </span>
    </el-dialog>
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
import { getbanner, getMyinfo, jobNews } from '../ajax/index';
import { mapState } from 'vuex';
export default {
  data() {
    return {
      time: '',
      jobNews: 0,
      type: 0,
      id: 0,
      isCelebrity: 1,
      dialogVisible: true,
      dialogVisible1: false,
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
      ],
      flag: true
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
  beforeDestroy() {
    clearInterval(this.time);
  },
  created() {
    getbanner({
      type: '1'
    }).then(res => {
      if (res.code === '0') {
        this.banners = res.data;
      }
    });
    this.time = setInterval(() => {
         if (this.flag) {
          this.isjobNews();
         }
      }, 2000);
  },
  methods: {
    handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    handleClose1(done) {
        this.flag = true;
        done();
        // this.timeCLock();
    },
    celebrityTo() {
      if (this.$store.state.userinfo.user.type > 3) {
        this.$router.push('/corporateCelebrity');
      } else {
        this.$router.push('/personalcelebrity');
      }
    },
    isDialog() {
      getMyinfo().then(res => {
        if (res.code === '0' && res.data.user.status === 2) {
          // console.log(res.code);
          // console.log(res.data.user.status);
          this.isCelebrity = 1;
        } else {
          console.log(res);
          this.isCelebrity = 0;
          // console.log(res.data.user.status);
        }
      });
    },
    jobNewsTo() {
      this.dialogVisible1 = false;
      this.$router.push('/corporateRecruit');
    },
    isjobNews() {
      getMyinfo().then(res => {
        if (res.code === '0') {
          this.type = res.data.user.type;
          this.id = res.data.user.id;
           if (this.type === 6 || this.type === 5 || this.type === 4) {
            jobNews({
              userid: this.id
            }).then(res => {
              if (res.code === '0') {
                this.flag = false;
                this.jobNews = 1;
                this.dialogVisible1 = true;
              } else {
                console.log('没有新投递');
                // this.jobNews = 0;
              }
            });
          }
        } else {
        }
      });
    }
    // timeCLock() {
    //    setInterval(() => {
    //      if (this.flag) {
    //       this.isjobNews();
    //      }
    //   }, 2000);
    // }
  },
  mounted() {
    this.isDialog();
    // this.timeCLock();
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    })
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
  --swiper-navigation-color: rgba(255, 0, 0, 1); /* 单独设置按钮颜色 */
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
#parent /deep/ .swiper-pagination-bullet{
      background: white;
      opacity: 0.5;
}
#parent /deep/ .swiper-pagination-bullet-active {
      background: white;
      opacity: 1;
}
.homeIcon {
  color: #000;
}
.celebrity {
  margin-right: 33%;
  text-align: center;
}
.el-button{
  width: 35%;
  height: 40px;
  font-size: 16px;
  margin-bottom: 5%;
}
.el-dialog__body{
  span {
    font-size: 16px;
  }
}
</style>
