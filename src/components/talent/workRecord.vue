<template>
  <div class="work-record">
    <p class="title">工作经历</p>
    <p class="tit">早年经历</p>
    <p class="container">
      1993年，刘涛在读高二时进入南京军区集团军文工团。自1993到1995年，刘涛在文工团担任文艺兵。<br />
      1998年，刘涛移居广州，在广州外国语学院自费学习法律。
    </p>
    <p class="tit">演艺经历</p>
    <p class="container my-info" ref="myInfo">
      2000年刘涛开始接拍各种类型的广告，并出演第一部电视剧《外来媳妇本地郎》饰胡幸子。<br />
      2002年出演琼瑶剧《还珠格格3之天上人间》，饰慕沙，并签约琼瑶旗下的仲杰文化传播有限公司并出演张纪中版《天龙八部》饰阿朱，凭借该剧获得年度最具魅力女演员奖。<br />
      2003年出演《末代皇妃》，饰演齐如玉并出演《永乐英雄儿女》饰演蛮儿。<br />
      2004年《天龙八部》的播出，5月份参演《原来就是你》并一人分饰两角，这也是刘涛第一次以女一号身份出演的作品。
      2004年6月中央台投资的神话剧《白蛇传》刘涛饰演白素贞。<br />
    </p>
    <p @click="tagChange" class="show-all">{{ tag }}</p>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'workRecord',
  data() {
    return {
      tag: '展开'
    };
  },
  components: {

  },
  methods: {
    tagChange() {
        this.tag = this.tag === '展开' ? '收起' : '展开';
      this.$refs.myInfo.className = this.$refs.myInfo.className.includes('my-info') ? 'container' : 'container my-info';
    }
  }
};
</script>
<style lang='less' scoped>
.work-record {
  width: 960px;
  margin: 20px auto;
  background-color: #fff;
  padding: 20px;
  position: relative;
  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .tit {
    padding-left: 30px;
    line-height: 20px;
    height: 20px;
    // background-color: rgb(200, 200, 200);
    color: #2d6496;
    font-weight: 600;
  }
  .container {
    padding-left: 30px;
    color: #868c8c;
    line-height: 40px;
  }
  .my-info {
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    -webkit-box-orient: vertical;
  }
    .show-all {
    position: absolute;
    bottom: 10px;
    right: 10px;
    cursor: pointer;
  }
}
</style>
