<template>
  <div class="actor-card">
    <div class="actor-head">
      <el-image class="bgImg" :src="item.image" fit="cover"></el-image>
    </div>
    <div class="info">
      <router-link :to="{ name: 'talentDetail', params: { id: item.id } }">
        <h2 class="name">
          {{ item.name }}/{{ item.workArea }}
        </h2></router-link
      >
      <p class="desc">{{ item.vocation }}</p>
      <div class="btn-box">
        <div class="btn" @click="email">私信</div>
        <div class="btn" @click="follow">关注</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],
  methods: {
    email() {
      this.$emit('email');
    },
    follow() {
      this.$emit('follow');
    }
  }
};
</script>

<style lang="less" scoped>
.actor-card {
  text-align: center;
  user-select: none;
  position: relative;
  width: 210px;
  background-color: var(--cardBgColor);
  height: 290px;
  transition: all 0.25s;
  box-shadow: -4px -4px 8px -5px rgba(0, 0, 0, 0.1),
    4px 4px 8px -5px rgba(0, 0, 0, 0.1);
  &:hover {
    .actor-head .bgImg {
      transform: scale(1.1);
    }
  }
  .actor-head {
    position: absolute;
    top: 0;
    width: 100%;
    height: 190px;
    overflow: hidden;
    .bgImg {
      width: 100%;
      height: 100%;
      transition: all 0.25s;
    }
  }
  .info {
    padding-top: 190px;
  }
  .name {
    display: inline-block;
    font-size: 18px;
    cursor: pointer;
    color: #759cb6;
    font-weight: 600;
    margin: 10px 0 0 0;
    transition: all 0.25s;
    &:hover {
      color: #0d7bc4;
    }
  }
  .desc {
    color: var(--fontColor);
    margin: 5px 0 8px 0;
    font-size: 14px;
  }
  .btn-box {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    .btn {
      width: 33%;
      height: 32px;
      border-radius: 4px;
      font-size: 16px;
      transition: all 0.25s;
      cursor: pointer;
      color: gray;
      display: flex;
      align-items: center;
      justify-content: center;
      &:first-child {
        border: 2px solid #208b4e;
        &:hover {
          background-color: #208b4e;
          color: #fff;
        }
      }
      &:last-child {
        border: 2px solid #222;
        &:hover {
          background-color: #222;
          color: #fff;
        }
      }
    }
  }
}
</style>
