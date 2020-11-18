<template>
  <div class="actor-card">
    <div class="bgImg" :style="{ backgroundImage: 'url(' + bgImg + ')' }"></div>
    <div class="info">
      <h2 class="name" @click="detail">杨旭/郑州</h2>
      <p class="desc">演员</p>
      <div class="btn-box">
        <div class="btn" @click="email">私信</div>
        <div class="btn" @click="follow">关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bgImg: '//ftp.qnets.cn/img/bg3.jpg'
    };
  },
  methods: {
    detail() {
      this.$emit('detail');
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
.actor-card {
  text-align: center;
  user-select: none;
  position: relative;
  width: 330px;
  background-color: var(--cardBgColor);
  height: 450px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  .bgImg {
    width: 100%;
    height: 300px;
    transition: all 0.25s;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
  }
  .name {
    cursor: pointer;
    color: #759cb6;
    font-weight: 600;
    margin: 10px 0;
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
}
</style>
