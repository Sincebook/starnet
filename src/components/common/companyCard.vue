<template>
  <div class="company-card">
    <div class="company-head">
      <el-image class="bgImg" :src="item.image" fit="cover"></el-image>
    </div>
    <div class="company-content">
      <div class="img">
        <el-image class="aimg" :src="item.logo" fit="cover"></el-image>
      </div>
      <router-link :to="{ name: 'companyDetail', params: { id: item.id } }">
        <h2 class="name" @click="detail">{{ item.name }}</h2></router-link
      >
      <div class="desc">累计达成合作{{ item.oknum }}单</div>
      <div class="btn-box">
        <div class="btn" @click="email">私信</div>
        <div class="btn" @click="follow">关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      bgImg: '//ftp.qnets.cn/img/bg2.jpg',
      bgImg1: '//ftp.qnets.cn/img/bg3.jpg'
    };
  },
  methods: {
    detail() {
      this.$emit('detail', this.companyId);
    },
    email() {
      this.$emit('email');
    },
    follow() {
      this.$emit('follow');
    }
  }
};
</script>

<style lang="less" scoped>
.company-card {
  text-align: center;
  user-select: none;
  position: relative;
  width: 330px;
  background-color: var(--cardBgColor);
  height: 400px;
  transition: all 0.25s;
  &:hover {
    .company-head .bgImg {
      transform: scale(1.1);
    }
  }
  .company-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 150px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .company-content {
    width: 100%;
    padding: 150px 25px 10px 25px;
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
        top: 85px;
        background-color: #fff;
        width: 136px;
        height: 136px;
        border-radius: 50%;
      }
    }
    .name {
      display: inline-block;
      cursor: pointer;
      color: #759cb6;
      font-weight: 600;
      margin-bottom: 20px;
      transition: all 0.25s;
      &:hover {
        color: #0d7bc4;
      }
    }
    .desc {
      width: 100%;
      width: 100%;
      color: var(--fontColor);
      margin-bottom: 25px;
      font-size: 13px;
    }
    .btn-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      .btn {
        width: 40%;
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
  }
}
</style>
