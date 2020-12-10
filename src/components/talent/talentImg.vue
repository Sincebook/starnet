<template>
  <div class="talent-img" v-if="imgs.length">
    <p class="title">照片</p>
    <div class="img-list">
      <viewer :images="imgs">
        <img
          v-for="(src, index) in imgs"
          :src="src.path"
          :key="'hahah' + index"
          alt=""
        />
      </viewer>
    </div>
    <pagination
      :allPages="allpages"
      style="margin-bottom: 0"
      @getProjects="changePage"
    ></pagination>
  </div>
</template>
<script>
import Pagination from '../common/pagination.vue';
// @ is an alias to /src
import { getUserImg } from '@/ajax';
export default {
  props: ['userid'],
  name: 'talentImg',
  data() {
    return {
      imgs: [],
      allpages: 1,
      obj: { type: 1, num: 8 }
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    changePage(page) {
      this.getData(page);
    },
    getData(page) {
      // console.log(this.userid);
      this.obj.page = page;
      this.obj.userid = this.userid;
      getUserImg(this.obj).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.imgs = res.data.datas;
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
<style lang='less' scoped>
.talent-img {
  width: 960px;
  margin: 40px auto 0 auto;
  background-color: #fff;
  padding-top: 20px;
  text-align: center;
  padding-bottom: 30px;
  .title {
    margin: 0px auto 20px auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .img-list {
    margin-bottom: 20px;
    img {
      width: 220px;
      height: 320px;
      margin: 10px;
    }
  }
}
</style>
