<template>
  <div class="company-breif">
    <div class="cbHeader">
      <img :src="bgImg" class="comimg1" />
      <img :src="bgImg1" class="comimg2" />
    </div>
    <div class="cbMiddle">
      <span class="comname"
        >华&nbsp;谊&nbsp;兄&nbsp;弟&nbsp;影&nbsp;视&nbsp;公&nbsp;司</span
      >
      <div class="iconSum">
        <span class="share">分 享</span>
        <svg class="icon icon-weixin1" aria-hidden="true">
          <use xlink:href="#icon-weixin1"></use>
        </svg>
        <svg class="icon icon-weibo" aria-hidden="true">
          <use xlink:href="#icon-weibo"></use>
        </svg>
        <svg class="icon icon-diqiu_jiantou_earth_arrow" aria-hidden="true">
          <use xlink:href="#icon-diqiu_jiantou_earth_arrow"></use>
        </svg>
      </div>
    </div>
    <div class="cbFooter" ref="footer">
      <div class="include">
        <div
          @click="changeColor(index)"
          v-for="(item, index) in btns"
          :key="item.id"
          class="type"
          :ref="'change' + index"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      btns: ['私信', '关注', '粉丝 4165', '成交 1111'],
      bgImg: '//ftp.qnets.cn/since/dswcb1.jpeg',
      bgImg1: '//ftp.qnets.cn/since/dswcb2.png',
      showmode: false
    };
  },
  methods: {
    //   changeColor(e) {
    //   console.log(1111);
    //   console.log(this.$refs['change' + e][0]);
    //   this.$refs['change' + e][0].style.border = 'blue 2px solid';
  }
};
</script>
<style lang="less" scoped>
.company-breif {
  width: 960px;
  height: 485px;
  margin: 0 auto;
}
.cbHeader {
  //   position: relative;
  width: 960px;
  height: 370px;
  margin: 0 auto;
  position: relative;
}
.cbMiddle {
  width: 960px;
  height: 30px;
  margin: 0 auto;
}
.cbFooter {
  width: 960px;
  height: 80px;
  margin: 0 auto;
}
.comimg1 {
  margin: 0 auto;
  width: 960px;
  height: 300px;
  position: absolute;
}
.comimg2 {
  margin: 0 auto;
  position: absolute;
  height: 80px;
  width: 80px;
  top: 260px;
  left: 460px;
  border: 2px solid white;
  border-radius: 50%;
  // position:absolute;
}
.comname {
  color: #2d6496;
  font-size: 18px;
  display: inline-block;
  padding-left: 415px;
  font-weight: 800;
}
.active {
  border: solid 1px green;
}
.iconSum {
  float: right;
}
.icon {
  margin: 0 4px;
}
.share {
  font-size: 12px;
  color: grey;
  margin-right: 10px;
}
.include {
  padding-left: 20px;
  width: 500px;
  height: 50px;
  margin: 0 auto;
  div:hover {
    cursor: pointer;
    border: solid 2px lightblue;
  }
}
.type {
  width: 100px;
  height: 30px;
  border: solid 1px grey;
  text-align: center;
  margin: 20px 10px;
  float: left;
  padding: 5px 0;
  font-size: 14px;
  border-radius: 5px;
  color: grey;
}
</style>
