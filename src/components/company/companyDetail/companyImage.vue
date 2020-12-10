<template>
  <div class="company-image">
    <p class="photo">图&nbsp;片</p>
    <div class="imgList">
      <img v-for="src in imgs" :key="src.id" :src="src" />
    </div>
    <pagination allPages="20"></pagination>
  </div>
</template>

<script>
import Pagination from '../../common/pagination.vue';

export default {
  data() {
    return {
      imgs: [
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg',
        '//ftp.qnets.cn/since/dswcb3.jpg']
    };
  },
  components: {
    Pagination
  }
};

</script>
<style lang="less" scoped>
.company-image {
  padding-top: 15px;
  width: 960px;
  height: 890px;
  margin: 0 auto;
  text-align: center;
  background-color: white;
  margin-bottom: 60px;
}
.photo {
  font-weight: 800;
  font-size: 18px;
  margin-top: 10px;
}
.imgList {
  margin-bottom: 20px;
}
.imgList img {
  width: 280px;
  height: 210px;
  margin: 20px 10px;
}
</style>
