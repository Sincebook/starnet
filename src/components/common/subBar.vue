<template>
  <div class="subBar" ref="bg"></div>
</template>
<script>
import { getBackGroundImgs } from '@/ajax';
export default {
  props: ['companyType', 'nameArr'],
  name: 'subBar',
  data() {
    return {
      btns: [],
      moreBtns: [],
      flag: true,
      tag: '更多...',
      bgImgs: []
    };
  },
  created() {
    this.getImgs();
  },
  // mounted() {
  //   if (this.$route.fullPath.includes('job')) {
  //     this.$refs.bg.className += ' bgjob';
  //   }
  //   if (this.$route.fullPath.includes('company')) {
  //     this.$refs.bg.className += ' bgcompany';
  //   }
  //   if (this.$route.fullPath.includes('talent')) {
  //     this.$refs.bg.className += ' bgtelent';
  //   }
  //   if (this.bgImgs.length) {
  //     if (this.$route.fullPath.includes('job')) {
  //       this.$refs.bg.className += ' bgjob';
  //       this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[0] + ')';
  //     }
  //     if (this.$route.fullPath.includes('company')) {
  //       this.$refs.bg.className += ' bgcompany';
  //       this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[1] + ')';
  //     }
  //     if (this.$route.fullPath.includes('talent')) {
  //       this.$refs.bg.className += ' bgtelent';
  //       this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[2] + ')';
  //     }
  //   }
  // },
  methods: {
    getImgs() {
      getBackGroundImgs().then(res => {
        if (res.code === '0') {
          this.bgImgs = [res.data.job, res.data.company, res.data.talent];
          this.$nextTick(() => {
            if (this.$route.fullPath.includes('job')) {
              this.$refs.bg.className += ' bgjob';
              this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[0] + ')';
            }
            if (this.$route.fullPath.includes('company')) {
              this.$refs.bg.className += ' bgcompany';
              this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[1] + ')';
            }
            if (this.$route.fullPath.includes('talent')) {
              this.$refs.bg.className += ' bgtelent';
              this.$refs.bg.style.backgroundImage = 'url(' + this.bgImgs[2] + ')';
            }
          });
        }
      });
    }
  }
};
</script>
<style lang='less' scoped>
.bgjob {
  // background-image: url(https://ftp.qnets.cn/since/job.jpg);
  background-size: auto 400px;
  background-repeat: no-repeat;
  color: #fff;
  .more {
    color: #fff;
  }
}
.bgtelent {
  // background-image: url(https://ftp.qnets.cn/since/telent.jpg);
  background-size: 100%;
  background-size: auto 400px;
  color: #fff;
  .more {
    color: #fff;
  }
}
.bgcompany {
  // background-image: url(https://ftp.qnets.cn/since/company1.jpg);
  background-size: 100%;
  background-size: auto 400px;
  color: #fff;
  .more {
    color: #fff;
  }
}
.subBar {
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin: 40px;
    font-size: 36px;
    span {
      margin-left: 10px;
    }
  }
  .type {
    display: grid;
    grid-template-columns: 150px 150px 150px 150px 150px;
    grid-column-gap: 20px;
    div {
      margin: 20px;
      text-align: center;
      padding: 10px 15px;
      border: 2px solid rgb(25, 130, 200);
      width: 130px;
      border-radius: 15px;
      transition: background-color 0.25s;
      cursor: pointer;
    }
    div:hover {
      background-color: rgb(25, 130, 200);
      color: #fff;
    }
  }
  .more {
    justify-self: flex-end;
    align-self: flex-end;
    cursor: pointer;
    margin-right: 23%;
  }
}
</style>
