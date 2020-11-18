<template>
  <div class="select-bar">
    <div class="yy-margin">
      <div class="left">
        <div @click="company(), (isRoate1 = !isRoate1)">
          <span>公司</span>
          <span>
            <svg
              class="icon"
              :class="isRoate1 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
        </div>
        <div @click="location(), (isRoate2 = !isRoate2)">
          <span>区域</span>
          <span>
            <svg
              class="icon"
              :class="isRoate2 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
        </div>
        <div @click="type(), (isRoate3 = !isRoate3)">
          <span>类别</span>
          <span>
            <svg
              class="icon"
              :class="isRoate3 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
        </div>
        <div class="search bar1">
          <form>
            <input type="text" autocomplete="off" name="search" />
          </form>
          <svg class="icon" aria-hidden="true" @click="search" ref="icon">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
      </div>
      <div class="right">
        <div @click="lasted">最新</div>
        <div @click="hot">热点排名</div>
        <div @click="best">最佳匹配</div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'selectType',
  data() {
    return {
      isRoate1: false,
      isRoate2: false,
      isRoate3: false
    };
  },
  components: {

  },
  methods: {
    company() {
    },
    location() {

    },
    type() {

    },
    search() {

    },
    lasted() {

    },
    hot() {

    },
    best() {

    }
  },
  mounted() {
  }
};
</script>
<style lang='less'>
.yy-margin {
  color: rgb(25, 130, 200);
  font-size: 16px;
  font-weight: 500;
  line-height: 50px;
  width: 1280px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  div {
    margin: 0 20px;
  }
  .left {
    display: flex;
    justify-content: space-between;
    .icon {
      transition: all 0.25s;
    }
    .search {
      padding-right: 0;
      display: flex;
      line-height: 50px;
      .icon {
        margin-top: 11px;
        font-size: 28px;
        margin-left: 16px;
      }
    }
    .bar1 input {
      height: 28px;
      line-height: 29px;
      border-radius: 30px;
      background: rgba(255, 255, 255, 0.25);
      color: #4b494a;
    }
    form {
      position: relative;
      width: 200px;
      margin: 0 auto;
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      padding: 0 13px;
    }
    div {
      cursor: pointer;
    }
  }
  .right {
    display: flex;
    justify-content: space-between;
    div {
      cursor: pointer;
    }
  }
}
.select-bar {
  background-color: rgb(223, 217, 217);
  height: 50px;
}
.rotate {
  transform: rotate(180deg);
}
</style>
