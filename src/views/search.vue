<template>
  <div class="talent-list">
    <actor-card
      data-aos="fade-up"
      v-for="(item, index) in cards"
      :key="'talent' + item.id + index"
      :item="item"
    ></actor-card>
  </div>
</template>
<script>
// @ is an alias to /src
import actorCard from '../components/common/actorCard';
import { findByName } from '@/ajax';
export default {
  name: 'search',
  data() {
    return {
      cards: '',
      allpages: 1
    };
  },
  created() {
    this.nameSearch(this.$route.query.value);
  },
  beforeUpdate() {
    this.nameSearch(this.$route.query.value);
  },
  methods: {
    nameSearch(name) {
    //   console.log(111);
      findByName({ name }).then(res => {
        // console.log(res);
        this.cards = res.data.datas;
      });
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
  justify-content: center;
  width: 1180px;
  margin: 10px auto;
  /deep/ .actor-card {
    width: 240px;
    height: 360px;
    margin: 20px 10px;
    .actor-head {
      height: 230px;
    }
    .info {
      padding-top: 230px;
    }
    .desc {
      margin: 10px 0 10px 0;
    }
    .btn-box {
      .btn {
        height: 33px;
      }
    }
  }
}
</style>
