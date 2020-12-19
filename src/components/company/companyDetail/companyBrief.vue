<template>
  <div class="company-breif">
    <div class="cbHeader" v-if="bgImg">
      <img :src="bgImg" class="comimg1" />
      <img :src="bgImg1" class="comimg2" />
    </div>
    <div class="cbMiddle">
      <span class="comname">{{ name }}</span>
      <div class="iconSum">
        <span class="share">分 享</span>
        <svg class="icon icon-weibo" aria-hidden="true" @click.stop="share(3)">
          <use xlink:href="#icon-weibo"></use>
        </svg>
      </div>
    </div>
    <div class="cbFooter" ref="footer">
      <div class="fans">
        <span>粉丝：{{ fansNums }}</span>
        <span>成交：{{ item.oknum }}</span>
      </div>
      <div class="include">
        <div class="msg" @click="msgIt">私信</div>
        <div class="attention">关注</div>
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
import { showFunsNumsByUserId, sendMessageToId, getComInfoById } from '@/ajax';

export default {
  props: ['userid', 'item', 'id'],
  data() {
    return {
      bgImg: '',
      bgImg1: '',
      showmode: false,
      fansNums: '',
      deal: '',
      input2: '',
      shareInfo: '',
      name: ''
    };
  },
  created() {
    this.funNums();
    this.getComIngo();
  },
  methods: {
    getComIngo() {
      getComInfoById({ id: this.id }).then(res => {
        if (res.code === '0') {
          this.bgImg = res.data.image;
          this.bgImg1 = res.data.logo;
          this.shareInfo = res;
          this.name = res.data.name;
        }
      });
    },
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
    },
    // 分享
    share(index) {
      let url = window.location.href + '#' + this.id;
      console.log(url);
      if (index === 3) {
        window.open('http://v.t.sina.com.cn/share/share.php?title=' + this.shareInfo.name + '&url=' + url + '&content=utf-8&sourceUrl=' + this.shareInfo.slogan + '&pic=' + this.shareInfo.logo, 'newwindow', 'height:400,width:400,top:100,left:100'
        );
      }
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
  height: 350px;
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
  position: relative;
  left: -20px;
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
  cursor: pointer;
}
.share {
  font-size: 12px;
  color: grey;
  margin-right: 10px;
}
.include {
  text-align: center;
  padding-left: 45px;
  width: 500px;
  height: 50px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
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
  text-align: center;
  span:last-child {
    position: relative;
    left: 40px;
    margin-left: 20px;
  }
}
.msg1 {
  width: 300px;
  position: absolute;
  right: 50px;
  //   left: -670px;
  //   top: -23px;
}
</style>
