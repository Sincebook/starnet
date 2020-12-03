<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details">
      <div class="right-box">
        <h3>附加角色（3个）</h3>
        <p>
          几个附加角色: <br />
          1、用有趣的个性让自己平静下来 <br />
          2、聚会的焦点，有趣的灵魂 <br />
          3、活泼、自信女性。阳光、帅气的男性 <br />
          女性/男性，18至40岁
        </p>
        <button>立即申请</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.actor {
  width: 960px;
  background-color: #ffffff;
  padding: 0 40px;
  margin: 0 auto;
}
.details {
  border-top: 2px solid #e7e4e4;
  min-height: 200px;
}

.right-box {
  width: 1250px;
  height: 350px;
  // border-top: 1px solid #ececec;
}
.line {
  width: 1250px;
  height: 3px;
  background: linear-gradient(to right, #ececec, #ffffff);
  border-radius: 4px;
}
.right-box h3 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
  padding-top: 30px;
}
.right-box p {
  font-size: 15px;
  color: #606060;
  line-height: 30px;
}
.right-box button {
  cursor: pointer;
  outline: none;
  width: 120px;
  height: 32px;
  font-size: 15px;
  color: #ffffff;
  border: 0;
  border-radius: 10px;
  margin-top: 15px;
  background-color: #22ac38;
}
</style>
