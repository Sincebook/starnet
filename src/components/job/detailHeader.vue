<template>
  <div class="detail-header">
    <div class="title">
      <div class="info" ref="info">
        <div class="top">
          <span class="job-title" :title="job1.title">{{
            job1.title.substring(0, 20)
          }}</span>
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
            {{ job1.type == 1 ? "正常" : "编辑推荐" }}
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
            <!-- <div class="fenxiang-card" ref="fenxiangCard" style="display: none">
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
            </div> -->
          </span>
          <p style="font-size: 14px; font-weight: 400; padding: 20px 10px">
            {{ job1.description }}
          </p>
        </div>
        <div class="bottom">
          <img :src="user.head" alt="" v-if="user" />
          <span v-if="user" :title="user.name">{{ user.name }}</span>
          <div class="btn">
            <span
              style="
                color: rgb(150, 140, 140);
                font-size: 16px;
                margin-left: 5px;
              "
              @click="msgIt"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-Asset"></use></svg
              >&nbsp;私信
            </span>
            <span
              style="
                color: rgb(150, 140, 140);
                font-size: 16px;
                margin-left: 5px;
                border-left: 1px solid rgba(150, 140, 140, 0.6);
              "
              ref="guanzhu"
              @click="guanzhu"
              ><svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-guanzhu1"></use></svg
              >&nbsp;{{ guan }}</span
            >
            <span
              style="
                color: rgb(150, 140, 140);
                border-left: 1px solid rgba(150, 140, 140, 0.6);
              "
            >
              粉丝<span style="font-size: 15px; color: rgb(150, 140, 140)">{{
                user.funs
              }}</span>
            </span>
          </div>
        </div>
      </div>
      <img :src="job1.image" alt="" class="img" />
    </div>
    <!-- 私信对接弹窗 -->
    <div class="msg" ref="msg" style="display: none">
      <el-input placeholder="请输入内容" v-model="input2">
        <el-button
          slot="append"
          icon="el-icon-right"
          @click="sendMsg"
          style="color: #2d6496"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { watchIt, noWatch, getUserNH, addMsg, isFun } from '@/ajax';
export default {
  name: 'detailHeader',
  props: ['job1', 'id'],
  data() {
    return {
      user: '',
      input2: '',
      guan: '关注'
    };
  },
  created() {
    this.getUserInfo();
  },
  methods: {
    getUserInfo() {
      getUserNH({ id: this.id }).then(res => {
        console.log(res);
        this.user = res.data;
        this.isFun();
      });
    },
    msgIt() {
      if (this.$refs.msg.style.display === 'block') {
        this.$refs.msg.style.display = 'none';
      } else {
        this.$refs.msg.style.display = 'block';
      }
    },
    sendMsg() {
      if (this.input2) {
        addMsg({ toid: this.user.id, word: this.input2 }).then(res => {
          this.$refs.msg.style.display = 'none';
          this.input2 = '';
          // console.log(res);
        });
      }
    },
    guanzhu() {
      if (this.guan === '关注') {
        this.$refs.guanzhu.style.color = 'rgba(202, 49, 49, 0.732)';
        this.guan = '已关注';
        watchIt({ starid: this.user.id, name: this.user.name, image: this.user.head }).then(res => {
          // console.log(res);
        });
      } else {
        this.$refs.guanzhu.style.color = 'rgb(150, 140, 140)';
        this.guan = '关注';
        noWatch({ starid: this.user.id }).then(res => {
          // console.log(res);
        });
      }
    },
    // 判断该用户是否关注了该明星
    isFun() {
      isFun({ starid: this.user.id }).then(res => {
        if (res.data) {
          this.$refs.guanzhu.style.color = 'rgba(202, 49, 49, 0.732)';
          this.guan = '已关注';
        }
        // console.log(res);
      });
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   let that = this;
    //   this.$refs.fenxiang.onmouseenter = function () {
    //     that.$refs.fenxiangCard.style.display = 'block';
    //   };
    //   // this.$refs.info.onmousover = function () {
    //   //   that.$refs.fenxiangCard.style.display = 'none';
    //   // };
    //   this.$refs.fenxiang.onmouseleave = function () {
    //     that.$refs.fenxiangCard.style.display = 'none';
    //   };
    // });
  }
};
</script>
<style lang='less' scoped>
.detail-header {
  background-color: rgb(245, 245, 245);
  width: 960px;
  margin: 20px auto 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: white;
    padding-left: 40px;
    padding-right: 40px;
    padding-bottom: 20px;
    .info {
      position: relative;
      height: 240px;
      .top {
        margin: 20px 0;
        font-size: 24px;
        .job-title {
          // width: 200px;
          // margin-right: 90px;
          color: #333;
          font-weight: 600;
        }
        .icon-qq2 {
          // margin-left: 10px;
          // float: right;
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
          width: 110px;
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
        white-space: nowrap;
        font-size: 18px;
        height: 50px;
        img {
          width: 50px;
          height: 50px;
          border-radius: 30px;
        }
        span {
          margin-left: 10px;
          color: #333;
          cursor: pointer;
        }
        .btn {
          display: inline-block;
          font-size: 16px;
          // position: relative;
          top: -38px;
          // left: 210px;
          // height: 30px;
          // width: 300px;
          .icon {
            font-size: 20px;
          }
        }
      }
    }
    .img {
      width: 200px;
      height: 150px;
      margin-top: -30px;
    }
  }
  .msg {
    border-radius: 5px;
    width: 240px;
    position: absolute;
    left: 90px;
    bottom: -15px;
  }
}
</style>
