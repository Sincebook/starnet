<template>
  <div class="safe">
    <h1>您的安全高于一切</h1>
    <p>
      我们会通过严格的会员资格认证，详实的资料审查程序，始终把保证您的安全视为首要任务
    </p>
    <div class="btn-box">
      <div class="btn" @click="tips">安全提示帮助</div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    tips() { }
  }
};
</script>

<style lang="less" scoped>
.safe {
  background-color: #f5f5f5;
  width: 100%;
  padding: 75px 0;
  h1 {
    margin-bottom: 50px;
  }
  p {
    font-size: 18px;
    margin: 0 35px 60px 35px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      font-size: 18px;
      font-weight: 600;
      border-radius: 50px;
      padding: 12px;
      width: 200px;
      margin: 0 20px;
      transition: all 0.25s;
      cursor: pointer;
      border: 2px solid #da6c20;
      &:hover {
        background: #da6c20;
        color: #fff;
      }
    }
  }
}
</style>
