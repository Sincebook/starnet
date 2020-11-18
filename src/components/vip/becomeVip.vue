<template>
  <div class="become-vip">
    <h1>成为会员尊享9大权益</h1>
    <h2>尊享会员享多重豪礼</h2>
    <div class="desc-box">
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-renmai1"></use>
          </svg>
        </div>
        <h3>无限浏览</h3>
      </div>
      <span class="line"></span>
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-huangguan1"></use>
          </svg>
        </div>
        <h3>资料授权</h3>
      </div>
      <span class="line"></span>
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xunzhang"></use>
          </svg>
        </div>
        <h3>增加曝光</h3>
      </div>
      <span class="line"></span>
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-zuanshi1"></use>
          </svg>
        </div>
        <h3>尊贵标识</h3>
      </div>
    </div>
    <div class="vip-list">
      <vip-card v-for="item in vipArr" :key="item.id" :item="item"></vip-card>
    </div>
  </div>
</template>

<script>
import vipCard from './vipCard';
export default {
  data() {
    return {
      vipArr: [
        { id: 0, title: '普通用户', level: 0, desc: '适合初学者', power: 2 },
        { id: 1, title: '水晶会员', level: 1, desc: '适合有一定经验的人', power: 4 },
        { id: 2, title: '钻石贵宾', level: 2, desc: '适合专业人士', power: 6 }
      ]
    };
  },
  components: {
    vipCard
  }
};
</script>

<style lang="less" scoped>
.become-vip {
  text-align: center;
  width: 100%;
  background-color: #f5f5f5;
  padding: 90px 10px;
  h1 {
    font-size: 40px;
    font-weight: 500;
    color: #6c6c6c;
    margin-bottom: 40px;
  }
  h2 {
    font-size: 28px;
    font-weight: 500;
    color: #b8b8b8;
    margin-bottom: 70px;
  }
  h3 {
    font-size: 24px;
    font-weight: 500;
  }
  .desc-box {
    margin-bottom: 60px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    color: #d34e3b;
    .desc {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      min-width: 120px;
    }
    .line {
      margin: 0 20px;
      height: 2px;
      width: 140px;
      background: radial-gradient(#d34e3b 0%, #f5f5f5 75%);
      transform: translateY(-24px);
    }
  }
  .icon-box {
    width: 120px;
    height: 120px;
    margin-bottom: 20px;
    color: #d34e3b;
    border: 2px solid #d34e3b;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 80px;
    }
  }
  .vip-list {
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }
}

@media screen and (max-width: 1200px) {
  .desc-box {
    .line {
      display: none;
    }
    .desc {
      margin: 10px 5vw;
    }
  }
}
@media screen and (max-width: 600px) {
  .become-vip {
    padding-top: 50px;
    h1 {
      font-size: 30px;
      margin-bottom: 30px;
    }
    h2 {
      font-size: 24px;
      margin-bottom: 30px;
    }
    .icon-box {
      width: 100px;
      height: 100px;
    }
    h3 {
      font-size: 22px;
    }
  }
}
</style>
