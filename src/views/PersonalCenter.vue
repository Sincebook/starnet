<template>
  <div class="center">
    <div class="left">
      <div class="info">
        <div
          class="user-img"
          :style="{ backgroundImage: 'url(' + bgImg + ')' }"
        ></div>
        <div class="user-info">
          <div class="nick">
            <div class="name">空帆船</div>
            <div class="vip">
              <el-link
                icon="el-icon-edit"
                @click="goCelebrity()"
                :disabled="isCelebrity ? true : false"
                :underline="false"
                :type="isCelebrity ? 'success' : 'info'"
                >{{ isCelebrity ? "已认证" : "未认证" }}</el-link
              >
            </div>
          </div>
          <div class="counts">
            <div>
              粉丝<span>{{ 23827 | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              关注<span>{{ 1210 | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              收藏<span>{{ 21000 | setNum }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="menu">
        <ul>
          <li
            class="link"
            v-for="item in menu"
            :key="item.id"
            :class="{ active: activeIndex === item.id }"
            @click="tabChange(item.id, item.child)"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <components @goCelebrity="goCelebrity" :is="child"></components>
    </div>
  </div>
</template>

<script>
import info from '../components/personalCenter/info';
import celebrity from '../components/personalCenter/celebrity';
import cv from '../components/personalCenter/cv';
import message from '../components/personalCenter/message';
import works from '../components/personalCenter/works';
import safe from '../components/personalCenter/safe';
import deliver from '../components/personalCenter/deliver';
import collect from '../components/personalCenter/collect';
import follow from '../components/personalCenter/follow';
import report from '../components/personalCenter/report';
export default {
  data() {
    return {
      isCelebrity: false,
      menu: [
        { id: 1, title: '个人资料', child: 'info' },
        { id: 2, title: '实名认证', child: 'celebrity' },
        { id: 3, title: '账号安全', child: 'safe' },
        { id: 4, title: '我的简历', child: 'cv' },
        { id: 5, title: '我的私信', child: 'message' },
        { id: 6, title: '我的作品', child: 'works' },
        { id: 7, title: '投递记录', child: 'deliver' },
        { id: 8, title: '我的收藏', child: 'collect' },
        { id: 9, title: '我的关注', child: 'follow' },
        { id: 10, title: '举报中心', child: 'report' }
      ],
      activeIndex: 1,
      child: 'info',
      bgImg: '//ftp.qnets.cn/img/bg3.jpg'
    };
  },
  methods: {
    tabChange(id, child) {
      this.child = child;
      this.activeIndex = id;
    },
    goCelebrity() {
      this.tabChange(2, 'celebrity');
    }
  },
  components: {
    info,
    celebrity,
    cv,
    message,
    works,
    safe,
    deliver,
    collect,
    follow,
    report
  }
};
</script>

<style lang="less" scoped>
.center {
  display: flex;
  padding-top: 40px;
  padding-bottom: 40px;
  width: 1280px;
  margin: 0 auto;
  overflow: hidden;
  .left {
    .info {
      background-color: #fff;
      width: 300px;
      height: 180px;
      display: flex;
      align-items: center;
      .user-img {
        width: 80px;
        height: 80px;
        margin: 0 20px;
        overflow: hidden;
        border-radius: 40px;
        background-color: #ccc;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: cover;
      }
      .user-info {
        .nick,
        .counts {
          display: flex;
          align-items: center;
          margin: 15px 0;
        }
        .name {
          font-size: 16px;
          font-weight: 600;
          margin-right: 10px;
        }
        .counts {
          width: 180px;
          div {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 0 4px;
            &:first-child {
              margin-left: 0;
            }
            &:last-child {
              margin-right: 0;
            }
          }
          span {
            color: #409EFF;
            font-weight: 600;
          }
        }
      }
    }
    .menu {
      background: #fff;
      width: 300px;
      height: 740px;
      margin-top: 15px;
      text-align: left;
      color: #737373;
      .link {
        font-size: 16px;
        height: 60px;
        cursor: pointer;
        line-height: 60px;
        padding: 0 0 0 25px;
        transition: all 0.25s;
      }
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    background: #fff;
    margin-left: 15px;
  }
}
.active {
  background: #409EFF;
  color: #fff;
}
</style>
