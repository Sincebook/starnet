<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details w">
      <div class="right-box">
        <div class="line"></div>
        <h3>玛丽</h3>
        <p>
          雄心勃勃、有趣、活泼、有能力的女性，对生活充满热情。专注于事业，不寻求爱情，但命运在召唤<br />
          女性，28至40岁
        </p>
        <button>立即申请</button>
      </div>
    </div>
    <!-- actor2 -->
    <div class="details w">
      <div class="right-box">
        <div class="line"></div>
        <h3>宋凯</h3>
        <p>
          暖男，脚踏实地，有能力，专一。<br />
          男性，28至35岁
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
.w {
  width: 1350px;
  background-color: #ffffff;
  padding: 0;
  margin: 0 auto;
}
.details {
  height: 340px;
}

.details .right-box {
  float: right;
  width: 1250px;
  height: 365px;
  // border-top: 1px solid #ececec;
}
.line {
  width: 1250px;
  height: 3px;
  background: linear-gradient(to right, #ececec, #ffffff);
  border-radius: 4px;
}
.right-box h3 {
  font-size: 25px;
  color: #606060;
  margin-bottom: 25px;
  padding-top: 70px;
}
.right-box p {
  font-size: 18px;
  color: #606060;
  line-height: 53px;
}
.right-box button {
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
