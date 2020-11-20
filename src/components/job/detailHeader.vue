<template>
  <div class="detail-header">
    <div class="title">
      <div class="info">
        <div class="top">
          <span class="job-title">{{ job.title }}</span>
          <span class="icon-qq2">
            <svg class="icon icon-qq2" aria-hidden="true">
              <use xlink:href="#icon-xunzhang"></use>
            </svg>
            编辑推荐
          </span>
        </div>
        <div class="bottom">
          <img :src="job.headerImg" alt="" />
          <span>{{ job.company }}</span>
          <div class="btn">
            <div>私<span>信</span></div>
            <div>关<span>注</span></div>
            <div>
              粉丝<span>{{ job.fans }}</span>
            </div>
          </div>
        </div>
      </div>
      <img :src="job.bgImg" alt="" class="img" />
    </div>
    <div class="share">
      <span>
        <p style="color: rgb(45, 100, 150)">火热进行中，请尽快申请合适的职位</p>
        <span class="share-btn1">立即申请</span>
        <span class="share-btn2">
          收<span style="margin-left: 10px">藏</span>
        </span>
        <span class="shareRight">
          <span
            style="
              color: #868c8c;
              font-size: 14px;
              margin-right: 10px;
              padding-bottom: 3px;
            "
            >分享</span
          >
          <span>
            <svg class="icon icon-qq2" aria-hidden="true">
              <use xlink:href="#icon-weixin1"></use>
            </svg>
          </span>
          <span>
            <svg class="icon icon-qq2" aria-hidden="true">
              <use xlink:href="#icon-qq2"></use>
            </svg>
          </span>
          <span>
            <svg class="icon icon-qq2" aria-hidden="true">
              <use xlink:href="#icon-weibo"></use>
            </svg>
          </span>
        </span>
      </span>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'detailHeader',
  props: ['job'],
  data() {
    return {

    };
  },
  components: {

  }
};
</script>
<style lang='less' scoped>
.detail-header {
  background-color: rgb(245, 245, 245);
  width: 1280px;
  margin: 50px auto 0 auto;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    .info {
      position: relative;
      height: 338px;
      .top {
        margin: 20px 0;
        font-size: 36px;
        .job-title {
          color: rgb(45, 100, 150);
        }
        .icon-qq2 {
          margin-left: 10px;
          font-size: 16px;
          .icon {
            font-size: 20px;
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 30px;
        line-height: 50px;
        font-size: 18px;
        span {
          margin-left: 5px;
        }
        .btn {
          margin-top: 20px;
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          width: 400px;
          div {
            border-radius: 5px;
            border: 1px solid black;
            padding: 0 15px;
            height: 30px;
            line-height: 30px;
            font-size: 14px;
            color: rgb(150, 140, 140);
            transition: all 0.25;
            span {
              margin-left: 5px;
              // color: rgb(150, 140, 140);
            }
          }
          div:nth-child(1) {
            border: 1px solid rgba(3, 158, 3, 0.705);
            &:hover {
              background-color: rgba(20, 136, 20, 0.623);
              color: #fff;
            }
          }
          div:nth-child(2) {
            border: 1px solid rgb(180, 115, 115);
            &:hover {
              background-color: rgb(180, 115, 115);
              color: #fff;
            }
          }
          div:nth-child(3) {
            border: 1px solid rgb(180, 115, 115);
            &:hover {
              background-color: rgb(180, 115, 115);
              color: #fff;
            }
          }
        }
      }
    }
    .bottom {
      img {
        width: 50px;
        height: 50px;
        border-radius: 30px;
      }
    }
    .img {
      width: 600px;
    }
  }
  .share {
    position: relative;
    margin-top: 20px;
    padding: 25px 30px;
    height: 135px;
    font-size: 16px;
    background-color: rgb(200, 200, 200, 0.8);
    .share-btn1 {
      margin-top: 40px;
      font-size: 14px;
      padding: 5px 10px;
      display: inline-block;
      width: 80px;
      text-align: center;
      background-color: rgba(20, 136, 20, 0.623);
      color: #fff;
    }
    .share-btn2 {
      margin-top: 40px;
      margin-left: 70px;
      font-size: 14px;
      padding: 5px 10px;
      display: inline-block;
      width: 80px;
      text-align: center;
      background-color: rgb(180, 115, 115);
      color: #fff;
    }
    .shareRight {
      position: absolute;
      // line-height: 135px;
      right: 30px;
      top: 50%;
      font-size: 18px;
      .icon-share {
        font-size: 18px;
      }
      span{
        margin-left: 5px;
      }
    }
  }
}
</style>
