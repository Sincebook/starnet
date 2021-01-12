<template>
  <div class="talent-list">
    <p v-show="false">{{ value }}</p>
    <actor-card
      data-aos="fade-up"
      v-for="(item, index) in cards.datas"
      :key="'talent' + item.id + index"
      :item="item"
    ></actor-card>
  </div>
</template>
<script>
import actorCard from '../components/common/actorCard';
import { findByName } from '@/ajax';
export default {
  data() {
    return {
      cards: [],
      preValue: ''
    };
  },
  created() {
    this.nameSearch(this.value);
  },
  beforeUpdate() {
    if (this.preValue !== this.value) {
      this.nameSearch(this.value);
      this.preValue = this.value;
    }
  },
  methods: {
    nameSearch(name) {
      findByName({ name }).then(res => {
        if (res.code === '0') {
          this.cards = res.data;
        } else {
          this.$message.error('暂无数据');
        }
      }).catch(err => {
        return err;
      });
    }
  },
  computed: {
    value() {
      return this.$route.query.value;
    }
  },
  components: {
    actorCard
  }
};
</script>
<style lang='less' scoped>
.talent-list {
  display: flex;
  flex-wrap: wrap;
  width: 1160px;
  margin: 10px auto;
  /deep/ .actor-card {
    margin: 10px 10px;
  }
  .el-alert {
    width: 1140px;
  }
}
</style>
