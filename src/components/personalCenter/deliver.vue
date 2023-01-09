<template>
  <div class="info-box">
    <div class="title">
      <div class="name">投递记录</div>
      <el-dropdown style="cursor: pointer">
        <span class="el-dropdown-link">
          条件筛选({{ tj }})<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            @click.native="clickItem(item)"
            v-for="item in tiaojian"
            :key="item.id"
            >{{ item.value }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="info">
      <el-alert
        v-if="!isHave"
        title="暂无投递"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <div v-else class="list">
        <div class="item-box" v-for="item in list.applys" :key="item.id">
          <div class="item">
            <!-- <el-image
              class="user-img"
              :src="item.roleimage"
              fit="cover"
            ></el-image> -->
            <div class="user-info">
              <div class="head">
                <span class="user-name">{{ item.rolename }}</span>
                <span class="user-vip">{{ item.status }}</span>
              </div>
              <div class="content twoLine">{{ item.roledes }}</div>
            </div>
            <div class="user-btn">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  @click="watchDetail(item.jobid, item.companyInfoId)"
                  >查看详情</el-button
                >
              </div>
              <div>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click="cancel(item.id)"
                  >取消投递</el-button
                >
              </div>
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="6"
        layout="prev, pager, next"
        :page-count="list.allpage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {
  mineDeliver,
  cancelDeliver
} from '../../ajax/index';
export default {
  data() {
    return {
      isHave: true,
      tiaojian: [
        { id: 0, value: '全部', code: 'a' },
        { id: 1, value: '待查看', code: 'w' },
        { id: 2, value: '已查看', code: 'h' },
        { id: 3, value: '有意向', code: 'c' },
        { id: 4, value: '已拒绝', code: 'r' },
        { id: 5, value: '已录用', code: 's' }
      ],
      filter: 'a',
      list: [],
      nums: 6,
      currentPage: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      mineDeliver({
        filter: this.filter,
        num: this.nums,
        page: val
      }).then(res => {
        if (res.code === '0') {
          this.isHave = true;
          this.list = res.data;
        } else {
          this.isHave = false;
          this.$message.error('获取失败');
        }
      }).catch(err => {
        this.isHave = false;
        return err;
      });
    },
    getDeliver() {
      mineDeliver({
        filter: this.filter,
        num: this.nums,
        page: this.currentPage
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '筛选成功',
            type: 'success'
          });
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
    },
    clickItem(item) {
      this.filter = item.code;
      this.currentPage = 1;
      this.getDeliver();
    },
    // 取消投递
    cancel(id) {
      cancelDeliver({ id: id }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '取消成功',
            type: 'success'
          });
          if (this.list.applys.length === 1 && this.currentPage !== 1) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    },
    // 查看详情
    watchDetail(id, userid) {
      this.$router.push('jobDetail/' + id + '/' + userid);
    }
  },
  created() {
    mineDeliver({
      filter: this.filter,
      num: this.nums,
      page: this.currentPage
    }).then(res => {
      if (res.code === '0') {
        this.isHave = true;
        this.list = res.data;
      } else {
        this.isHave = false;
        this.$message.error(res.errMsg);
      }
    }).catch(err => {
      this.isHave = false;
      this.$message.error(err);
      return err;
    });
  },
  computed: {
    tj() {
      let res = '';
      this.tiaojian.forEach(item => {
        if (item.code === this.filter) {
          res = item.value;
        }
      });
      return res;
    }
  }
};
</script>

<style lang="less" scoped>
.info-box {
  position: relative;
  height: 100%;
  .info {
    padding: 25px 50px 0;
    .list {
      .item {
        display: flex;
        align-items: center;
        .user-img {
          width: 80px;
          height: 80px;
          border-radius: 5px;
        }
        .user-info {
          flex: 1;
          height: 80px;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .head {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }
          .content {
            margin-top: 3px;
            height: 57px;
            -webkit-line-clamp: 3;
            line-clamp: 3;
          }
        }
        .user-name {
          height: 20px;
          font-size: 15px;
          font-weight: 600;
          margin-right: 10px;
        }
        .user-btn {
          height: 80px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
        }
      }
    }
  }
  .title {
    font-size: 16px;
    padding: 0px 50px;
    background: #e5e7eb;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
  }
  .footer-page {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 20px;
  }
  .detail {
    .user-img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
    }
    .content {
      display: flex;
      align-items: flex-start;
      margin-bottom: 10px;
      .label {
        color: #000;
        font-size: 16px;
        width: 80px;
        text-align: right;
        font-weight: 600;
      }
      .desc {
        flex: 1;
        align-self: center;
      }
      &:first-child {
        align-items: center;
      }
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
}
</style>
