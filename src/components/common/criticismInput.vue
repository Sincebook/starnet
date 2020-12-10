<template>
  <div class="criticism_input">
    <textarea class="text" placeholder="请输入评论内容" ref="input"></textarea>
    <!-- <input type="text" class="text"/> -->
    <div class="btn" @click="submit"><span>提</span><span>交</span></div>
  </div>
</template>
<script>
// @ is an alias to /src
import { addMemos } from '@/ajax';
export default {
  props: ['userid'],
  name: 'critismInput',
  data() {
    return {

    };
  },
  components: {

  },
  methods: {
    submit() {
      let word = this.$refs.input.value;
      if (!word) {
        return;
      }
      // console.log(word);
      // console.log(this.userid);
      addMemos({ toid: parseInt(this.userid), word: word }).then(res => {
        console.log(res);
        if (res.code === '0') {
          this.$message({
            message: '已评论',
            type: 'success'
          });
        } else {
          this.$message.error(
            res.errMsg
          );
        }
      });
      this.$refs.input.value = '';
      this.$emit('resetCritism');
    }
  }
};
</script>
<style lang='less'>
.criticism_input {
  width: 960px;
  height: 200px;
  margin: 0 auto 0 auto;
  background-color: #fff;
  position: relative;
  padding: 0 40px 0 60px;
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
    margin-right: 40px;
    border-radius: 20px;
    padding: 0 5px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 120px;
    height: 36px;
    color: #fff;
    font-size: 20px;
    background-color: rgb(250, 136, 60);
    cursor: pointer;
    transition: background-color 0.25s;
  }
  .btn:hover {
    background-color: #208b4e;
  }
}
</style>
