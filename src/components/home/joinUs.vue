<template>
  <div class="join-us">
    <h1>欢迎加入我们</h1>
    <div class="desc-box">
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-efficient"></use>
          </svg>
        </div>
        <h3>海量上传</h3>
        <p>个人及企业简介、图片、视频展示资料上传</p>
      </div>
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-rencai"></use>
          </svg>
        </div>
        <h3>优秀人才</h3>
        <p>优选海量人才，满足您演艺人才需求</p>
      </div>
      <div class="desc">
        <div class="icon-box">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-diqiu_jiantou_earth_arrow"></use>
          </svg>
        </div>
        <h3>专业高效</h3>
        <p>专注演艺事业，高效率达成成交</p>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.join-us {
  background-color: #fff;
  width: 100%;
  padding-top: 50px;
  h1 {
    margin-bottom: 50px;
  }
  .desc-box {
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-wrap: wrap;
    .desc {
      flex: 1;
      min-width: 300px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
  .icon-box {
    width: 60px;
    height: 60px;
    color: #222;
    border: 2px solid #222;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    .icon {
      font-size: 40px;
    }
  }
  h3 {
    margin: 20px 0 15px 0;
  }
  p {
    margin-bottom: 50px;
  }
}
</style>
