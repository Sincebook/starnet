<template>
  <div class="create-cv">
    <h1>创建一份精彩的简历</h1>
    <p>
      现在，您可以通过上传照片和视频组合，展示您的个性和才华，为自己创造无限的可能
    </p>
    <div class="btn-box">
      <div class="btn" @click="createCv">免费创建简历</div>
      <div class="btn" @click="lookVip">查看会员资费</div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  methods: {
    createCv() {
      // 判断 没登录跳转到登录页面  登陆后跳转到个人中心
      if (this.isLogin) {
        if (this.userinfo.user.type >= 4) {
          this.$router.push('/corporateCenter');
        } else {
          this.$router.push('/personalCenter');
        }
      } else {
        this.$router.push('/sign');
      }
    },
    lookVip() {
      this.$router.push('/vip');
    }
  },
  computed: {
    ...mapState({
      isLogin: (state) => state.isLogin,
      userinfo: (state) => state.userinfo
    })
  }
};
</script>

<style lang="less" scoped>
.create-cv {
  background-color: #f5f5f5;
  width: 100%;
  padding: 75px 0;
  h1 {
    margin-bottom: 50px;
  }
  p {
    font-size: 18px;
    margin: 0 35px 60px 35px;
  }
  .btn-box {
    display: flex;
    justify-content: center;
    align-items: center;
    .btn {
      font-size: 18px;
      font-weight: 600;
      border-radius: 50px;
      padding: 12px;
      width: 200px;
      margin: 0 20px;
      transition: all 0.25s;
      cursor: pointer;
      &:first-child {
        border: 2px solid #208b4e;
        &:hover {
          background: #208b4e;
          color: #fff;
        }
      }
      &:last-child {
        border: 2px solid #2d7bb0;
        &:hover {
          background: #2d7bb0;
          color: #fff;
        }
      }
    }
  }
}
</style>
