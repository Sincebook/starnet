<template>
    <div class="notice-box">
      <div class="title">
          <div class="name">系统通知</div>
      </div>
      <div class="notice">
        <el-alert
          v-if="!isHave"
          title="暂无通知"
          type="warning"
          :closable="false"
          show-iocn
        ></el-alert>
        <div v-else class="list">
           <div class="item-box" v-for="(item,index) in notice.datas" :key="index">
            <div class="item">
              <div class="item-notice">
                 <div class="item-title">{{item.title}}</div>
                 <div class="item-word">{{item.word}}</div>
                 <div class="item-time">{{item.time}}</div>
              </div>
              <div class="delete-btn">
                <el-button
                type="danger"
                size="mini"
                plain
                @click="cancel(item.id)"
                >删除消息</el-button>
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
          layout="prev, pager ,next"
          :page-count="notice.allpage"
          hide-on-single-page
        ></el-pagination>
      </div>
  </div>
</template>
<script>
import { mineNotice, deleteNotice } from '../../ajax/index';
export default {
    data() {
        return {
          isHave: true,
          notice: [],
          currentPage: 1,
          nums: 6
        };
    },
    methods: {
      // 查看我收到的消息 页数
      handleCurrentChange(val) {
        mineNotice({
          page: val,
          num: this.nums
        }).then(res => {
          if (res.code === '0') {
            this.isHave = true;
            this.notice = res.data;
          } else {
            this.isHave = false;
            this.$message.error('暂无消息');
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
      },
      // 删除消息
      cancel(id) {
        deleteNotice({ id: id }).then(res => {
          console.log('1111111111111111111111111111');
          if (res.code === '0') {
            this.$confirm('此操作将永久删除文件,是否继续？', '提示', {
              confirmButtonText: '确实',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });
            });
            if (this.notice.datas.length === 1 && this.currentPage !== 1) {
              this.handleCurrentChange(this.currentPage - 1);
            } else {
              this.handleCurrentChange(this.currentPage);
            }
            this.$emit('cancel', 1);
          } else {
            this.$message.error('删除失败');
          }
        }).catch(err => {
          return err;
        });
      }
    },
    created() {
      mineNotice({
          page: this.currentPage,
          num: this.nums
        }).then(res => {
          console.log('1111111111111111111');
          console.log(res.data);
          if (res.code === '0') {
            this.isHave = true;
            this.notice = res.data;
            console.log(this.notice.datas);
          } else {
            console.log('222222222222222222222222');
            this.isHave = false;
            this.$message.error('暂无消息');
          }
        }).catch(err => {
          this.isHave = false;
          return err;
        });
    }
};
</script>>

<style lang="less" scoped>
.notice-box {
    position: relative;
    height: 100%;
    .notice {
      padding: 25px 50px 0;
        .item {
          align-items: center;
          width: 100%;
          display: flex;
          .item-notice{
            display: flex;
            height: 20px;
            margin: 0 20px;
            overflow: hidden;
            width:80%;
            .item-title {
              height: 20px;
              font-size: 15px;
              font-weight: 600;
              width:15%;
            }
            .item-word {
              height: 20px;
              width:50%;
              margin-left: 45px;
              font-size: 15px;
              width:60%
            }
            .item-time{
              font-size: 10px;
            }
          }
          .user.btn {
            width:20%;
            height: 80px;
            display: flex;
            flex-direction: column;
            flex-direction: center;
            justify-content: space-between;
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
