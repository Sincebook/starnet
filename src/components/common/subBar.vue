<template>
  <div class="subBar">
    <div class="title">
      <span>公司分类</span>
      <span>Company</span>
      <span>classification</span>
    </div>
    <div class="type" ref="btns">
      <div v-for="(item, index) in btns" :key="item + index">
        {{ item }}
      </div>
    </div>
    <div class="more" @click="btnMore">{{tag}}</div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  props: ['companyType'],
  name: 'subBar',
  data() {
    return {
      btns: [],
      moreBtns: [],
      flag: true,
      tag: '更多...'
    };
  },
  mounted() {
    this.btnsMake();
  },
  components: {

  },
  methods: {
    btnsMake() {
      // 根据传回来的分类的多少来显示按钮
      if (this.companyType.length <= 4) {
        let str = '';
        for (let i = 0; i < this.companyType.length; i++) {
          str += '150px ';
        }
        this.$refs.btns.style.gridTemplateColumns = str;
      }
      if (this.companyType.length > 10) {
        this.btns = this.companyType.slice(0, 10);
        this.moreBtns = this.companyType.slice(10);
      }
    },
    btnMore() {
      if (this.flag) {
        this.btns = this.btns.concat(this.moreBtns);
        this.tag = '收起';
        this.flag = false;
      } else {
        this.btns = this.btns.slice(0, 10);
        this.tag = '更多...';
        this.flag = true;
      }
    }
  },
  watch: {
  }
};
</script>
<style lang='less' scoped>
.subBar {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    margin: 40px;
    font-size: 36px;
    span {
      margin-left: 10px;
    }
  }
  .type {
    display: grid;
    // justify-content: space-around;
    // flex-wrap: wrap;
    grid-template-columns: 150px 150px 150px 150px 150px;
    grid-column-gap: 20px;
    div {
      margin: 20px;
      text-align: center;
      padding: 10px 15px;
      border: 2px solid rgb(25, 130, 200);
      width: 150px;
      border-radius: 15px;
      transition: background-color 0.5s;
      cursor: pointer;
    }
    div:hover {
      background-color: rgb(25, 130, 200);
      color: #fff;
    }
  }
  .more {
    justify-self: flex-end;
    align-self: flex-end;
    cursor: pointer;
    margin-right: 23%;
  }
  &:hover {
    color: rgb(30, 55, 71);
  }
}
</style>
