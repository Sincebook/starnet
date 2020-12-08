<template>
  <div class="talent">
    <sub-bar></sub-bar>
    <select-type
      :type="'talent'"
      @nameSearch="nameSearch"
      @lasted="lasted"
      @hot="hot"
      @newType="newType"
    ></select-type>
    <div class="talent-list">
      <actor-card
        data-aos="fade-up"
        v-for="(item, index) in cards"
        :key="'talent' + item.id + index"
        :item="item"
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
import { findByTalentNew, findByName, findHotTalent, findByThree } from '@/ajax';
export default {
  data() {
    return {
      cards: [{ id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }, { id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }, { id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }, { id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }, { id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }, { id: 1, image: require('@/assets/images/white.png'), name: '--/--', vocation: '--/--', workArea: '--/--' }],
      allpages: 1,
      select: 'uptime',
      params: ''
    };
  },
  created() {
    this.changePage(1);
  },
  methods: {
    changePage(page) {
      if (this.select === 'uptime') {
        findByTalentNew({ page }).then(res => {
          console.log(res);
          this.cards = res.data.datas;
          this.allpages = res.data.allpage;
        });
      }
      if (this.select === 'type') {
        this.newType(this.params, page);
      }
    },
    newType(obj, page) {
      this.select = 'type';
      // console.log(obj);
      this.params = { workArea: obj.workArea, vocation: obj.vocation, sex: obj.sex.slice(0, 1), page: 1 };
      if (page) {
        this.params.page = page;
      }
      findByThree(this.params).then(res => {
        // console.log(res);
        this.cards = res.data.datas;
        this.allpages = res.data.allpage;
      });
    },
    nameSearch(name) {
      console.log(name);
      if (!name) { // 输入名字为空时，搜索最新的人才
        this.select = 'uptime';
        this.changePage(1);
        return;
      }
      findByName({ name }).then(res => {
        console.log(res);
        this.cards = res.data.datas;
        this.allpages = res.data.allpage;
      });
    },
    lasted() {
      this.select = 'uptime';
      this.changePage(1);
    },
    hot() {
      findHotTalent().then(res => {
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
  width: 920px;
  margin: 10px auto;
  /deep/ .actor-card {
    width: 210px;
    height: 300px;
    margin: 10px;
  }
}
</style>
