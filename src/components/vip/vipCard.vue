<template>
  <div class="vip-card" :class="'level' + item.level">
    <div
      v-if="item.level === 1"
      class="tuijan"
      :style="{ backgroundImage: 'url(' + tuijianImg + ')' }"
    ></div>
    <div class="head">
      <h2 class="title">{{ item.title }}</h2>
      <p class="desc">{{ item.desc }}</p>
    </div>
    <div class="content">
      <p v-for="(item1, index) in info" :key="item1">
        <svg
          class="icon"
          :class="index < item.power ? 'icon-duihao' : 'icon-cuohao'"
          aria-hidden="true"
        >
          <use
            :xlink:href="index < item.power ? '#icon-duihao' : '#icon-cuohao'"
          ></use>
        </svg>
        {{ item1 }}
      </p>
    </div>
    <div class="btn-box">
      <div class="btn" @click="select">选择</div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  data() {
    return {
      info: [
        '收藏/查看所有工作',
        '在人才目录里面被发现',
        '定制工作申请',
        '精选个人资料照片',
        '比其他人早1小时刷新工作职位',
        '无限上传照片/视频/音频'
      ],
      tuijianImg: '//ftp.qnets.cn/since/tuijian.png'
    };
  },
  methods: {
    select() { }
  }
};
</script>

<style lang="less" scoped>
.vip-card {
  position: relative;
  background-color: #ffffff;
  padding: 25px 35px;
  margin: 10px;
  .tuijan {
    position: absolute;
    top: -12px;
    left: -10px;
    width: 75px;
    height: 75px;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  .head {
    .title {
      color: #e77424;
      font-weight: 500;
      margin-bottom: 15px;
      font-size: 24px;
    }
    .desc {
      margin-bottom: 15px;
    }
    &::after {
      content: "";
      display: block;
      height: 2px;
      width: 100%;
      margin-bottom: 15px;
    }
  }
  .content {
    text-align: left;
    margin: 0 20px 25px 20px;
    p {
      margin: 10px 0;
      .icon {
        font-size: 12px;
      }
      .icon-cuohao {
        color: #999;
      }
    }
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      cursor: pointer;
      font-size: 16px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #fff;
      transition: all 0.25s;
    }
  }
}
.level0 {
  .head {
    .title {
      color: #e77424;
    }
    &::after {
      background: radial-gradient(#e77424 0%, #f5f5f5 70%);
    }
  }
  .content {
    .icon-duihao {
      color: #e77424;
    }
  }
  .btn-box {
    .btn {
      background-color: #e77424;
      &:hover {
        background-color: #ff8229;
      }
    }
  }
}
.level1 {
  .head {
    .title {
      color: #0358a8;
    }
    &::after {
      background: radial-gradient(#0358a8 0%, #f5f5f5 70%);
    }
  }
  .content {
    .icon-duihao {
      color: #0358a8;
    }
  }
  .btn-box {
    .btn {
      background-color: #0358a8;
      &:hover {
        background-color: #0471d6;
      }
    }
  }
}
.level2 {
  .head {
    .title {
      color: #52035b;
    }
    &::after {
      background: radial-gradient(#52035b 0%, #f5f5f5 70%);
    }
  }
  .content {
    .icon-duihao {
      color: #52035b;
    }
  }
  .btn-box {
    .btn {
      background-color: #52035b;
      &:hover {
        background-color: #8a0299;
      }
    }
  }
}
</style>
