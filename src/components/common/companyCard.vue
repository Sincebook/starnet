<template>
  <div class="company-card" @click="goPush(item.id)">
    <div class="company-head">
      <el-image class="bgImg" :src="item.image" fit="cover"></el-image>
    </div>
    <div class="company-content">
      <div class="img">
        <el-image class="aimg" :src="item.logo" fit="cover"></el-image>
      </div>
      <h2 class="name" @click="detail">{{ item.name }}</h2>
      <div class="desc">累计达成合作{{ item.oknum }}单</div>
      <div class="btn-box">
        <div class="btn" @click.stop="msgIt">私信</div>
        <div class="btn" @click.stop="watchIt">{{ two }}</div>
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
import { watchIt, noWatch, addMsg, getComInfoById, isFun } from '@/ajax';
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
    // console.log(this.item.id);
    this.getInfo();
  },
  methods: {
    detail() {
      this.$emit('detail', this.companyId);
    },
    msgIt() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
        return;
      }
      if (this.$refs.msg.style.display === 'block') {
        this.$refs.msg.style.display = 'none';
      } else {
        this.$refs.msg.style.display = 'block';
      }
    },
    // 获取userid
    getInfo() {
      getComInfoById({ id: this.item.id }).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.userid = res.data.userid;
          this.name = this.item.name;
          this.image = res.data.image;
          if (this.$store.state.isLogin) {
            this.isFun();
          }
        }
      });
    },
    sendMsg() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
        return;
      }
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
    watchIt() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
        return;
      }
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
          // console.log(reason);
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
    },
    goPush(id) {
      this.$router.push('/companyDetail/' + id);
    }
  }
};
</script>

<style lang="less" scoped>
.company-card {
  cursor: pointer;
  text-align: center;
  user-select: none;
  position: relative;
  width: 280px;
  background-color: var(--cardBgColor);
  height: 360px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  &:hover {
    .company-head .bgImg {
      transform: scale(1.1);
    }
  }
  .company-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 120px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .company-content {
    width: 100%;
    padding: 100px 25px 20px 25px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    .img {
      height: 85px;
      display: flex;
      justify-content: center;
      align-items: center;
      .aimg {
        position: absolute;
        top: 75px;
        background-color: #fff;
        width: 90px;
        height: 90px;
        border-radius: 50%;
      }
    }
    .name {
      width: 180px;
      display: inline-block;
      cursor: pointer;
      color: #759cb6;
      font-weight: 600;
      margin-bottom: 20px;
      transition: all 0.25s;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      &:hover {
        color: #0d7bc4;
      }
    }
    .desc {
      width: 100%;
      width: 100%;
      color: var(--fontColor);
      margin-bottom: 20px;
      font-size: 13px;
    }
    .btn-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        width: 40%;
        height: 30px;
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
