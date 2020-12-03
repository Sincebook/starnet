<template>
  <div class="select-bar">
    <div class="yy-margin">
      <div v-if="type === 'company'" class="left" style="margin-left: 50px">
        <!-- <div @click="company(), (isRoate1 = !isRoate1)">
          <span name="type">公司</span>
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
            <li @click="typeSelect" title="传媒公司">传媒公司</li>
            <li @click="typeSelect" title="影视公司">影视公司</li>
            <li @click="typeSelect" title="模特公司">模特公司</li>
          </ul>
        </div> -->
        <div @click="companyLocation(), (isRoate2 = !isRoate2)">
          <span name="area" ref="comLocation">区域</span>
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
            <li @click="typeSelect">上海</li>
            <li @click="typeSelect">北京</li>
            <li @click="typeSelect">横店</li>
            <li @click="typeSelect" title="郑州建业华谊">郑州建业华谊</li>
          </ul>
        </div>
        <div @click="companyType(), (isRoate3 = !isRoate3)">
          <span name="category" ref="comType">类别</span>
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
            <!-- 演员 主播 模特 童星 曲艺 舞蹈 配音 导演 编剧 剪辑师 摄影师 化妆师 航拍师 调色师 合成师 导演助理 摄影助理 摄影指导 创意策划 美术 美术指导 特效师 分镜师 制片助理 录音师 配乐师 跟焦师 2D动画师 3D动画师 服装 道具 替身 造型师 混音师 武术指导 其他 -->
            <li @click="typeSelect">影视公司</li>
            <li @click="typeSelect">经纪公司</li>
            <li @click="typeSelect">模特公司</li>
            <li @click="typeSelect">租赁公司</li>
            <li @click="typeSelect">其他公司</li>
          </ul>
        </div>
        <div class="search bar1" style="margin-left: 50px">
          <form>
            <input
              type="text"
              autocomplete="off"
              name="search"
              @keydown.prevent.enter="enterSearch"
            />
          </form>
          <svg class="icon" aria-hidden="true" @click="search" ref="icon">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
      </div>
      <div v-if="type === 'job'" class="left">
        <div @click="jobLocation(), (isRoate1 = !isRoate1)">
          <span ref="jobLocation" name='place'>地区</span>
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
            <li @click="typeSelect">上海</li>
            <li @click="typeSelect">北京</li>
            <li @click="typeSelect">横店</li>
            <li @click="typeSelect">郑州</li>
          </ul>
        </div>
        <div @click="jobSex(), (isRoate2 = !isRoate2)">
          <span ref="jobSex" name='sex'>性别</span>
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
            <li @click="typeSelect">男性</li>
            <li @click="typeSelect">女性</li>
            <li @click="typeSelect">无</li>
          </ul>
        </div>
        <div @click="jobAge(), (isRoate3 = !isRoate3)">
          <span ref="jobAge" name='age'>年龄</span>
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
            <li @click="typeSelect">0-10</li>
            <li @click="typeSelect">10+</li>
            <li @click="typeSelect">20+</li>
            <li @click="typeSelect">30+</li>
            <li @click="typeSelect">50+</li>
          </ul>
        </div>
        <!-- <div @click="jobMoney(), (isRoate4 = !isRoate4)">
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
            <li @click="typeSelect">0-100</li>
            <li @click="typeSelect">1000+</li>
            <li @click="typeSelect">2000+</li>
            <li @click="typeSelect">3000+</li>
            <li @click="typeSelect">500000+</li>
          </ul>
        </div> -->
        <div class="search bar1">
          <form>
            <input
              type="text"
              autocomplete="off"
              name="search"
              @keydown.prevent.enter="enterSearch"
            />
          </form>
          <svg class="icon" aria-hidden="true" @click="search" ref="icon">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
      </div>
      <div v-if="type === 'talent'" class="left">
        <div @click="talentType(), (isRoate1 = !isRoate1)">
          <span name="vocation" ref="talentType">分类</span>
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
            <!-- 演员 主播 模特 童星 曲艺 舞蹈 配音 导演 编剧 剪辑师 摄影师 化妆师 航拍师 调色师 合成师 导演助理 摄影助理 摄影指导 创意策划 美术 美术指导 特效师 分镜师 制片助理 录音师 配乐师 跟焦师 2D动画师 3D动画师 服装 道具 替身 造型师 混音师 武术指导 其他 -->
            <li @click="typeSelect">演员</li>
            <li @click="typeSelect">主播</li>
            <li @click="typeSelect">模特</li>
            <li @click="typeSelect">童星</li>
            <li @click="typeSelect">曲艺</li>
            <li @click="typeSelect">舞蹈</li>
            <li @click="typeSelect">配音</li>
            <li @click="typeSelect">导演</li>
            <li @click="typeSelect">编剧</li>
            <li @click="typeSelect">剪辑师</li>
            <li @click="typeSelect">摄影师</li>
            <li @click="typeSelect">化妆师</li>
            <li @click="typeSelect">航拍师</li>
            <li @click="typeSelect">调色师</li>
            <li @click="typeSelect">合成师</li>
            <li @click="typeSelect">导演助理</li>
            <li @click="typeSelect">摄影助理</li>
            <li @click="typeSelect">创意策划</li>
            <li @click="typeSelect">美术</li>
            <li @click="typeSelect">美术指导</li>
            <li @click="typeSelect">特效师</li>
            <li @click="typeSelect">分镜师</li>
            <li @click="typeSelect">制片助理</li>
            <li @click="typeSelect">录音师</li>
            <li @click="typeSelect">配乐师</li>
            <li @click="typeSelect">跟焦师</li>
            <li @click="typeSelect">2D动画师</li>
            <li @click="typeSelect">3D动画师</li>
            <li @click="typeSelect">服装</li>
            <li @click="typeSelect">道具</li>
            <li @click="typeSelect">替身</li>
            <li @click="typeSelect">造型师</li>
            <li @click="typeSelect">混音师</li>
            <li @click="typeSelect">武术指导</li>
            <li @click="typeSelect">其他</li>
          </ul>
        </div>
        <div @click="talentLocation(), (isRoate2 = !isRoate2)">
          <span name="workArea" ref="talentLocation">地区</span>
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
            <li @click="typeSelect">上海</li>
            <li @click="typeSelect">北京</li>
            <li @click="typeSelect">横店</li>
            <li @click="typeSelect">郑州</li>
          </ul>
        </div>
        <div @click="talentSex(), (isRoate3 = !isRoate3)">
          <span name="sex" ref="talentSex">性别</span>
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
            <li @click="typeSelect">男性</li>
            <li @click="typeSelect">女性</li>
            <li @click="typeSelect">无</li>
          </ul>
        </div>
        <div class="search bar1">
          <form>
            <input
              type="text"
              autocomplete="off"
              name="search"
              @keydown.prevent.enter="enterSearch"
            />
          </form>
          <svg class="icon" aria-hidden="true" @click="search" ref="icon">
            <use xlink:href="#icon-search"></use>
          </svg>
        </div>
      </div>
      <div class="right">
        <div @click="lasted">最新</div>
        <div @click="hot">热点排名</div>
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
      // isRoate4: false,
      // isRoate5: false,
      comCondition: { area: '', category: '', page: 1 },
      talentCondition: { workArea: '', vocation: '', sex: '' },
      jobCondition: { place: '', sex: '', age: '', page: '' }
    };
  },
  created() {
    // console.log(this);
  },
  components: {

  },
  methods: {
    // 公司目录
    // company() { this.isRoate2 = false; this.isRoate3 = false; },
    companyLocation() { this.isRoate1 = false; this.isRoate3 = false; },
    companyType() { this.isRoate1 = false; this.isRoate2 = false; },
    // 职位目录
    jobLocation() { this.isRoate2 = false; this.isRoate3 = false; },
    jobSex() { this.isRoate1 = false; this.isRoate3 = false; },
    jobAge() { this.isRoate1 = false; this.isRoate2 = false; },
    // jobMoney() { this.isRoate1 = false; this.isRoate2 = false; this.isRoate3 = false; },
    // 人才目录
    talentType() { this.isRoate2 = false; this.isRoate3 = false; },
    talentLocation() { this.isRoate1 = false; this.isRoate3 = false; },
    talentSex() { this.isRoate1 = false; this.isRoate2 = false; },
    // 关键字搜索搜索
    search(e) {
      this.resetType();
      let target = e.target;
      let input = target.parentNode.firstChild.firstChild;
      this.$emit('nameSearch', input.value);
    },
    enterSearch(e) {
      this.resetType();
      // console.log(e.target.value);
      this.$emit('nameSearch', e.target.value);
    },
    lasted() {
      this.resetType();
      this.$emit('lasted');
    },
    hot() {
      this.resetType();
      this.$emit('hot');
    },
    resetType() {
      if (this.type === 'company') {
        this.$refs.comLocation.innerText = '区域';
        this.$refs.comType.innerText = '类别';
        return;
      }
      if (this.type === 'job') {
        this.$refs.jobLocation.innerText = '地区';
        this.$refs.jobSex.innerText = '性别';
        this.$refs.jobAge.innerText = '年龄';
        return;
      }
      if (this.type === 'talent') {
        this.$refs.talentType.innerText = '分类';
        this.$refs.talentLocation.innerText = '地区';
        this.$refs.talentSex.innerText = '性别';
      }
    },
    typeSelect(e) {
      let target = e.target;
      let span = target.parentNode.parentNode.firstChild;
      span.innerText = target.innerText;
      if (this.type === 'company') {
        this.comCondition[span.getAttribute('name')] = span.innerText;
        let obj = {};
        for (let key in this.comCondition) {
          if (this.comCondition[key]) {
            obj[key] = this.comCondition[key];
          }
        }
        this.$emit('newType', obj);
        return;
      }
      if (this.type === 'talent') {
        this.talentCondition[span.getAttribute('name')] = span.innerText;
        this.$emit('newType', this.talentCondition);
        return;
      }
      if (this.type === 'job') {
        this.jobCondition[span.getAttribute('name')] = span.innerText;
        let obj = {};
        for (let key in this.jobCondition) {
          if (this.jobCondition[key]) {
            obj[key] = this.jobCondition[key];
          }
        }
        this.$emit('newType', obj);
      }
    }
  },
  mounted() {
  }
};
</script>
<style lang='less'>
.yy-margin {
  color: rgb(25, 130, 200);
  font-size: 14px;
  font-weight: 500;
  line-height: 50px;
  width: 920px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  div {
    margin: 0 20px;
  }
  .left {
    margin-left: 0 !important;
    display: flex;
    justify-content: space-between;
    ul {
      min-width: 90px;
      font-size: 14px;
      text-align: center;
      max-height: 295px;
      background-color: rgb(223, 217, 217);
      overflow: auto;
      visibility: auto;
      padding: 10px 20px;
      transform: translate(-35%);
      border-radius: 0 0 20px 20px;
      &::-webkit-scrollbar {
        // background-color: black;
        width: 0px;
      }
      li {
        width: 70px;
        line-height: 30px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
      }
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
    margin-right: 0 !important;
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
