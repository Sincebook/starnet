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
                 <div class="item-status1" v-if="item.status == 1">
                   <svg t="1615811266498" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2227" width="100" height="100"><path d="M512 512m-286.423125 0a286.423125 286.423125 0 1 0 572.84718751 0 286.423125 286.423125 0 1 0-572.84718751 0Z" fill="#f43530" p-id="2228"></path></svg>
                 </div>
                 <div class="item-status2" v-if="item.status == 2"></div>
                 <div class="item-title">{{item.title}}</div>
                 <div class="item-word" @click="open(item)"><a>{{item.word | ellipsis}}</a></div>
                 <div class="item-time">{{Number(item.uptime) | formatDate}}</div>
              </div>
              <div class="delete-btn">
                <el-button
                type="danger"
                size="mini"
                plain
                @click="cancel(item.id)"
                >删除</el-button>
              </div>
            </div>
            <el-divider class="divider"></el-divider>
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
import { formatDate } from '../../assets/js/date.js';
import { comNotice, deletecomNotice } from '../../ajax/index';
export default {
    data() {
        return {
          isHave: true,
          notice: [],
          currentPage: 1,
          nums: 10,
          status: 0
        };
    },
    methods: {
      // 查看我收到的消息 页数
      handleCurrentChange(val) {
        comNotice({
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
        deletecomNotice({ id: id }).then(res => {
          console.log('1111111111111111111111111111');
            this.$confirm('此操作将永久删除,是否继续？', '提示', {
              confirmButtonText: '确实',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
            if (res.code === '0') {
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
            if (this.notice.datas.length === 1 && this.currentPage !== 1) {
              this.handleCurrentChange(this.currentPage - 1);
            } else {
              this.handleCurrentChange(this.currentPage);
             }
            } else {
            this.$message.error('删除失败');
          }
        }).catch(err => {
          return err;
        });
      });
    },
      // 查看消息
      open(item) {
        this.$alert(item.word, item.title, {
          confirmButtonText: '确定'
        }).then(() => {
          item.status = 2;
        });
      }
    },
    created() {
      comNotice({
          page: this.currentPage,
          num: this.nums
        }).then(res => {
          console.log('1111111111111111111');
          console.log(res.data);
          if (res.code === '0' && res.data.datas.length !== 0) {
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
    },
    filters: {
      formatDate(time) {
        var date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd');
      },
      ellipsis(value) {
        if (!value) return '';
        if (value.length > 30) {
          return value.slice(0, 25) + '......';
        }
        return value;
      }
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
            .item-status1{
              width: 3%;
              margin-right: 10px;
            }
            .item-status2{
              width: 3%;
              margin-right: 10px;
            }
            .item-title {
              font-size: 13px;
              font-weight: 600;
              width:15%;
              color: #303133;
            }
            .item-word {
              margin-left: 45px;
              font-size: 13px;
              width: 60%;
              color: #303133;
            }
            .item-time{
              font-size: 15px;
              font-size: 15%;

              color:gray;
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
        .divider{
          height: 0.5px;
          margin-top: 22px;
          margin-bottom: 22px;
          margin-left: 50px;
          width: 75%;
          color: #eee;
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
