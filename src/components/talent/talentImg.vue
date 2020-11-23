<template>
  <div class="talent-img">
    <p class="title">照&nbsp;片</p>
    <div class="img-list">
      <img
        src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=4249824861,1695522234&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=624006971,3563395241&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3311716126,126037072&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3181616003,475692136&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1600501436,2517205260&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=577967484,3039187055&fm=26&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2982749276,2021516327&fm=11&gp=0.jpg"
        alt=""
      />
      <img
        src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=638565862,3535289266&fm=26&gp=0.jpg"
        alt=""
      />
    </div>
    <pagination allPages="20" style="margin-bottom:0;"></pagination>
  </div>
</template>
<script>
import Pagination from '../common/pagination.vue';
// @ is an alias to /src

export default {
  name: 'talentImg',
  data() {
    return {

    };
  },
  components: {
    Pagination

  }
};
</script>
<style lang='less' scoped>
.talent-img {
  width: 1280px;
  margin: 40px auto 0 auto;
  background-color: #fff;
  padding-top: 40px;
  text-align: center;
  padding-bottom: 30px;
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
    font-size: 18px;
    font-weight: 600;
  }
  .img-list {
    margin-bottom: 20px;
    img {
      width: 280px;
      height: 390px;
      margin: 10px;
    }
  }
}
</style>
