<template>
  <div class="job">
    <sub-bar
      :companyType="jobType"
      :nameArr="nameArr"
      @typeSearch="searchType"
    ></sub-bar>
    <div class="select-type">
      <div class="content">
        <div class="left">
          <el-dropdown
            trigger="click"
            placement="bottom"
            @command="handleCommand1"
          >
            <span class="el-dropdown-link">
              {{ area ? area : "地区" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in areaType"
                :key="item.id"
                :command="item.name"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            trigger="click"
            placement="bottom"
            @command="handleCommand2"
          >
            <span class="el-dropdown-link">
              {{ sex ? sex : "性别" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in sexType"
                :key="item.id"
                :command="item.name"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown
            trigger="click"
            placement="bottom"
            @command="handleCommand3"
          >
            <span class="el-dropdown-link">
              {{ age ? age : "年龄" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部</el-dropdown-item>
              <el-dropdown-item
                v-for="item in ageType"
                :key="item.id"
                :command="item.name"
                >{{ item.name }}</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
          <div class="search bar1">
            <form>
              <input
                type="text"
                autocomplete="off"
                name="search"
                v-model="searchVal"
                @keydown.prevent.enter="search"
              />
            </form>
            <svg class="icon" aria-hidden="true" @click="search">
              <use xlink:href="#icon-search"></use>
            </svg>
          </div>
        </div>
        <div class="right">
          <span @click="lasted">默认</span>
          <span @click="lasted">最新</span>
          <span @click="hot">热点</span>
        </div>
      </div>
    </div>
    <div class="job-list">
      <el-alert
        v-if="!isHave"
        title="暂无数据"
        type="warning"
        :closable="false"
        effect="dark"
        show-icon
      >
      </el-alert>
      <job-card
        v-else
        data-aos="fade-up"
        v-for="(item, index) in list.jobs"
        :key="'job' + item.id + index"
        :item="item"
      ></job-card>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="20"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import SubBar from '../components/common/subBar.vue';
import JobCard from '../components/common/jobCard.vue';
import { findHotJob, getJobType, findJobUptime, findJobByName, findJobByThree, findJobByType } from '@/ajax';
export default {
  name: 'Job',
  data() {
    return {
      searchVal: '', // 搜索绑定
      list: [],
      currentPage: 1,
      ageType: [{
        id: 1, name: '0-20'
      }, {
        id: 2, name: '20-40'
      }, {
        id: 3, name: '40+'
      }],
      age: '',
      areaType: [{
        id: 1, name: '全部'
      }, {
        id: 2, name: '北京'
      }, {
        id: 3, name: '上海'
      }, {
        id: 4, name: '广州'
      }, {
        id: 5, name: '深圳'
      }, {
        id: 6, name: '杭州'
      }],
      area: '',
      sexType: [{
        id: 1, name: '全部'
      }, {
        id: 2, name: '男'
      }, {
        id: 3, name: '女'
      }],
      sex: '',
      isHave: true,
      select: 'uptime',
      params: null,
      jobType: [],
      name: '', // 为单类型选择后存储的类型名
      nameArr: ['工作分类', 'Job', 'classification']
    };
  },
  created() {
    getJobType().then(res => {
      if (res.code === '0') {
        this.jobType = res.data.map(item => {
          return item.name;
        });
      }
    }).catch(err => {
      return err;
    });
    this.handleCurrentChange(1);
  },
  methods: {
    handleCurrentChange(val) {
      if (this.select === 'uptime') {
        findJobUptime({ page: val }).then(res => {
          window.scrollTo(0, 0);
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.list = [];
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      } else if (this.select === 'type') {
        findJobByThree({ place: this.area, age: this.age, sex: this.sex, page: val }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.list = [];
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      } else {
        findJobByType({ job: this.name, page: val }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.list = [];
            this.isHave = false;
            this.$message.error('暂无数据');
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      }
    },
    handleCommand1(command) {
      if (command === '全部') {
        this.area = '';
      } else {
        this.area = command;
      }
      this.newType();
    },
    handleCommand2(command) {
      if (command === '全部') {
        this.sex = '';
      } else {
        this.sex = command;
      }
      this.newType();
    },
    handleCommand3(command) {
      if (command === '全部') {
        this.age = '';
      } else {
        this.age = command;
      }
      this.newType();
    },
    // 搜索
    search() {
      if (!this.searchVal) {
        this.handleCurrentChange(1);
      } else {
        this.currentPage = 1;
        findJobByName({ title: this.searchVal, page: 1 }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.list = [];
            this.isHave = false;
            this.$message.error('暂无数据');
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      }
    },
    // 最新按钮
    lasted() {
      this.select = 'uptime';
      this.handleCurrentChange(1);
    },
    // 最热排名
    hot() {
      findHotJob({ page: 1 }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
          this.list.allpage = 1;
        } else {
          this.isHave = false;
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.isHave = false;
        return err;
      });
    },
    // 根据单个类别搜索项目
    searchType(name) {
      this.select = 'searchType';
      this.currentPage = 1;
      this.name = name;
      findJobByType({ job: this.name, page: this.currentPage }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.list = [];
          this.isHave = false;
          this.$message.error('暂无数据');
        }
      }).catch(err => {
        this.isHave = false;
        return err;
      });
    },
    // 下拉选择api
    newType() {
      if (this.area === '' && this.age === '' && this.sex === '') {
        this.select = 'uptime';
        this.handleCurrentChange(1);
      } else {
        this.select = 'type';
        this.currentPage = 1;
        findJobByThree({ place: this.area, age: this.age, sex: this.sex, page: this.currentPage }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.list = [];
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      }
    }
  },
  components: {
    SubBar,
    JobCard
  }
};
</script>
<style lang='less' scoped>
.job {
  .job-list {
    display: flex;
    flex-wrap: wrap;
    width: 1160px;
    margin: 10px auto;
    /deep/ .job-card {
      margin: 10px 10px;
    }
    .el-alert {
      width: 1140px;
    }
  }
}
.select-type {
  background-color: #c9cbca;
  .content {
    margin: 0 auto;
    height: 60px;
    width: 1180px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left .el-dropdown {
      margin: 0 20px;
      color: #333;
      cursor: pointer;
    }
    .left {
      display: flex;
      align-items: center;
      .search {
        margin: 0 20px;
        padding-right: 0;
        display: flex;
        .icon {
          color: #333;
          margin-left: 10px;
        }
      }
      .bar1 input {
        height: 28px;
        line-height: 29px;
        border-radius: 30px;
        background: rgba(255, 255, 255, 0.25);
        color: #333;
      }
      form {
        position: relative;
        width: 200px;
        margin: 0 auto;
      }
      input {
        border: none;
        outline: none;
        width: 100%;
        padding: 0 13px;
      }
      .icon {
        line-height: 28px;
        height: 28px;
        font-size: 26px;
      }
    }
    .right {
      display: flex;
      align-items: center;
      span {
        margin: 0 20px;
        font-size: 14px;
        cursor: pointer;
        color: #333;
      }
    }
  }
}
.footer-page {
  display: flex;
  align-items: center;
  justify-content: center;
  /deep/.el-pagination {
    margin: 20px 0;
    background-color: #f5f5f5;
    .btn-prev,
    .btn-next,
    li {
      background-color: #f5f5f5;
    }
  }
}
.el-dropdown-menu {
  max-height: 250px;
  overflow-y: scroll;
  text-align: center;
  &::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
}
</style>
