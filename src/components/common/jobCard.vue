<template>
  <div>
    <div class="job-card" @click="deatil(item.id)">
      <div class="job-head">
        <el-image class="img" :src="item.image" fit="cover"></el-image>
      </div>
      <div class="job-content">
        <div class="head">
          <h2 class="title oneLine" :title="item.title">
            {{ item.title.slice(0, 9) }}
          </h2>
          <!-- <svg @click.stop="share(1)" class="icon" aria-hidden="true">
            <use xlink:href="#icon-weixin1"></use>
          </svg> -->
          <svg @click.stop="share(3)" class="icon" aria-hidden="true">
            <use xlink:href="#icon-weibo"></use>
          </svg>
        </div>
        <div class="container">
          <p class="job-require">发布人：{{ item.launch }}</p>
          <p>面试地点：{{ item.place }}</p>
          <p>年龄要求：{{ item.age }}</p>
          <p>性别：{{ item.sex }}</p>
          <p class="job-require">职位要求：{{ item.jobneed }}</p>
          <p>薪酬：{{ item.money }}</p>
          <p>工作周期：{{ item.worktime }}</p>
          <p>开始日期：{{ item.begintime }}</p>
          <p>截止日期：{{ item.endtime }}</p>
        </div>
        <div class="foot">
          <div v-if="item.type !== 1" class="left" @click.stop="recommend">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            编辑推荐
          </div>
          <div class="right" @click.stop="collect">
            <svg class="icon" aria-hidden="true" ref="star">
              <use xlink:href="#icon-ai-mark"></use>
            </svg>
            {{ shoucang }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { starJob, isStar, noStarJob } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      shoucang: '点击收藏'
    };
  },
  created() {
    // console.log(this.item.id);
    this.item.begintime = this.$formatDate(this.item.begintime);
    this.item.endtime = this.$formatDate(this.item.endtime);
    if (this.$store.state.isLogin) {
      this.isStar();
    }
  },
  methods: {
    // 分享
    share(index) {
      let url = window.location.href + '#' + this.item.id;
      console.log(url);
      if (index === 3) {
        window.open('http://v.t.sina.com.cn/share/share.php?title=' + this.item.title + '&url=' + url + '&content=utf-8&sourceUrl=' + this.item.description + '&pic=' + this.item.image, 'newwindow', 'height:400,width:400,top:100,left:100'
        );
      }
      if (index === 1) {
        this.$message({
          message: '请将链接复制到微信...'
        });
        // window.open('http://qr.liantu.com/api.php?text=' + encodeURIComponent(url), 'weixin', 'height=320,width=320');
      }
    },
    // 推荐
    recommend() {
      this.$emit('recommend');
    },
    // 收藏
    collect() {
      if (!this.$store.state.isLogin) {
        this.$message({
          message: '请先登录',
          type: 'error'
        });
        return;
      }
      // this.$emit('collect');
      if (this.shoucang === '已收藏') {
        noStarJob({ jobid: this.item.id }).then(res => {
          if (res.code === '0') {
            this.$refs.star.style.color = 'rgb(150, 140, 140)';
            this.shoucang = '点击收藏';
          } else {
            this.$message.error(res.errMsg);
          }
        });
        return;
      }
      starJob({ jobid: this.item.id }).then(res => {
        console.log(res);
        if (res.code === '0') {
          this.$refs.star.style.color = 'rgb(81, 156, 234)';
          this.shoucang = '已收藏';
        } else {
          this.$message.error(res.errMsg);
        }
      });
    },
    // 判断是否收藏
    isStar() {
      isStar({ jobid: this.item.id }).then(res => {
        // console.log(res);
        if (res.code === '0') {
          this.$refs.star.style.color = 'rgb(81, 156, 234)';
          this.shoucang = '已收藏';
        }
      });
    },
    // 查看详情
    deatil(id) {
      this.$router.push({ name: 'jobDetail', params: { id: id } });
    }
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
  height: 420px;
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
    height: 120px;
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
    padding: 130px 15px 0px 15px;
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
