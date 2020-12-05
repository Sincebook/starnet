<template>
  <div class="talent-resume">
    <p style="text-align: center; font-weight: 600; font-size: 18px">
      个人简历
    </p>
    <div class="grid">
      <div>
        <p>国<span style="padding-left: 28px"></span>籍：</p>
        <p>性<span style="padding-left: 28px"></span>别：</p>
        <p>民<span style="padding-left: 28px"></span>族：</p>
        <p>居住城市：</p>
        <p>出生日期：</p>
        <p>职<span style="padding-left: 28px"></span>业：</p>
        <p>经纪公司：</p>
        <p>
          代<span style="padding-left: 14px"></span>表<span
            style="padding-left: 14px"
          ></span
          >作：
        </p>
      </div>
      <div style="color: rgb(45, 100, 150)">
        <p>{{ data.contry }}</p>
        <p>{{ data.sex }}</p>
        <p>{{ data.nation }}</p>
        <p>{{ data.workArea }}</p>
        <p v-if="data.birthTime">{{ data.birthTime.substring(0, 10) }}</p>
        <p>{{ data.vocation }}</p>
        <p>{{ data.company }}</p>
        <p>{{ data.representativeWork }}</p>
      </div>
      <div>
        <p>身<span style="margin-left: 28px"></span>高：</p>
        <p>体<span style="margin-left: 28px"></span>重：</p>
        <p>胸<span style="margin-left: 28px"></span>围：</p>
        <p>腰<span style="margin-left: 28px"></span>围：</p>
        <p>眼睛颜色：</p>
        <p>肤<span style="margin-left: 28px"></span>色：</p>
        <p>发<span style="margin-left: 28px"></span>色：</p>
        <!-- <p>头发长度：</p> -->
        <p>头发类型：</p>
      </div>
      <div style="color: rgb(45, 100, 150)">
        <p v-if="data.height">
          {{ data.height }}cm<span style="opacity: 0">哈</span>
        </p>
        <p v-if="data.weight">
          {{ data.weight }}kg<span style="opacity: 0">哈</span>
        </p>
        <p v-if="data.bust">
          {{ data.bust }}<span style="opacity: 0">哈</span>
        </p>
        <p v-if="data.buttock">
          {{ data.buttock }}<span style="opacity: 0">哈</span>
        </p>
        <p v-if="data.eyeColour">{{ data.eyeColour }}色</p>
        <p v-if="data.skinColour">{{ data.skinColour }}色</p>
        <p v-if="data.hairColour">{{ data.hairColour }}色</p>
        <!-- <p>
          长</p> -->
        <p v-if="data.hairType">{{ data.hairType }}</p>
      </div>
      <div class="header">
        <img :src="data.image" alt="" />
        <div class="info">
          <p>
            <!-- <span
              style="
                color: #868c8c;
                font-size: 14px;
                margin-right: 10px;
                padding-bottom: 3px;
              "
              >分享</span
            > -->
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
          </p>
          <p>
            {{ data.name }}
            <span style="font-size: 14px; color: #868c8c">{{
              data.nickname
            }}</span>
          </p>
          <p>
            <span @click="msgIt">私&nbsp;&nbsp;信</span>
            <span @click="watchIt">{{ two }}</span>
            <span style="font-size:13px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;vertical-align:middle;" :title="funs">粉丝&nbsp;&nbsp;{{ funs }}</span>
          </p>
        </div>
      </div>
    </div>
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
    <div class="introduce">
      <p class="my-info" ref="myInfo" style="margin: 20px">
        {{ data.selfEvaluation }}
      </p>
      <p class="show-all" @click="showAll">{{ tag }}</p>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import { watchIt, noWatch, addMsg, getFuns } from '@/ajax';
export default {
  props: ['data'],
  name: 'talentResume',
  data() {
    return {
      tag: '展开',
      two: '关  注',
      input2: '',
      funs: '--/--'
    };
  },
  created() {
    this.getfuns();
  },
  methods: {
    showAll() {
      this.tag = this.tag === '展开' ? '收起' : '展开';
      this.$refs.myInfo.className = this.$refs.myInfo.className === 'my-info' ? '' : 'my-info';
    },
    msgIt() {
      if (this.$refs.msg.style.display === 'block') {
        this.$refs.msg.style.display = 'none';
      } else {
        this.$refs.msg.style.display = 'block';
      }
    },
    sendMsg() {
      this.msgIt();
      addMsg({ toid: this.data.userid, word: this.input2 }).then(res => {
        console.log(res);
        this.input2 = '';
      });
    },
    watchIt() {
      if (this.two === '已关注') {
        this.two = '关  注';
        noWatch({ starid: this.data.userid }).then(res => {
          console.log(res);
        });
      } else {
        this.two = '已关注';
        console.log(this.data.userid);
        watchIt({ starid: this.data.userid, name: this.data.name, image: this.data.image }).then(res => {
          console.log(res);
        });
      }
    },
    getfuns() {
      getFuns({ userid: this.data.userid }).then(res => {
        // console.log(res);
        this.funs = res.data;
      });
    }
  }
};
</script>
<style lang='less' scoped>
.talent-resume {
  background-color: #fff;
  width: 960px;
  margin: 40px auto 0 auto;
  padding: 40px 20px 80px 20px;
  position: relative;
  .grid {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    div {
      margin: 30px;
    }
    p {
      margin-bottom: 8px;
    }
    .header {
      width: 250px;
      margin: 0;
      margin-top: 30px;
      margin-left: 30px;
      img {
        width: 240px;
        height: 240px;
      }
      .info {
        // background-color: rgba(200, 200, 200, 0.7);
        // margin: 40px auto 40px auto;
        // padding-left: 50px;
        // vertical-align: top;
        position: relative;
        display: inline-block;
        margin: 0;
        p:first-child {
          position: absolute;
          right: 0;
          top: 25px;
          .icon {
            cursor: pointer;
            font-size: 18px;
            margin-right: 5px;
          }
        }
        p:nth-child(2) {
          display: inline-block;
          font-size: 18px;
          color: #2d6496;
          margin: 20px 0;
          border-bottom: 1px solid rgba(134, 140, 140, 0.5);
        }
        p:nth-child(3) {
          span {
            display: inline-block;
            width: 75px;
            height: 30px;
            border: 1px solid rgb(180, 115, 115);
            margin-right: 5px;
            text-align: center;
            line-height: 30px;
            cursor: pointer;
          }
          span:first-child {
            border: 1px solid rgba(3, 158, 3, 0.705);
          }
          span:hover {
            color: #fff;
            background-color: rgb(180, 115, 115);
          }
          span:first-child:hover {
            color: #fff;
            background-color: rgba(20, 136, 20, 0.623);
          }
          span:last-child {
            border: 0px;
            &:hover {
              border: 0;
              color: #333;
              background-color: #fff;
              cursor: auto;
            }
          }
        }
      }
    }
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
    bottom: -2px;
    right: 20px;
    cursor: pointer;
  }
  .introduce {
    position: absolute;
    overflow: hidden;
    width: 580px;
    top: 300px;
    left: 55px;
  }
  .msg {
    width: 300px;
    position: absolute;
    right: 50px;
  }
}
</style>
