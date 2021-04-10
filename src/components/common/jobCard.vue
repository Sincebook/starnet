<template>
  <div>
    <div class="job-card" @click="deatil(item.id, item.userid)">
      <div class="job-head">
        <el-image class="img" :src="item.image" fit="cover"></el-image>
      </div>
      <div class="job-content">
        <div class="head">
          <h2 class="title oneLine" :title="item.title">
            {{ item.title }}
          </h2>
          <svg @click.stop="share" class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo"></use>
          </svg>
        </div>
        <div class="container">
          <p class="job-require">招聘职位：{{ item.job }}</p>
          <p class="job-require">发布人：{{ item.launch }}</p>
          <p>面试地点：{{ item.place }}</p>
          <p>年龄要求：{{ item.age }}</p>
          <p>招聘人数：{{ item.sex }}</p>
          <p class="job-require">职位要求：{{ item.jobneed }}</p>
          <p>薪酬：{{ item.money }}</p>
          <p>工作周期：{{ item.worktime }}</p>
          <p>开始日期：{{ Number(item.begintime) | formatDate }}</p>
          <p>截止日期：{{ Number(item.endtime) | formatDate }}</p>
        </div>
        <div class="foot">
          <div v-if="item.type !== 1" class="left">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            编辑推荐
          </div>
          <div class="right" v-if="!isColl" @click.stop="collect(item)">
            <svg class="icon" aria-hidden="true" ref="star">
              <use xlink:href="#icon-ai-mark"></use></svg
            >点击收藏
          </div>
          <div class="right" v-else @click.stop="cancel(item)">
            <svg class="icon" aria-hidden="true" ref="star">
              <use xlink:href="#icon-ai-mark"></use></svg
            >已收藏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { formatDate } from '../../assets/js/date.js';
import { starJob, isStar, noStarJob } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      isColl: false,
      shoucang: '点击收藏'
    };
  },
  mounted() {
    if (this.isLogin) {
      this.isStar();
    }
  },
  methods: {
    // 分享
    share(index) {
      let url = window.location.origin + '/%23/jobDetail/' + this.item.id + '/' + this.item.userid;
      window.open('http://v.t.sina.com.cn/share/share.php?title=绘星网分享---工作：' + this.item.title + '&url=' + url + '&content=utf-8&pic=' + this.item.image, 'newwindow', 'height:400,width:400,top:100,left:100');
    },
    // 收藏
    collect(item) {
      if (!this.isLogin) {
        this.$message.error('请先登录');
      } else if (this.userinfo.user.type >= 4) {
        this.$message.error('企业用户不能收藏职位');
      } else {
        starJob({ jobid: item.id }).then(res => {
          if (res.code === '0') {
            this.$message({
              message: '收藏成功',
              type: 'success'
            });
            this.isColl = true;
          } else {
            this.$message.error('收藏失败');
          }
        }).catch(err => {
          return err;
        });
      }
    },
    // 判断是否收藏
    isStar() {
      isStar({ jobid: this.item.id }).then(res => {
        if (res.code === '0') {
          this.isColl = true;
        }
      }).catch(err => {
        return err;
      });
    },
    // 查看详情
    deatil(id, userid) {
      this.$router.push('/jobDetail/' + id + '/' + userid);
    },
    // 取消收藏
    cancel(item) {
      noStarJob({ jobid: item.id }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '已取消收藏',
            type: 'success'
          });
          this.isColl = false;
        } else {
          this.$message.error('取消失败');
        }
      }).catch(err => {
        return err;
      });
    }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    })
  }
};
</script>

<style lang="less" scoped>
.job-card {
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 270px;
  background-color: var(--cardBgColor);
  height: 450px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: -8px -8px 16px -10px rgba(0, 0, 0, 0.3),
      8px 8px 16px -10px rgba(0, 0, 0, 0.3);
    .job-head .img {
      transform: scale(1.1);
    }
  }
  .job-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 125px;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .job-content {
    text-align: left;
    width: 100%;
    padding: 135px 15px 0px 15px;
    height: 100%;
    position: relative;
    .job-require {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .head {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    .title {
      color: #333;
      font-size: 18px;
      flex: 1;
    }
    .icon {
      color: var(--fontColor);
      cursor: pointer;
      font-size: 18px;
      transition: all 0.25s;
      transform: translateX(4px);
      &:hover {
        color: var(--hoverColor);
      }
    }
  }
  .container {
    color: var(--fontColor);
    font-size: 13px;
    margin-bottom: 20px;
    p {
      margin: 5px 0;
    }
  }
  .foot {
    color: #333;
    position: relative;
    .left,
    .right {
      cursor: pointer;
      position: absolute;
      height: 5px;
      display: flex;
      align-items: center;
      transition: all 0.25s;
      &:hover {
        color: var(--hoverColor);
      }
    }
    .left {
      left: 0;
      .icon {
        font-size: 20px;
      }
    }
    .right {
      right: 0;
      .icon {
        font-size: 18px;
        margin-right: 5px;
      }
    }
  }
}
</style>
