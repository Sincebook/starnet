<template>
  <div>
    <div class="job-card" @click="deatil">
      <div class="job-head">
        <div
          class="img"
          :style="{ backgroundImage: 'url(' + item.image + ')' }"
        ></div>
      </div>
      <div class="job-content">
        <div class="head">
          <h2 class="title oneLine">{{ item.title }}</h2>
          <svg @click.stop="share" class="icon" aria-hidden="true">
            <use xlink:href="#icon-fenxiang"></use>
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
          <div class="left" @click.stop="recommend">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-tuijian"></use>
            </svg>
            编辑推荐
          </div>
          <div class="right" @click.stop="collect">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-ai-mark"></use>
            </svg>
            点击收藏
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    // 分享
    share() {
      this.$emit('share');
    },
    // 推荐
    recommend() {
      this.$emit('recommend');
    },
    // 收藏
    collect() {
      this.$emit('collect');
    },
    // 查看详情
    deatil() {
      this.$router.push({ name: 'jobDetail', params: { id: 1 } });
      this.$emit('deatil');
    }
  }
};
</script>

<style lang="less" scoped>
.job-card {
  cursor: pointer;
  user-select: none;
  position: relative;
  width: 330px;
  background-color: var(--cardBgColor);
  height: 390px;
  transition: all 0.25s;
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
    height: 100px;
    overflow: hidden;
    .img {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
      background-repeat: no-repeat;
      background-position: center center;
      background-size: cover;
    }
  }
  .job-content {
    text-align: left;
    width: 100%;
    padding: 105px 20px 0px 20px;
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
      color: #759cb6;
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
    color: var(--fontColor);
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
