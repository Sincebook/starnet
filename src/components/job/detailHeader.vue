<template>
  <div class="w">
    <!-- 上方 -->
    <div class="header_top">
      <div class="header_topl">
        <h3>
          陈导电影公开选角
          <img src="../../assets/images/tuijian.png" alt="" />
          <p>编辑推荐</p>
        </h3>

        <div class="img">
          <img src="../../assets/images/gongsitouxiang.jpg" alt="" />
        </div>

        <ul>
          <li><a href="#">私 信</a></li>
          <li><a href="#">关 注</a></li>
          <li><a href="#">粉 丝 4236</a></li>
        </ul>
      </div>
      <!-- 电影图片 -->
      <div class="header_topr">
        <img src="../../assets/images/beijing.png" alt="" />
      </div>

      <!-- 灰色的地方 -->
      <div class="header_bottom">
        <!-- 灰色左边 -->
        <div class="header_bottoml">
          <p>火热进行中，请尽快申请合适的职位</p>
          <button>立即申请</button>
          <button>收&nbsp;藏</button>
        </div>
        <!-- 灰色右边 -->
        <div class="header_bottomr">
          <p>分享</p>
          <img src="../../assets/images/gongsitouxiang.jpg" alt="" />
          <img src="../../assets/images/gongsitouxiang.jpg" alt="" />
          <img src="../../assets/images/gongsitouxiang.jpg" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'XXX',
  data() {
    return {

    };
  },
  components: {

  }
};
</script>
<style lang='less'>
@n: 2.65;
.w {
  width: 3551px / @n;
  margin: 0 auto;
  .header_top {
    display: flex;
    flex-wrap: wrap;
    min-width: 1280px;
    padding-top: 300px / @n;
    height: 1660px / @n;

    .header_topl {
      float: left;
      flex: 1;
      display: flex;
      flex-direction: column;

      h3 {
        display: inline;
        font-style: normal;
        font-size: 136.85px / @n;
        color: #2f678f;
        margin-bottom: 361px / @n;

        img {
          width: 64px / @n;
          height: 83px / @n;
          margin-left: 103px / @n;
        }
        p {
          display: inline-block;
          font-size: 45.13px / @n;
          color: #606060;
          margin-left: 30px / @n;
          vertical-align: middle;
        }
      }
      .img {
        margin-bottom: 100px / @n;
        img {
          width: 167px / @n;
          height: 167px / @n;
          border-radius: 167px /2 / @n;
          margin-right: 37px / @n;
        }
        &::after {
          content: "华谊兄弟有限公司";
          font-size: 60.53px / @n;
          color: #606060;
        }
      }

      ul li {
        float: left;
        width: 342px / @n;
        height: 118px / @n;
        border: 1px solid #453737;
        margin-right: 93px / @n;
        font-size: 56.39px / @n;
        line-height: 118px / @n;
        text-align: center;

        a {
          color: #919191;
        }
      }
    }

    .header_topr {
      float: right;
      flex: 1;
      margin-left: 130px / @n;
      img {
        width: 1691px / @n;
        height: 873px / @n;
      }
    }

    .header_bottom {
      width: 100%;
      height: 345px / @n;
      background: #c9caca;
      padding-left: 124px / @n;
      .header_bottoml {
        float: left;
        margin-top: 60px / @n;
        p {
          font-size: 50.74px / @n;
          color: #2f678f;
          margin-bottom: 55px / @n;
        }
        button {
          width: 347px / @n;
          height: 121px / @n;
          line-height: 121px / @n;
          text-align: center;
          font-size: 56.39px / @n;
          color: #fff;
          margin-right: 115px / @n;
          outline-style: none;
          background-color: #b87373 !important;
          border: none;
          &:nth-child(2) {
            background-color: #22ac38 !important;
          }
        }
      }

      .header_bottomr {
        float: right;
        margin-right: 66px / @n;
        margin-top: 150px / @n;
        p {
          display: inline-block;
          font-size: 50px / @n;
          color: #727272;
          margin-right: 64px / @n;
        }
        img {
          width: 64px / @n;
          height: 64px / @n;
          border-radius: 32px / @n;
          margin-right: 32px / @n;
        }
      }
    }
  }
}
</style>
