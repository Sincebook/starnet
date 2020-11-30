<template>
  <div class="talent">
    <sub-bar></sub-bar>
    <select-type :type="'talent'"></select-type>
    <div class="talent-list">
      <actor-card
        data-aos="fade-up"
        v-for="item in cards"
        :key="item.id"
        :item='item'
      ></actor-card>
    </div>
    <pagination :allPages="allpages" @getProjects="changePage"></pagination>
  </div>
</template>

<script>
import subBar from '../components/common/subBar';
import SelectType from '../components/common/selectType';
import actorCard from '../components/common/actorCard';
import pagination from '../components/common/pagination';
import { findByTalentNew } from '@/ajax';
export default {
  data() {
    return {
      cards: null,
      allpages: 1
    };
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changePage(page) {
      findByTalentNew({ page }).then(res => {
        console.log(res);
        this.cards = res.data;
        // this.allpages = res.data.allpage;
      });
    }
  },
  components: {
    subBar,
    SelectType,
    actorCard,
    pagination
  }
};
</script>

<style lang="less" scoped>
.talent-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 1280px;
  margin: 50px auto;
  /deep/ .actor-card {
    margin: 20px;
  }
}
</style>
