<template>
  <div v-if="talentNav.isHave" class="talent-video">
    <h4 class="headtitle">视 频</h4>
    <div class="list">
      <div
        class="videoItem"
        v-for="item in list.datas"
        :key="'video' + item.id"
        @click="play(item)"
      >
        <video class="el-video" :src="item.path" :poster="item.image"></video>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-play"></use>
        </svg>
        <div style="padding:12px;">
          <div class="videoName"> {{item.description}}</div>
          <div style="float:right;line-height:30px;">点击查看详情</div>
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
        :src="selectVideo.path"
      ></video>
      <a>
        <svg @click="share2(selectVideo.description, selectVideo.image)" class="icon1" aria-hidden="true">
            <use xlink:href="#icon-weibo"></use>
          </svg>
         </a>
    </el-dialog>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { getUserImg } from '@/ajax';
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
      console.log(this.$route.params.userid);
      getUserImg({ type: 2, num: 6, userid: this.$route.params.userid, page: this.currentPage }).then(res => {
        if (res.code === '0') {
          this.$store.commit('talentNavVideo', true);
          this.list = res.data;
        } else {
          this.$store.commit('talentNavVideo', false);
        }
      }).catch(err => {
        return err;
      });
    },
    share2(description, i) {
      console.log(i);
      let url = window.location.origin + '/%23/talentDetail/' + this.$route.params.id + '/' + this.$route.params.userid;
      window.open('http://v.t.sina.com.cn/share/share.php?title=绘星网分享---视频：' + description + '&url=' + url + '&content=utf-8&pic=' + i, 'newwindow', 'height:400,width:400,top:100,left:100');
    }
  },
  computed: {
    ...mapState({
      talentNav: (state) => state.talentNav[2]
    })
  }
};
</script>
<style lang='less' scoped>
.icon1 {
  width:15px;
  position: absolute;
  top:98%;
  left:98%;
  transform: translate(-50%, -50%);
  font-size: 50px;
  color: #f5f5f5;
}
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
    position: relative;
    margin: 15px;
    width: 330px;
    cursor: pointer;
    transition: all 0.25s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.12), 0 0 6px rgba(0, 0, 0, 0.04);
    &:hover {
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
    .el-video {
      display: block;
      width: 100%;
      object-fit: cover;
      pointer-events: none;
    }
    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 50px;
      color: #f5f5f5;
    }
    .videoName {
      font-size:18px;
      color: #0097d0;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
      max-width: 200px;
      float:left;
      margin-bottom: 12px;
    }
  }
  .footer-page {
    text-align: center;
  }
}
.selectVideo {
  width: 100%;
  border: none;
  outline: none;
}
/deep/.el-dialog__body {
  padding: 15px 20px 17px;
}
</style>
