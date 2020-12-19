<template>
  <div class="actor-card">
    <div class="actor-head">
      <el-image class="bgImg" :src="item.image" fit="cover"></el-image>
    </div>
    <div class="info">
      <router-link :to="{ name: 'talentDetail', params: { id: item.id } }">
        <h2 class="name">{{ item.name }}/{{ item.workArea }}</h2></router-link
      >
      <p class="desc">{{ item.vocation }}</p>
      <div class="btn-box">
        <div class="btn" @click="msgIt">私信</div>
        <div class="btn" @click="watchIt">{{ two }}</div>
      </div>
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
import { watchIt, noWatch, addMsg, userinfoById, isFun } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      input2: '',
      two: '关注',
      userid: '',
      name: '',
      image: ''
    };
  },
  created() {
    // console.log(this.item.workArea);
    if (this.item.workArea != null) {
      let isArea = '';
      this.item.workArea.split(',').forEach((item, index) => {
        if (item.indexOf('市') !== -1) {
          isArea = item;
        }
      });
      if (isArea) {
        this.item.workArea = isArea;
      }
    }
    this.getInfo();
  },
  methods: {
    msgIt() {
      if (this.$refs.msg.style.display === 'block') {
        this.$refs.msg.style.display = 'none';
      } else {
        this.$refs.msg.style.display = 'block';
      }
    },
    // 获取userid
    getInfo() {
      userinfoById({ id: this.item.id }).then(res => {
        // console.log(res);
        if (res.data) {
          this.userid = res.data.userid;
          this.name = res.data.name;
          this.image = res.data.image;
          this.isFun();
        }
      });
    },
    async sendMsg() {
      // if (!this.userid) {
      //   await this.getInfo();
      // }
      this.msgIt();
      addMsg({ toid: this.userid, word: this.input2 }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '私信成功',
            type: 'success'
          });
          this.input2 = '';
        } else {
          this.$message({
            message: res.errMsg,
            type: 'error'
          });
        }
      });
    },
    async watchIt() {
      // if (!this.userid) {
      //   await this.getInfo();
      // }
      if (this.two === '已关注') {
        this.two = '关  注';
        noWatch({ starid: this.userid }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '已取消关注',
              type: 'success'
            });
          }
        }, reason => {
          this.$message({
            message: reason,
            type: 'error'
          });
        });
      } else {
        this.two = '已关注';
        watchIt({ starid: this.userid, name: this.name, image: this.image }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '关注成功',
              type: 'success'
            });
          } else {
            this.$message({
              message: '取消失败',
              type: 'error'
            });
          }
        });
      }
    },
    // 判断该用户是否关注了该明星
    isFun() {
      isFun({ starid: this.userid }).then(res => {
        if (res.data) {
          this.two = '已关注';
        }
        // console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.actor-card {
  text-align: center;
  user-select: none;
  position: relative;
  width: 280px;
  background-color: var(--cardBgColor);
  height: 400px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  &:hover {
    .actor-head .bgImg {
      transform: scale(1.1);
    }
  }
  .actor-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 250px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .info {
    padding-top: 250px;
  }
  .name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: inline-block;
    width: 230px;
    cursor: pointer;
    color: #759cb6;
    font-weight: 600;
    margin: 10px 0 0 0;
    transition: all 0.25s;
    &:hover {
      color: #0d7bc4;
    }
  }
  .desc {
    color: var(--fontColor);
    margin: 15px 0 20px 0;
    font-size: 16px;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .btn {
      width: 33%;
      height: 40px;
      border-radius: 4px;
      font-size: 16px;
      transition: all 0.25s;
      cursor: pointer;
      color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        border: 2px solid #208b4e;
        &:hover {
          background-color: #208b4e;
          color: #fff;
        }
      }
      &:last-child {
        border: 2px solid #222;
        &:hover {
          background-color: #222;
          color: #fff;
        }
      }
    }
  }
  .msg {
    border: 1px solid #208b4e;
    border-radius: 5px;
    width: 240px;
    position: absolute;
    right: 0px;
    bottom: -30px;
  }
}
</style>
