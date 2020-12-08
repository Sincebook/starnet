<template>
  <div class="video">
    <div @click="play(item)">
      <el-image :src="item.path" fit="cover"></el-image>
    </div>
    <div class="content">
      <div class="title twoLine">{{ item.description }}</div>
      <el-button type="danger" size="small" plain>删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    play(item) {
      this.$emit('play', item);
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  width: 425px;
  margin: 7.5px;
  display: flex;
  background-color: rgba(245, 245, 245, 1);
  .el-image {
    display: block;
    width: 260px;
    height: 160px;
    cursor: pointer;
  }
  .content {
    margin: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  &:nth-child(2n + 1) {
    margin-left: 0;
  }
  &:nth-child(2n + 2) {
    margin-right: 0;
  }
}
</style>
