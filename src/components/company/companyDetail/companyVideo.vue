<template>
  <div class="com-video">
    <p class="video">视&nbsp;频</p>
    <div
      v-for="item in companyVideos"
      :key="item.id + item.userid"
      @click="changePlayer"
      class="videos"
    >
      <video-card :ding="item"></video-card>
    </div>
    <pagination
      :allPages="allpages"
      class="videoPag"
      @getProjects="changePage"
    ></pagination>
  </div>
</template>
<script>
import VideoCard from './videoCard.vue';
import Pagination from '../../common/pagination.vue';
import { getComVideoByUserId } from '@/ajax';
// @ is an alias to /src
export default {
  name: 'companyVideo',
  props: ['userid'],
  data() {
    return {
      companyVideos: '',
      lastTarget: null,
      allpages: 1
    };
  },
  created() {
    // console.log(this.videos);
    this.getCompanyVideo(1);
  },
  methods: {
    changePlayer(e) {
      if (e.target.localName !== 'video') return;
      if (!this.lastTarget) {
        this.lastTarget = e.target;
      } else {
        this.lastTarget.pause();
        this.lastTarget = e.target;
      }
    },
    changePage(page) {
      this.getCompanyVideo(page);
    },
    getCompanyVideo(page) {
      // console.log(this.userid);
      getComVideoByUserId({ userid: this.userid, page: page }).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.companyVideos = res.data.companyVideos;
          this.allpages = res.data.allpage;
        }
      });
    }
  },
  components: {
    VideoCard,
    Pagination

  }
};
</script>
<style lang='less' scoped>
.com-video {
  background-color: white;
  width: 960px;
  margin: 45px auto;
}
.video {
  padding-top: 20px;
  // padding-bottom:5px;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
  height: 55px;
}
.com-video {
  width: 960px;
  margin: 0 auto;
}
.videos {
  margin: 10px 10px;
  display: inline-block;
  width: 300px;
}
.videoPag {
  margin-bottom: 20px;
  height: 90px;
}
</style>
