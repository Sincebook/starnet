<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">

  </div>
</template>

<script>
// @ is an alias to /src
// 测试api的使用
import { getOtherInfo } from '@/ajax/index'
export default {
  name: 'Home',
  components: {

  },
  created () {
    getOtherInfo().then(res => {
      console.log(res)
    })
  }
}
</script>
