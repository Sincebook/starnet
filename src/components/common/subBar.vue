<template>
  <div class="subBar">
    <div class="title">
      <span class="zh">{{ nameArr[0] }}</span>
      <span class="en">{{ nameArr[1] + " " + nameArr[2] }}</span>
    </div>
    <div class="typeList" :style="openDesc ? 'height:' + height + 'px' : ''">
      <div
        @click="search(item)"
        class="typeBox"
        v-for="(item, index) in companyType"
        :key="item + index"
      >
        <div class="typeItem" :class="active === item ? 'acitve' : ''">
          {{ item }}
        </div>
      </div>
      <div v-if="height > 120" class="more" @click="openDesc = !openDesc">
        {{ !openDesc ? "展开更多" : "收起" }}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['companyType', 'nameArr', 'active'],
  name: 'subBar',
  data() {
    return {
      openDesc: false // 默认不展开描述
    };
  },
  methods: {
    search(name) {
      this.$emit('typeSearch', name);
    }
  },
  computed: {
    height() {
      return Math.ceil(this.companyType.length / 8) * 60;
    }
  }
};
</script>
<style lang='less' scoped>
.subBar {
  position: relative;
  text-align: center;
  width: 1180px;
  margin: 0 auto;
  .title {
    margin: 20px 0 0 0;
    font-size: 32px;
    .zh {
      font-weight: 600;
      color: var(--fontColor);
    }
    .en {
      color: rgba(51, 51, 51, 0.75);
      padding-left: 20px;
      font-weight: 400;
    }
  }
  .type {
    margin-right: 35px;
    display: grid;
    // justify-content: space-around;
    // flex-wrap: wrap;
    grid-template-columns: 150px 150px 150px 150px 150px;
    grid-column-gap: 40px;
    div {
      margin: 20px;
      text-align: center;
      padding: 10px 15px;
      border: 2px solid rgb(25, 130, 200);
      width: 150px;
      border-radius: 15px;
      transition: background-color 0.25s;
      cursor: pointer;
    }
    div:hover {
      background-color: rgb(25, 130, 200);
      color: #fff;
    }
  }
  .more {
    position: absolute;
    font-size: 14px;
    cursor: pointer;
    bottom: 18px;
    right: -75px;
    color: #333;
  }
  .typeList {
    transition: height 0.3s linear;
    width: 1180px;
    height: 120px;
    overflow: hidden;
    margin: 25px auto;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .typeBox {
    width: 107.5px;
    margin: 10px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .typeItem {
    width: 208px;
    height: 40px;
    border-radius: 20px;
    cursor: pointer;
    font-size: 14px;
    transition: all 0.25s;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
    border: 2px solid #c9cbca;
    &:hover {
      background: #909399;
      color: #fff;
      border-color: #909399;
    }
  }
  .acitve{
    background: #909399;
    color: #fff;
    border-color: #909399;
  }
}

</style>
