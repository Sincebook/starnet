<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details">
      <h3>{{ item.name }}</h3>
      <div class="right-box">
        <img
          :src="item.src"
          alt=""
        />
        <span>
          {{ item.info }}<br />
          {{ item.sexAge }}<br>
          {{ item.info }}<br />
          {{ item.sexAge }}
        </span>
      </div>
      <button>立即申请</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
};
</script>

<style lang="less" scoped>
.actor {
  width: 960px;
  padding: 0 40px;
  margin: 0 auto;
  background-color: #fff;
}
.details {
  border-top: 2px solid #e7e4e4;
  min-height: 340px;
  padding: 20px 0;
  h3 {
    font-size: 25px;
    color: #606060;
    margin-bottom: 20px;
  }
  button {
    cursor: pointer;
    outline: none;
    width: 100px;
    height: 35px;
    font-size: 15px;
    color: #ffffff;
    border: 0;
    border-radius: 10px;
    margin-top: 25px;
    background-color: #22ac38;
  }
}
.right-box {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  span {
    margin: 0 10px;
    font-size: 18px;
    line-height: 32px;
    color: #606060;
  }
  img {
    width: 180px;
    height: 250px;
  }
}
</style>
