<template>
  <div class="select-bar">
    <div class="yy-margin">
      <div v-if="type === 'company'" class="left" style="margin-left: 50px">
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
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate1"
          >
            <li>森思传媒有限公司</li>
            <li>华谊兄弟影视公司</li>
            <li>华章演艺公司</li>
          </ul>
        </div>
        <div @click="companyLocation(), (isRoate2 = !isRoate2)">
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
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate2"
          >
            <li>上海</li>
            <li>北京</li>
            <li>横店</li>
            <li>郑州建业华谊</li>
          </ul>
        </div>
        <div @click="companyType(), (isRoate3 = !isRoate3)">
          <span>类别</span>
          <span>
            <svg
              class="icon"
              :class="isRoate3 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate3"
          >
            <li>影视公司</li>
            <li>经纪公司</li>
            <li>模特</li>
            <li>租赁</li>
          </ul>
        </div>
        <div class="search bar1" style="margin-left: 50px">
          <form>
            <input type="text" autocomplete="off" name="search" />
          </form>
          <svg class="icon" aria-hidden="true" @click="search" ref="icon">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
      </div>
      <div v-if="type === 'job'" class="left">
        <div @click="jobLocation(), (isRoate1 = !isRoate1)">
          <span>地区</span>
          <span>
            <svg
              class="icon"
              :class="isRoate1 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate1"
          >
            <li>上海</li>
            <li>北京</li>
            <li>横店</li>
            <li>郑州</li>
          </ul>
        </div>
        <div @click="jobSex(), (isRoate2 = !isRoate2)">
          <span>性别</span>
          <span>
            <svg
              class="icon"
              :class="isRoate2 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate2"
          >
            <li>男性</li>
            <li>女性</li>
            <li>未知</li>
          </ul>
        </div>
        <div @click="jobAge(), (isRoate3 = !isRoate3)">
          <span>年龄</span>
          <span>
            <svg
              class="icon"
              :class="isRoate3 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate3"
          >
            <li>0-10</li>
            <li>10+</li>
            <li>20+</li>
            <li>30+</li>
            <li>50+</li>
          </ul>
        </div>
        <div @click="jobMoney(), (isRoate4 = !isRoate4)">
          <span>薪酬</span>
          <span>
            <svg
              class="icon"
              :class="isRoate4 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate4"
          >
            <li>0-100</li>
            <li>1000+</li>
            <li>2000+</li>
            <li>3000+</li>
            <li>500000+</li>
          </ul>
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
      <div v-if="type === 'talent'" class="left">
        <div @click="talentType(), (isRoate1 = !isRoate1)">
          <span>分类</span>
          <span>
            <svg
              class="icon"
              :class="isRoate1 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate1"
          >
            <li>群众</li>
            <li>演员</li>
            <li>鲜肉</li>
            <li>老戏骨</li>
          </ul>
        </div>
        <div @click="talentLocation(), (isRoate2 = !isRoate2)">
          <span>地区</span>
          <span>
            <svg
              class="icon"
              :class="isRoate2 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use>
            </svg>
          </span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate2"
          >
            <li>上海</li>
            <li>北京</li>
            <li>横店</li>
            <li>郑州</li>
          </ul>
        </div>
        <div @click="talentSex(), (isRoate3 = !isRoate3)">
          <span>性别</span>
          <span>
            <svg
              class="icon"
              :class="isRoate3 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate3"
          >
            <li>男性</li>
            <li>女性</li>
            <li>未知</li>
          </ul>
        </div>
        <div @click="talentAge(), (isRoate4 = !isRoate4)">
          <span>年龄</span>
          <span>
            <svg
              class="icon"
              :class="isRoate4 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate4"
          >
            <li>0-10</li>
            <li>10+</li>
            <li>20+</li>
            <li>30+</li>
            <li>50+</li>
          </ul>
        </div>
        <div @click="talentMoney(), (isRoate5 = !isRoate5)">
          <span>薪酬</span>
          <span>
            <svg
              class="icon"
              :class="isRoate5 ? 'rotate' : ''"
              aria-hidden="true"
            >
              <use xlink:href="#icon-zhankai"></use></svg
          ></span>
          <ul
            class=""
            style="
              position: absolute;
              z-index: 9999;
              backgroud-color: rgb(223, 217, 217);
            "
            v-show="isRoate5"
          >
            <li>0-100</li>
            <li>1000+</li>
            <li>2000+</li>
            <li>3000+</li>
            <li>500000+</li>
          </ul>
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
  props: ['type'],
  name: 'selectType',
  data() {
    return {
      isRoate1: false,
      isRoate2: false,
      isRoate3: false,
      isRoate4: false,
      isRoate5: false
    };
  },
  created() {
    console.log(this);
  },
  components: {

  },
  methods: {
    // 公司目录
    company() { this.isRoate2 = false; this.isRoate3 = false; },
    companyLocation() { this.isRoate1 = false; this.isRoate3 = false; },
    companyType() { this.isRoate1 = false; this.isRoate2 = false; },
    // 职位目录
    jobLocation() { this.isRoate2 = false; this.isRoate3 = false; this.isRoate4 = false; },
    jobSex() { this.isRoate1 = false; this.isRoate3 = false; this.isRoate4 = false; },
    jobAge() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate4 = false; },
    jobMoney() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate3 = false; },
    // 人才目录
    talentType() { this.isRoate2 = false; this.isRoate3 = false; this.isRoate4 = false; this.isRoate5 = false; },
    talentLocation() { this.isRoate1 = false; this.isRoate3 = false; this.isRoate4 = false; this.isRoate5 = false; },
    talentSex() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate4 = false; this.isRoate5 = false; },
    talentAge() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate3 = false; this.isRoate5 = false; },
    talentMoney() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate3 = false; this.isRoate4 = false; },
    // 关键字搜索搜索
    search() {
      if (this.type === 'job') { }
      if (this.type === 'company') { }
      if (this.type === 'talent') { }
    },
    lasted() {
      if (this.type === 'job') { }
      if (this.type === 'company') { }
      if (this.type === 'talent') { }
    },
    hot() {
      if (this.type === 'job') { }
      if (this.type === 'company') { }
      if (this.type === 'talent') { }
    },
    best() {
      if (this.type === 'job') { }
      if (this.type === 'company') { }
      if (this.type === 'talent') { }
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
    ul {
      min-width: 50px;
      text-align: center;
      background-color: rgb(223, 217, 217);
      padding: 10px 20px;
      transform: translate(-38%);
      border-radius: 0 0 20px 20px;
    }
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
