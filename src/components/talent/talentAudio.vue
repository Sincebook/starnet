<template>
  <div class="talent-audio" v-if="music">
    <p class="title">音频</p>
    <aplayer
      :music="music"
      :list="list"
      :autoplay="false"
      :listFolded="true"
      v-if="music"
    />
  </div>
</template>
<script>
// @ is an alias to /src

import aplayer from 'vue-aplayer';
import { getUserImg } from '@/ajax';
export default {
  props: ['userid'],
  name: 'talentAudio',
  data() {
    return {
      music: '',
      // {
      //   title: '文爱',
      //   artist: 'CG',
      //   src: require('@/assets/images/CG - 文爱.mp3')
      //   // pic: require('@/assets/images/telent.jpg')
      // }
      list: [],
      obj: { type: 3, page: 1 }// 先默认第一页，其实不分页
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.obj.userid = this.userid;
      getUserImg(this.obj).then(res => {
        console.log(res);
        this.music = { title: res.data[0].description, src: res.data[0].path, artist: this.formatDate(parseInt(res.data[0].uptime)) };
        for (let i = 1; i < res.data.length; i++) {
          this.list.push({ title: res.data[i].description, src: res.data[i].path, artist: this.formatDate(parseInt(res.data[i].uptime)) });
        }
      });
    },
    // 时间戳转换方法    date:时间戳数字
    formatDate(date1) {
      let date = new Date(date1);
      let YY = date.getFullYear() + '-';
      let MM = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let DD = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate());
      // let hh = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      // let mm = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
      // let ss = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
      return YY + MM + DD;
    }
  },
  components: {
    aplayer
  }
};
</script>
<style lang='less' scoped>
.talent-audio {
  width: 960px;
  background-color: #fff;
  padding: 20px;
  margin: 20px auto;
  .title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-bottom: 20px;
  }
}
</style>
