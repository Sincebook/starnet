<template>
    <div class="company-breif">
        <div class="cbHeader">
            <img :src="bgImg" class="comimg1"/>
            <img :src="bgImg1" class="comimg2">
        </div>
        <div class="cbMiddle" >
                <span class="comname">华谊兄弟影视公司</span>
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
        <div class="cbFooter">
            <div class="include">
                <div @click="changecolor" v-for="(item, index) in btns" :key="index" class="type">
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
          bgImg: require('@/assets/images/dswcb1.jpeg'),
          bgImg1: require('@/assets/images/dswcb2.png')
    };
  },
  methods: {
      changecolor: function() {
          console.log(this);
      }
  }
};
</script>
<style lang="less" scoped>
.company-breif{
  width:1440px;
  height:505px;
}
.cbHeader{
//   position: relative;
  width: 1200px;
  height:390px;
  margin:0 auto;
  padding-top:50px;
  position:relative;
}
.cbMiddle{
  width: 1200px;
  height:30px;
  margin:0 auto;

}
.cbFooter{
  width: 1200px;
  height:100px;
  margin:0 auto;

}
.comimg1{
    margin:0 auto;
    width: 1200px;
    height:300px;
    position:absolute;

}
.comimg2{
    margin:0 auto;
    position: absolute;
    height: 80px;
    width:80px;
    top:290px;
    left:560px;
    border:2px solid white;
    border-radius:50%;
    // position:absolute;
}
.comname{
    color:steelblue;
    font-size:16px;
    display: inline-block;
    padding-left:535px;

}
.active{
    border:solid 1px green;
}
.iconSum{
    float:right;
}
.icon{
    margin: 0 4px;
}
.share{
    font-size: 12px;
    color: grey;
    margin-right: 10px;
}

.include{
    width: 500px;
    height:50px;
    margin: 0 auto;
}
.type{
    width:100px ;
    height:30px;
    border:solid 1px grey;
    text-align: center;
    margin: 20px 10px;
    float:left;
    padding:5px 0;
    font-size:14px;
    border-radius:5px;
    color:grey;
}
</style>
