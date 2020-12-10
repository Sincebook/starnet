<template>
  <div class="company-breif">
    <div class="cbHeader">
      <img :src="bgImg" class="comimg1" />
      <img :src="bgImg1" class="comimg2" />
    </div>
    <div class="cbMiddle">
      <span class="comname">{{ 'item.name' }}</span>
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
        <div class="msg" @click="msgIt">私信</div>
        <div class="attention">关注</div>
        <span class="fans">粉丝{{ fansNums }}</span>
        <span class="deal">成交{{ item.oknum }}</span>
      </div>
    </div>
    <div class="msg1" ref="msg" style="display: none">
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
import { showFunsNumsByUserId, sendMessageToId } from '@/ajax';

export default {
  props: ['userid', 'item'],
  data() {
    return {
      bgImg: '//ftp.qnets.cn/since/dswcb1.jpeg',
      bgImg1: '//ftp.qnets.cn/since/dswcb2.png',
      showmode: false,
      fansNums: '',
      deal: '',
      input2: ''

    };
  },
  created() {
    this.funNums();
  },
  methods: {
    //   privateMessage(){ }
    //   changeColor(e) {
    //   console.log(1111);
    //   console.log(this.$refs['change' + e][0]);
    //   this.$refs['change' + e][0].style.border = 'blue 2px solid';
    sendMsg() {
      this.msgIt();
      sendMessageToId({ toid: this.userid, word: this.input2 }).then(res => {
        console.log(res);
        this.input2 = '';
      });
    },
    msgIt() {
      if (this.$refs.msg.style.display === 'block') {
        this.$refs.msg.style.display = 'none';
      } else {
        this.$refs.msg.style.display = 'block';
      }
    },
    funNums() {
      showFunsNumsByUserId({ userid: this.userid }).then(res => {
        // console.log(res);
        // console.log(res.data);
        this.fansNums = res.data;
      });
    },
    msgTo() {
      sendMessageToId({ toid: this.userid }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.company-breif {
  width: 960px;
  height: 485px;
  margin: 0 auto;
  position: relative;
}
.cbHeader {
  //   position: relative;
  width: 960px;
  height: 370px;
  margin: 0 auto;
  position: relative;
}
.cbMiddle {
  text-align: center;
  width: 960px;
  height: 30px;
  padding-left: 143px;
  // margin: 0 auto;
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
  // display: inline-block;
  // padding-left: 415px;
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
  text-align: center;
  padding-left: 20px;
  width: 500px;
  height: 50px;
  margin: 0 auto;
  div:hover {
    cursor: pointer;
    border: solid 2px lightblue;
  }
}
.include div {
  // width:100px ;
  height: 30px;
  border: solid 1px grey;
  text-align: center;
  margin: 20px 10px;
  float: left;
  font-size: 14px;
  border-radius: 5px;
  color: grey;
}
.msg {
  display: inline-block;
  width: 100px;
  padding: 5px 0;
}
.attention {
  display: inline-block;
  width: 100px;
  padding: 5px 0;
}
.fans {
  cursor: not-allowed;
  display: inline-block;
  border: 1px solid grey;
  border-radius: 5px;
  color: grey;
  // line-height: 30px;
  padding: 5px 10px;
}
.deal {
  cursor: not-allowed;
  display: inline-block;
  margin-top: 20px;
  margin-left: 10px;
  border: 1px solid grey;
  border-radius: 5px;
  color: grey;
  // line-height: 30px;
  padding: 5px 30px;
}
.msg1 {
  width: 300px;
  position: absolute;
  right: 50px;
  //   left: -670px;
  //   top: -23px;
}
</style>
