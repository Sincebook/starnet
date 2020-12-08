<template>
  <div class="video">
    <video ref="video" :src="item.src"></video>
    <div class="btn" @click="playing(index)">
      <svg class="icon" aria-hidden="true">
        <use :xlink:href="!item.isPlay ? '#icon-play' : '#icon-pause'"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item', 'index'],
  methods: {
    playing(index) {
      this.$emit('playing', index);
    }
  }
};
</script>

<style lang="less" scoped>
.video {
  position: relative;
  background-color: rgba(0, 0, 0, 0.75);
  .btn {
    position: absolute;
    cursor: pointer;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    .icon {
      font-size: 30px;
      color: rgba(255, 255, 255, .75);
    }
  }
}
</style>
