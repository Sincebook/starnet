<template>
  <div class="company-image" v-if="images">
    <p class="photo">图&nbsp;片</p>
    <div class="imgList">
      <viewer :images="images">
        <img v-for="src in images" :key="src.id" :src="src.path" />
      </viewer>
    </div>
    <pagination
      class="imspagination"
      :allPages="allpages"
      @getProjects="changePage"
    ></pagination>
  </div>
</template>

<script>
import Pagination from '../../common/pagination.vue';
import { getComPhotosByUserId } from '@/ajax';
export default {
  props: ['userid'],
  data() {
    return {
      images: '',
      allpages: 1
    };
  },
  created() {
    this.getComPhotos(1);
    // console.log(this.userid);
  },
  methods: {
    changePage(page) {
      this.getComPhotos(page);
    },
    getComPhotos(page) {
      getComPhotosByUserId({ type: 1, userid: this.userid, page: page }).then(res => {
        if (res.code === '0') {
        //   console.log(res);
          this.images = res.data.datas;
          this.allpages = res.data.allpage;
        }
      });
    }
  },
  components: {
    Pagination
  }
};

</script>
<style lang="less" scoped>
.company-image {
  padding-top: 15px;
  // padding-bottom: 5px;
  width: 960px;
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
.imgList img {
  width: 280px;
  height: 210px;
  margin: 5px 10px;
}
.imspagination {
  height: 100px;
}
</style>
