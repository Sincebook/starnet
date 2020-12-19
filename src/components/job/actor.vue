<template>
  <div class="actor">
    <!-- actor1 -->
    <div class="details">
      <div class="right-box">
        <viewer>
          <img :src="item.image" alt="" />
        </viewer>
        <span>
          <h3>
            {{ item.name }}<span style="font-size: 14px">{{ item.sex }}</span
            ><span>{{ item.age }}岁</span>
          </h3>
          <p>{{ item.description }}</p>
          <button @click="apply">{{ btn }}</button>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { applyJob, isApply } from '@/ajax';
export default {
  props: ['item'],
  data() {
    return {
      btn: '立即申请'
    };
  },
  created() {
    this.isApply();
  },
  methods: {
    apply() {
      if (this.btn === '已申请') {
        return;
      }
      applyJob({ jobid: this.item.jobid, roleid: this.item.id }).then(res => {
        if (res.code === '905_500') {
          this.$router.push({ name: 'PersonalCenter' });
          return;
        }
        if (!res.data) {
          this.$message({
              message: '已申请',
              type: 'success'
            });
          this.btn = '已申请';
        }
        // console.log(res);
      });
    },
    isApply() {
      isApply({ jobid: this.item.jobid, roleid: this.item.id }).then(res => {
        if (res.code === '0') {
          this.btn = '已申请';
        }
        // console.log(res);
      });
    }
  }
};
</script>

<style lang="less" scoped>
.actor {
  width: 960px;
  padding: 0 40px;
  margin: 0 auto;
  background-color: #fff;
}
.details {
  border-top: 2px solid #e7e4e4;
  min-height: 200px;
  padding: 20px 0;
  h3 {
    margin-top: 2px;
    font-size: 20px;
    color: #333;
    margin-bottom: 14px;
  }
  button {
    position: absolute;
    bottom: 0;
    cursor: pointer;
    outline: none;
    width: 80px;
    height: 28px;
    font-size: 14px;
    color: #ffffff;
    border: 0;
    border-radius: 5px;
    margin-top: 25px;
    background-color: #22ac38;
  }
}
.right-box {
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  height: 160px;
  span {
    margin: 0 10px;
    font-size: 14px;
    line-height: 20px;
    color: #333;
  }
  img {
    width: 120px;
    // height: 100px;
  }
}
</style>
