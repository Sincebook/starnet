<template>
  <div class="video">
    <div style="cursor: pointer" @click="play(item)">
      <video class="el-image" :src="item.path" :poster="item.image"></video>
    </div>
    <div class="content">
      <div class="title twoLine">{{ item.description }}</div>
      <el-button type="danger" size="small" @click="deleteWorks" plain
        >删除</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    play() {
      this.$emit('play');
    },
    deleteWorks() {
      this.$emit('deleteWorks');
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
    object-fit: cover;
    pointer-events: none;
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
