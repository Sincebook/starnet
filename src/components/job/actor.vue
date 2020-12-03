<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details">
      <div class="right-box">
        <img
          :src="item.src"
          alt=""
        />
        <span>
          <h3>{{ item.name }}</h3>
          {{ item.info }}<br />
          {{ item.sexAge }}<br>
          {{ item.info }}<br />
          {{ item.sexAge }}<br>
          <button>立即申请</button>
        </span>
      </div>
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
  min-height: 200px;
  padding: 20px 0;
  h3 {
    margin-top: 2px;
    font-size: 20px;
    color: #333;
    margin-bottom: 14px;
  }
  button {
    position: absolute;
    bottom: 0;
    cursor: pointer;
    outline: none;
    width: 80px;
    height: 28px;
    font-size: 14px;
    color: #ffffff;
    border: 0;
    border-radius: 5px;
    margin-top: 25px;
    background-color: #22ac38;
  }
}
.right-box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  span {
    margin: 0 10px;
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  img {
    width: 120px;
    height: 160px;
  }
}
</style>
