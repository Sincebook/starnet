<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的收藏</div>
    </div>
    <div class="info">
      <el-alert
        v-if="!isHave"
        title="暂无收藏"
        type="warning"
        :closable="false"
        show-icon
      >
      </el-alert>
      <div v-else class="list">
        <div class="item-box" v-for="item in list.datas" :key="item.id">
          <div class="item">
            <el-image class="user-img" :src="item.image" fit="cover"></el-image>
            <div class="user-info">
              <div class="user-name">
                <span class="head">{{ item.title }}</span>
                <span>{{ item.launch }}</span>
              </div>
              <div class="content">
                <span>职位：{{ item.job }}</span>
                <span
                  >时间：{{ Number(item.begintime) | formatDate }} -
                  {{ Number(item.endtime) | formatDate }}</span
                >
              </div>
              <div class="content">
                <span>面试地点：{{ item.place }}</span>
                <span>年龄要求：{{ item.age }}岁</span>
                <span>薪资：{{ item.money }}</span>
              </div>
              <div class="content oneLine">要求：{{ item.jobneed }}</div>
            </div>
            <div class="user-btn">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  @click="watchDetail(item.id)"
                  >查看详情</el-button
                >
              </div>
              <div>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click="cancel(item.id)"
                  >取消收藏</el-button
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
  mineCollect,
  cancelCollect
} from '../../ajax/index';
import { formatDate } from '../../assets/js/date.js';
export default {
  data() {
    return {
      isHave: true,
      list: [],
      currentPage: 1,
      nums: 6
    };
  },
  methods: {
    handleCurrentChange(val) {
      mineCollect({
        num: this.nums,
        page: val
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
    // 取消收藏
    cancel(id) {
      cancelCollect({ jobid: id }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '取消成功',
            type: 'success'
          });
          if (this.list.datas.length === 1 && this.currentPage !== 1) {
            this.handleCurrentChange(this.currentPage - 1);
          } else {
            this.handleCurrentChange(this.currentPage);
          }
          this.$emit('cancel', 2);
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        this.$message.error(err);
        return err;
      });
    },
    // 查看详情
    watchDetail(id) {
      this.$router.push({ name: 'jobDetail', params: { id: id } });
    }
  },
  created() {
    mineCollect({
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
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd');
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
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            span {
              margin-right: 15px;
            }
          }
        }
        .user-name {
          display: flex;
          align-items: center;
          justify-content: space-between;
          .head {
            font-size: 15px;
            font-weight: 600;
            margin-right: 10px;
          }
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
}
</style>
