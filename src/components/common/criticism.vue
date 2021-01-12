<template>
  <div class="item-box">
    <div class="item">
      <el-image class="user-img" :src="item.head" fit="cover"></el-image>
      <div class="user-info">
        <div class="user-name">
          <span class="head">{{ item.name }}</span>
          <span>{{ Number(item.uptime) | formatDate }}</span>
        </div>
        <div class="content">
          <span>{{ item.word }}</span>
        </div>
      </div>
    </div>
    <el-divider></el-divider>
  </div>
</template>
<script>
import { formatDate } from '../../assets/js/date.js';
export default {
  props: ['item'],
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  }
};
</script>
<style lang='less' scoped>
.item-box {
  .item {
    display: flex;
    align-items: flex-start;
    .user-img {
      width: 80px;
      height: 80px;
      border-radius: 5px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    }
    .user-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 25px;
      overflow: hidden;
      word-wrap: break-word;
      .content {
        margin-top: 3px;
      }
    }
    .user-name {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .head {
        font-size: 15px;
        font-weight: 600;
        margin-right: 10px;
      }
    }
    .user-btn {
      height: 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
