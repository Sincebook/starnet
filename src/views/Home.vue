<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src
// 测试api的使用
// import { getOtherInfo } from '@/ajax/index'
// 取消末尾换行eslint
// import { mapState } from 'vuex'
export default {
  name: 'Home',
  components: {

  },

  created () {
    this.$http.getOtherInfo().then(res => {
      console.log(res)
    })
  }
}
</script>
