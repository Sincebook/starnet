<template>
  <div class="company">
    <sub-bar
      :companyType="companyType"
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
              {{ job ? job : "分类" }}
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="全部">全部</el-dropdown-item>
              <el-dropdown-item
                v-for="item in jobType"
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
          <span @click="moren">默认</span>
          <span @click="lasted">最新</span>
          <span @click="hot">热点</span>
        </div>
      </div>
    </div>
    <div class="company-list">
      <el-alert
        v-if="!isHave"
        title="暂无数据"
        type="warning"
        :closable="false"
        effect="dark"
        show-icon
      >
      </el-alert>
      <company-card
        v-else
        data-aos="fade-up"
        v-for="(item, index) in list.companyInfoVOs"
        :key="'company' + item.id + index"
        :item="item"
      ></company-card>
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
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import CompanyCard from '../components/common/companyCard.vue';
import { findByUptime, getCompanyType, findByTwo, findComByName, findHotCompany, findByOneType } from '@/ajax/index.js';
export default {
  name: 'Company',
  data() {
    return {
      searchVal: '', // 搜索绑定
      list: [],
      currentPage: 1,
      jobType: [],
      job: '',
      areaType: [{
        id: 1, name: '全部'
      }, {
        id: 2, name: '北京'
      }, {
        id: 3, name: '上海'
      }, {
        id: 4, name: '郑州'
      }, {
        id: 5, name: '西安'
      }],
      area: '',
      isHave: true,
      select: 'moren',
      name: '', // 为单类型选择后存储的类型名
      nameArr: ['公司分类', 'Company', 'classification']
    };
  },
  created() {
    getCompanyType().then(res => {
      if (res.code === '0') {
        this.jobType = res.data;
      }
    }).catch(err => {
      return err;
    });
    this.handleCurrentChange(1);
  },
  components: {
    SubBar,
    CompanyCard
  },
  computed: {
    companyType() {
      return this.jobType.map(item => {
        return item.name;
      });
    }
  },
  methods: {
    handleCurrentChange(val) {
      if (this.select === 'moren') {
        findByUptime({ page: val }).then(res => {
          window.scrollTo(0, 0);
          if (res.code === '0') {
            this.isHave = true;
            this.list = res.data;
          } else {
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      } else if (this.select === 'uptime') {
        findByUptime({ page: val }).then(res => {
          window.scrollTo(0, 0);
          if (res.code === '0') {
            this.isHave = true;
            console.log(res.data);
            res.data.companyInfoVOs.length = 12;
            res.data.allpage = 1;
            this.list = res.data;
          } else {
            this.isHave = false;
            this.$message.error(res.errMsg);
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      } else if (this.select === 'type') {
        findByTwo({ area: this.area, category: this.job, page: val }).then(res => {
          if (res.code === '0' && res.data.allpage !== 0) {
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
      } else {
        findByOneType({ vocation: this.name, page: val }).then(res => {
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
        this.job = '';
      } else {
        this.job = command;
      }
      this.newType();
    },
    handleCommand2(command) {
      if (command === '全部') {
        this.area = '';
      } else {
        this.area = command;
      }
      this.newType();
    },
    // 搜索
    search() {
      if (!this.searchVal) {
        this.handleCurrentChange(1);
      } else {
        this.currentPage = 1;
        findComByName({ name: this.searchVal }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.list.companyInfoVOs = res.data;
            this.list.allpage = 1;
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
    // 下拉选择api
    newType() {
      if (this.area === '' && this.job === '') {
        this.select = 'uptime';
        this.handleCurrentChange(1);
      } else {
        this.select = 'type';
        this.currentPage = 1;
        findByTwo({ area: this.area, category: this.job, page: this.currentPage }).then(res => {
          if (res.code === '0' && res.data.allpage !== 0) {
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
    moren() {
      this.select = 'moren';
      this.handleCurrentChange(1);
    },
    // 最热排名
    hot() {
      findHotCompany().then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list.companyInfoVOs = res.data;
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
      findByOneType({ category: this.name, page: this.currentPage }).then(res => {
        if (res.code === '0' && res.data.allpage !== 0) {
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
  }
};
</script>
<style lang='less' scoped>
.company {
  .company-list {
    display: flex;
    flex-wrap: wrap;
    width: 1160px;
    margin: 10px auto;
    /deep/ .company-card {
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
        cursor: pointer;
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
