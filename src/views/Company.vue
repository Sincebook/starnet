<template>
  <div class="company">
    <sub-bar></sub-bar>
    <select-type
      :type="'company'"
      @newType="typeToPage"
      @nameSearch="nameSearch"
      @lasted="lasted"
      @hot="hot"
    ></select-type>
    <div class="company-list" v-if="cards">
      <div v-if="!cards.length" style="margin: 50px auto">暂无数据...</div>
      <company-card
        v-for="item in cards"
        :key="item.userid"
        :item="item"
      ></company-card>
    </div>
    <pagination
      :allPages="allpages"
      v-if="allpages"
      @getProjects="changePage"
    ></pagination>
  </div>
</template>
<script>
// @ is an alias to /src
import SubBar from '../components/common/subBar.vue';
import SelectType from '../components/common/selectType.vue';
import CompanyCard from '../components/common/companyCard.vue';
import pagination from '../components/common/pagination';
import { findByUptime, findByTwo, findComByName, findHotCompany } from '@/ajax/index.js';
export default {
  name: 'Company',
  data() {
    return {
      cards: [{ id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }, { id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }, { id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }, { id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }, { id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }, { id: 1, image: '#', logo: require('@/assets/images/white.png'), name: '--/--', oknum: '--/--' }],
      allpages: null,
      select: 'uptime',
      typeObj: null
    };
  },
  created() {
    this.changePage(1);
  },
  components: {
    SubBar,
    SelectType,
    CompanyCard,
    pagination
  },
  computed: {
  },
  methods: {
    // 改变页数
    changePage(page) {
      if (this.select === 'uptime') {
        findByUptime({ page }).then(res => {
          console.log(res);
          this.cards = res.data.companyInfoVOs;
          this.allpages = res.data.allpage;
          // console.log(this.cards);
        });
      }
      if (this.select === 'type') {
        this.typeObj[page] = page;
        this.typeToPage(this.typeObj);
      }
    },
    // 根据名字搜索
    nameSearch(name) {
      console.log(name);
      if (!name) { this.changePage(1); return; }
      findComByName({ name }).then(res => {
        console.log(res);
        this.cards = res.data;
        this.allpages = 1;// 只返回一页
      });
    },
    // 根据类型搜索
    typeToPage(obj) {
      console.log(obj);
      // { area: obj.area, category: obj.category + '公司', page: 1 }
      this.typeObj = obj;
      findByTwo(obj).then(res => {
        console.log(res);
        this.cards = res.data.companyInfoVOs;
        this.allpages = res.data.allpage;
      });
    },
    lasted() {
      console.log('最新');
      this.changePage(1);
    },
    hot() {
      console.log('最热');
      findHotCompany().then(res => {
        console.log(res);
        this.cards = res.data;
        this.allpages = 1;// 最热只有一页
      });
    },
    typeToName(name) {
      console.log(name);
      findComByName({ name }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style lang='less' scoped>
.company {
  .company-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 1180px;
    margin: 10px auto;
    /deep/ .company-card {
      width: 240px;
      height: 330px;
      margin: 10px;
      .company-head{
      }
    }
  }
}
</style>
