<template>
  <div class="com-perform" v-if="info">
    <p class="achieve">公司荣誉</p>
    <div
      class="coorperation"
      v-for="(item) in info"
      :key="item.userid + item.id"
    >
      <p>{{ item.type }}</p>
      <div>{{ item.time }}：{{ item.description }}</div>
    </div>
    <!-- <div class="glory">
      <p>{{info[1].type}}</p>
      <div class="glory-record more" ref="gloryRecord">
        {{this.info[0].time}}：{{this.info[0].description}}
      </div>
      <p @click="showAll" class="show-all">{{ tag }}</p>
    </div> -->
  </div>
</template>
<script>
import { getComGradeByUserId } from '@/ajax';
export default {
  data() {
    return {
      tag: '展开',
      info: ''
    };
  },
  props: ['userid'],
  created() {
    this.getComGrade();
  },
  methods: {
    showAll() {
      this.tag = this.tag === '展开' ? '收起' : '展开';
      this.$refs.gloryRecord.className = this.$refs.gloryRecord.className.includes('more') ? 'glory-record' : 'glory-record more';
    },
    getComGrade() {
      getComGradeByUserId({ userid: this.userid }).then(res => {
        // console.log(this.userid);
        console.log(res);
        if (res.code === '0') {
          this.info = res.data;
        }
      });
    }
  }

};
</script>

<style lang="less" scoped>
.com-perform {
  width: 960px;
  margin: 60px auto;
  background-color: white;
}
.achieve {
  font-weight: bold;
  font-size: 18px;
  padding: 20px 0;
  text-align: center;
}
.coorperation :first-child {
  padding-left: 30px;
  font-size: 16px;
  height: 30px;
  padding-top: 5px;
  font-weight: bold;
  color: #2d6496;
}
.glory :first-child {
  padding-left: 30px;
  font-size: 16px;
  height: 30px;
  padding-top: 25px;
  font-weight: bold;
  color: #2d6496;
}
.coorperation :last-child {
  // margin: 20px 0;
  padding: 0 30px;
  line-height: 40px;
  height: 60px;
  font-size: 16px;
}
.glory {
  position: relative;
  overflow: hidden;
  margin: 10px auto;
}
.glory-record {
  margin: 20px 0;
  padding: 0 30px;
  line-height: 40px;
  font-size: 16px;
}
.more {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.show-all {
  cursor: pointer;
  bottom: 0px;
  right: 20px;
  position: absolute;
}
</style>
