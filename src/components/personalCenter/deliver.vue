<template>
  <div class="info-box">
    <div class="title">
      <div class="name">投递记录</div>
      <el-dropdown style="cursor: pointer">
        <span class="el-dropdown-link">
          条件筛选({{ tj }})<i
            class="el-icon-arrow-down el-icon--right"
          ></i>
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
      <div class="list" v-show="flag">
        <div class="item-box" v-for="item in list" :key="item.id">
          <div class="item">
            <el-image
              class="user-img"
              :src="item.roleimage"
              fit="cover"
            ></el-image>
            <div class="user-info">
              <div class="user-name">{{ item.rolename }}</div>
              <div class="content oneLine">
                {{ item.roledes }}
              </div>
              <div class="content status">{{ item.status }}</div>
            </div>
            <div class="user-btn">
              <el-button
                type="primary"
                size="mini"
                plain
                @click="openDialog(item), (dialogVisible = true)"
                >查看详情</el-button
              >
              <el-button
                type="danger"
                size="mini"
                plain
                @click="cancel(item.id)"
                >取消投递</el-button
              >
            </div>
          </div>
          <el-divider></el-divider>
        </div>
      </div>
    </div>
    <div class="footer-page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="7"
        layout="prev, pager, next"
        :page-count="allPage"
        hide-on-single-page
      >
      </el-pagination>
    </div>
    <el-dialog title="详情" :visible.sync="dialogVisible" width="600px">
      <div class="detail">
        <div class="content">
          <span class="label">角色图：</span>
          <el-image
            class="user-img"
            :src="selectItem.roleimage"
            fit="cover"
          ></el-image>
        </div>
        <div class="content">
          <span class="label">角色名：</span>
          <span class="desc">{{ selectItem.rolename }}</span>
        </div>
        <div class="content">
          <span class="label">角色描述：</span>
          <span class="desc">{{ selectItem.roledes }}</span>
        </div>
        <div class="content">
          <span class="label">状态：</span>
          <span class="desc">{{ selectItem.status }}</span>
        </div>
      </div>
    </el-dialog>
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
      tiaojian: [
        { id: 0, value: '全部', code: 'a' },
        { id: 1, value: '待查看', code: 'w' },
        { id: 2, value: '已查看', code: 'h' },
        { id: 3, value: '拒绝', code: 'r' },
        { id: 4, value: '已录用', code: 's' }
      ],
      flag: false,
      filter: 'a',
      list: [],
      selectItem: {},
      allPage: 1,
      currentPage1: 1,
      dialogVisible: false
    };
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    openDialog(item) {
      this.selectItem = item;
    },
    getDeliver() {
      mineDeliver({
        filter: this.filter,
        page: this.currentPage1
      }).then(res => {
        if (res.code === '0') {
          this.$message({
            message: '筛选成功',
            type: 'success'
          });
          this.allPage = res.data.allpage;
          this.list = res.data.applys;
          this.flag = true;
        } else {
          this.$message({
            message: '暂无记录',
            type: 'warning'
          });
          this.flag = false;
        }
      }).catch(err => {
        return err;
      });
    },
    clickItem(item) {
      this.filter = item.code;
      this.currentPage1 = 1;
      this.getDeliver();
    },
    cancel(id) {
      cancelDeliver({ id: id }).then(res => {
        if (res.code === '0') {
          this.flag = false;
          this.currentPage1 = 1;
          mineDeliver({
            filter: this.filter,
            page: this.currentPage1
          }).then(res => {
            if (res.code === '0') {
              this.allPage = res.data.allpage;
              this.list = res.data.applys;
              this.flag = true;
            } else {
              this.$message({
                message: '暂无记录',
                type: 'warning'
              });
              this.flag = false;
            }
          }).catch(err => {
            return err;
          });
        } else {
          this.$message.error(res.errMsg);
        }
      }).catch(err => {
        return err;
      });
    }
  },
  created() {
    mineDeliver({
      filter: this.filter,
      page: this.currentPage1
    }).then(res => {
      if (res.code === '0') {
        this.allPage = res.data.allpage;
        this.list = res.data.applys;
        this.flag = true;
      } else {
        this.$message({
          message: '暂无记录',
          type: 'warning'
        });
        this.flag = false;
      }
    }).catch(err => {
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
          margin: 0 20px;
          overflow: hidden;
          word-wrap: break-word;
          .content {
            margin-top: 5px;
          }
          .status {
            text-align: right;
          }
        }
        .user-name {
          font-size: 15px;
          font-weight: 600;
          margin-right: 10px;
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
