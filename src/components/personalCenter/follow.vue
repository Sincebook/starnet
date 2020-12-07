<template>
  <div class="info-box">
    <div class="title">
      <div class="name">我的关注</div>
    </div>
    <div class="info">
      <el-alert
        v-if="!isHave"
        title="暂无关注"
        type="warning"
        :closable="false"
        show-icon
      ></el-alert>
      <div v-else class="list">
        <div class="item-box" v-for="item in list.stars" :key="item.id">
          <div class="item">
            <el-image class="user-img" :src="item.image" fit="cover"></el-image>
            <div class="user-info">
              <div class="user-name">{{ item.name }}</div>
              <div class="content twoLine">{{ item.selfEvaluation }}</div>
            </div>
            <div class="user-btn">
              <div>
                <el-button
                  type="primary"
                  size="mini"
                  plain
                  @click="watchDetail(item.id)"
                  >个人主页</el-button
                >
              </div>
              <div>
                <el-button
                  type="danger"
                  size="mini"
                  plain
                  @click="cancel(item.id)"
                  >取消关注</el-button
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
  mineFollow,
  cancelFollow
} from '../../ajax/index';
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
      mineFollow({
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
        return err;
      });
    },
    // 取消关注
    cancel(id) {
      cancelFollow({ starid: id }).then(res => {
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
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    },
    // 查看个人主页
    watchDetail(id) {
      this.$router.push({ name: 'talentDetail', params: { id: id } });
    }
  },
  created() {
    mineFollow({
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
      return err;
    });
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
}
</style>
