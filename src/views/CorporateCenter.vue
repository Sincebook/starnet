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
          <div  class="item" v-if="item.id===5 && item.status===1" >
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
          :companyInfo="companyInfo"
          @change="changeInfo"
          @goCelebrity="goCelebrity"
          :is="child"
        ></components
      ></keep-alive>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import {
  mineInfo,
  companyInfo,
  isNews
} from '../ajax/index';
import userinfo from '../components/personalCenter/info';
import info from '../components/corporateCenter/info';
import celebrity from '../components/corporateCenter/celebrity';
import honor from '../components/corporateCenter/honor';
import recruit from '../components/corporateCenter/recruit';
import publish from '../components/corporateCenter/publish';
import message from '../components/personalCenter/message';
import follow from '../components/personalCenter/follow';
import report from '../components/personalCenter/report';
// import collect from '../components/personalCenter/collect';
import works from '../components/corporateCenter/works';
import password from '../components/corporateCenter/password';
import notice from '../components/corporateCenter/notice';
export default {
  data() {
    return {
      type: 0,
      id: 0,
      isCelebrity: false,
      menu: [
        { id: 1, title: '个人资料', child: 'userinfo', status: 0 },
        { id: 2, title: '企业信息', child: 'info', status: 0 },
        { id: 3, title: '企业认证', child: 'celebrity', status: 0 },
        { id: 4, title: '修改密码', child: 'password', status: 0 },
        { id: 5, title: '系统通知', child: 'notice', status: 0 },
        { id: 6, title: '企业荣誉', child: 'honor', status: 0 },
        { id: 7, title: '在招职位', child: 'recruit', status: 0 },
        { id: 8, title: '发布项目', child: 'publish', status: 0 },
        { id: 9, title: '我的私信', child: 'message', status: 0 },
        { id: 10, title: '我的作品', child: 'works', status: 0 },
        { id: 11, title: '我的关注', child: 'follow', status: 0 },
        // { id: 9, title: '我的收藏', child: 'collect' },
        { id: 12, title: '举报中心', child: 'report', status: 0 }
      ],
      activeIndex: 1,
      child: 'userinfo',
      status: 0,
      companyInfo: {
        status: '',
        logo: '',
        name: '',
        image: '',
        organizationCode: '',
        legalPerson: '',
        createTime: '',
        type: '',
        category: '',
        opus: '',
        area: '',
        managementRange: '',
        description: ''
      }
    };
  },
  methods: {
    tabChange(id, child) {
      this.child = child;
      this.activeIndex = id;
      console.log(id, child);
      if (id === 5 && child === 'notice') {
        this.menu[4].status = 0;
        console.log(this.menu[4].status);
      }
    },
    goCelebrity() {
      this.tabChange(3, 'celebrity');
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
          if (res.data === 1) {
            this.menu[4].status = 1;
          } else {
            this.menu[4].status = 0;
          }
        });
    }
  },
  created() {
    companyInfo().then(res => {
      if (res.code === '0') {
        this.companyInfo = res.data;
      }
    }).catch(err => {
      return err;
    });
  },
  computed: {
    ...mapState({
      info: (state) => state.userinfo
    })
  },
  components: {
    userinfo,
    info,
    celebrity,
    honor,
    recruit,
    publish,
    message,
    follow,
    report,
    // collect,
    works,
    password,
    notice
  },
  mounted() {
    this.haveNews();
  }
  // watch: {
  //   '$route' (to, from) {
  //       // from 对象中要 router 来源信息.
  //       // do your want
  //   }
  // },
  // beforeRouteEnter (to, from, next) {
  //      console.log(to);
  //      console.log(from);
  //      console.log(next);
  //      next();
  // }
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
        cursor: pointer;
        margin: 0 20px;
      }
      /deep/.el-avatar > img {
      width: 100%;
      height: 100%s;
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
</style>
