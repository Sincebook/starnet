<template>
  <div class="center">
    <div class="left">
      <div class="info">
        <el-avatar class="user-img" :src="userInfo.user.head" fit="cover"
          ><img
            src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
        /></el-avatar>
        <div class="user-info">
          <div class="nick">
            <div class="name">
              {{
                userInfo.user.name == null ? "未设置昵称" : userInfo.user.name
              }}
            </div>
            <div class="vip">
              <el-link
                icon="el-icon-edit"
                @click="goCelebrity()"
                :disabled="userInfo.user.status !== 1 ? true : false"
                :underline="false"
                :type="userInfo.user.status !== 1 ? 'success' : 'info'"
                >{{ userInfo.user.status !== 1 ? "已认证" : "未认证" }}</el-link
              >
            </div>
          </div>
          <div class="counts">
            <div>
              粉丝<span>{{ userInfo.user.funs | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              关注<span>{{ userInfo.collectNum | setNum }}</span>
            </div>
            <el-divider direction="vertical"></el-divider>
            <div>
              收藏<span>{{ userInfo.likeNum | setNum }}</span>
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
      <keep-alive>
        <components
          :info="userInfo.user"
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
import {
  mineInfo,
  companyInfo
} from '../ajax/index';
import userinfo from '../components/personalCenter/info';
import info from '../components/corporateCenter/info';
import celebrity from '../components/corporateCenter/celebrity';
import honor from '../components/corporateCenter/honor';
import recruit from '../components/corporateCenter/recruit';
import message from '../components/personalCenter/message';
import follow from '../components/personalCenter/follow';
import report from '../components/personalCenter/report';
export default {
  data() {
    return {
      isCelebrity: false,
      menu: [
        { id: 1, title: '个人资料', child: 'userinfo' },
        { id: 2, title: '企业信息', child: 'info' },
        { id: 3, title: '企业认证', child: 'celebrity' },
        { id: 4, title: '企业荣誉', child: 'honor' },
        { id: 5, title: '在招职位', child: 'recruit' },
        { id: 6, title: '我的私信', child: 'message' },
        { id: 7, title: '我的关注', child: 'follow' },
        { id: 8, title: '举报中心', child: 'report' }
      ],
      activeIndex: 1,
      child: 'userinfo',
      userInfo: {
        user: {
          head: null,
          name: null,
          status: 1,
          phone: '',
          funs: 0
        },
        collectNum: 0,
        likeNum: 0
      },
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
    },
    goCelebrity() {
      this.tabChange(3, 'celebrity');
    },
    changeInfo() {
      mineInfo().then(res => {
        if (res.code === '0') {
          this.userInfo = res.data;
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  created() {
    mineInfo().then(res => {
      if (res.code === '0') {
        this.userInfo = res.data;
      } else {
        this.$message.error(res.errMsg);
      }
    }).catch(err => {
      return err;
    });
    companyInfo().then(res => {
      if (res.code === '0') {
        this.companyInfo = res.data;
      }
    }).catch(err => {
      return err;
    });
  },
  components: {
    userinfo,
    info,
    celebrity,
    honor,
    recruit,
    message,
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
