<template>
  <div class="detail-header">
    <div class="title">
      <div class="info" ref="info">
        <div class="top">
          <span class="job-title">{{ job.title }}</span>
          <span
            class="icon-qq2"
            style="
              color: rgb(150, 140, 140);
              font-size: 16px;
              margin-left: 10px;
            "
          >
            <svg
              class="icon icon-qq2"
              aria-hidden="true"
              style="bottom: -2px; position: relative"
            >
              <use xlink:href="#icon-xunzhang"></use>
            </svg>
            编辑推荐
          </span>
          <span
            class="icon-qq2"
            style="
              color: rgb(150, 140, 140);
              font-size: 16px;
              border-left: 1px solid rgba(150, 140, 140, 0.6);
            "
          >
            <svg
              class="icon icon-qq2"
              aria-hidden="true"
              style="color: rgb(81, 156, 234)"
            >
              <use xlink:href="#icon-shoucang"></use>
            </svg>
            收藏
          </span>
          <span
            class="fenxiang"
            style="border-left: 1px solid rgba(150, 140, 140, 0.6)"
            ref="fenxiang"
          >
            <svg
              class="icon"
              aria-hidden="true"
              style="color: rgb(81, 156, 234); font-size: 18px"
            >
              <use xlink:href="#icon-fenxiang"></use></svg
            >&nbsp;分享
            <div class="fenxiang-card" ref="fenxiangCard" style="display: none">
              <div class="dialog-box">
                <span class="bot"></span>
                <span class="top"></span>
              </div>
              <span style="color: rgb(113, 194, 103); cursor: pointer">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weixin1"></use>
                </svg>
              </span>
              <span style="color: rgb(124, 197, 241); cursor: pointer">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-qq2"></use>
                </svg>
              </span>
              <span style="color: rgb(246, 136, 62); cursor: pointer">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-weibo"></use>
                </svg>
              </span>
            </div>
          </span>
          <p style="font-size: 14px; font-weight: 400; padding: 20px 10px">
            陈可辛，1962年11月28日出生于中国香港，华语影视导演、编剧、演员、监制。
            1989年5月25日，担任监制的剧情片《神行太保》上映。1991年3月29日，拍摄的导演处女作《双城故事》上映。1993年，凭借参与执导的喜剧电影《风尘三侠》获得第13届香港电影金像奖最佳导演提名。2005年12月1日，执导的爱情歌舞片《如果·爱》上映，由此获得第43届台湾电影金马奖最佳导演奖
            [7]
            。2007年12月12日，执导的古装动作片《投名状》上映，凭借该片获得第45届台湾电影金马奖、第27届香港电影金像奖的最佳导演奖
            [8-9] 。
          </p>
        </div>
        <div class="bottom">
          <img :src="job.headerImg" alt="" />
          <span>{{ job.company }}</span>
          <div class="btn">
            <span style="
              color: rgb(150, 140, 140);
              font-size: 16px;
              margin-left: 5px;
            ">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Asset"></use></svg
              >&nbsp;私信
            </span>
            <span style="
              color: rgb(150, 140, 140);
              font-size: 16px;
              margin-left: 5px;
              border-left:1px solid rgba(150, 140, 140, 0.6);
            "><svg class="icon"  aria-hidden="true">
                <use xlink:href="#icon-guanzhu"></use></svg
              >&nbsp;关注</span>
            <span style="color: rgb(150, 140, 140); border-left:1px solid rgba(150, 140, 140, 0.6);">
              粉丝<span style="font-size: 15px">{{ job.fans }}</span>
            </span>
          </div>
        </div>
      </div>
      <img :src="job.bgImg" alt="" class="img" />
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

  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      this.$refs.fenxiang.onmouseenter = function () {
        that.$refs.fenxiangCard.style.display = 'block';
      };
      // this.$refs.info.onmousover = function () {
      //   that.$refs.fenxiangCard.style.display = 'none';
      // };
      this.$refs.fenxiang.onmouseleave = function () {
        that.$refs.fenxiangCard.style.display = 'none';
      };
    });
  }
};
</script>
<style lang='less' scoped>
.detail-header {
  background-color: rgb(245, 245, 245);
  width: 960px;
  margin: 20px auto 0 auto;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .info {
      position: relative;
      height: 338px;
      .top {
        margin: 20px 0;
        font-size: 36px;
        .job-title {
          color: #333;
        }
        .icon-qq2 {
          // margin-left: 10px;
          font-size: 16px;
          cursor: pointer;
          .icon {
            font-size: 20px;
          }
          &:hover {
            color: rgb(81, 156, 234) !important;
          }
        }
        .fenxiang {
          font-size: 18px;
          color: rgb(150, 140, 140);
          font-size: 16px;
          cursor: pointer;
          &:hover {
            color: rgb(81, 156, 234);
          }
        }
        .fenxiang-card {
          border: 1px solid rgba(150, 140, 140, 0.2);
          background-color: #fff;
          position: absolute;
          top: 70px;
          right: 10px;
          font-size: 24px;
          span {
            margin: 0 5px;
          }
          .dialog-box {
            position: relative;
            span {
              width: 0;
              height: 0;
              font-size: 0;
              overflow: hidden;
              position: absolute;
              &.bot {
                border-width: 10px;
                border-style: solid dashed dashed;
                border-color: transparent transparent rgba(150, 140, 140, 0.2)
                  transparent;
                left: 10px;
                top: -20px;
              }
              &.top {
                border-width: 8px;
                border-style: solid dashed dashed;
                border-color: transparent transparent #fff transparent;
                left: 12px;
                top: -16px;
              }
            }
          }
        }
      }
      .bottom {
        position: absolute;
        bottom: 0px;
        // line-height: 50px;
        font-size: 18px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 30px;
        }
        span {
          margin-left: 5px;
        }
        .btn {
          font-size: 16px;
          position: relative;
          top: -38px;
          left: 200px;
          // height: 30px;
          // width: 300px;
          .icon{
            font-size: 20px;
          }
        }
      }
    }
    .img {
      width: 410px;
      height: 350px;
    }
  }
}
</style>
