<template>
  <div class="center">
    <div class="left">
      <div class="info">
        <el-avatar class="user-img" :src="info.user.head" fit="cover"
          ><img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        /></el-avatar>
        <div class="user-info">
          <div class="nick">
            <div class="name oneLine">
              {{ info.user.name == null ? "未设置昵称" : info.user.name }}
            </div>
            <div class="vip">
              <el-link
                icon="el-icon-edit"
                @click="goCelebrity()"
                :disabled="info.user.status !== 1 ? true : false"
                :underline="false"
                :type="info.user.status !== 1 ? 'success' : 'info'"
                >{{ info.user.status !== 1 ? "已认证" : "未认证" }}</el-link
              >
            </div>
          </div>
          <div class="counts">
            <div>
              粉丝<span>{{ info.user.funs | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              关注<span>{{ info.likeNum | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              收藏<span>{{ info.collectNum | setNum }}</span>
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
          <div  class="item" v-if="item.id===5 && item.status===1">
            {{ item.title }}
            <svg t="1615811266498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2227" width="200" height="200"><path d="M512 512m-286.423125 0a286.423125 286.423125 0 1 0 572.84718751 0 286.423125 286.423125 0 1 0-572.84718751 0Z" fill="#f43530" p-id="2228"></path></svg>
          </div>
          <div v-else>{{item.title}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <components
          @cancel="cancel"
          @change="changeInfo"
          @goCelebrity="goCelebrity"
          :is="child"
        ></components>
      </keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  isNews,
  mineInfo
} from '../ajax/index';
import info from '../components/personalCenter/info';
import celebrity from '../components/personalCenter/celebrity';
import cv from '../components/personalCenter/cv';
import message from '../components/personalCenter/message';
import works from '../components/personalCenter/works';
// import safe from '../components/personalCenter/safe';
import deliver from '../components/personalCenter/deliver';
import collect from '../components/personalCenter/collect';
import follow from '../components/personalCenter/follow';
import report from '../components/personalCenter/report';
import honor from '../components/personalCenter/honor';
import password from '../components/personalCenter/password';
import notice from '../components/personalCenter/notice';
export default {
  data() {
    return {
      menu: [
        { id: 1, title: '个人资料', child: 'info', status: 0 },
        { id: 2, title: '实名认证', child: 'celebrity', status: 0 },
        { id: 3, title: '修改密码', child: 'password', status: 0 },
        // { id: 3, title: '账号安全', child: 'safe' },
        { id: 4, title: '我的简历', child: 'cv', status: 0 },
        { id: 5, title: '系统通知', child: 'notice', status: 0 },
        { id: 6, title: '我的私信', child: 'message', status: 0 },
        { id: 7, title: '我的作品', child: 'works', status: 0 },
        { id: 8, title: '工作经历', child: 'honor', status: 0 },
        { id: 9, title: '投递记录', child: 'deliver', status: 0 },
        { id: 10, title: '我的收藏', child: 'collect', status: 0 },
        { id: 11, title: '我的关注', child: 'follow', status: 0 },
        { id: 12, title: '举报中心', child: 'report', status: 0 }
      ],
      activeIndex: 1,
      child: 'info',
      status: 0
    };
  },
  methods: {
    tabChange(id, child) {
      this.child = child;
      this.activeIndex = id;
    },
    goCelebrity() {
      this.tabChange(2, 'celebrity');
    },
    changeInfo() {
      mineInfo().then(res => {
        if (res.code === '0') {
          this.$store.commit('userinfo', res.data);
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    },
    cancel(id) {
      if (id === 1) {
        this.$store.state.userinfo.likeNum--;
      } else {
        this.$store.state.userinfo.collectNum--;
      }
    },
    haveNews() {
        isNews().then(res => {
          console.log(res.code);
          console.log(res.data);
          if (res.data === 1) {
            this.menu[4].status = 1;
            console.log(this.menu[10].status);
            console.log('有新消息');
          } else {
            this.menu[4].status = 0;
            console.log('没有新消息');
            console.log(this.menu[4].status);
          }
        });
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.userinfo
    })
  },
  mounted() {
    this.haveNews();
  },
  components: {
    info,
    celebrity,
    password,
    cv,
    message,
    works,
    // safe,
    deliver,
    collect,
    follow,
    report,
    honor,
    notice
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
        img {
          width: 80px;
          height: 80px;
        }
      }
      .user-info {
        .nick,
        .counts {
          display: flex;
          align-items: center;
          margin: 15px 0;
        }
        .name {
          max-width: 90px;
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
            color: #409eff;
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
        .item{
          margin-top: 10px;
          margin-right: 50px;
        }
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
  background: #409eff;
  color: #fff;
}
/deep/.el-link--success {
  color: #97dc73 !important;
}
</style>
