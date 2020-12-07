<template>
  <div class="talent-video" v-if="srcs.length">
    <p class="title">视频</p>
    <div class="video-list">
      <div
        v-for="(item, index) in srcs"
        :key="item + index"
        class="videos"
        @click="changePlayer"
      >
        <videos :src="item.path" :videoId="'page' + index"></videos>
      </div>
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
import Videos from './videos.vue';
import { getUserImg } from '@/ajax';
// @ is an alias to /src
export default {
  props: ['userid'],
  name: 'talentVideo',
  data() {
    return {
      srcs: [],
      lastTarget: null,
      allpages: 1,
      obj: { type: 2 }
    };
  },
  created() {
    this.getData(1);
  },
  methods: {
    changePlayer(e) {
      if (!this.lastTarget) {
        this.lastTarget = e.target;
      } else {
        this.lastTarget.pause();
        this.lastTarget = e.target;
      }
    },
    changePage(page) {
      this.getData(page);
    },
    getData(page) {
      this.obj.page = page;
      this.obj.userid = this.userid;
      getUserImg(this.obj).then(res => {
        // console.log(res);
        if (res.data) {
          this.srcs = res.data.datas;
          this.allpages = res.data.allpage;
        }
      });
    }
  },
  components: {
    Videos,
    Pagination
  }
};
</script>
<style lang='less' scoped>
.talent-video {
  width: 960px;
  background-color: #fff;
  margin: 40px auto 0 auto;
  padding: 20px;
  text-align: center;
  .title {
    margin: 0px auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .videos {
    display: inline-block;
    margin: 20px;
    width: 420px;
  }
}
</style>
