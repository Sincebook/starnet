<template>
  <div class="video">
    <vue-core-video-player
      :autoplay="false"
      :src="item.path"
    ></vue-core-video-player>
    <div class="content">
      <div class="title">我的跳舞视频</div>
      <el-button type="danger" size="small" plain>删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item']
};
</script>

<style lang="less" scoped>
.video {
  display: flex;
  background-color: rgba(245, 245, 245, 1);
  /deep/.error-icon,
  /deep/a.btn-pause,
  /deep/a.btn-play,
  /deep/.setting-control > div:not(:last-child) {
    display: none;
  }
  .content {
    margin: 15px;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
}
</style>
