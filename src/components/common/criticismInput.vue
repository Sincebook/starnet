<template>
  <div class="criticism_input">
    <textarea class="text" placeholder="请输入评论内容"></textarea>
    <!-- <input type="text" class="text"/> -->
    <div class="btn" @click="submit"><span>提</span><span>交</span></div>
  </div>
</template>
<script>
// @ is an alias to /src
export default {
  name: 'XXX',
  data() {
    return {

    };
  },
  components: {

  },
  methods: {
    submit() {
      this.$emit('submit');
    }
  }
};
</script>
<style lang='less'>
.criticism_input {
  margin: 20px 0;
  position: relative;
  .text {
    padding: 10px;
    width: 100%;
    height: 130px;
    border: 1px solid #eee;
    border-radius: 20px;
    resize: none;
  }
  .text:focus {
    padding: 10px;
    width: 100%;
    height: 130px;
    outline: 0;
  }
  .btn {
    position: absolute;
    right: 0;
    margin-top: 20px;
    border-radius: 20px;
    padding: 0 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 18%;
    height: 36px;
    color: #fff;
    font-size: 20px;
    background-color: rgb(250, 136, 60);
    cursor: pointer;
    transition: background-color 0.5s;
  }
  .btn:hover {
    background-color: #208b4e;
  }
}
</style>
