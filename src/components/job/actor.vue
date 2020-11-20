<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details">
      <div class="right-box">
        <h3>{{ item.name }}</h3>
        <p>
          {{ item.info }}<br />
          {{ item.sexAge }}
        </p>
        <button>立即申请</button>
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
  width: 1280px;
  padding: 0 40px;
  margin: 0 auto;
  background-color: #fff;
}
.details {
  border-top: 2px solid #e7e4e4;
  min-height: 340px;
}
.right-box h3 {
  font-size: 25px;
  color: #606060;
  margin-bottom: 25px;
  padding-top: 50px;
}
.right-box p {
  font-size: 18px;
  color: #606060;
  line-height: 53px;
}
.right-box button {
  cursor: pointer;
  outline: none;
  width: 130px;
  height: 46px;
  font-size: 15px;
  color: #ffffff;
  border: 0;
  border-radius: 10px;
  margin-top: 25px;
  background-color: #22ac38;
}
</style>
