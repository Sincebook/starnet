<template>
  <div v-if="companyNav.isHave" class="talent-video">
    <h4 class="headtitle">视 频</h4>
    <div class="list">
      <div
        class="videoItem"
        v-for="item in list.companyVideos"
        :key="'video' + item.id"
        @click="play(item)"
      >
        <video class="el-video" :src="item.video" :poster="item.image"></video>
        <div class="infos">
          <h4 class="title oneLine">{{ item.title }}</h4>
          <p class="desc threeLine">{{ item.description }}</p>
          <div class="btn">点击查看详情</div>
        </div>
      </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="8"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <el-dialog
      :destroy-on-close="true"
      :before-close="handleClose"
      :title="selectVideo.description"
      :visible.sync="dialogVisible"
      width="1000px"
    >
      <video
        class="selectVideo"
        ref="video"
        controls
        :src="selectVideo.video"
      ></video>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getComVideoByUserId } from '@/ajax';
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      selectVideo: {},
      dialogVisible: false
    };
  },
  created() {
    this.getUserVideo(this.currentPage);
  },
  methods: {
    handleCurrentChange(val) {
      this.getUserVideo(val);
    },
    play(item) {
      this.selectVideo = item;
      this.dialogVisible = true;
    },
    handleClose(done) {
      this.$refs.video.pause();
      done();
    },
    getUserVideo(page) {
      getComVideoByUserId({ userid: this.$route.params.userid, page: this.currentPage }).then(res => {
        if (res.code === '0' && res.data.companyVideos.length !== 0) {
          this.$store.commit('companyNavVideo', true);
          this.list = res.data;
        } else {
          this.$store.commit('companyNavVideo', false);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  computed: {
    ...mapState({
      companyNav: (state) => state.companyNav[2]
    })
  }
};
</script>
<style lang='less' scoped>
.talent-video {
  background-color: #fff;
  width: 1110px;
  margin: 50px auto;
  padding: 30px 0 20px;
  position: relative;
  .headtitle {
    text-align: center;
    font-size: 26px;
    padding-bottom: 20px;
    color: #333;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 0 15px 10px 15px;
  }
  .videoItem {
    margin: 15px;
    width: 330px;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    .el-video {
      height: 160px;
      display: block;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .infos {
      margin: 10px;
    }
    .title {
      font-size: 20px;
      margin-bottom: 5px;
      color: #0097d0;
    }
    .desc {
      font-size: 16px;
      height: 48px;
      color: #909399;
    }
    .btn {
      text-align: right;
    }
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }
  .footer-page {
    text-align: center;
  }
}
.selectVideo {
  width: 100%;
  height: 560px;
  border: none;
  outline: none;
}
/deep/.el-dialog__body {
  padding: 15px 20px 17px;
}
</style>
